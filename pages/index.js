import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "/styles/Home.module.css";
import { unauthenticate } from "../utils/auth";
import { useRouter } from "next/router";
import cookies from "next-cookies";
import Layout from "./layout";
import { verifyJwt } from "../utils/jwt";
import Link from "next/link";
import { isDiagnosticExists } from "../db/handlers/diagnostic_handlers";

const inter = Inter({ subsets: ["latin"] });

function Home({ user, hasDoneQVT }) {
  const router = useRouter();

  const accederTest = () => {
    router.push("/testqvt/take_diagnostic_test");
  };
  const accederResultat = () => {
    router.push("/result/perso");
  };
  const accederFAQ = () => {
    router.push("/faq");
  };
  const accederProfil = () => {
    router.push("/account_page");
  };
  const accederSuperviser = () => {
    router.push("/admin/manage_users_page");
  };
  const accederStats = () => {
    router.push("/stat");
  };
  const accederCollective = () => {
    router.push("/result/consultant/manager");
  };
  const accederPartages = () => {
    router.push("/result/consultant");
  };
  const accederInvalide = () => {
    router.push("/admin/invalid_users");
  };
  const accederSupprimer = () => {
    router.push("/admin/delete_users");
  };

  // console.log(user)
  return (
    <>
      <Head>
        <title>Accueil</title>
         
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user.email && (
        <Layout user={user}>
          <main className={styles.main}>
            <div className="w-full h-full flex justify-center items-center py-5 flex-col">
              <p className="text-2xl text-center font-thin font-PlayfairDisplay md:px-4 px-10">
              {(user.role == "Consultant" || user.role == "Admin" || user.role == "Client" || user.role == "Manager") && <>Bienvenue, {user.username}, dans votre espace {user.role} de la Webapplication MA QVT. <br /></>}
              {(user.role == "User") && <>Bienvenue, {user.username}, dans votre espace personnel dédié à votre Qualité de Vie au Travail. <br /></>}
              {(hasDoneQVT == false && (user.role == "User" || user.role == "Manager")) && <><br />L’accès à votre auto-diagnostic de QVT personnelle sera activé prochainement par votre consultante, dans l’optique de votre 1ère passation qui se réalise de manière guidée. Par la suite, vous pourrez réaliser des passations autonomes et consulter l’historique de vos rapports QVT dans le menu. <br /></>}
              {(hasDoneQVT && (user.role == "User" || user.role == "Manager")) && <><br />Vous pouvez réaliser des auto-diagnostics de QVT personnelle en toute autonomie, et consulter l’historique de vos rapports de QVT personnelle. <br /></>}

              </p>
              <div className="flex w-full justify-center flex-wrap mt-10 gap-5">
                {/* {(user.role == "User" || user.role == "Manager" || user.role == "") &&
                  <button onClick={() => { accederTest() }} className="w-[150px] h-[150px] drop-shadow-lg border bg-white text-black hover:text-white">Réaliser un auto-diagnostic QVT personnelle</button>
                }
                {(user.role == "User" || user.role == "Manager" || user.role == "") &&
                  <button onClick={() => { accederResultat() }} className="w-[150px] h-[150px] drop-shadow-lg border bg-white text-black hover:text-white">Consulter mes rapports QVT personnelle</button>
                } */}
                { user.role != "User" && <button onClick={() => { accederFAQ() }} className="w-[150px] h-[150px] drop-shadow-lg border bg-white text-black hover:text-white">Accéder à la FAQ</button>}
                {/* <button onClick={() => { accederProfil() }} className="w-[150px] h-[150px] drop-shadow-lg border bg-white text-black hover:text-white">Modifier mon Profil</button> */}
                {/* {user.role != "User" &&
                  <button onClick={() => { accederSuperviser() }} className="w-[150px] h-[150px] drop-shadow-lg border bg-white text-black hover:text-white">Superviser les Utilisateurs</button>
                } */}
                {(user.role == "Consultant" || user.role == "Client" || user.role == "Admin") &&
                  <button onClick={() => { accederStats() }} className="w-[150px] h-[150px] drop-shadow-lg border bg-white text-black hover:text-white">Consulter les statistiques</button>
                }
                {(user.role == "Consultant" || user.role == "") &&
                  <button onClick={() => { accederCollective() }} className="w-[150px] h-[150px] drop-shadow-lg border bg-white text-black hover:text-white">Voir ou créer des rapports collectifs</button>
                }
                {(user.role == "Consultant" || user.role == "Admin" || user.role == "") &&
                  <button onClick={() => { accederPartages() }} className="w-[150px] h-[150px] drop-shadow-lg border bg-white text-black hover:text-white">Voir les rapports individuels partagés</button>
                }
                {user.role == "Admin" &&
                  <button onClick={() => { accederInvalide() }} className="w-[150px] h-[150px] drop-shadow-lg border bg-white text-black hover:text-white">Voir les Utilisateurs non validés</button>
                }
                {user.role == "Admin" &&
                  <button onClick={() => { accederSupprimer() }} className="w-[150px] h-[150px] drop-shadow-lg border bg-white text-black hover:text-white">Voir les demandes de suppression</button>
                }
                {/* {user.role == "Admin" &&
                  <button onClick={() => { deleteDiagnostics() }} className="w-[150px] h-[150px] drop-shadow-lg border bg-red-400 text-black hover:text-white">Réïnitialiser les Statistiques</button>
                } */}
              </div>
            </div>
          </main>
        </Layout>
      )}
    </>
  );
}
export async function getServerSideProps(context) {
  const token = cookies(context).token;
  const email = verifyJwt(token) != null ? verifyJwt(token).email : "nomail";
  // console.log(email)

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

  const hasDoneQVT = await isDiagnosticExists(email);

  return {
    props: { user: userResponseJson.data, hasDoneQVT }, // will be passed to the page component as props
  };
}

export default Home;
