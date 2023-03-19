import { useState } from "react";

export default function FormAD1({
  handlePrev,
  handleNext,
  stepName,
  position,
  titleName,
}) {
  const [values, setValues] = useState({
    dispo: "2",
    motivation: "4",
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
        <div className="flex justify-around gap-28">
          <div>
            <h2>Ma disponibilité</h2>
            <div className="flex">
              <div className="flex">
                <label htmlFor="dispo1">
                  <img className="h-12" src="./form/moins.png" alt="-" />
                </label>
                <input type="radio" id="dispo1" name="dispo" value="1" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="dispo2">
                  <img className="h-12" src="./form/egal.png" alt="=" />
                </label>
                <input type="radio" id="dispo2" name="dispo" value="2" defaultChecked />
              </div>
              <div className="flex">
                <input type="radio" id="dispo3" name="dispo" value="3" />
                <label htmlFor="dispo3">
                  <img className="h-12" src="./form/plus.png" alt="+" />
                </label>
              </div>
            </div>
          </div>
          <div>
            <h2>Ma Motivation</h2>
            <div>
              <div className="flex flex-col justify-center">
                <label htmlFor="motivation1">
                  <img src="./form/motivation4.png" alt="4" />
                </label>
                <input
                  type="radio"
                  id="motivation1"
                  name="motivation"
                  value="4"
                  defaultChecked
                />
              </div>
              <div className="flex flex-col justify-center">
                <label htmlFor="motivation2">
                  <img src="./form/motivation3.png" alt="3" />
                </label>
                <input
                  type="radio"
                  id="motivation2"
                  name="motivation"
                  value="3"
                />
              </div>
              <div className="flex flex-col justify-center">
                <label htmlFor="motivation3">
                  <img src="./form/motivation2.png" alt="2" />
                </label>
                <input
                  type="radio"
                  id="motivation3"
                  name="motivation"
                  value="2"
                />
              </div>
              <div className="flex flex-col justify-center">
                <label htmlFor="motivation4">
                  <img src="./form/motivation1.png" alt="1" />
                </label>
                <input
                  type="radio"
                  id="motivation4"
                  name="motivation"
                  value="1"
                />
              </div>
            </div>
          </div>
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
