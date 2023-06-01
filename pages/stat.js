import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "/styles/Home.module.css";
import { unauthenticate } from "../utils/auth";
import { useRouter } from "next/router";
import cookies from "next-cookies";
import Layout from "./layout";
import { verifyJwt } from "../utils/jwt";
import { getAllDiagnostics } from "../db/handlers/diagnostic_handlers";
import { getAllClients, getAllManagers, getAllUsersByRole } from "../db/handlers/users_handlers";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import AskSubForm from "../components/Form/AskSubscription";
import { getCron2MonthsAgoSchedule } from "../utils/otherFunctions";


const inter = Inter({ subsets: ["latin"] });

function Home({ user, diagnostics, clients, managers, users }) {
  const router = useRouter();
  const logout = () => {
    unauthenticate();
    router.push("/auth/login");
  };

  const [allDiagnostics, setAllDiagnostics] = useState([])
  const [allClients, setAllClients] = useState([])
  const [allManagers, setAllManagers] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [stats, setStats] = useState([])

  useEffect(() => {
    // console.log(user)
    // console.log(JSON.parse(diagnostics))
    // console.log(JSON.parse(clients))
    // console.log(JSON.parse(managers))
    // console.log(JSON.parse(users))
    setAllDiagnostics(JSON.parse(diagnostics))
    setAllClients(JSON.parse(clients))
    setAllManagers(JSON.parse(managers))
    setAllUsers(JSON.parse(users))
  }, [])

  function analyzeRatings(ratings) {
    let ratingCount = {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "mean": 0
    };

    ratings.forEach((rating) => {
      if (rating >= 1 && rating <= 5) {
        ratingCount[rating.toString()]++;
      }
    });

    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    const mean = sum / ratings.length;

    ratingCount.mean = ratings.length > 0 ? mean : 0;

    return ratingCount;
  }

  const getHr = () => {
    return <div className="w-[50%]"><hr className="border-gray-300" /></div>
  }

  const getRatingGraphics = (data) => {
    const ratings = analyzeRatings(data["rating"])
    const name = data["username"]
    const role = data["role"]

    return <div className='flex justify-center sm:flex-col'>
      <div className='flex flex-col-reverse items-center justify-center m-5 w-80'>
        {role == "Client" && <span>Client <span className="font-bold text-2xl ml-5">{name}</span></span>}
        {role == "Manager" && <span className="ml-5">Equipe <span className="font-bold text-2xl ml-5">{name}</span></span>}
        {role == "" && <span className="ml-5"><span className="font-bold text-2xl ml-5">{name}</span></span>}
      </div>
      <div className="flex justify-center items-center sm:w-full">
        <div className='flex flex-col-reverse items-center justify-center'>
          <span>{ratings["1"]}</span>
          <label htmlFor="rating-1">
            <FontAwesomeIcon
              icon={faStar}
              style={{ fontSize: 40, color: "#C81F2A" }}
            />
          </label>
        </div>
        <div className='flex flex-col-reverse items-center justify-center'>
          <span>{ratings["2"]}</span>
          <label htmlFor="rating-2">
            <FontAwesomeIcon
              icon={faStar}
              style={{ fontSize: 40, color: "#F4912E" }}
            />
          </label>
        </div>
        <div className='flex flex-col-reverse items-center justify-center'>
          <span>{ratings["3"]}</span>
          <label htmlFor="rating-3">
            <FontAwesomeIcon
              icon={faStar}
              style={{ fontSize: 40, color: "#F4C741" }}
            />
          </label>
        </div>
        <div className='flex flex-col-reverse items-center justify-center'>
          <span>{ratings["4"]}</span>
          <label htmlFor="rating-4">
            <FontAwesomeIcon
              icon={faStar}
              style={{ fontSize: 40, color: "#B5D930" }}
            />
          </label>
        </div>
        <div className='flex flex-col-reverse items-center justify-center'>
          <span>{ratings["5"]}</span>
          <label htmlFor="rating-5">
            <FontAwesomeIcon
              icon={faStar}
              style={{ fontSize: 40, color: "#84CE2F" }}
            />
          </label>
        </div>
      </div>
      <div className='flex flex-col-reverse items-center justify-center m-5'>
        <span className="font-bold text-lg">{ratings["mean"].toFixed(2)}</span>
        <label htmlFor="moyenne" className="font-normal text-lg">
          Moyenne
        </label>
      </div>
    </div>
  }


  const getRatingByClient = () => {
    return allClients.map((value, index) => {
      const hisManagers = allManagers.filter((mValue, mIndex) => mValue.parentId == value._id).map((mValue, mIndex) => mValue._id);
      const hisManagersEmail = allManagers.filter((mValue, mIndex) => mValue.parentId == value._id).map((mValue, mIndex) => mValue.email);
      const hisUsers = allUsers.filter((uValue, uIndex) => hisManagers.includes(uValue.parentId)).map((uValue, uIndex) => uValue.email);
      hisManagersEmail.forEach(element => {
        hisUsers.push(element)
      });
      const hisDiagnostics = allDiagnostics.filter((dValue, dIndex) => hisUsers.includes(dValue.email)).map((dValue, dIndex) => parseInt(dValue.rating));
      return { "id": value._id, "username": value.username, "email": value.email, "role": value.role, "rating": hisDiagnostics }
    })
  }

  const getRatingByManagers = () => {
    return allManagers.map((value, index) => {
      const hisUsers = allUsers.filter((uValue, uIndex) => uValue.parentId == value._id).map((uValue, uIndex) => uValue.email);
      hisUsers.push(value.email)
      const hisDiagnostics = allDiagnostics.filter((dValue, dIndex) => hisUsers.includes(dValue.email)).map((dValue, dIndex) => parseInt(dValue.rating));
      return { "parent_id": value.parentId, "username": value.username, "email": value.email, "role": value.role, "rating": hisDiagnostics }
    })
  }

  const getRatingByUsers = () => {

    const hisDiagnostics = allDiagnostics.map((dValue, dIndex) => parseInt(dValue.rating));
    return { "username": "Général", "role": "", "rating": hisDiagnostics }
  }

  const showAllStats = () => {
    return getRatingByClient().map((value, index) => {
      return [getHr(), getRatingGraphics(value), ...getRatingByManagers().filter((mValue, mIndex) => mValue.parent_id == value.id).map((aValue, aIndex) => getRatingGraphics(aValue))]
    })
  }

  const getStatsByClient = () => {
    return allClients.map((value, index) => {
      const hisManagers = allManagers.filter((mValue, mIndex) => mValue.parentId == value._id).map((mValue, mIndex) => mValue._id);
      const hisManagersEmail = allManagers.filter((mValue, mIndex) => mValue.parentId == value._id).map((mValue, mIndex) => mValue.email);
      const hisUsers = allUsers.filter((uValue, uIndex) => hisManagers.includes(uValue.parentId)).map((uValue, uIndex) => uValue.email);
      hisManagersEmail.forEach(element => {
        hisUsers.push(element)
      });
      const nbDiagnostics = allDiagnostics.filter((dValue, dIndex) => hisUsers.includes(dValue.email)).length;
      const nbCon = [...allUsers, ...allManagers].filter((uValue, uIndex) => hisManagers.includes(uValue.parentId) || hisManagers.includes(uValue._id)).map((uvalue, index) => uvalue.nb_connexion).reduce((acc, uvalue) => acc + uvalue, 0);
      return { "id": value._id, "username": value.username, "email": value.email, "role": value.role, "nbdiag": nbDiagnostics, "nbCon": nbCon }
    })
  }

  const getStatsByManagers = () => {
    return allManagers.map((value, index) => {
      const hisUsers = allUsers.filter((uValue, uIndex) => uValue.parentId == value._id).map((uValue, uIndex) => uValue.email);
      hisUsers.push(value.email)
      const nbDiagnostics = allDiagnostics.filter((dValue, dIndex) => hisUsers.includes(dValue.email)).length;
      const nbCon = allUsers.filter((uValue, uIndex) => hisUsers.includes(uValue.email)).map((evalue, index) => evalue.nb_connexion).reduce((acc, fvalue) => acc + fvalue, 0) + value.nb_connexion;
      return { "id": value._id, "parent_id": value.parentId, "username": value.username, "email": value.email, "role": value.role, "nbdiag": nbDiagnostics, "nbCon": nbCon }
    })
  }

  const getStatsByUsers = () => {
    return allUsers.map((value, index) => {
      const nbDiagnostics = allDiagnostics.filter((dValue, dIndex) => dValue.email == value.email).length;
      const nbCon = value.nb_connexion;
      return { "parent_id": value.parentId, "username": value.username, "email": value.email, "role": value.role, "nbdiag": nbDiagnostics, "nbCon": nbCon }
    })
  }

  const handleVoirDetails = (id, role) => {
    if (role == "Client") {
      setStats(getStatsByManagers().filter((value, index) => value.parent_id == id))
    } else if (role == "Manager") {
      setStats(getStatsByUsers().filter((value, index) => value.parent_id == id))
    }
  }
  const handleRetour = (id) => {
    setStats(getStatsByClient())
  }



  // console.log(user)
  return (
    <>
      <Head>
        <title>Statistiques des Utilisateurs</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user.email && allUsers.length > 0 && (
        <Layout user={user}>
          <main className={`${styles.main} flex-col pt-5`} style={{ justifyContent: "flex-start" }}>
            <div className='w-full'>
              <div className='flex flex-col items-center justify-center gap-5'>
                {(user.role == "Admin" || user.role == "Consultant") &&
                  <>
                    <h1 className='font-semibold font-AnticDidone text-3xl p-2 text-center w-full'>Statistiques des Utilisateurs</h1>
                    {getRatingGraphics(getRatingByUsers())}
                    {showAllStats()}
                    <br />
                    <hr />
                    <div className='w-full my-4'>
                      <div className="w-[90%] flex justify-around m-auto">
                        <button onClick={() => { handleRetour() }} className='bg-white text-black rounded-full px-5 py-1 my-2 hover:bg-neutral-500 hover:text-white sm:text-xs sm:px-2 sm:py-1'>Afficher les Statistiques</button>
                        <h1 className='font-semibold font-AnticDidone text-3xl p-2 text-center w-full  sm:text-lg sm:p-1 sm:py-1'>Statistiques des Clients et Équipes</h1>
                        <button onClick={() => { handleRetour() }} className='bg-white text-black rounded-full px-5 py-1 my-2 hover:bg-neutral-500 hover:text-white sm:text-xs sm:px-2 sm:py-1'>Retourner à la liste des clients</button>
                      </div>
                      <hr />
                      <table className='w-[80%] m-auto my-6 sm:w-full'>
                        <thead className="sm:text-[10px]">
                          <tr>
                            <th>N°</th>
                            <th>Nom d&apos;Utilisateur</th>
                            <th className="sm:hidden">Email</th>
                            <th>Nombre de diagnostics de l&apos;équipe</th>
                            <th>Rôle</th>
                            <th>Nombre d&apos;accès à l&apos;application de l&apos;équipe</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="sm:text-[10px]">
                          {stats.map((user, index) => (
                            <tr key={user._id}>
                              <td className='text-center'>{index + 1}</td>
                              <td className='text-center'>{user.username}</td>
                              <td className='text-center sm:hidden'>{user.email}</td>
                              <td className='text-center'>{user.nbdiag}</td>
                              <td className='text-center'>{user.role}</td>
                              <td className='text-center px-5 py-3 my-2'>{user.nbCon}</td>
                              {user.role != "User" && <td className='text-center'><button onClick={() => { handleVoirDetails(user.id, user.role) }} className='bg-white text-black rounded-full px-5 py-1 my-2 hover:bg-neutral-500 hover:text-white'>Voir les détails</button></td>}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                }
                {user.role == "Client" &&
                  <>
                    {/* {showAllStats()} */}
                    <div className='w-full'>
                      <h1 className='font-semibold font-AnticDidone text-3xl p-2 text-center w-full sm:text-lg sm:p-1 sm:py-1'>Statistiques des Équipes</h1>
                      <hr />
                      <table className='w-[80%] m-auto my-6 sm:w-full'>
                        <thead className="sm:text-[10px]">
                          <tr>
                            <th>N°</th>
                            <th>Nom d&apos;Utilisateur</th>
                            <th className="sm:hidden">Email</th>
                            <th>Nombre de diagnostics de l&apos;équipe</th>
                            <th>Nombre d&apos;accès à l&apos;application de l&apos;équipe</th>
                          </tr>
                        </thead>
                        <tbody className="sm:text-[10px]">
                          {getStatsByManagers().filter((value, index) => value.parent_id == user._id).map((user, index) => (
                            <tr key={user._id}>
                              <td className='text-center'>{index + 1}</td>
                              <td className='text-center'>{user.username}</td>
                              <td className='text-center sm:hidden'>{user.email}</td>
                              <td className='text-center'>{user.nbdiag}</td>
                              <td className='text-center px-5 py-3 my-2'>{user.nbCon}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <AskSubForm />
                  </>
                }
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

  const diagnosticResponse = await getAllDiagnostics();

  const clientResponse = await getAllClients();

  const managerResponse = await getAllManagers();

  const usersResponse = await getAllUsersByRole("User");

  return {
    props: { user: userResponseJson.data, diagnostics: JSON.stringify(diagnosticResponse), clients: JSON.stringify(clientResponse), managers: JSON.stringify(managerResponse), users: JSON.stringify(usersResponse) }, // will be passed to the page component as props
  };
}

export default Home;
