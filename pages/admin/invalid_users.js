import { useState, useEffect } from "react";
import cookies from "next-cookies";
import Head from "next/head";
import { Inter } from "@next/font/google";
import UserItem from "../../components/Users/UserItem";
import { verifyJwt } from "../../utils/jwt";
import Layout from "../layout";
import styles from "/styles/Home.module.css";
const inter = Inter({ subsets: ["latin"] });
function InvalidUsers({ user, users }) {
  const [allUsers, setAllUsers] = useState(users)

  return (
    <>
      <Head>
        <title>Utilisateurs non validés</title>
         
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout user={user}>
        {
          user.role == "Admin" ?
            <main className={`${styles.main} flex-col pt-5`} style={{ justifyContent: "flex-start" }}>
              <h1 className="font-semibold font-AnticDidone text-3xl p-2 text-center w-full">Liste des Utilisateurs non validés</h1>
              <ul className="list-none  m-4 p-5 grid grid-cols-4 gap-4 w-full h-max md:flex-wrap md:flex md:items-center md:justify-around">
                {
                  allUsers.length ? allUsers.map((value, index) => <UserItem user={value} key={index} parentRole={user.role} toValid={true} />)
                    : <div className="text-center w-[95vw]">Il n&apos;y a rien à afficher</div>
                }
              </ul>
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

  const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/status/invalide`, {
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

export default InvalidUsers