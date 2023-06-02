import React, { useState } from "react";
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from "next/router";

function UserItem({ user, handleDeleteUser, handleUpdateModal, parentRole, toValid }) {
  const [status, setStatus] = useState(user.status)
  const router = useRouter()

  async function handleValidateUser(user) {
    const token = localStorage.getItem("token");
    const response = await fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token
      },
      body: JSON.stringify({ email: user.email, status: "valide" }),
    });
    console.log(response.ok)
    if (response.ok) {
      router.reload()
      setStatus('valide')
    }
  }

  const removeHandler = async () => {
    if(confirm("Confirmez la suppression de ce utilisateur")){
      handleDeleteUser(user._id);
    }
  };
  const editHandler = async () => {
    handleUpdateModal(user)
    // window.alert("En cours de dev : Modal pour pouvoir Modifier un Utilisateur, changer invalide en valide et modifier nb_access et expired_date, les autres champs doivent etre non modifiables")
  };
  const validateUser = async () => {
    handleValidateUser(user)
    // window.alert("En cours de dev : Envoyez directement une requete pour valider l'utilisateur")
  };

  return (
    <li
      id={user._id}
      className="text-right flex flex-col h-max justify-center bg-rose_pr rounded-lg p-3 my-0 min-w-[200px] max-w-[300px] items-center border-orange-50 border-4"
    >
      {parentRole != "Manager" && parentRole != "Client" && parentRole != "User" &&
        <div className="flex justify-between w-full items-center">
          {((user.role == "Manager" || user.role == "User") && toValid == false) ?
            <i
              onClick={editHandler}
              title="Editer l'utilisateur"
              className="fa fa-user-pen text-green-500 text-base pr-2 pb-2 cursor-pointer"
            ></i> : <i></i>
          }
          {status == "invalide" ?
            <i
              onClick={validateUser}
              title="Valider l'utilisateur"
              className="fa fa-check text-green-500 text-base pr-2 pb-2 cursor-pointer"
            ></i> : <i></i>
          }
          {toValid == false && parentRole == "Admin" ?
            <i
              onClick={removeHandler}
              title="Supprimer l'utilisateur"
              className="fa fa-close text-red-500 text-base pr-2 pb-2 cursor-pointer"
            ></i> : <i></i>
          }
        </div>
      }
      <Image
        src={user.avatar || "/debut.png"}
        alt="avatar"
        width={120}
        height={120}
        className="rounded-full h-[70px] w-[70px] mb-5"
      />

      {user.role != "User" ?
        <Link
          href={{
            pathname: '/admin/manage_users_page',
            query: { user: user._id, username: user.username }
          }}
          className={`font-Trocchi bg-slate-300 px-3 py-2 rounded-md mb-2 cursor-pointer hover:bg-slate-400`}>
          {user.username}
        </Link> : <span className={`font-Trocchi bg-slate-300 px-3 py-2 rounded-md mb-2 cursor-text`}>{user.username}</span>
      }
      <span className="text-xs">{user.email}</span>
      <span className="text-orange-800">{user.role == "User" ? "Utilisateur" : user.role}</span>
    </li>
  );
}

export default UserItem;
