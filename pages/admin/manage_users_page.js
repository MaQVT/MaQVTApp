import Head from "next/head";
import { Inter } from "@next/font/google";
import cookies from "next-cookies";
import UserItem from "../../components/Users/UserItem";
import { useState, useEffect } from "react";
import UpdateUser from "../../components/Users/UpdateUser";
import AddUser from "../../components/Users/AddUser";
import { BiArrowBack } from "react-icons/bi";
import { verifyJwt } from "../../utils/jwt";
import { useRouter } from "next/router";
import Layout from "../layout";
import styles from "/styles/Home.module.css";
const inter = Inter({ subsets: ["latin"] });


function ManageUsers({ users, user, scopeId, parent }) {

  const router = useRouter()
  console.log({ users, user, scopeId });
  const [allUsers, setAllUsers] = useState(users)
  const [showModal, setShowModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [updatingUser, setUpdatingUser] = useState({})
  const [rien, setRien] = useState('')
  let roles = ["Admin", "Consultant", "Client", "Manager", "User"]

  useEffect(() => {
    setRien(scopeId)
    console.log("parent")
    console.log(parent)
  }, [scopeId])

  async function handle2MonthFrequenceMailUser(userActual) {
    const token = localStorage.getItem("token");
    const response = await fetch("/api/user/scheduleAutoUserMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token
      },
      body: JSON.stringify({ userId: userActual._id, role: userActual.role, newExpirationDate: userActual.expired_date, email: userActual.email, username: userActual.username }),
    });
    console.log(response.ok)
    if (response.ok) {
      console.log("Email rescheduled")
    }
  }

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
      const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/fils/${scopeId}`, {
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

  async function handleAddUser(formData, scope) {
    const token = localStorage.getItem("token");
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token
      },
      body: JSON.stringify(formData),
    });
    console.log(response.ok)
    if (response.ok) {
      const userJson = await response.json()
      await handle2MonthFrequenceMailUser(userJson.data)
      // If user is deleted successfully, refresh the user list
      const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/fils/${scope._id}`, {
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
      setShowModal(false)

    }
  }

  async function handleUpdateUser(formData, scope) {
    const token = localStorage.getItem("token");
    const response = await fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token
      },
      body: JSON.stringify(formData),
    });
    console.log(response.ok)
    if (response.ok) {
      // If user is deleted successfully, refresh the user list
      const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/fils/${scope._id}`, {
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
      setShowUpdateModal(false)

    }
  }

  function haveRightAdd(role) {
    switch (role) {
      case "Admin":
        return ["Admin", "Consultant"]
        break;
      case "Consultant":
        return ["Client", "User"]
        break;
      case "Client":
        return ["Manager"]
        break;
      case "Manager":
        return ["User"]
        break;
      default:
        return []
        break;
    }
  }

  function handleUpdateModal(user) {
    setUpdatingUser(user)
    setShowUpdateModal(true)
  }

  function haveRightToSee(role) {
    return role != "User"
  }

  function getBack() {
    router.back()
  }

  return (
    <>
      <Head>
        <title>Manager les Utilisateurs</title>
         
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout user={user}>
        {
          user.role != "User" ?

            <main className={`${styles.main} flex-col pt-5`} key={scopeId} style={{ justifyContent: "flex-start" }}>
              <div className="flex flex-row justify-between items-center w-[90%]">
                <button
                  title="Retouner en arrière"
                  className="border rounded-full w-[80px] h-[80px] flex justify-center items-center sm:h-[40px] sm:w-[40px] sm:text-xs"
                  onClick={getBack}
                >
                  <BiArrowBack size={30} />
                </button>
                {users[0] && <h1 className="font-semibold font-AnticDidone text-3xl p-2 text-center md:text-left md:text-lg sm:text-center">Superviser les utilisateurs sous {parent.role} : {parent.username}</h1>}                
                {user.role != "User" &&
                  <div>
                    <button className="sm:text-xs" onClick={() => setShowModal(true)}>Ajouter un nouvel utilisateur</button>
                  </div>
                }
              </div>


              {haveRightToSee(user.role) &&
                <ul className="list-none  m-4 p-5 grid grid-cols-4 gap-4 w-full h-max md:flex-wrap md:flex md:items-center md:justify-around">
                  {
                    allUsers.length ? allUsers.map((value, index) => {
                      if(value.ask_delete == true && user.role != "Admin"){
                        return
                      }else{
                       return <UserItem user={value} handleUpdateModal={handleUpdateModal} key={index} parent={parent} handleDeleteUser={handleDeleteUser} parentRole={user.role} toValid={false} toDelete={false} />
                      }
                    })
                      : <div className="text-center w-[95vw]">Il n&apos;y a rien à afficher</div>
                  }
                </ul>
              }

              {showUpdateModal ? (
                <>
                  <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                  >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-2 px-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            Modifier un Utilisateur
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowUpdateModal(false)}
                          >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                              ×
                            </span>
                          </button>
                        </div>
                        {/*body*/}
                        <div className="relative flex-auto">
                          <UpdateUser user={updatingUser} handleUpdateUser={handleUpdateUser} parent={parent} />
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-2 px-5 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowUpdateModal(false)}
                          >
                            Fermer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}

              {showModal ? (
                <>
                  <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                  >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-2 px-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            Ajouter un Utilisateur
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                          >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                              ×
                            </span>
                          </button>
                        </div>
                        {/*body*/}
                        <div className="relative flex-auto">
                          <AddUser handleAddUser={handleAddUser} parent_id={parent._id || ""} user={user} parent={parent} roles={parent.role ? haveRightAdd(parent.role) : []} />
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-2 px-5 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Fermer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}

            </main>
            :
            <div className={styles.main}>Page innaccessible à votre statut</div>
        }
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  let { user, username } = context.query
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

  if (user == undefined) {
    user = userResponseJson.data._id
  }

  const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/fils/${user}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });

  const parentResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/parent/${user}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });

  let parentResponseJson = { data: {} };
  if (parentResponse.ok) {
    parentResponseJson = await parentResponse.json();
  }

  let usersResponseJson = { data: [] };

  if (usersResponse.ok) {
    const lune = await usersResponse.json()
    if ((JSON.stringify(lune.data) != '{}')) {
      usersResponseJson = lune
    }
  }

  return {
    props: { users: usersResponseJson.data, user: userResponseJson.data, scopeId: user, parent: parentResponseJson.data }, // will be passed to the page component as props
  };
}

export default ManageUsers;