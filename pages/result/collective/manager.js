import { useState } from 'react';
import cookies from 'next-cookies';
import { verifyJwt } from '../../../utils/jwt';
import Layout from '../../layout';
import styles from "/styles/Home.module.css";
import moment from 'moment';
import 'moment/locale/fr';
import { calculateMeanFormData } from '../../../utils/collective';
import { useRouter } from 'next/router';

const ObjectList = ({ user, objects }) => {

    const router = useRouter()
    const [selectedObjects, setSelectedObjects] = useState([]);

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
        console.log(selectedFormData);
        // Perform further actions with selectedFormData

        setTimeout(async () => {
            const res = await fetch("/api/coldiagnostic", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token"),
                },
                body: JSON.stringify({ form_data: calculateMeanFormData(selectedFormData), email: localStorage.getItem("email"), id_user: user._id }),
            });
            if (res.ok) {
                const json = await res.json();
                console.log(json);
            } else {
                const json = await res.json();
                console.log(json)
            }
        }, 100);
    };

    const sortedObjects = objects.sort((a, b) => -(new Date(a.date) - new Date(b.date)));

    return (
        <Layout user={user}>
            <main className={styles.main}>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-center text-2xl my-5'>Listes des QVT anonymes</h1>
                    <ul className='flex gap-5 flex-wrap py-5 justify-center items-center'>
                        {sortedObjects.map((object) => (
                            <li
                                className='h-28 w-28 flex items-center text-center cursor-pointer hover:scale-[1.1]'
                                key={object.date}
                                onClick={() => handleObjectSelect(object)}
                                style={{ backgroundColor: selectedObjects.includes(object) ? 'lightblue' : 'white' }}
                            >
                                {moment(object.date).format('D MMMM YYYY  HH:MM:SS')}
                            </li>
                        ))}
                    </ul>
                    <div>
                        <button onClick={handleSubmit} className='h-auto w-auto py-3 px-5'>Créer une QVT Collective</button>
                        <button onClick={() => {
                            router.push({
                                pathname: "/result/collective",
                            });
                        }} className='h-auto w-auto py-3 px-5'>Voir les QVT Collective</button>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default ObjectList;

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

    const diagnosticResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/diagnostic/email/${userResponseJson.data.email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            token: token,
        },
    });

    let diagnosticResponseJson = { data: {} };

    if (diagnosticResponse.ok) {
        diagnosticResponseJson = await diagnosticResponse.json();
    }

    return {
        props: { user: userResponseJson.data, objects: diagnosticResponseJson.data }, // will be passed to the page component as props
    };
}