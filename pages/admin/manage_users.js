import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "/styles/Home.module.css";
import cookies from "next-cookies";
import UserItem from "../../components/Users/UserItem";
import { useState } from "react";
import AddUser from "../../components/Users/AddUser";

const inter = Inter({ subsets: ["latin"] });

function ManageUsers({ users, user }) {
  const [allUsers, setAllUsers] = useState(users)
  
  async function handleDeleteUser(id) {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/api/users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({_id: id})
    });
    if (response.ok) {
      // If user is deleted successfully, refresh the user list
      const usersResponse = await fetch("http://localhost:3000/api/users", {
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
    const token = localStorage.getItem("token");
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      // If user is deleted successfully, refresh the user list
      const usersResponse = await fetch("http://localhost:3000/api/users", {
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

  

  let listOfNoms = allUsers.map((value, index) => {
    return (
      <UserItem user = {value} key = {index}  handleDeleteUser={handleDeleteUser} />
    );
  });

  return (
    <>
      <Head>
        <title>Manager les Utilisateurs</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {user.role == "Admin" && <h1>Management de tous les Utilisateurs</h1>}
        {user.role == "Admin" && <AddUser handleAddUser={handleAddUser} />}
        {user.role == "Admin" && <ul className="list-none p-0">{listOfNoms}</ul>}
      </main>
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
  const usersResponse = await fetch("http://localhost:3000/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });

  let userResponseJson = { data: {} };
  let usersResponseJson = { data: [] };

  if (userResponse.ok) {
    userResponseJson = await userResponse.json();
  }

  if (usersResponse.ok) {
    usersResponseJson = await usersResponse.json();
  }

  return {
    props: { users: usersResponseJson.data, user: userResponseJson.data }, // will be passed to the page component as props
  };
}

export default ManageUsers;
