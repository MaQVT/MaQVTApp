import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const QvtForm = ({ handleNext, handlePrev, position, user }) => {
    const [frequency, setFrequency] = useState('jamais');
    const [collectiveSynthesis, setCollectiveSynthesis] = useState(false);
    const [consultantAccess, setConsultantAccess] = useState(false);
    const [rating, setRating] = useState("3");

    async function handleFrequenceUser() {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/user/scheduleAutoDiagMail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
            body: JSON.stringify({ userId: user._id, role: user.role, email: user.email, scheduleName: frequency }),
        });
        console.log(response.ok)
        if (response.ok) {
            console.log("Email rescheduled")
        }
    }

    const handleFrequence = async () => {
        const token = localStorage.getItem("token");
        let data = {
            "delay_mail": frequency
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
            console.log("Fréquence modifiée")
        } else {
            console.log("Erreur lors de la modification de la fréquence")
        }
    }

    const handleFrequencyChange = (e) => {
        setFrequency(e.target.value);
    };

    const handleCollectiveSynthesisChange = (e) => {
        setCollectiveSynthesis(e.target.value === 'Oui');
    };

    const handleConsultantAccessChange = (e) => {
        setConsultantAccess(e.target.value === 'Oui');
    };

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let status;
        if (!collectiveSynthesis && !consultantAccess) {
            status = "private";
        } else if (!collectiveSynthesis) {
            status = "consultant";
        } else {
            status = "public"
        }
        const formData = {
            frequency,
            collectiveSynthesis,
            consultantAccess,
            rating,
            status
        };
        // Call API to submit form data
        await handleFrequence();
        await handleFrequenceUser()
        console.log(formData);
        handleNext(formData);
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col text-center justify-center items-center h-full mt-20 md:mx-5 md:10'>
            <p className='font-MoonTime text-2xl'>
                Votre auto-diagnostic de QVT personnelle est fini. Retrouvez votre Rapport dans l’onglet “Consulter mes rapports QVT personnelle”.
            </p>
            <p className='font-MoonTime text-2xl'>
                Réalisez un nouvel auto-diagnostic dès que vous en ressentez le besoin, <br /> et notamment lorsqu&apos;un élément significatif bouge dans votre contexte personnel / professionnel.
            </p>
            <p className='text-lg font-Trocchi mt-5'>
                Choisissez la fréquence à laquelle être notifié·e :
            </p>
            <div className='flex justify-center sm:flex-wrap'>
                <div>
                    <input type="radio" id="hebdomadaire" name="frequency" value="hebdomadaire" checked={frequency === 'hebdomadaire'} onChange={handleFrequencyChange} />
                    <label htmlFor="hebdomadaire">Hebdomadaire</label>
                </div>
                <div>
                    <input type="radio" id="mensuelle" name="frequency" value="mensuelle" checked={frequency === 'mensuelle'} onChange={handleFrequencyChange} />
                    <label htmlFor="mensuelle">Mensuelle</label>
                </div>
                <div>
                    <input type="radio" id="trimestrielle" name="frequency" value="trimestrielle" checked={frequency === 'trimestrielle'} onChange={handleFrequencyChange} />
                    <label htmlFor="trimestrielle">Trimestrielle</label>
                </div>
                <div>
                    <input type="radio" id="annuelle" name="frequency" value="annuelle" checked={frequency === 'annuelle'} onChange={handleFrequencyChange} />
                    <label htmlFor="annuelle">Annuelle</label>
                </div>
                <div>
                    <input type="radio" id="jamais" name="frequency" value="jamais" checked={frequency === 'jamais'} onChange={handleFrequencyChange} />
                    <label htmlFor="jamais">Jamais</label>
                </div>
            </div>
            <p className='text-lg font-Trocchi mt-5'>
                J&apos;accepte que mes résultats soient transmis de manière anonyme pour éditer une synthèse collective :
            </p>
            <div className='flex justify-center'>
                <div>
                    <input type="radio" id="collective-oui" name="collective-synthesis" value="Oui" checked={collectiveSynthesis} onChange={handleCollectiveSynthesisChange} />
                    <label htmlFor="collective-oui">Oui</label>
                </div>
                <div>
                    <input type="radio" id="collective-non" name="collective-synthesis" value="Non" checked={!collectiveSynthesis} onChange={handleCollectiveSynthesisChange} />
                    <label htmlFor="collective-non">Non</label>
                </div>
            </div>
            <p className='text-lg font-Trocchi mt-5'>
                J&apos;accepte que mon consultant WUNJO ait accès à mes résultats :
            </p>
            <div className='flex justify-center'>
                <div>
                    <input type="radio" id="consultant-oui" name="consultant-access" value="Oui" checked={consultantAccess} onChange={handleConsultantAccessChange} />
                    <label htmlFor="consultant-oui">Oui</label>
                </div>
                <div>
                    <input type="radio" id="consultant-non" name="consultant-access" value="Non" checked={!consultantAccess} onChange={handleConsultantAccessChange} />
                    <label htmlFor="consultant-non">Non</label>
                </div>
            </div>
            <p className='text-lg font-Trocchi mt-5'>
                Comment avez-vous vécu cette expérience ?
            </p>
            <div className='flex justify-center'>
                <div className='flex hover:scale-110 hover:animate-pulse'>
                    <input type="radio" id="rating-1" name="rating" value="1" checked={rating === "1"} onChange={handleRatingChange} />
                    <label htmlFor="rating-1">
                        <FontAwesomeIcon
                            icon={faStar}
                            style={{ fontSize: 40, color: "#C81F2A" }}
                        />
                    </label>
                </div>
                <div className='flex hover:scale-110 hover:animate-pulse'>
                    <input type="radio" id="rating-2" name="rating" value="2" checked={rating === "2"} onChange={handleRatingChange} />
                    <label htmlFor="rating-2">
                        <FontAwesomeIcon
                            icon={faStar}
                            style={{ fontSize: 40, color: "#F4912E" }}
                        />
                    </label>
                </div>
                <div className='flex hover:scale-110 hover:animate-pulse'>
                    <input type="radio" id="rating-3" name="rating" value="3" checked={rating === "3"} onChange={handleRatingChange} />
                    <label htmlFor="rating-3">
                        <FontAwesomeIcon
                            icon={faStar}
                            style={{ fontSize: 40, color: "#F4C741" }}
                        />
                    </label>
                </div>
                <div className='flex hover:scale-110 hover:animate-pulse'>
                    <input type="radio" id="rating-4" name="rating" value="4" checked={rating === "4"} onChange={handleRatingChange} />
                    <label htmlFor="rating-4">
                        <FontAwesomeIcon
                            icon={faStar}
                            style={{ fontSize: 40, color: "#B5D930" }}
                        />
                    </label>
                </div>
                <div className='flex hover:scale-110 hover:animate-pulse'>
                    <input type="radio" id="rating-5" name="rating" value="5" checked={rating === "5"} onChange={handleRatingChange} />
                    <label htmlFor="rating-5">
                        <FontAwesomeIcon
                            icon={faStar}
                            style={{ fontSize: 40, color: "#84CE2F" }}
                        />
                    </label>
                </div>
            </div>
            <div className='absolute bottom-[110px] w-full md:relative md:bottom-0 md:mb-10 md:mt-10'>
                {(position > 0 || position == -1) && (
                    <button type="button" onClick={handlePrev} className="w-[100px] h-[50px] rounded">
                        Précédent
                    </button>
                )}
                <button type="submit" className="w-[100px] h-[50px] rounded mx-40 sm:mx-5">
                    {position == -1 ? "Terminer" : "Suivant"}
                </button>
            </div>
        </form>
    );
};

export default QvtForm;