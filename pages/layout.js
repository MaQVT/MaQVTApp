import Head from "next/head";
import { Inter } from "@next/font/google";
import { BiGroup, BiLogOutCircle, BiNote, BiUser } from "react-icons/bi";
import { unauthenticate } from "../utils/auth";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

function Layout({ user, children }) {
  console.log("Layout : user -- \n" + user)
  const router = useRouter();
  const logout = () => {
    unauthenticate();
    router.push("/auth/login");
  };

  const taketest = () => {
    router.push("/testqvt/take_diagnostic_test");
  };

  const getusers = async () => {
    router.push({
      pathname: '/admin/manage_users_page',
      query: {
        user:user._id,
        username:user.username,
       }
    },'/admin/manage_users_page');
    //router.push("/admin/manage_users_page");
  };

  const getAccount = () =>{
    router.push("/account_page")
  }

  return (
    <>
      <Head>
        <title>Accueil</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user?.email && (
        <main className="flex flex-col w-screen h-screen items-center relative bg-[url('/backgound.png')]">
          <div className="grow w-full h-full">{{ ...children }}</div>
          <div className="h-[100px] z-40 drop-shadow-lg border bg-white rounded-full w-[500px] flex flex-row justify-center items-center mb-5 absolute bottom-5">
            <button
              title="Se deconnecter"
              className="border rounded-full w-[80px] h-[80px] block mx-2 flex justify-center items-center"
              onClick={logout}
            >
              <BiLogOutCircle size={30} />
            </button>
            <button
              title="Faire le Test QVT"
              className="border rounded-full w-[80px] h-[80px] flex justify-center items-center"
              onClick={taketest}
            >
              <BiNote size={30} />
            </button>
            {user?.role =="Admin"  && (
              <button
                title="Ajouter ou Supprimer des Utilisateurs"
                className="border rounded-full w-[80px] h-[80px] flex justify-center items-center"
                onClick={getusers}
              >
                <BiGroup size={30} />
              </button>
            )}
            
              <button
                title="Ajouter ou Supprimer des Utilisateurs"
                className="border rounded-full w-[80px] h-[80px] flex justify-center items-center"
                onClick={getAccount}
              >
                <BiUser size={30} />
              </button>
          </div>
        </main>
      )}
    </>
  );
}

export default Layout;
