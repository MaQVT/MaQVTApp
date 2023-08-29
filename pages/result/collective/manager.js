import { useEffect, useState } from 'react';
import cookies from 'next-cookies';
import { verifyJwt } from '../../../utils/jwt';
import Layout from '../../layout';
import styles from "/styles/Home.module.css";
import moment from 'moment';
import 'moment/locale/fr';
import { calculateMeanFormData } from '../../../utils/collective';
import { useRouter } from 'next/router';
import { getUsersByParents } from '../../../db/handlers/users_handlers';
import { getAllDiagnostics } from '../../../db/handlers/diagnostic_handlers';
import Head from 'next/head';

const ObjectList = ({ user, thisUser, diagnostics }) => {
    const [objects, setAllObjects] = useState([])

    useEffect(() => {
        setAllObjects(JSON.parse(diagnostics))
    }, [])

    const router = useRouter()
    const [selectedObjects, setSelectedObjects] = useState([]);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(false);

    const handleObjectSelect = (object) => {
        const isSelected = selectedObjects.includes(object);
        if (isSelected) {
            setSelectedObjects(selectedObjects.filter((selected) => selected !== object));
        } else {
            setSelectedObjects([...selectedObjects, object]);
        }
    };

    const handleSubmit = () => {
        const selectedFormData = selectedObjects.map((object) => object.form_data);
        // console.log(selectedFormData);
        // Perform further actions with selectedFormData

        if(selectedFormData.length < 2){
            alert("Veuiller selectionner au moins deux éléments.")
            return
        }

        setTimeout(async () => {
            const res = await fetch("/api/coldiagnostic", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token"),
                },
                body: JSON.stringify({ form_data: calculateMeanFormData(selectedFormData), email: localStorage.getItem("email"), id_user: thisUser._id }),
            });
            if (res.ok) {
                const json = await res.json();
                setSelectedObjects([]);
                setSent(true);
                setTimeout(() => {
                    setSent(false);
                }, 3000);
                // console.log(json);
            } else {
                const json = await res.json();
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 3000);
                // console.log(json)
            }
        }, 100);
    };

    const sortedObjects = objects.sort((a, b) => -(new Date(a.date) - new Date(b.date)));

    return (
        <>
            <Head>
                <title>Création d&apos;un rapport QVT Collective</title>
                 
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout user={user}>
                {
                    (user.role == "Manager" || user.role == "Consultant" ) ?
                        <main className={`${styles.main} flex-col pt-5`} style={{ justifyContent: "flex-start" }}>
                            <div className='flex flex-col items-center justify-center mb-3'>
                                <h1 className='text-center text-2xl my-5'>Listes des QVT anonymes</h1>
                                <ul className='flex gap-5 flex-wrap py-5 justify-center items-center px-12'>
                                    {sortedObjects.map((object) => (
                                        <li
                                            className='h-28 w-28 flex items-center text-center cursor-pointer hover:scale-[1.1]'
                                            key={object.date}
                                            onClick={() => handleObjectSelect(object)}
                                            style={{ backgroundColor: selectedObjects.includes(object) ? 'lightblue' : 'white' }}
                                        >
                                            {moment(object.date).format('D MMMM YYYY  HH:mm:ss')}
                                        </li>
                                    ))}
                                </ul>
                                <div className='flex mx-2 gap-2'>
                                    <button onClick={handleSubmit} className='h-auto w-auto py-3 px-5'>Créer une QVT Collective</button>
                                    <button onClick={() => {
                                        router.push({
                                            pathname: "/result/collective",
                                            query: { id_m: thisUser._id}
                                        });
                                    }} className='h-auto w-auto py-3 px-5'>Voir les QVT Collective</button>
                                </div>
                                {sent && <span className='text-base text-green-600 block text-center mt-5'>La QVT collective a été bien crée !!</span>}
                                {error && <span className='text-base text-red-600 block text-center mt-5'>Erreur lors de la création, veuiller réessayer ultérieurement !!</span>}
                            </div>
                        </main>
                        :
                        <div className={styles.main}>Page innaccessible à votre statut</div>
                }
            </Layout>
        </>
    );
};

export default ObjectList;

export async function getServerSideProps(context) {
    const token = cookies(context).token;
    const email = verifyJwt(token) != null ? verifyJwt(token).email : "nomail";
    let { id_m } = context.query
    let userResponse;
    if(id_m){
        userResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/id/${id_m}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
        });
    }else {
        userResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/email/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
        });
    }

    let userResponseJson = { data: {} };

    if (userResponse.ok) {
        userResponseJson = await userResponse.json();
    }

    const thisUserResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/email/${email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            token: token,
        },
    });

    let thisUserResponseJson = { data: {} };

    if (thisUserResponse.ok) {
        thisUserResponseJson = await thisUserResponse.json();
    }

    const filsResponse = await getUsersByParents(userResponseJson.data._id)
    const filsMail = filsResponse.map((value, index) => value.email)
    const allDiagnostics = await getAllDiagnostics();
    // console.log(allDiagnostics.length)
    
    
    const toSend = allDiagnostics.filter((value, index) => value.email == userResponseJson.data.email || filsMail.includes(value.email))
    // console.log(toSend.length)

    return {
        props: { thisUser: userResponseJson.data, user: thisUserResponseJson.data, diagnostics: JSON.stringify(toSend) }, // will be passed to the page component as props
    };
}