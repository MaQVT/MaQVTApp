import React from 'react'
import { useState,useEffect } from "react";
import cookies from "next-cookies";

function AddUser({handleAddUser,roles,parent_id}) {
    const [sendMail, setSendMail] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("User");
    const [superieur,setSuperieur] = useState("")
    const [superieurs,setSuperieurs] = useState([])


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
    //     setSuperieurs(result.data)
    //     let firstsup = result.data[0]?result.data[0]._id:""
    //     setSuperieur(firstsup)
    //   }
    //   fetchSuperieur()
    // },[role])
  

    
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = { send_mail: sendMail, username, email, role,parentId:parent_id };
      handleAddUser(formData);
      setEmail("")
      setSendMail(false);
      setUsername("");
      setEmail("");
      setRole("User");
      setSuperieur("")
      setSuperieurs([])

    };
  
    return (
      <form onSubmit={handleSubmit} className="p-4">
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
            {roles.map((role,index)=><option value={role} key={index}>{role}</option>)}
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