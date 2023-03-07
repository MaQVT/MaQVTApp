import React from "react";

function UserItem({ user, handleDeleteUser }) {
  const removeHandler = async () => {
    handleDeleteUser(user._id);
  };
  return (
    <li
      id={user._id}
      className="text-center flex justify-between px-5 py-3 my-2 border border-teal-500"
    >
      <span>{user.email}</span>
      <span className="ml-10">{user.role}</span>

      <i
        onClick={removeHandler}
        className="fa fa-close text-red-500 text-base ml-10 cursor-pointer"
      ></i>
    </li>
  );
}

export default UserItem;
