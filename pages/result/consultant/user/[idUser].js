import { useState } from 'react';
import Link from 'next/link';
import cookies from 'next-cookies';
import Layout from '../../../layout';
import styles from "/styles/Home.module.css";
import moment from 'moment';
import 'moment/locale/fr';
import { signJwt, verifyJwt } from '../../../../utils/jwt';
import { useEffect } from 'react';

function History({ user, allDiagnostics }) {
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
            <main className={styles.main}>
                <div className='w-full'>
                    <h1 className='text-center text-2xl my-5'>Historique des rapports QVT personnel</h1>
                    <hr />
                    <table className='w-[80%] m-auto my-6'>
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Date de passage</th>
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
                                        <Link href={`/result/consultant/${diagnostic._id}`} className='bg-white rounded-full px-5 py-1 my-2 hover:bg-neutral-500'>
                                            Voir le rapport QVT personnel
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
    const { idUser } = context.params;
    const token = cookies(context).token;
    const email = verifyJwt(token) != null ? verifyJwt(token).email : "nomail";

    // --------------------------------------
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

    // ---------------------------------------
    const userIdResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/id/${idUser}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            token: token,
        },
    });

    let userIdResponseJson = { data: {} };

    if (userIdResponse.ok) {
        userIdResponseJson = await userIdResponse.json();
    }

    // ---------------------------------------
    const diagnosticResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/diagnostic/email/${userIdResponseJson.data.email}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            token: signJwt(
                { email: userIdResponseJson.data.email, role: userIdResponseJson.data.role, username: userIdResponseJson.data.username },
                process.env.NEXT_PUBLIC_JWT_SECRET_KEY,
                360
            ),
        },
    });

    let diagnosticResponseJson = { data: {} };

    if (diagnosticResponse.ok) {
        diagnosticResponseJson = await diagnosticResponse.json();
    }

    // ----------------------------------------

    return {
        props: { user: userResponseJson.data, allDiagnostics: diagnosticResponseJson.data }, // will be passed to the page component as props
    };
}
