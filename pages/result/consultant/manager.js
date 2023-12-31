import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from "/styles/Home.module.css";
import Layout from '../../layout';
import cookies from 'next-cookies';
import { verifyJwt } from '../../../utils/jwt';
import Head from 'next/head';
import {  getAllEmailsUnderUser, getAllUsersByRole } from '../../../db/handlers/users_handlers';

function History({ user, allUsersJSON }) {
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        setAllUsers(JSON.parse(allUsersJSON))
    }, [])

    return (
        <>
            <Head>
                <title>Rapports collectifs</title>
                 
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout user={user}>
                {(user.role == "Consultant" || user.role == "Admin") &&
                    <main className={`${styles.main} flex-col pt-5`} style={{ justifyContent: "flex-start" }}>
                        <div className='w-full flex flex-col items-center'>
                            <h1 className='text-center text-2xl my-5'>Historique des Managers</h1>
                            <hr />
                            <table className='w-[80%] m-auto my-6 sm:text-[10px] md:w-[95%]'>
                                <thead>
                                    <tr>
                                        <th>N°</th>
                                        <th>Nom d&apos;Utilisateur</th>
                                        <th className='sm:hidden'>Email</th>
                                        <th>Rôle</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allUsers.map((user, index) => (
                                        <tr key={user._id}>
                                            <td className='text-center'>{index + 1}</td>
                                            <td className='text-center'>{user.username}</td>
                                            <td className='text-center sm:hidden'>{user.email}</td>
                                            <td className='text-center'>{user.role}</td>
                                            <td className='text-center h-[40px]'>
                                                <Link href={`/result/collective?id_m=${user._id}`} className='bg-white rounded-full px-5 py-1 my-2 hover:bg-neutral-500 sm:inline-block'>
                                                    Voir ou créer une QVT Collective de ce Manager
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                }
            </Layout>
        </>
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

    const allManagers = await getAllUsersByRole("Manager")
    const allowUsers = await getAllEmailsUnderUser(userResponseJson.data._id)
    const allUsers = allManagers.filter((value) => allowUsers.includes(value.email))

    return {
        props: { user: userResponseJson.data, allUsersJSON: JSON.stringify(allUsers) }, // will be passed to the page component as props
    };
}
