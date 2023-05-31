import React from 'react'
import { useState, useEffect } from "react";
import cookies from "next-cookies";
import { valid } from 'joi';
import moment from 'moment';
var xlsx = require("xlsx");

function AddUser({ handleAddUser, roles, user, parent_id, parent }) {
  // const [sendMail, setSendMail] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(roles[0]);
  const [file, setFile] = useState(null)
  const [nb_access, setNbAccess] = useState(-1)
  const [expired_date, setExpiredDate] = useState(moment(new Date(Date.now()).setFullYear(new Date().getFullYear() + 1)).format("YYYY-MM-DD"))


  // useEffect(()=> {
  //   async function fetchSuperieur(){
  //     const token = localStorage.getItem("token");
  //     let superieurRole = ""
  //     let theRoles = ["Admin","Consultant","Manager","User"]
  //     if(role=="Admin"){
  //       superieurRole = "Admin"
  //     }else{
  //       superieurRole = theRoles[(theRoles.indexOf(role)-1)]
  //     }

  //     const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/role/${superieurRole}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         token: token,
  //       },
  //     });
  //     let result = await response.json()
  //    
  //     let firstsup = result.data[0]?result.data[0]._id:""
  //   }
  //   fetchSuperieur()
  // },[role])



  const handleSubmit = async (event) => {
    event.preventDefault();
    let Status = "valide"
    if (user.role == "Manager") {
      Status = "invalide"
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = xlsx.read(data, { type: 'array' });
        // Process the workbook data here
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);
        jsonData.forEach((row) => {
          // Faites quelque chose avec chaque ligne
          const formData = { username: row.username, status: Status, email: row.email, expired_date: moment(expired_date).format("MM/DD/YYYY HH:mm:ss"), nb_access, role: row.role, parentId: parent_id };
          handleAddUser(formData, parent);
        });
      };
      reader.readAsArrayBuffer(file);
      setFile(null)
      // setSendMail(false);
    }
    else {
      const formData = { status: Status, username, expired_date: moment(expired_date).format("MM/DD/YYYY HH:mm:ss"), nb_access, email, role, parentId: parent_id };
      handleAddUser(formData, parent);
      // setSendMail(false);
      setUsername("");
      setEmail("");
      setRole("User");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div>
        <label htmlFor="username">Nom d&apos;utilisateur:</label>
        <input
          className='mb-5 mt-1 h-auto px-5 py-1 border-2 border-black rounded-md block mx-0 w-[500px] md:max-w-[300px] focus:outline-none'
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={roles.length < 1}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          className='mb-5 mt-1 h-auto px-5 py-1 border-2 border-black rounded-md block mx-0 w-[500px] md:max-w-[300px] focus:outline-none'
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={roles.length < 1}
        />
      </div>
      <div>
        <label htmlFor="role">Role:</label>
        <select
          disabled={roles.length < 1}
          name="role"
          id="role"
          className='mb-5 mt-2 h-auto px-5 py-1 border-2 border-black rounded-md block mx-0 w-[500px] md:max-w-[300px]'
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          {roles.map((role, index) => <option value={role} key={index}>{role}</option>)}
        </select>
      </div>
      <div className=''>
        <label htmlFor="nb_access">A usage unique:</label>
        <input
          className='mb-5 mt-1 h-auto px-5 py-1 border-2 border-black rounded-md mx-10 focus:outline-none'
          type="checkbox"
          name="nb_access"
          id="nb_access"
          value={nb_access == 1}
          onChange={(e) => setNbAccess(e.target.checked ? 1 : -1)}
        />
      </div>
      <div>
        <label htmlFor="expired_date">Date d&apos;expiration:</label>
        <input
          className='mb-5 mt-1 h-auto px-5 py-1 border-2 border-black rounded-md block mx-0 w-[500px] md:max-w-[300px] focus:outline-none'
          type="date"
          name="expired_date"
          id="expired_date"
          value={expired_date}
          onChange={(e) => setExpiredDate(e.target.value)}
        />
      </div>
      {/* <div className='my-3'>
        <label htmlFor="send_mail">
          Activer les Emails
        </label>
        <input
          disabled={roles.length < 1}
          className='border'
          type="checkbox"
          name="send_mail"
          id="send_mail"
          checked={sendMail}
          onChange={(e) => setSendMail(e.target.checked)}
        />
      </div> */}

      <div className='text-center'>-------------- OU --------------</div>

      <div>
        <label htmlFor="file">Fichier Excel:</label>
        <input
          disabled={roles.length < 1}
          name="file"
          type='file'
          id="file"
          accept=".xls,.xlsx"
          className='mb-5 mt-2 h-auto px-5 py-1 border-2 border-black rounded-md block mx-0 w-[500px] md:max-w-[300px]'
          onChange={(e) => setFile(event.target.files[0])}
        />
      </div>

      <div>
        <button type="submit" className='rounded-lg w-[100px]'>  Ajouter  </button>
      </div>
    </form>
  );
}

export default AddUser