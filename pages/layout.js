import Head from "next/head";
import { Inter } from "@next/font/google";
import { BiLogOutCircle, BiNote, BiUser, BiXCircle } from "react-icons/bi";
import { MdManageSearch } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri"
import { FaQuestion } from "react-icons/fa"
import { unauthenticate } from "../utils/auth";
import { useRouter } from "next/router";
import Footer from "../components/Layout/Footer";
import { verifyJwt } from "../utils/jwt";
import { useEffect, useState } from "react";
import Loading from "../components/Layout/Loading";

const inter = Inter({ subsets: ["latin"] });

function Layout({ user, children }) {
  // console.log("Layout : user -- \n" + user)
  const router = useRouter();

  function superviserSous(role) {
    switch (role) {
      case "Admin":
        return "comptes"
        break;
      case "Consultant":
        return "comptes"
        break;
      case "Client":
        return "managers"
        break;
      case "Manager":
        return "utilisateurs"
        break;
      default:
        return ""
        break;
    }
  }

  const logout = async () => {
    const currentUrl = router.asPath;
    if (currentUrl == "/testqvt/take_diagnostic_test") {
      const confirmed = window.confirm("Vous vous apprêtez à sortir de votre auto-diagnostic, confirmez-vous votre choix ? Vos réponses au questionnaire ne seront pas enregistrées.");
      if (confirmed) {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: "",
        });
        unauthenticate();
        router.push("/auth/login");
      }
    } else {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: "",
      });
      unauthenticate();
      router.push("/auth/login");
    }
  };

  const taketest = () => {
    const currentUrl = router.asPath;
    if (currentUrl == "/testqvt/take_diagnostic_test") {
      const confirmed = window.confirm("Vous vous apprêtez à sortir de votre auto-diagnostic, confirmez-vous votre choix ? Vos réponses au questionnaire ne seront pas enregistrées.");
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
      const confirmed = window.confirm("Vous vous apprêtez à sortir de votre auto-diagnostic, confirmez-vous votre choix ? Vos réponses au questionnaire ne seront pas enregistrées.");
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
      const confirmed = window.confirm("Vous vous apprêtez à sortir de votre auto-diagnostic, confirmez-vous votre choix ? Vos réponses au questionnaire ne seront pas enregistrées.");
      if (confirmed) {
        router.push("/admin/manage_users_page");
      }
    } else {
      router.push("/admin/manage_users_page");
    }
  };

  const getInvalidUsers = async () => {
    const currentUrl = router.asPath;
    if (currentUrl == "/testqvt/take_diagnostic_test") {
      const confirmed = window.confirm("Vous vous apprêtez à sortir de votre auto-diagnostic, confirmez-vous votre choix ? Vos réponses au questionnaire ne seront pas enregistrées.");
      if (confirmed) {
        router.push({
          pathname: '/admin/invalid_users',
        }, '/admin/invalid_users');
      }
    } else {
      router.push({
        pathname: '/admin/invalid_users',
      }, '/admin/invalid_users');
    }
  };

  const accountPage = async () => {
    const currentUrl = router.asPath;
    if (currentUrl == "/testqvt/take_diagnostic_test") {
      const confirmed = window.confirm("Vous vous apprêtez à sortir de votre auto-diagnostic, confirmez-vous votre choix ? Vos réponses au questionnaire ne seront pas enregistrées.");
      if (confirmed) {
        router.push("/account_page");
      }
    } else {
      router.push("/account_page");
    }
  };

  const accederFAQ = async () => {
    const currentUrl = router.asPath;
    if (currentUrl == "/testqvt/take_diagnostic_test") {
      const confirmed = window.confirm("Vous vous apprêtez à sortir de votre auto-diagnostic, confirmez-vous votre choix ? Vos réponses au questionnaire ne seront pas enregistrées.");
      if (confirmed) {
        router.push("/faq");
      }
    } else {
      router.push("/faq");
    }
  };

  const mainPage = () => {
    const token = localStorage.getItem("token");
    const email = verifyJwt(token) != null ? verifyJwt(token).email : "nomail";
    if (email == "nomail") {
      window.open("/auth/login", "_parent")
    } else {
      const currentUrl = router.asPath;
      if (currentUrl == "/testqvt/take_diagnostic_test") {
        const confirmed = window.confirm("Vous vous apprêtez à sortir de votre auto-diagnostic, confirmez-vous votre choix ? Vos réponses au questionnaire ne seront pas enregistrées.");
        if (confirmed) {
          router.push("/");
        }
      } else {
        router.push("/");
      }
    }
  }

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  //bg-[url('/backgound.png')]

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Application Web MaQVT" />
        <meta name="keywords" content="MaQVT, QVT, Wunjo, Qualité, Vie, Travail, Application, WebApp, Wunjo QVT, WunjoQVT, Diagnostics" />
        <link rel="canonical" href="https://www.maqvt.com" />
        <meta property="og:title" content="Web App MaQVT" />
        <meta property="og:description" content="Application Web MaQVT" />
        <meta property="og:image" content="https://www.maqvt.com/logo.png" />
        <meta property="og:url" content="https://www.maqvt.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col min-w-screen min-h-screen items-center relative bg-[#F5EBE5] font-PlayfairDisplay">
        <div className="h-[75px] drop-shadow-lg border bg-white w-full flex flex-row justify-around items-center">
          <div onClick={() => mainPage()}>
            <img
              src="/logo.png"
              alt="Logo Wunjo"
              className="h-14 w-14 rounded-full cursor-pointer"
              title="Retour accueil"
            />
          </div>
          {user?.email && (user?.role == "User" || user?.role == "Manager") && (
            <button
              title="Réaliser un auto-diagnostic QVT personnelle"
              className="border rounded-full w-[50px] h-[50px] flex justify-center items-center"
              onClick={taketest}
            >
              <BiNote size={30} />
            </button>
          )}
          {user?.email && (user?.role == "User" || user?.role == "Manager") && (
            <button
              title="Consulter l’historique de mes rapports"
              className="border rounded-full w-[50px] h-[50px] flex justify-center items-center"
              onClick={seeresult}
            >
              <MdManageSearch size={30} />
            </button>
          )}
          {user?.role != "User" && user?.role != undefined && (
            <button
              title={`Superviser les ${superviserSous(user.role)}`}
              className="border rounded-full w-[50px] h-[50px] flex justify-center items-center"
              onClick={getusers}
            >
              <RiUserSettingsLine size={30} />
            </button>
          )}
          {(user?.role == "Never") && (
            <button
              title="Voir les Utilisateurs non validés"
              className="border rounded-full w-[50px] h-[50px] flex justify-center items-center"
              onClick={getInvalidUsers}
            >
              <BiXCircle size={30} />
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

          {(user?.role == "User") && (
            <button
              title="Acceder à la FAQ"
              className="border rounded-full w-[50px] h-[50px] flex justify-center items-center"
              onClick={accederFAQ}
            >
              <FaQuestion size={30} />
            </button>
          )}

          {user?.email && (
            <button
              title="Se deconnecter"
              className="border rounded-full w-[50px] h-[50px] block mx-2 flex justify-center items-center"
              onClick={logout}
            >
              <BiLogOutCircle size={30} />
            </button>
          )}
        </div>
        <div className="flex-1 w-full h-full">
          <div className="min-h-[calc(100vh-75px)] w-full">
            {isLoading && <Loading />} {/* Render the loading component when isLoading is true */}
            {children}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default Layout;