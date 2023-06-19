import { useState } from 'react';
import { getMailAdminTemplate } from '../../utils/getMailTemplate';

const AskQuestionForm = () => {
    const [question, setQuestion] = useState('');
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem("email");
        const username = localStorage.getItem("username");

        const requestBody = {
            // from: email,
            subject: `${username} : Demande de question non trouvée en FAQ`,
            text: getMailAdminTemplate(`De: ${username} : ${email}`, question, "", ""),
        };

        fetch("/api/user/sendMail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (response.ok) {
                    // Send a JSON response with a success message
                    setQuestion("");
                    setSent(true);
                    setTimeout(() => {
                        setSent(false);
                    }, 10000);
                } else {
                    throw new Error("Failed to send email");
                }
            })
            .catch((error) => {
                console.error(error);
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 3000);
            });

    };

    return (
        <div className='flex flex-col gap-2 w-[80%] mx-10 my-8'>
            <hr />
            <h2>Si vous n’avez pas trouvé la réponse à votre question dans la FAQ, écrivez-nous ici : </h2>
            <form className='flex flex-col gap-2'>
                <div>
                    <label htmlFor="question"></label>
                    <input
                        className='w-full py-2 px-10'
                        type="text"
                        id="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>
                <button onClick={(e) => handleSubmit(e)} className='w-max px-3 py-2'>Envoyer ma question</button>
                {sent && <span className='text-base text-stone-600 block text-center'>Votre question a été bien envoyée</span>}
                {error && <span className='text-base text-red-600 block text-center'>Erreur lors de l&apos;envoie, veuiller réessayer ultérieurement !!</span>}
            </form>
        </div>
    );
};

export default AskQuestionForm;
