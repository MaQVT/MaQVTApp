import { useState } from 'react'
import RadioNormal from './RadioNormal'
import RadioVie from './RadioVie'

export default function Form({ handlePrev, handleChange, handleFormSubmit, position }) {
  

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div>
          <h3 className='font-thin text-3xl mt-5 font-Benedict text-customGray'>Dans l&apos;idéal, est-ce important pour moi ?</h3>
          <RadioNormal name={"ideal"} handleChange={handleChange} color={"#7E5240"} />
        </div>
        <div>
          <h3 className='font-thin text-3xl mt-5 font-Benedict text-customGray'>Dans mon travail actuel, est-ce le cas ?</h3>
          <RadioNormal name={"actu"} handleChange={handleChange} color={"#7E5240"} />
        </div>
        <div>
          <h3 className='font-thin text-3xl mt-5 font-Benedict text-customGray'>Comment est-ce que je le vis ?</h3>
          <RadioVie name={"vecu"} handleChange={handleChange} color={"#FE06FF"} />
        </div>
      </form>
      <div className='absolute bottom-[30px] '>
          {(position > 0 || position == -1) && (
            <button type="button" onClick={handlePrev} className="w-[100px] h-[50px] rounded">
              Précédant
            </button>
          )}
          <button onClick={handleFormSubmit} className="w-[100px] h-[50px] rounded mx-40" type="submit">{position == -1 ? "Terminer" : "Suivant"}</button>
      </div>
    </>
  )
}
