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

function History({ user, allDiagnostics }) {
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
        <Layout user={user}>
            <main className={styles.main}>
                <div className='w-full'>
                    <div className='flex items-center justify-center gap-10'>
                        <h1 className='text-center text-2xl my-5'>Historique de mes rapports QVT Collective</h1>
                        {(user.role == "Manager" || user.role == "Admin") && <button onClick={() => {
                            router.push({
                                pathname: "/result/collective/manager",
                            });
                        }} className='h-auto w-auto py-3 px-5'>Créer une QVT Collective</button>}
                    </div>
                    <hr />
                    <table className='w-[80%] m-auto my-6'>
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
                                    <td className='text-center'>{moment(diagnostic.date).format('D MMMM YYYY  HH:MM:SS')}</td>
                                    <td className='text-center'>{formatDate(diagnostic.date)}</td>
                                    <td className='text-center h-[40px]'>
                                        <Link href={`/result/collective/${diagnostic._id}`} className='bg-white rounded-full px-5 py-1 my-2 hover:bg-neutral-500'>
                                            Voir le rapport QVT Collective
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </Layout>
    );
}

export default History;

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

    const diagnosticResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/coldiagnostic/userid/${userResponseJson.data._id}`, {
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
        props: { user: userResponseJson.data, allDiagnostics: diagnosticResponseJson.data }, // will be passed to the page component as props
    };
}
