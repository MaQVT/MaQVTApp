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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="send_mail">
              Activer les Emails
            <input
            className='border'
              type="checkbox"
              name="send_mail"
              id="send_mail"
              checked={sendMail}
              onChange={(e) => setSendMail(e.target.checked)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="username">Nom d&apos;utilisateur:</label>
          <input
          className='border'
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
          className='border'
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
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
}

export default AddUser