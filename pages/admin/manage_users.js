import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "/styles/Home.module.css";
import cookies from "next-cookies";
import UserItem from "../../components/Users/UserItem";
import { useState } from "react";
import AddUser from "../../components/Users/AddUser";
import { verifyJwt } from "../../utils/jwt";

const inter = Inter({ subsets: ["latin"] });

function ManageUsers({ users, user }) {
  const [allUsers, setAllUsers] = useState(users)
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
      const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
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

  async function handleAddUser(formData) {
    console.log("hip hip")
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
      // If user is deleted successfully, refresh the user list
      console.log("11111111111111111111111111111111111");
      console.log("11111111111111111111111111111111111");
      console.log(user._id);
      console.log("11111111111111111111111111111111111");
      console.log("11111111111111111111111111111111111");
      const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/parent/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      let usersResponseJson = { data: [] };
  
      if (usersResponse.ok) {
        const lune = await usersResponse.json()
        console.log("lune")
        if((JSON.stringify(lune.data) != '{}')){
          usersResponseJson = lune
        }
      }
      setAllUsers(usersResponseJson);
    }
    console.log("lune lune");
  }

  function haveRightAdd(role){
    switch (role) {
      case "Admin":
        return ["Admin","Consultant","Client","Manager","User"]
        break;
      case "Consultant":
        return ["Client","Manager","User"]
        break;
      default:
        return false
        break;
    }
  }

  function haveRightToSee(role){
    return role!="User"
  }

  /*let TabofType = allUsers.length?<ul
    class="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0"
    role="tablist"
    data-te-nav-ref>
      {
        allUsers.map((value,index)=>
          <li role="presentation">
            <a
              href={`#tabs-${value[0] && value[0].role}`}
              class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
              data-te-toggle="pill"
              data-te-target={`tabs-${value[0] && value[0].role}`}
              {...index==0?{"data-te-nav-active":"data-te-nav-active"}:null}
              role="tab"
              aria-controls={`tabs-${value[0] && value[0].role}`}
              aria-selected={index==0?true:false}
              key={index}
            >
              {value[0] && value[0].role}
            </a>
          </li>
        )
      }
</ul>
:<div>Il n'y a rien à afficher</div>
*/
  let listOfNoms = allUsers.length?
      allUsers.map((value,index)=>
        <UserItem user = {value} key = {index}  handleDeleteUser={handleDeleteUser}/>):<div>Il n'y a rien à afficher</div>

  return (
    <>
    <Head>
      <title>Manager les Utilisateurs</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="min-h-full w-full flex flex-col p-20 bg-[url('/backgound.png')] bg-repeat font-PlayfairDisplay">
      {user.role == "Admin" && <h1 className="font-semibold font-AnticDidone text-3xl p-2 text-center md:text-left">Management de tous les Utilisateurs</h1>}
      <div className="flex flex-row flex-wrap justify-center">
        {haveRightAdd(user.role) && <AddUser handleAddUser={handleAddUser} parent_id={user._id} roles={haveRightAdd(user.role)} />}
        {haveRightToSee(user.role) && <div className="list-none flex-1 p-5 flex flex-col gap-5 items-center justify-center flex-wrap w-full h-max">{listOfNoms}</div>}
      </div>
    </main>
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
  let parent = userResponseJson.data._id
  const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/parent/${parent}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });

  
  let usersResponseJson = { data: [] };
  
  if (usersResponse.ok) {
    const lune = await usersResponse.json()
    if((JSON.stringify(lune.data) != '{}')){
      usersResponseJson = lune
    }
  }

  return {
    props: { users: usersResponseJson.data, user: userResponseJson.data }, // will be passed to the page component as props
  };
}

export default ManageUsers;
