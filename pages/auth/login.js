import { useRouter } from "next/router";
import LoginForm from "../../components/Login/LoginForm";
import { isAuthenticated } from "../../utils/auth";
import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "/styles/Home.module.css";
import Layout from "../layout";


export default function LoginPage() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    // Redirect the user to the login page if they are not authenticated
    if (isAuthenticated()) {
      router.push("/");
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Connexion</title>
         
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className={styles.main}>
          {!loggedIn && (
            <div className="w-full h-full flex flex-col justify-center items-center font-PlayfairDisplay">
              <h1 className="font-semibold text-6xl font-MoonTime mb-4 sm:text-5xl">Se connecter</h1>
              <LoginForm />
            </div>
          )}
        </main>
      </Layout>
    </>
  );
}
