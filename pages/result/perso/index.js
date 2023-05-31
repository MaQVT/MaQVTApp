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

    const handleStatusChange = (diagnosticId, newStatus) => {
        const updatedDiagnostics = diagnostics.map((diagnostic) => {
            if (diagnostic._id === diagnosticId) {
                return {
                    ...diagnostic,
                    status: newStatus,
                };
            }
            return diagnostic;
        });
        const sortedDiagnostics = updatedDiagnostics.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return -(dateA - dateB);
        });
        setDiagnostics(sortedDiagnostics);

        // Update the status of the diagnostic in the database
        setTimeout(async () => {
            console.log(JSON.stringify({
                status: newStatus,
                _id: diagnosticId,
            }))
            const res = await fetch("/api/diagnostic", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    status: newStatus,
                    _id: diagnosticId,
                }),
            });
            if (res.ok) {
                const json = await res.json();
                console.log("OUIIIIIIIIIIIIII")
                console.log(json);
            } else {
                const json = await res.json();
                console.log(json);
            }
        }, 1000);
    };

    const formatDate = (dateString) => {
        return moment(dateString).fromNow()
    };

    useEffect(() => {
        moment.locale('fr');
        localStorage.setItem("allDiagnostics", JSON.stringify(allDiagnostics))
    }, [allDiagnostics])


    return (
        <Layout user={user}>
            <main className={`${styles.main} flex-col pt-5`} style={{justifyContent: "flex-start"}}>
                <div className='w-full'>
                    <div className='flex items-center justify-center gap-10'>
                    <h1 className='text-center text-2xl my-5'>Historique de mes rapports QVT personnelle</h1>
                    <button onClick={() => {
                            router.push({
                                pathname: "/result/collective",
                            });
                        }} className='h-auto w-auto py-3 px-5 sm:text-xs'>Voir les QVT Collective</button>
                    </div>
                    <hr />
                    <table className='w-[80%] m-auto my-6 sm:text-[10px] md:w-[95%]'>
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Date de passage</th>
                                <th>Décompte temps</th>
                                <th>Statut</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {diagnostics.map((diagnostic, index) => (
                                <tr key={diagnostic._id}>
                                    <td className='text-center'>{index + 1}</td>
                                    <td className='text-center'>{moment(diagnostic.date).format('D MMMM YYYY  HH:MM:SS')}</td>
                                    <td className='text-center'>{formatDate(diagnostic.date)}</td>
                                    <td className='text-center'>
                                        <select
                                            title='Privé (Résultats accessibles à moi uniquement) -- Consultant (Résultats accessibles à mon consultant WUNJO et à moi) -- Public (Rapport personnel confidentiel mais résultats remontés de manière anonymisée pour le rapport de QVT collective)'
                                            className='py-2 px-5'
                                            value={diagnostic.status.toString()}
                                            onChange={(event) =>
                                                handleStatusChange(diagnostic._id, event.target.value)
                                            }
                                        >
                                            <option value="private">Privée</option>
                                            <option value="consultant">Consultant</option>
                                            <option value="public">Public</option>
                                        </select>
                                    </td>
                                    <td className='text-center flex flex-col items-center'>
                                        <Link href={`/result/perso/${diagnostic._id}`} className='bg-white rounded-full px-5 py-1 my-2 hover:bg-neutral-500'>
                                            Voir le rapport QVT personnelle
                                        </Link>
                                        <Link href={`/result/download/perso/${diagnostic._id}`} target='_blank' className='bg-white rounded-full px-5 py-1 mb-2 hover:bg-neutral-500'>
                                            Télécharger le rapport QVT personnelle
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

    const diagnosticResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/diagnostic/email/${email}`, {
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
