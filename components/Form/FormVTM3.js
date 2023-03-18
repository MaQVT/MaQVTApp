import { useState } from 'react'
import RadioNormal from './RadioNormal'

export default function FormVTM3({ handlePrev, handleNext, stepName, position, titleName }) {
  const [values, setValues] = useState({
    vecuS: '4',
    vecuP: '4',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    handleNext({ [stepName]: values })
  }

  return (
    <div>
      <h2>{titleName}</h2>
    <form onSubmit={handleFormSubmit}>
      <div>
        <h3>c{")"} Est-ce que je vis une situation dégradée dans mon travail ?</h3>
        <hr />
        <RadioNormal name={"vecuS"} handleChange={handleChange} />
      </div>
      <div>
        <h3>d{")"} Est-ce que, dans ma vie personnelle, je vis une situation dégradée qui a un impact sur ma façon de voir/vivre le travail ?</h3>
        <hr />
        <RadioNormal name={"vecuP"} handleChange={handleChange} />
      </div>
      {(position > 0 || position == -1) && <button type="button" onClick={handlePrev}>Précédant</button>}
      <button type="submit">{position == -1 ? "Terminer" : "Suivant"}</button>
    </form>
    </div>
  )
}
