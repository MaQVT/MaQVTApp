import { useState } from "react";
import RadioNormal from "./RadioNormal";

export default function FormVTM2({ handlePrev, handleNext, stepName, position, titleName }) {
  const [values, setValues] = useState({
    sensation: '4',
    motivation: '4',
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
          <h3>a{")"} Est-ce que je me sens bien au travail ?</h3>
          <hr />
          <RadioNormal name={"sensation"} handleChange={handleChange} />
        </div>
        <div>
          <h3>b{")"} Est-ce que je suis motivé.e par mon travail ?</h3>
          <hr />
          <RadioNormal name={"motivation"} handleChange={handleChange} />
        </div>
        {(position > 0 || position == -1) && (
          <button type="button" onClick={handlePrev}>
            Précédant
          </button>
        )}
        <button type="submit">{position == -1 ? "Terminer" : "Suivant"}</button>
      </form>
    </div>
  );
}
