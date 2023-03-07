import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "/styles/Home.module.css";
import { unauthenticate } from "../utils/auth";
import { useRouter } from "next/router";
import cookies from "next-cookies";

const inter = Inter({ subsets: ["latin"] });

function Home({ user }) {
  const router = useRouter();
  const logout = () => {
    unauthenticate();
    router.push("/login");
  };

  const taketest = () => {
    router.push("/take_diagnostic_test");
  };

  const getusers = async () => {
    router.push("/admin/manage_users");
  };

  console.log(user)
  return (
    <>
      <Head>
        <title>Accueil</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <main className={styles.main}>
          <button onClick={logout}>Se Deconnecter</button>
          <button onClick={taketest}>Faire l&apos;auto diagnostic QVT</button>
          {user.role == "Admin" && (
            <button onClick={getusers}>
              Ajouter ou Supprimer des utilisateurs
            </button>
          )}
        </main>
      )}
    </>
  );
}
export async function getServerSideProps(context) {
  const token = cookies(context).token;

  const userResponse = await fetch("http://localhost:3000/api/user", {
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

  return {
    props: { user: userResponseJson.data }, // will be passed to the page component as props
  };
}

export default Home;
