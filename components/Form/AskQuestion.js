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
            subject: `${username} : Demande de question non trouvé en FAQ`,
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
                    }, 3000);
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
            <h2>Poser une question à l&apos;admin</h2>
            <form className='flex flex-col gap-2'>
                <div>
                    <label htmlFor="question">Question:</label>
                    <input
                        className='w-full py-2 px-10'
                        type="text"
                        id="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>
                <button onClick={(e) => handleSubmit(e)} className='w-max px-3 py-2'>Envoyez la question</button>
                {sent && <span className='text-base text-green-600 block text-center'>Votre question a été bien envoyé !!</span>}
                {error && <span className='text-base text-red-600 block text-center'>Erreur lors de l&apos;envoie, veuiller réessayer ultérieurement !!</span>}
            </form>
        </div>
    );
};

export default AskQuestionForm;