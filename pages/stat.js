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

  useEffect(() => {
    console.log(user)
    console.log(JSON.parse(diagnostics))
    console.log(JSON.parse(clients))
    console.log(JSON.parse(managers))
    console.log(JSON.parse(users))
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
    return <div className="w-[50%]"><hr /></div>
  } 

  const getRatingGraphics = (data) => {
    const ratings = analyzeRatings(data["rating"])
    const name = data["username"]
    const role = data["role"]

    return <div className='flex justify-center'>
      <div className='flex flex-col-reverse items-center justify-center m-5 w-80'>
        {role == "Client" && <span>Client <span className="font-bold text-2xl ml-5">{name}</span></span>}
        {role == "Manager" && <span className="ml-5">Equipe <span className="font-bold text-2xl ml-5">{name}</span></span>}
        {role == "" && <span className="ml-5"><span className="font-bold text-2xl ml-5">{name}</span></span>}
      </div>
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
      const hisUsers = allUsers.filter((uValue, uIndex) => hisManagers.includes(uValue.parentId)).map((uValue, uIndex) => uValue.email);
      hisUsers.push("marcoperson2000@gmail.com")
      const hisDiagnostics = allDiagnostics.filter((dValue, dIndex) => hisUsers.includes(dValue.email)).map((dValue, dIndex) => parseInt(dValue.rating));
      return { "id": value._id, "username": value.username, "email": value.email, "role": value.role, "rating": hisDiagnostics }
    })
  }

  const getRatingByManagers = () => {
    return allManagers.map((value, index) => {
      const hisUsers = allUsers.filter((uValue, uIndex) => uValue.parentId == value._id).map((uValue, uIndex) => uValue.email);
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
      const hisUsers = allUsers.filter((uValue, uIndex) => hisManagers.includes(uValue.parentId)).map((uValue, uIndex) => uValue.email);
      const hisDiagnostics = allDiagnostics.filter((dValue, dIndex) => hisUsers.includes(dValue.email)).map((dValue, dIndex) => parseInt(dValue.rating));
      return { "id": value._id, "username": value.username, "email": value.email, "role": value.role, "rating": hisDiagnostics }
    })
  }



  console.log(user)
  return (
    <>
      {user.email && allUsers.length > 0 && (
        <Layout user={user}>
          <main className={styles.main}>
            <div className='w-full'>
              <div className='flex flex-col items-center justify-center gap-5'>
                {user.role == "Admin" &&
                  <>
                    <h1 className='text-center text-2xl my-5'>Statistiques</h1>
                    {getRatingGraphics(getRatingByUsers())}
                    {showAllStats()}
                    <AskSubForm />
                  </>
                }
                {user.role == "Client" &&
                  <>
                    <h1 className='text-center text-2xl my-5'>Usage de l&apos;Application par mes Équipes</h1>
                  {getRatingGraphics(getRatingByUsers())}
                    {showAllStats()}
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
