import { useState } from 'react'
import RadioNormal from './RadioNormal'
import RadioVie from './RadioVie'

export default function Form({ handlePrev, handleChange, handleFormSubmit, position }) {
  

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <h3>Dans l&apos;idéal, est-ce important pour moi ?</h3>
        <RadioNormal name={"ideal"} handleChange={handleChange} />
      </div>
      <div>
        <h3>Dans mon travail actuel, est-ce le cas ?</h3>
        <RadioNormal name={"actu"} handleChange={handleChange} />
      </div>
      <div>
        <h3>Comment est-ce que je le vis ?</h3>
        <RadioVie name={"vecu"} handleChange={handleChange} />
      </div>
      {(position > 0 || position == -1) && <button type="button" onClick={handlePrev}>Précédant</button>}
      <button type="submit">{position == 2 ? "Terminer" : "Suivant"}</button>
    </form>
  )
}
