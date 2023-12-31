import Image from "next/image";
import Head from "next/head";
import { Inter } from "@next/font/google";
import cookies from "next-cookies";
import { useState, useEffect } from "react";
import { verifyJwt } from "../utils/jwt";
import { useRouter } from "next/router";
import Layout from "./layout";
import styles from "/styles/Home.module.css";
import moment from "moment";
import AskSubForm from "../components/Form/AskSubscription";
import 'moment/locale/fr';
const inter = Inter({ subsets: ["latin"] });

function AccountPage({ user }) {
    let router = useRouter()
    const [delayAlert, setDelayAlert] = useState(user.delay_mail)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
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
        // console.log(response.ok)
        if (response.ok) {
            // console.log("Email rescheduled")
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
            body: JSON.stringify({ userId: user._id, role: user.role, email: user.email, username: user.username }),
        });
        // console.log(response.ok)
        if (response.ok) {
            // console.log("Email rescheduled")
        }
    }

    async function handleAllMaillingServiceRestart() {
        if (confirm("Confirmer la réinitialisation du programme d'envoie de mails automatiques.")) {
            await handleFrequenceUserAdmin()
            await handle2MonthFrequenceMailUserAdmin()
        }
    }

    async function deleteDiagnostics() {
        const token = localStorage.getItem("token");

        if (!confirm("Confirmer la réïnitialisation des données. Tous les diagnostics QVT personnelles et collectives de l'application seront supprimées.")) {
            return
        }

        // Delete diagnostics
        const deleteDiagnosticResponse = await fetch("/api/diagnostic", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                token: token
            }
        });

        // Delete coldiagnostics
        const deleteColdiagnosticResponse = await fetch("/api/coldiagnostic", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                token: token
            }
        });

        if (deleteDiagnosticResponse.ok && deleteColdiagnosticResponse.ok) {
            console.log("Réïnitialisation réussi.");
            alert("Réïnitialisation réussi.")
        } else {
            console.log("Erreur lors de la réïnitialisation.");
            alert("Erreur lors de la réïnitialisation.")
        }
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
        // console.log(response.ok)
        if (response.ok) {
            // console.log("Email rescheduled")
        }
    }

    const [error, setError] = useState("")
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (confirm("Confirmez le changement de la fréquence de rappel pour un auto-diagnostic QVT personnelle")) {
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
    }
    const handlePasswordSubmit = async (event) => {
        event.preventDefault()
        if(newPassword != confirmNewPassword){
            setErrorPassword("Erreur de correspondance des mots de passe. Veuillez vous assurer qu'ils sont identiques.")
            return
        }
        if (confirm("Confirmez le désir de changement du mot de passe")) {
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
    }

    useEffect(() => {
        moment.locale('fr');
    }, [])

    return <>
        <Head>
            <title>Profil</title>

            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout user={user}>
            <main className={styles.main}>
                <div className="w-screen min-h-screen flex flex-col items-center md:flex-col md:items-center md:px-5">
                    <div className="w-screen flex flex-row py-20 px-32 md:flex-col md:items-center md:px-5">
                        <div className="flex flex-col basis-1/3 justify-center items-center">
                            <Image
                                src={user.avatar || "/pp.png"}
                                alt="avatar"
                                width={200}
                                height={200}
                                style={{ borderRadius: 20 }}
                                className="h-[200px] w-[200px] sm:h-[100px] sm:w-[100px] mb-5 bg-white"
                            />
                            {user.role == "Admin" && <button onClick={handleAllMaillingServiceRestart} className="bg-[#56051A] px-5 h-15 mb-5" title="Ce bouton permet de rétablir les paramètres et configurations par défaut du service de emailing de cette application. Il est utilisé lors de chaque déploiement ou lors de la mise en service du site pour garantir un bon fonctionnement.">Réinitialiser tous les services de Mails</button>}
                            {user.role == "Admin" && <button onClick={deleteDiagnostics} className="bg-[#56051A] px-5 h-15 mb-5" title="Ce bouton vous permet de réinitialiser les statistiques de diagnostic QVT de cette application. En cliquant sur ce bouton, toutes les données de diagnostic seront effacées, ce qui vous permettra de repartir sur une base vierge.">Réïnitialiser les Statistiques</button>}

                        </div>
                        <div className="flex flex-col flex-grow space-y-2 md:items-center md:text-center">
                            <div className="md:items-center py-4">
                                <span className="text-orange-800 block text-xl font-bold py-2">
                                    Statut : {user.role == "User" ? "Utilisateur" : user.role}
                                </span>
                                <span className="font-Trocchi block text-xl font-bold py-2">
                                    Nom du compte : {user.username}
                                </span>
                                <span className="text-xs block">
                                    Adresse email : {user.email}
                                </span>
                                <span className="text-xs block">
                                    Date de création du compte : {moment(user.date).format('D MMMM YYYY  HH:mm:ss')}
                                </span>
                                <span className="text-xs font-bold block">
                                    Date de fin de validité : {moment(user.expired_date).format('D MMMM YYYY  HH:mm:ss')}
                                </span>
                            </div>
                            {(user.role == "Manager" || user.role == "User") &&
                                <div className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-white bg-opacity-60 border border-gray-200 p-4 rounded-lg">
                                    {error && <div className="text-red-600">{error}</div>}
                                    <p className="text-sm">A quelle fréquence souhaitez-vous être notifié.e par l&apos;Application afin de réaliser un nouvel auto-diagnostic QVT personnelle ?</p>
                                    <form className="flex flex-col" onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-5 my-4 space-x-2 rounded-xl bg-gray-200 p-2 md:grid-cols-1">
                                            <div>
                                                <input type="radio" id="mensuelle" name="alerte" checked={delayAlert == "mensuelle"} value="mensuelle" onChange={event => setDelayAlert(event.target.value)} className="peer hidden" />
                                                <label htmlFor="mensuelle" className={`block  cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#7E5240] peer-checked:font-bold peer-checked:text-white`}>Mensuelle</label>
                                            </div>
                                            <div>
                                                <input type="radio" id="trimestrielle" name="alerte" checked={delayAlert == "trimestrielle"} onChange={event => setDelayAlert(event.target.value)} value="trimestrielle" className="peer hidden" />
                                                <label htmlFor="trimestrielle" className={`block  cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#7E5240] peer-checked:font-bold peer-checked:text-white`}>Trimestrielle</label>
                                            </div>
                                            <div>
                                                <input type="radio" id="semestrielle" name="alerte" checked={delayAlert == "semestrielle"} onChange={event => setDelayAlert(event.target.value)} value="semestrielle" className="peer hidden" />
                                                <label htmlFor="semestrielle" className={`block  cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#7E5240] peer-checked:font-bold peer-checked:text-white`}>Semestrielle</label>
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
                                            (delayAlert != user.delay_mail) && <button type="submit" className="inline bg-blue self-end w-28 h-10 flex justify-center items-center">Modifier</button>
                                        }
                                    </form>
                                </div>
                            }

                            <div className="bg-clip-padding w-full backdrop-filter bg-white  backdrop-blur-xl bg-opacity-60 border border-gray-200 p-4 rounded-lg">
                                {errorPasswod && <div className="text-red-600">{errorPasswod}<br /><br /></div>}
                                <p className="text-sm mb-3">Changer de mot de passe</p>
                                <form className="flex flex-col" onSubmit={handlePasswordSubmit}>
                                    <div className="grid grid-cols-1 rounded-xl bg-gray-200">
                                        <div>
                                            <label htmlFor="oldPassword" className={`block  select-none p-2`}>Ancien mot de passe</label>
                                            <input type="password" id="oldPassword" autocomplete="off" className="w-[97%] md:w-[95%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="oldPassword" onChange={event => setOldPassword(event.target.value)} value={oldPassword} />
                                        </div>
                                        <div>
                                            <label htmlFor="newPassword" className={`block  select-none rounded-xl p-2 text-md`}>Nouveau mot de passe</label>
                                            <input type="password" id="newPassword" autocomplete="off" className="w-[97%] md:w-[95%] bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="newPassword" onChange={event => setNewPassword(event.target.value)} value={newPassword} />
                                        </div>
                                        <div>
                                            <label htmlFor="confirmNewPassword" className={`block  select-none rounded-xl p-2 text-md`}>Confirmer le nouveau mot de passe</label>
                                            <input type="password" id="confirmNewPassword" autocomplete="off" className="w-[97%] md:w-[95%] bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="newPassword" onChange={event => setConfirmNewPassword(event.target.value)} value={confirmNewPassword} />
                                        </div>
                                    </div>
                                    {
                                        oldPassword && newPassword && confirmNewPassword && <button type="submit" className="bg-blue self-end w-28 h-10 flex justify-center items-center mt-2">Modifier</button>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                    {user.role == "Client" &&
                        <AskSubForm />
                    }
                </div>
            </main>
        </Layout>
    </>
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