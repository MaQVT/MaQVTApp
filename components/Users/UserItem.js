import React from "react";
import Image from 'next/image'
import Link from "next/link";
function UserItem({ user, handleDeleteUser,parent_id }) {
  const removeHandler = async () => {
    handleDeleteUser(user._id);
  };
  return (
    <li
      id={user._id}
      className="text-right flex flex-col h-max justify-center bg-rose_pr rounded-lg p-3 my-0 border items-center border-orange-50 border-4"
    >
      <i
        onClick={removeHandler}
        className="fa fa-close text-red-500 text-base pr-2 pb-2 w-full cursor-pointer"
      ></i>
      <Image
        src={user.avatar || "/debut.png"}
        alt="avatar"
        width={120}
        height={120}
        className="rounded-full h-[70px] w-[70px] mb-5"
      />
      <Link 
        href={{
          pathname: '/admin/manage_users_page',
          query: {user:user._id,username:user.username}
        }}
        className="font-Trocchi">
        {user.username}
        </Link>
      <span className="text-xs">{user.email}</span>
      <span className="text-orange-800">{user.role}</span>
    </li>
  );
}

export default UserItem;
