import React from 'react'
import { useState } from "react";

function AddUser({handleAddUser}) {
    const [sendMail, setSendMail] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("User");
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = { send_mail: sendMail, username, email, role };
      handleAddUser(formData);
    };
  
    return (
      <form onSubmit={handleSubmit} className="p-4">
        <h2 className='text-customGray mb-5'>Ajouter un utilisateur</h2>
        <div>
          <label htmlFor="username">Nom d&apos;utilisateur:</label>
          <input
          className='mb-5 mt-1 h-14 px-5 py-1 border-2 border-black rounded-md block mx-0 w-[500px] focus:outline-none'
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
          className='mb-5 mt-1 h-14 px-5 py-1 border-2 border-black rounded-md block mx-0 w-[500px] focus:outline-none'
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select
            name="role"
            id="role"
            className='mb-5 mt-2 h-14 px-5 py-1 border-2 border-black rounded-md block mx-0 w-[500px]'
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Client">Client</option>
            <option value="User">User</option>
            <option value="Consultant">Consultant</option>
          </select>
        </div>
        <div className='my-3'>
          <label htmlFor="send_mail">
              Activer les Emails
          </label>
          <input
            className='border'
              type="checkbox"
              name="send_mail"
              id="send_mail"
              checked={sendMail}
              onChange={(e) => setSendMail(e.target.checked)}
            />
        </div>
        <div>
          <button type="submit" className='rounded-lg w-[100px]'>  Submit  </button>
        </div>
      </form>
    );
}

export default AddUser