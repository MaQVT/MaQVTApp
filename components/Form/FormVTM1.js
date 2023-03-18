import { useState } from "react";
import RadioNormal from "./RadioNormal";

export default function FormVTM1({
  handlePrev,
  handleNext,
  stepName,
  position,
  titleName,
}) {
  const [values, setValues] = useState({
    placeT: "4",
    vecuT: "4",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleNext({ [stepName]: values });
  };
  return (
    <div>
      <h2>{titleName}</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <RadioNormal name={"placeT"} handleChange={handleChange} />
        </div>
        <div>
          <h3>Comment est-ce que je le vis ?</h3>
          <RadioNormal name={"vecuT"} handleChange={handleChange} />
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
