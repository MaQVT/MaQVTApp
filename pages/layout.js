import Head from "next/head";
import { Inter } from "@next/font/google";
import { BiGroup, BiLogOutCircle, BiNote, BiUser } from "react-icons/bi";
import { MdManageSearch } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri"
import { unauthenticate } from "../utils/auth";
import { useRouter } from "next/router";
import Footer from "../components/Layout/Footer";

const inter = Inter({ subsets: ["latin"] });

function Layout({ user, children }) {
  console.log("Layout : user -- \n" + user)
  const router = useRouter();
  const logout = () => {
    const currentUrl = router.asPath;
    if (currentUrl == "/testqvt/take_diagnostic_test") {
      const confirmed = window.confirm("Êtes-vous sûr de vouloir quitter la page de Test? Vos réponses au questionnaire ne seront pas enregistrées !!");
      if (confirmed) {
        unauthenticate();
        router.push("/auth/login");
      }
    } else {
      unauthenticate();
      router.push("/auth/login");
    }
  };

  const taketest = () => {
    const currentUrl = router.asPath;
    if (currentUrl == "/testqvt/take_diagnostic_test") {
      const confirmed = window.confirm("Vous vous apprêtez à sortir de votre auto-diagnostic, confirmez-vous votre choix ? Vos réponses au questionnaire ne seront pas enregistrées !!");
      if (confirmed) {
        router.push("/testqvt/take_diagnostic_test");
      }
    } else {
      router.push("/testqvt/take_diagnostic_test");
    }
  };

  const seeresult = () => {
    const currentUrl = router.asPath;
    if (currentUrl == "/testqvt/take_diagnostic_test") {
      const confirmed = window.confirm("Vous vous apprêtez à sortir de votre auto-diagnostic, confirmez-vous votre choix ? Vos réponses au questionnaire ne seront pas enregistrées !!");
      if (confirmed) {
        router.push("/result/perso");
      }
    } else {
      router.push("/result/perso");
    }
  };

  const getusers = async () => {
    const currentUrl = router.asPath;
    if (currentUrl == "/testqvt/take_diagnostic_test") {
      const confirmed = window.confirm("Vous vous apprêtez à sortir de votre auto-diagnostic, confirmez-vous votre choix ? Vos réponses au questionnaire ne seront pas enregistrées !!");
      if (confirmed) {
        router.push("/admin/manage_users_page");
      }
    } else {
      router.push("/admin/manage_users_page");
    }
  };

  const accountPage = async () => {
    const currentUrl = router.asPath;
    if (currentUrl == "/testqvt/take_diagnostic_test") {
      const confirmed = window.confirm("Vous vous apprêtez à sortir de votre auto-diagnostic, confirmez-vous votre choix ? Vos réponses au questionnaire ne seront pas enregistrées !!");
      if (confirmed) {
        router.push("/account_page");
      }
    } else {
      router.push("/account_page");
    }
  };

  const mainPage = () => {
    const currentUrl = router.asPath;
    if (currentUrl == "/testqvt/take_diagnostic_test") {
      const confirmed = window.confirm("Vous vous apprêtez à sortir de votre auto-diagnostic, confirmez-vous votre choix ? Vos réponses au questionnaire ne seront pas enregistrées !!");
      if (confirmed) {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }

  //bg-[url('/backgound.png')]

  return (
    <>
      <Head>
        <title>Accueil</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col min-w-screen min-h-screen items-center relative bg-[url('/backgound.png')] font-PlayfairDisplay">
        <div className="h-[75px] drop-shadow-lg border bg-white w-screen flex flex-row justify-around items-center">
          <div onClick={() => mainPage()}>
            <img
              src="https://www.wunjo.life/wp-content/uploads/2020/12/Logo-Twitter-200x200-1.png"
              alt="Logo Wunjo"
              className="h-14 w-14 rounded-full cursor-pointer"
            />
          </div>
          {user?.email && (
            <button
              title="Se deconnecter"
              className="border rounded-full w-[50px] h-[50px] block mx-2 flex justify-center items-center"
              onClick={logout}
            >
              <BiLogOutCircle size={30} />
            </button>
          )}
          {user?.email && (
            <button
              title="Réaliser un auto-diagnostic QVT personnelle"
              className="border rounded-full w-[50px] h-[50px] flex justify-center items-center"
              onClick={taketest}
            >
              <BiNote size={30} />
            </button>
          )}
          {user?.email && (
            <button
              title="Voir mes résultats QVT personnelle"
              className="border rounded-full w-[50px] h-[50px] flex justify-center items-center"
              onClick={seeresult}
            >
              <MdManageSearch size={30} />
            </button>
          )}
          {user?.role != "User" && user?.role != undefined && (
            <button
              title="Ajouter ou Supprimer des Utilisateurs"
              className="border rounded-full w-[50px] h-[50px] flex justify-center items-center"
              onClick={getusers}
            >
              <RiUserSettingsLine size={30} />
            </button>
          )}
          {user?.email && (
            <button
              title="Modifier mon profil"
              className="border rounded-full w-[50px] h-[50px] flex justify-center items-center"
              onClick={accountPage}
            >
              <BiUser size={30} />
            </button>
          )}
        </div>
        <div className="flex-1 w-full h-full">
          <div className="min-h-[calc(100vh-75px)] w-screen">
            {children}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default Layout;
