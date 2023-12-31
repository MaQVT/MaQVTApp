import { useRouter } from "next/router";
import { isAuthenticated } from "../../utils/auth";
import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "/styles/Home.module.css";
import Layout from "../layout";


export default function LoginPage() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(true);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [color, setColor] = useState("red");

  const resetMail = async (event) => {
    event.preventDefault();
    const res = await fetch("/api/auth/send_reset_mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      const json = await res.json();
      setColor("green")
      setErrorMessage("Merci de consulter votre messagerie, vous y trouverez un email de notre part vous permettant de ré-initialiser votre mot de passe.");
    } else {
      const json = await res.json();
      setColor("red")
      setErrorMessage(json.message);
    }
  };

  useEffect(() => {
    // Redirect the user to his dashboard page if they are authenticated
    if (isAuthenticated()) {
      router.push("/");
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Reinitialisation de mot de passe</title>
         
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className={styles.main}>
        {!loggedIn && (
          <div className="font-PlayfairDisplay px-5">
            <h1 className="font-semibold text-4xl w-[500px] font-Benedict my-4 sm:w-[80%] sm:text-3xl">
            Merci de saisir l’email de votre compte utilisateur afin de ré-initialiser votre mot de passe.
            </h1>
            <input
             className="mb-5 mt-2 h-14 px-5 py-2 rounded block mx-0 w-[500px] focus:outline-none sm:w-[80%]"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={resetMail} className="w-[100px] mb-3">Envoyer</button>
            <br />
            {errorMessage && <p style={{ color: color }}>{errorMessage}</p>}
          </div>
        )}
      </main>
      </Layout>
    </>
  );
}
