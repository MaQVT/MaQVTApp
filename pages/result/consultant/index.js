import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from "/styles/Home.module.css";
import Layout from '../../layout';
import cookies from 'next-cookies';
import { verifyJwt } from '../../../utils/jwt';
import Head from 'next/head';
import { getParentEmails, getUsersByParents } from '../../../db/handlers/users_handlers';
import { getAllDiagnosticsSharedDistinctEmail } from '../../../db/handlers/diagnostic_handlers';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/router';

function History({ user, allUsersJSON, sharedUsersJSON }) {
    const router = useRouter()
    const [allUsers, setAllUsers] = useState([])
    const [sharedUsers, setSharedUsers] = useState([])

    useEffect(() => {
        setAllUsers(JSON.parse(allUsersJSON))
        setSharedUsers(JSON.parse(sharedUsersJSON))
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
                            <div className='flex flex-row justify-between items-center w-[80%] m-auto'>
                                <button
                                    title="Retourner en arrière"
                                    className="border rounded-full w-[80px] h-[80px] flex justify-center items-center sm:w-[40px] sm:h-[40px]"
                                    onClick={() => router.back()}
                                >
                                    <BiArrowBack size={30} />
                                </button>
                                <h1 className='text-center text-2xl my-5'>Liste des Utilisateurs</h1>
                            </div>
                            <hr />
                            <table className='w-[80%] m-auto my-6 sm:text-[10px] md:w-[95%]'>
                                <thead>
                                    <tr>
                                        <th>N°</th>
                                        <th>Nom d&apos;Utilisateur</th>
                                        <th className='sm:hidden'>Email</th>
                                        <th>Rôle</th>
                                        <th>Action</th>
                                        <th></th>
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
                                                {
                                                    sharedUsers.includes(user.email) &&
                                                    <Link href={`/result/consultant/user/${user._id}`} className='bg-white rounded-full px-5 py-1 my-2 hover:bg-neutral-500 sm:inline-block'>
                                                        Consulter les rapports individuels
                                                    </Link>
                                                }
                                            </td>
                                            <td className='text-center h-[40px]'>
                                                {user.role != "User" &&
                                                    <Link
                                                        href={{
                                                            pathname: '/result/consultant',
                                                            query: { user: user._id }
                                                        }}
                                                        className={`font-Trocchi bg-slate-300 px-3 py-2 rounded-md mb-2 cursor-pointer hover:bg-slate-400`}>
                                                        {"Entrer"}
                                                    </Link>
                                                }
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
    let { user } = context.query
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

    if (user == undefined || user.trim() == "") {
        user = userResponseJson.data._id
    }

    const childrens = await getUsersByParents(user);

    const uniqueEmails = await getAllDiagnosticsSharedDistinctEmail();
    console.log(uniqueEmails)
    const parentLevel1Emails = await getParentEmails(uniqueEmails);
    console.log(parentLevel1Emails)
    const parentLevel2Emails = await getParentEmails(parentLevel1Emails);
    console.log(parentLevel2Emails)
    const parentLevel3Emails = await getParentEmails(parentLevel2Emails);
    console.log(parentLevel3Emails)

    const valideEmails = [...uniqueEmails, ...parentLevel1Emails, ...parentLevel2Emails, ...parentLevel3Emails]

    const valideUsers = childrens.filter((child, index) => valideEmails.includes(child.email));


    return {
        props: { user: userResponseJson.data, allUsersJSON: JSON.stringify(valideUsers), sharedUsersJSON: JSON.stringify(uniqueEmails) },
    };
}
