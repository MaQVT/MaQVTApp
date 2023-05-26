import Image from "next/image";
import Head from "next/head";
import { Inter } from "@next/font/google";
import cookies from "next-cookies";
import { useState, useEffect } from "react";
import { verifyJwt } from "../utils/jwt";
import { useRouter } from "next/router";
import Layout from "./layout";
import styles from "/styles/Home.module.css";
const inter = Inter({ subsets: ["latin"] });

function AccountPage({ user }) {
    let router = useRouter()
    const [delayAlert, setDelayAlert] = useState(user.delay_mail)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [errorPasswod, setErrorPassword] = useState("")

    async function handleFrequenceUserAdmin() {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/user/scheduleAutoDiagMail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
            body: JSON.stringify({ userId: user._id, role: user.role }),
        });
        console.log(response.ok)
        if (response.ok) {
            console.log("Email rescheduled")
        }
    }

    async function handle2MonthFrequenceMailUserAdmin() {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/user/scheduleAutoUserMail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
            body: JSON.stringify({ userId: user._id, role: user.role }),
        });
        console.log(response.ok)
        if (response.ok) {
            console.log("Email rescheduled")
        }
    }

    async function handleAllMaillingServiceRestart() {
        await handleFrequenceUserAdmin()
        await handle2MonthFrequenceMailUserAdmin()
    }

    async function handleFrequenceUser() {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/user/scheduleAutoDiagMail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
            body: JSON.stringify({ userId: user._id, role: user.role, email: user.email, scheduleName: delayAlert }),
        });
        console.log(response.ok)
        if (response.ok) {
            console.log("Email rescheduled")
        }
    }

    const [error, setError] = useState("")
    const handleSubmit = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem("token");
        setError("")
        let data = {
            "delay_mail": delayAlert
        }
        let response = await fetch(`/api/user/id/${user._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            //recharger la page
            await handleFrequenceUser()
            router.reload()
        } else {
            //afficher l'erreur avec un toster
            setError("Un problème est survenu durant la mise à jour")
        }
    }
    const handlePasswordSubmit = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem("token");
        setError("")
        let data = {
            "oldPassword": oldPassword,
            "newPassword": newPassword
        }
        let response = await fetch(`/api/user/password/${user._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            //recharger la page
            router.reload()
        } else {
            //afficher l'erreur avec un toster
            setErrorPassword("Un problème est survenu durant la modication")
        }
    }
    return <Layout user={user}>
        <main className={styles.main}><div className="w-screen h-screen flex flex-row py-20 px-32">
            <div className="basis-1/2">
                <Image
                    src={user.avatar || "/debut.png"}
                    alt="avatar"
                    width={200}
                    height={200}
                    className="rounded-full h-[200px] w-[200px] mb-5"
                />
                {user.role == "Admin" && <button onClick={handleAllMaillingServiceRestart} className="inline bg-red-900 self-end px-5 h-15 flex justify-center items-center">Réinitialiser tous les services de Mails</button>}

            </div>
            <div className="flex flex-col space-y-2">
                <div>
                    <span className="text-orange-800 block">
                        Statut : {user.role}
                    </span>
                    <span className="font-Trocchi block">
                        Nom d&apos;utilisateur : {user.username}
                    </span>
                    <span className="text-xs block">
                        Adresse email : {user.email}
                    </span>
                    <span className="text-xs block">
                        Date de création du compte : {user.date}
                    </span>
                    <span className="text-xs block">
                        Date de fin de validité : {user.expired_date}
                    </span>
                </div>
                <div className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-200 p-4 rounded-lg">
                    {error && <div className="text-red">{error}</div>}
                    <p className="text-sm">A quelle frequence souhaitez-vous être notifié.e par l&apos;Application afin de réaliser un nouvel auto-diagnostic QVT personnelle ?</p>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-5 my-4 space-x-2 rounded-xl bg-gray-200 p-2">
                            <div>
                                <input type="radio" id="hebdomadaire" name="alerte" checked={delayAlert == "hebdomadaire"} onChange={event => setDelayAlert(event.target.value)} value="hebdomadaire" className="peer hidden" />
                                <label htmlFor="hebdomadaire" className={`block  cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#7E5240] peer-checked:font-bold peer-checked:text-white`}>Hebdomadaire</label>
                            </div>
                            <div>
                                <input type="radio" id="mensuelle" name="alerte" checked={delayAlert == "mensuelle"} value="mensuelle" onChange={event => setDelayAlert(event.target.value)} className="peer hidden" />
                                <label htmlFor="mensuelle" className={`block  cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#7E5240] peer-checked:font-bold peer-checked:text-white`}>Mensuelle</label>
                            </div>
                            <div>
                                <input type="radio" id="trimestrielle" name="alerte" checked={delayAlert == "trimestrielle"} onChange={event => setDelayAlert(event.target.value)} value="trimestrielle" className="peer hidden" />
                                <label htmlFor="trimestrielle" className={`block  cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#7E5240] peer-checked:font-bold peer-checked:text-white`}>Trimestrielle</label>
                            </div>
                            <div>
                                <input type="radio" id="annuelle" name="alerte" checked={delayAlert == "annuelle"} onChange={event => setDelayAlert(event.target.value)} value="annuelle" className="peer hidden" />
                                <label htmlFor="annuelle" className={`block  cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#7E5240] peer-checked:font-bold peer-checked:text-white`}>Annuelle</label>
                            </div>
                            <div>
                                <input type="radio" id="jamais" name="alerte" checked={delayAlert == "jamais"} onChange={event => setDelayAlert(event.target.value)} value="jamais" className="peer hidden" />
                                <label htmlFor="jamais" className={`block  cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#7E5240] peer-checked:font-bold peer-checked:text-white`}>Jamais</label>
                            </div>
                        </div>
                        {
                            delayAlert && <button type="submit" className="inline bg-blue self-end w-28 h-10 flex justify-center items-center">Modifier</button>
                        }
                    </form>
                </div>

                <div className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-200 p-4 rounded-lg">
                    {errorPasswod && <div className="text-red">{errorPasswod}</div>}
                    <p className="text-sm mb-3">Changer de mot de passe</p>
                    <form className="flex flex-col" onSubmit={handlePasswordSubmit}>
                        <div className="grid grid-cols-1 rounded-xl bg-gray-200">
                            <div>
                                <label htmlFor="oldPassword" className={`block  select-none p-2`}>Ancien mot de passe</label>
                                <input type="password" id="oldPassword" className="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="oldPassword" onChange={event => setOldPassword(event.target.value)} value={oldPassword} />
                            </div>
                            <div>
                                <label htmlFor="newPassword" className={`block  select-none rounded-xl p-2 text-md`}>Nouveau mot de passe</label>
                                <input type="password" id="newPassword" className="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="newPassword" onChange={event => setNewPassword(event.target.value)} value={newPassword} />
                            </div>
                        </div>
                        {
                            oldPassword && newPassword && <button type="submit" className="bg-blue self-end w-28 h-10 flex justify-center items-center mt-2">Modifier</button>
                        }
                    </form>
                </div>

            </div>

        </div></main>
    </Layout>
}


export async function getServerSideProps(context) {
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
        props: { user: userResponseJson.data },
    };
}

export default AccountPage