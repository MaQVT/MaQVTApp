import { useRouter } from 'next/router';
import { useState } from 'react';

const AddFaqForm = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [color, setColor] = useState("red");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter()
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responses = await fetch('/api/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token: localStorage.getItem("token") },
        body: JSON.stringify({ question, response }),
      });
      if (responses.ok) {
        // FAQ added successfully, perform any necessary actions (e.g., display success message, update FAQ list)
        console.log('FAQ added successfully');
        // Clear the form inputs
        setQuestion('');
        setResponse('');
        setColor("stone");
        setErrorMessage("Ajout réussi");
        setTimeout(() => {
          setErrorMessage("");
          router.reload()
        }, 2000);
      } else {
        // Handle error case if the FAQ was not added successfully
        console.error('Failed to add FAQ');
      }
    } catch (error) {
      setColor("red");
      setErrorMessage("Un problème est survenu lors de l'ajout de la FAQ");
      console.error('Error adding FAQ:', error);
    }
  };

  return (
    <div className='flex flex-col gap-2 w-[80%] mx-10 my-8'>
      <hr />
      {errorMessage && <><p className={`py-5 text-${color}-600`}>{errorMessage}</p><br /></>}
      <h2>Ajouter une nouvelle question/réponse au sein de la FAQ</h2>
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
        <div>
          <label htmlFor="response">Réponse:</label>
          <input
            className='w-full py-2 px-10'
            type="text"
            id="response"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            required
          />
        </div>
        <button onClick={(e) => handleSubmit(e)} className='w-max px-3 py-2'> Ajouter à la FAQ</button>
      </form>
    </div>
  );
};

export default AddFaqForm;
