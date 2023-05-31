import React from 'react'
import { useState, useEffect } from "react";
import moment from 'moment';

function UpdateUser({ handleUpdateUser, user, parent }) {
    const [nb_access, setNbAccess] = useState(user.nb_access == 1 ? 1 : -1);
    const [authorization, setAuthorization] = useState(user.authorization);
    const [expired_date, setExpiredDate] = useState(moment(user.expired_date).format("YYYY-MM-DD"));

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

        /*/traitement sur la date
        let expire_date = new Date(expired_date);
        // Ajout d'un an à la date initiale
        expire_date.setFullYear(expire_date.getFullYear() + 1);
    
        // Récupération de la nouvelle date
        expire_date = expire_date.toISOString().split('T')[0];*/

        const formData = { nb_access, authorization, expired_date: moment(expired_date).format("MM/DD/YYYY HH:mm:ss"), email: user.email };
        console.log(formData);
        handleUpdateUser(formData, parent);

    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div>
                <label htmlFor="authorization">Autorisation Test QVT:</label>
                <input
                    className='mb-5 mt-1 h-auto px-5 py-1 border-2 border-black rounded-md mx-20 focus:outline-none'
                    type="checkbox"
                    name="authorization"
                    id="authorization"
                    checked={authorization}
                    onChange={(e) => setAuthorization(e.target.checked)}
                />
            </div>
            <div>
                <label htmlFor="nb_access">A usage unique:</label>
                <input
                    className='mb-5 mt-1 h-auto px-5 py-1 border-2 border-black rounded-md mx-20 focus:outline-none'
                    type="checkbox"
                    name="nb_access"
                    id="nb_access"
                    checked={nb_access == 1}
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

            <div>
                <button type="submit" className='rounded-lg w-[100px]'>  Modifier  </button>
            </div>
        </form>
    );
}

export default UpdateUser