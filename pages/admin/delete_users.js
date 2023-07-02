import { useState, useEffect } from "react";
import cookies from "next-cookies";
import Head from "next/head";
import { Inter } from "@next/font/google";
import UserItem from "../../components/Users/UserItem";
import { verifyJwt } from "../../utils/jwt";
import Layout from "../layout";
import styles from "/styles/Home.module.css";
const inter = Inter({ subsets: ["latin"] });

function DeletedUsers({ user, users }) {
  const [allUsers, setAllUsers] = useState(users)

  async function handleDeleteUser(id) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/id/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      // body: JSON.stringify({_id: id})
    });
    if (response.ok) {
      // If user is deleted successfully, refresh the user list
      const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/delete/true`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      let usersResponseJson = { data: {} };
      if (usersResponse.ok) {
        usersResponseJson = await usersResponse.json();
      }
      setAllUsers(usersResponseJson.data);
    }
  }
  async function handleCancelUser(id) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/id/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ask_delete: false})
    });
    if (response.ok) {
      // If user is deleted successfully, refresh the user list
      const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/delete/true`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      let usersResponseJson = { data: {} };
      if (usersResponse.ok) {
        usersResponseJson = await usersResponse.json();
      }
      setAllUsers(usersResponseJson.data);
    }
  }

  return (
    <>
      <Head>
        <title>Utilisateurs à Supprimer</title>
         
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout user={user}>
        {
          user.role == "Admin" ?
            <main className={`${styles.main} flex-col pt-5`} style={{ justifyContent: "flex-start" }}>
              <h1 className="font-semibold font-AnticDidone text-3xl p-2 text-center w-full">Liste des demandes de suppression d&apos;Utilisateurs </h1>
              {/* <ul className="list-none  m-4 p-5 grid grid-cols-4 gap-4 w-full h-max md:flex-wrap md:flex md:items-center md:justify-around">
                {
                  allUsers.length ? allUsers.map((value, index) => <UserItem user={value} key={index} parentRole={user.role} handleDeleteUser={handleDeleteUser} toValid={false} toDelete={true} />)
                    : <div className="text-center w-[95vw]">Il n&apos;y a rien à afficher</div>
                }
              </ul> */}
              <table className='w-[80%] m-auto my-6 sm:text-[10px] md:w-[95%]'>
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>Nom d&apos;Utilisateur</th>
                    <th className='sm:hidden'>Email</th>
                    <th>Rôle</th>
                    <th>Action N°1</th>
                    <th>Action N°2</th>
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
                        <span
                          onClick={() => handleDeleteUser(user._id)}
                          title="Confirmer la suppression de l'utilisateur"
                          className="text-red-500 text-base bg-white rounded-full px-5 py-1 my-2 hover:bg-red-500 hover:text-white cursor-pointer font-bold"
                        >Confirmer</span>
                      </td>
                      <td className='text-center h-[40px]'>
                        <span
                          onClick={() => handleCancelUser(user._id)}
                          title="Annuler la suppression de l'utilisateur"
                          className="text-stone-600 text-base bg-white rounded-full px-5 py-1 my-2 hover:bg-neutral-500 hover:text-white cursor-pointer font-bold"
                        >Annuler</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </main>
            :
            <div className={styles.main}>Page inaccessible à votre statut</div>
        }
      </Layout>
    </>
  );
}
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

  const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/delete/true`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });
  let usersResponseJson = { data: {} };
  if (usersResponse.ok) {
    usersResponseJson = await usersResponse.json();
  }
  return {
    props: { user: userResponseJson.data, users: usersResponseJson.data }, // will be passed to the page component as props
  };
}

export default DeletedUsers