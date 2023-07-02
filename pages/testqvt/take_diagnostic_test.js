import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "/styles/Home.module.css";
import MultiStepForm from "../../components/Form/MultiStepForm";
import Layout from "../layout";
import cookies from "next-cookies";
import { verifyJwt } from "../../utils/jwt";
import { useRouter } from "next/router";
import { useEffect } from "react";
import moment from "moment";

const inter = Inter({ subsets: ["latin"] });

function Diagnostic({ user }) {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("nb_access", `${user.nb_access}`)
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Diagnostic QVT</title>
         
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout user={user}>
        <main className={styles.main}>
          {((user.nb_access == -1 && moment(user.expired_date).isAfter(moment(new Date(Date.now())), 'day')) || user.nb_access > 0) && user.authorization && user.status == "valide" ?
            <MultiStepForm /> :
            <div className="sm:text-center p-5">Vous n&apos;avez pas accès au test QVT pour le moment</div>
          }

        </main>
      </Layout>
    </>
  );
}

export default Diagnostic;

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

  return {
    props: { user: userResponseJson.data }, // will be passed to the page component as props
  };
}