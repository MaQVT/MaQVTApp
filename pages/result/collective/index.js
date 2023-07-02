import { useState } from 'react';
import Link from 'next/link';
import cookies from 'next-cookies';
import { verifyJwt } from '../../../utils/jwt';
import Layout from '../../layout';
import styles from "/styles/Home.module.css";
import moment from 'moment';
import 'moment/locale/fr';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

function History({ user, thisUser, allDiagnostics }) {
    const router = useRouter()
    const sortedDiagnostics = allDiagnostics.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return -(dateA - dateB);
    });
    const [diagnostics, setDiagnostics] = useState(sortedDiagnostics);

    const formatDate = (dateString) => {
        return moment(dateString).fromNow()
    };

    useEffect(() => {
        moment.locale('fr');
        localStorage.setItem("allDiagnostics", JSON.stringify(allDiagnostics))
    }, [allDiagnostics])


    return (
        <>
            <Head>
                <title>Liste des rapports QVT Collective</title>
                 
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout user={user}>
                <main className={`${styles.main} flex-col pt-5`} style={{ justifyContent: "flex-start" }}>
                    <div className='w-full'>
                        <div className='flex items-center justify-center gap-10'>
                            <h1 className='text-center text-2xl my-5'>Historique des rapports QVT Collective</h1>
                            {user.role != "Consultant" && <button onClick={() => {
                                router.push({
                                    pathname: "/result/perso",
                                });
                            }} className='h-auto w-auto py-3 px-5 sm:text-xs'> Consulter les rapports QVT personnelle</button>}
                            {(user.role == "Manager" || user.role == "Consultant") && <button onClick={() => {
                                router.push({
                                    pathname: `/result/collective/manager`,
                                    query: { id_m: thisUser._id}
                                });
                            }} className='h-auto w-auto py-3 px-5 sm:text-xs'>Créer une QVT Collective</button>}

                        </div>
                        <hr />
                        <table className='w-[80%] m-auto my-6 sm:text-[10px] md:w-[95%]'>
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Date de Création</th>
                                    <th>Décompte temps</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {diagnostics.map((diagnostic, index) => (
                                    <tr key={diagnostic._id}>
                                        <td className='text-center'>{index + 1}</td>
                                        <td className='text-center'>{moment(diagnostic.date).format('D MMMM YYYY  HH:mm:ss')}</td>
                                        <td className='text-center'>{formatDate(diagnostic.date)}</td>
                                        <td className='text-center flex flex-col items-center'>
                                            <Link href={`/result/collective/${diagnostic._id}`} className='bg-white rounded-full px-5 py-1 my-2 hover:bg-neutral-500'>
                                                Voir le rapport QVT Collective
                                            </Link>
                                            <Link href={`/result/download/collective/${diagnostic._id}`} target='_blank' className='bg-white rounded-full px-5 py-1 mb-2 hover:bg-neutral-500'>
                                                Télécharger le rapport QVT Collective
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </Layout>
        </>
    );
}

export default History;

export async function getServerSideProps(context) {
    const token = cookies(context).token;
    const email = verifyJwt(token) != null ? verifyJwt(token).email : "nomail";

    let { id_m } = context.query

    let userResponse;

    if (id_m) {
        userResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/id/${id_m}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
        });
    } else {
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

    let id = userResponseJson.data.role == "User" ? userResponseJson.data.parentId : userResponseJson.data._id;

    const diagnosticResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/coldiagnostic/userid/${id}`, {
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

    return {
        props: { thisUser: userResponseJson.data, user: thisUserResponseJson.data, allDiagnostics: diagnosticResponseJson.data }, // will be passed to the page component as props
    };
}
