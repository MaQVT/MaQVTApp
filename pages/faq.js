import { useEffect, useState } from 'react';
import AddFaqForm from '../components/Form/AddFaq';
import cookies from 'next-cookies';
import { verifyJwt } from '../utils/jwt';
import Layout from './layout';
import styles from "/styles/Home.module.css";
import AskQuestionForm from '../components/Form/AskQuestion';
import Head from 'next/head';

const FaqPage = ({ user }) => {
    const [faqList, setFaqList] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check if user is logged in as an admin
        const isAdminLoggedIn = localStorage.getItem('role') === 'Admin';
        setIsAdmin(isAdminLoggedIn);

        // Fetch the FAQ data from the server
        fetchFAQ();
    }, []);

    const fetchFAQ = async () => {
        try {
            const response = await fetch('/api/faq', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', token: localStorage.getItem("token") },
            });
            if (response.ok) {
                const faqData = await response.json();
                // console.log(faqData)
                setFaqList(faqData.data.sort((a, b) => {
                    return a.number - b.number
                }));
            } else {
                setFaqList([])
            }
        } catch (error) {
            console.error('Error fetching FAQ:', error);
        }
    };

    const handleEdit = (index) => {
        // Enable editing for the selected FAQ
        const updatedFaqList = [...faqList];
        updatedFaqList[index].isEditing = true;
        setFaqList(updatedFaqList);
    };

    const handleCancel = (index) => {
        // Disable editing and revert changes for the selected FAQ
        const updatedFaqList = [...faqList];
        updatedFaqList[index].isEditing = false;
        setFaqList(updatedFaqList);
    };

    const handleSave = async (index) => {
        // Save the changes made to the selected FAQ
        const updatedFaq = faqList[index];
        const { _id, number, question, response } = updatedFaq;

        try {
            await fetch(`/api/faq`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', token: localStorage.getItem("token") },
                body: JSON.stringify({ number, question, response, _id: _id }),
            });
            // Disable editing after successfully saving the changes
            const updatedFaqList = [...faqList];
            updatedFaqList[index].isEditing = false;
            setFaqList(updatedFaqList.sort((a, b) => {
                return a.number - b.number
            }));
        } catch (error) {
            console.error('Error updating FAQ:', error);
        }
    };

    const handleDelete = async (index) => {
        // Delete the selected FAQ
        const faqId = faqList[index]._id;

        try {
            await fetch(`/api/faq`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', token: localStorage.getItem("token") },
                body: JSON.stringify({ _id: faqId }),
            });
            // Remove the FAQ from the list after successfully deleting 
            const updatedFaqList = [...faqList];
            updatedFaqList.splice(index, 1);
            setFaqList(updatedFaqList);
        } catch (error) {
            console.error('Error deleting FAQ:', error);
        }
    };

    return (
        <>
            <Head>
                <title>FAQ</title>
                 
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout user={user}>
                <main className={`${styles.main} flex-col`}>
                    <h1 className='mt-10'>FAQ</h1>
                    {faqList.length > 0 ? (
                        faqList.map((faq, index) => (
                            <div key={faq._id} className='flex flex-col gap-2 w-[80%] mx-10 my-4'>
                                {faq.isEditing ? (
                                    <input
                                        className='w-full py-2 px-10'
                                        type="number"
                                        value={faq.number}
                                        onChange={(e) => {
                                            const updatedFaqList = [...faqList];
                                            updatedFaqList[index].number = e.target.value;
                                            setFaqList(updatedFaqList);
                                        }}
                                    />
                                ) : (
                                    <span type="text" className='w-max py-2 px-10 bg-[#cdd8ed]'>{faq.number}</span>
                                )}
                                <h3>Question:</h3>
                                {faq.isEditing ? (
                                    <input
                                        className='w-full py-2 px-10'
                                        type="text"
                                        value={faq.question}
                                        onChange={(e) => {
                                            const updatedFaqList = [...faqList];
                                            updatedFaqList[index].question = e.target.value;
                                            setFaqList(updatedFaqList);
                                        }}
                                    />
                                ) : (
                                    <span type="text" className='w-full py-2 px-10 bg-[#e5e7eb]'>{faq.question}</span>
                                )}

                                <h3>Réponse:</h3>
                                {faq.isEditing ? (
                                    <input
                                        className='w-full py-2 px-10'
                                        type="text"
                                        value={faq.response}
                                        onChange={(e) => {
                                            const updatedFaqList = [...faqList];
                                            updatedFaqList[index].response = e.target.value;
                                            setFaqList(updatedFaqList);
                                        }}
                                    />
                                ) : (
                                    <span type="text" className='w-full py-2 px-10 bg-[#e5e7eb]'>{faq.response}</span>
                                )}

                                {isAdmin && !faq.isEditing && (
                                    <div className='flex flex-row gap-5'>
                                        <button className='w-max px-5 py-2' onClick={() => handleEdit(index)}>Modifier</button>
                                        <button className='w-max px-5 py-2' onClick={() => { if (confirm("Confirmez la suppression")) handleDelete(index) }}>Supprimer</button>
                                    </div>

                                )}

                                {isAdmin && faq.isEditing && (
                                    <div className='flex flex-row gap-5'>
                                        <button className='w-max px-5 py-2' onClick={() => handleSave(index)}>Sauvegarder</button>
                                        <button className='w-max px-5 py-2' onClick={() => handleCancel(index)}>Annuler</button>
                                    </div>
                                )}
                            </div>
                        ))) : <div></div>

                    }
                    {isAdmin && <AddFaqForm></AddFaqForm>}
                    {!isAdmin && <AskQuestionForm></AskQuestionForm>}
                </main>
            </Layout>
        </>
    );
};

export async function getServerSideProps(context) {
    const token = cookies(context).token;
    const email = verifyJwt(token) != null ? verifyJwt(token).email : "nomail";

    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/email/${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            token: token,
        },
    });

    let userResponseJson = { data: {} };

    if (userResponse.ok) {
        userResponseJson = await userResponse.json();
    }

    return {
        props: { user: userResponseJson.data }, // will be passed to the page component as props
    };
}

export default FaqPage;

