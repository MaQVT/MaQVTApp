import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from "/styles/Home.module.css";
import Layout from '../../layout';
import cookies from 'next-cookies';
import { verifyJwt } from '../../../utils/jwt';
import Head from 'next/head';
import { getAllUsers, getUsersByParents } from '../../../db/handlers/users_handlers';

function History({ user, allUsersJSON }) {
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        setAllUsers(JSON.parse(allUsersJSON))
    }, [])

    return (
        <>
            <Head>
                <title>Rapports individuels partagés</title>
                 
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout user={user}>
                {(user.role == "Consultant" || user.role == "Admin") &&
                    <main className={`${styles.main} flex-col pt-5`} style={{ justifyContent: "flex-start" }}>
                        <div className='w-full flex flex-col items-center'>
                            <h1 className='text-center text-2xl my-5'>Liste des Utilisateurs</h1>
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
                                            <td className='text-center'>{user.role == "User" ? "Utilisateur" : user.role}</td>
                                            <td className='text-center h-[40px]'>
                                                <Link href={`/result/consultant/user/${user._id}`} className='bg-white rounded-full px-5 py-1 my-2 hover:bg-neutral-500 sm:inline-block'>
                                                    Voir les détails de l&apos;Utilisateur
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

    const allUsersResponse = await getAllUsers()
    const clientsResponse = await getUsersByParents(userResponseJson.data._id)
    const clientsId = clientsResponse.map((value, index) => value._id.toString())
    const consultantDirectUser = clientsResponse.filter((value, index) => value.role == "User").map((value, index) => value._id.toString())
    const managersResponse = allUsersResponse.filter((value, index) => clientsId.includes(value.parentId)).map((value, index) => value._id.toString())
    const usersResponse = allUsersResponse.filter((value, index) => managersResponse.includes(value.parentId)).map((value, index) => value._id.toString())
    const mesId = [...usersResponse, ...managersResponse, ...consultantDirectUser]
    const allUsers = allUsersResponse.filter((value, index) => mesId.includes(value._id.toString()))

    return {
        props: { user: userResponseJson.data, allUsersJSON: JSON.stringify(allUsers) }, // will be passed to the page component as props
    };
}
