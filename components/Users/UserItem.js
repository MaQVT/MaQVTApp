import React from "react";
import Image from 'next/image'
import Link from "next/link";
function UserItem({ user, handleDeleteUser, parent_id, parentRole }) {
  const removeHandler = async () => {
    handleDeleteUser(user._id);
  };
  const editHandler = async () => {
    window.alert("En cours de dev : Pouvoir Modifier un Utilisateur, changer invalide en valide et modifier nb_access et expired_date")
  };

  return (
    <li
      id={user._id}
      className="text-right flex flex-col h-max justify-center bg-rose_pr rounded-lg p-3 my-0 border items-center border-orange-50 border-4"
    >
      {parentRole != "Manager" && parentRole != "Client" && parentRole != "User" &&
        <div className="flex justify-between w-full items-center">
          <i
            onClick={editHandler}
            title="Editer l'utilisateur"
            className="fa fa-user-pen text-green-500 text-base pr-2 pb-2 cursor-pointer"
          ></i>
          <i
            onClick={removeHandler}
            title="Supprimer l'utilisateur"
            className="fa fa-close text-red-500 text-base pr-2 pb-2 cursor-pointer"
          ></i>
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
      <span className="text-orange-800">{user.role}</span>
    </li>
  );
}

export default UserItem;
