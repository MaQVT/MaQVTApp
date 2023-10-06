import { useState } from "react";
import RadioNormal from "./RadioNormal";

export default function FormVTM2({ handlePrev, handleNext, stepName, position, titleName, pageNumber }) {
  const [values, setValues] = useState({
    sensation: '4',
    motivation: '4',
    souhait: '4',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const selectedOptions = document.querySelectorAll('input[type="radio"]:checked');
    if (selectedOptions.length < 3) {
      alert('Veuillez sélectionner une option pour chaque question.'); // Display error message
    }else{
      window.scrollTo(0, 0)
      handleNext({ [stepName]: values });
    }
  }
  return (
    <div className="h-full flex flex-col" >
      {/* <h2 className="w-full font-bold text-6xl">La vie au travail et moi</h2> */}
      <form onSubmit={handleFormSubmit}
        className="flex flex-col justify-center items-center flex-1"
      >
        <h2 className="font-thin text-3xl my-3 mt-0 font-PlayfairDisplay text-customGray md:text-2xl md:mt-10 md:px-6 md:text-center w-[800px] md:w-auto">
        <span className="text-purple-800 font-Benedict mr-8 text-5xl">{pageNumber}</span>
        De manière générale, ces temps-ci
          </h2>
        <div className="m-4 sm:flex sm:flex-col sm:justify-center sm:items-center">
          <h3 className="font-thin text-xl my-3 mt-0 font-AnticDidone text-customGray">a{")"} Je prends plaisir à travailler</h3>
          <RadioNormal name={"sensation"} handleChange={handleChange} color={"#7E5240"} />
        </div>
        <div className="m-4 sm:flex sm:flex-col sm:justify-center sm:items-center">
          <h3 className="font-thin text-xl my-3 mt-0 font-AnticDidone text-customGray">b{")"} Je suis satisfait·e des résultats de mon travail</h3>
          <RadioNormal name={"motivation"} handleChange={handleChange} color={"#7E5240"} />
        </div>
        <div className="m-4 sm:flex sm:flex-col sm:justify-center sm:items-center">
          <h3 className="font-thin text-xl my-3 mt-0 font-AnticDidone text-customGray">c{")"} Je souhaite à quiconque d’occuper mon poste</h3>
          <RadioNormal name={"souhait"} handleChange={handleChange} color={"#7E5240"} />
        </div>
        <div className='bottom-[110px] md:relative md:bottom-0 md:mb-10 mb-5'>
          {(position > 0 || position == -1) && (
            <button type="button" onClick={handlePrev} className="w-[100px] h-[50px] rounded">
              Précédent
            </button>
          )}
          <button onClick={handleFormSubmit} className="w-[100px] h-[50px] rounded mx-40 sm:mx-5" type="submit">{position == -1 ? "Terminer" : "Suivant"}</button>
          </div>
      </form>
    </div>
  );
}
