import { useState } from 'react'
import RadioNormal from './RadioNormal'
import RadioVie from './RadioVie'
import RadioNormalBis from './RadioNormalBis'

export default function Form({ handlePrev, handleChange, handleFormSubmit, position }) {
  
  const handleFormSubmitInit = () => {
    const selectedOptions = document.querySelectorAll('input[type="radio"]:checked');
    if (selectedOptions.length < 3) {
      alert('Veuillez sélectionner une option pour chaque question.'); // Display error message
    }else{
      handleFormSubmit()
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmitInit}>
        <div className='sm:flex sm:flex-col sm:items-center'>
          <h3 className='font-thin text-3xl mt-5 font-Benedict text-customGray sm:mx-5 sm:text-center'>Dans l&apos;idéal, est-ce important pour moi ?</h3>
          <RadioNormal name={"ideal"} handleChange={handleChange} color={"#7E5240"} />
        </div>
        <div className='sm:flex sm:flex-col sm:items-center'>
          <h3 className='font-thin text-3xl mt-5 font-Benedict text-customGray sm:mx-5 sm:text-center'>Dans mon travail actuel, est-ce le cas ?</h3>
          <RadioNormalBis name={"actu"} handleChange={handleChange} color={"#7E5240"} />
        </div>
        <div className='sm:flex sm:flex-col sm:items-center'>
          <h3 className='font-thin text-3xl mt-5 font-Benedict text-customGray sm:mx-5 sm:text-center'>Comment est-ce que je le vis ?</h3>
          <RadioVie name={"vecu"} handleChange={handleChange} color={"#FE06FF"} />
        </div>
      </form>
      <div className='absolute bottom-[110px] md:relative md:bottom-0 md:mb-10 md:mt-5'>
          {(position > 0 || position == -1) && (
            <button type="button" onClick={handlePrev} className="w-[100px] h-[50px] rounded">
              Précédent
            </button>
          )}
          <button onClick={handleFormSubmitInit} className="w-[100px] h-[50px] rounded mx-40 sm:mx-5" type="submit">{position == -1 ? "Terminer" : "Suivant"}</button>
      </div>
    </>
  )
}
