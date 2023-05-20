import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from "/styles/Home.module.css";
import Layout from '../../layout';
import cookies from 'next-cookies';
import { verifyJwt } from '../../../utils/jwt';

function History({ user, allUsers }) {
    return (
        <Layout user={user}>
            <main className={`${styles.main} flex-col pt-5`} style={{justifyContent: "flex-start"}}>
                <div className='w-full'>
                    <h1 className='text-center text-2xl my-5'>Historique des Utilisateurs</h1>
                    <hr />
                    <table className='w-[80%] m-auto my-6'>
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Nom d&apos;Utilisateur</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <td className='text-center'>{index + 1}</td>
                                    <td className='text-center'>{user.username}</td>
                                    <td className='text-center'>{user.email}</td>
                                    <td className='text-center h-[40px]'>
                                        <Link href={`/result/consultant/user/${user._id}`} className='bg-white rounded-full px-5 py-1 my-2 hover:bg-neutral-500'>
                                            View User
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

    const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            token: token,
        },
    });

    let usersResponseJson = { data: [] };

    if (usersResponse.ok) {
        usersResponseJson = await usersResponse.json();
    }

    console.log(usersResponseJson.data)

    return {
        props: { user: userResponseJson.data, allUsers: usersResponseJson.data }, // will be passed to the page component as props
    };
}
