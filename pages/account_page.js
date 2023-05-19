import Image from "next/image";
import Head from "next/head";
import { Inter } from "@next/font/google";
import cookies from "next-cookies";
import { useState,useEffect } from "react";
import { verifyJwt } from "../utils/jwt";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

function AccountPage({user}) {
    let router = useRouter()
    const [delayAlert, setDelayAlert] = useState(user.delay_mail)
    const [oldPassword,setOldPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [errorPasswod,setErrorPassword] = useState("")
    
    const [error,setError] = useState("")
    const handleSubmit = async (event)=>{
        event.preventDefault()
        const token = localStorage.getItem("token");
        setError("")
        let data = {
            "delay_mail":delayAlert
        }
        let response = await fetch(`/api/user/id/${user._id}`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
            body:JSON.stringify(data)
        })
        if(response.ok){
            //recharger la page
            router.reload()
        }else{
            //afficher l'erreur avec un toster
            setError("Un problème est survenu durant la mise à jour")
        }
    }
    const handlePasswordSubmit= async(event)=>{
        event.preventDefault()
        const token = localStorage.getItem("token");
        setError("")
        let data = {
            "oldPassword":oldPassword,
            "newPassword":newPassword
        }
        let response = await fetch(`/api/user/password/${user._id}`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
            body:JSON.stringify(data)
        })
        if(response.ok){
            //recharger la page
            router.reload()
        }else{
            //afficher l'erreur avec un toster
            setErrorPassword("Un problème est survenu durant la modication")
        }
    }
    return<div className="w-screen h-screen flex flex-row py-20 px-32">
        <div className="basis-1/2">
            <Image
                src={user.avatar || "/debut.png"}
                alt="avatar"
                width={200}
                height={200}
                className="rounded-full h-[200px] w-[200px] mb-5"
            />
        </div>
        <div className="flex flex-col space-y-2">
            <div>
                <span className="font-Trocchi block">
                    username : {user.username}
                </span>
                <span className="text-xs block">
                    Adresse Email : {user.email}
                </span>
                <span className="text-orange-800 block">
                    role: {user.role}
                </span>
            </div>
            <div className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-200 p-4 rounded-lg">
                {error&& <div className="text-red">{error}</div>}
                <p className="text-sm">A quelle frequence souhaitez-vous être notifié.e par l'Applciation afin de réaliser un nouvel auto-diagnostic QVT personnelle ?</p>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-5 my-4 space-x-2 rounded-xl bg-gray-200 p-2">
                        <div>
                            <input type="radio" id="1mois" name="alerte" checked = {delayAlert=="1mois"} onChange={event=>setDelayAlert(event.target.value)} value="1mois" className="peer hidden"/>
                            <label htmlFor="1mois" className={`block  cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#7E5240] peer-checked:font-bold peer-checked:text-white`}>1 mois</label>
                        </div>
                        <div>
                            <input type="radio" id="3mois" name="alerte" checked = {delayAlert=="3mois"} value="3mois" onChange={event=>setDelayAlert(event.target.value)} className="peer hidden"/>
                            <label htmlFor="3mois" className={`block  cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#7E5240] peer-checked:font-bold peer-checked:text-white`}>3 mois</label>
                        </div>
                        <div>
                            <input type="radio" id="6mois" name="alerte" checked = {delayAlert=="6mois"} onChange={event=>setDelayAlert(event.target.value)} value="6mois" className="peer hidden"/>
                            <label htmlFor="6mois" className={`block  cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#7E5240] peer-checked:font-bold peer-checked:text-white`}>6 mois</label>
                        </div>
                        <div>
                            <input type="radio" id="12mois" name="alerte" checked = {delayAlert=="12mois"} onChange={event=>setDelayAlert(event.target.value)} value="12mois" className="peer hidden"/>
                            <label htmlFor="12mois" className={`block  cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#7E5240] peer-checked:font-bold peer-checked:text-white`}>1 an</label>
                        </div>
                        <div>
                            <input type="radio" id="jamais" name="alerte" checked = {delayAlert=="jamais"} onChange={event=>setDelayAlert(event.target.value)} value="jamais" className="peer hidden"/>
                            <label htmlFor="jamais" className={`block  cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#7E5240] peer-checked:font-bold peer-checked:text-white`}>Jamais</label>
                        </div>
                    </div>
                    {
                        delayAlert && <button type="submit" className="inline bg-blue self-end">Modifier</button>
                    } 
            </form>
            </div>
            
            <div className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-200 p-4 rounded-lg">
                {errorPasswod&& <div className="text-red">{errorPasswod}</div>}
                <p className="text-sm">Changer de mot de passe</p>
                <form className="flex flex-col" onSubmit={handlePasswordSubmit}>
                    <div className="grid grid-cols-1 space-x-2 rounded-xl bg-gray-200">
                        <div>
                            <label htmlFor="oldPassword" className={`block  select-none p-2`}>Ancien mot de passe</label>
                            <input type="password" id="oldPassword"  className="w-full h-6bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="oldPassword" onChange={event=>setOldPassword(event.target.value)} value={oldPassword}/>
                        </div>
                        <div>
                            <label htmlFor="newPassword" className={`block  select-none rounded-xl p-2 text-md`}>Nouveau mot de passe</label>
                            <input type="password" id="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="newPassword"  onChange={event=>setNewPassword(event.target.value)} value={newPassword}/>
                        </div>
                    </div>
                    {
                        oldPassword && newPassword && <button type="submit" className="inline bg-blue self-end">Modifier</button>
                    } 
            </form>
            </div>
        </div>
        
    </div>
}


export async function getServerSideProps(context){
    const token = cookies(context).token;
    const email = verifyJwt(token) != null ? verifyJwt(token).email : "nomail";

    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/email/${email}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        token: token,
        },
    });
    let userResponseJson = { data: {} };
    if (userResponse.ok) {
        userResponseJson = await userResponse.json();
    }
    return {
        props: {user: userResponseJson.data }, 
      };
}

export default AccountPage