import { useState } from "react";

export default function FormAD2({
  handlePrev,
  handleNext,
  stepName,
  position,
  titleName,
}) {
  const [values, setValues] = useState({
    physique: "8",
    emotionnel: "1",
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
            <h2>Mon état physique</h2>
            <div className="flex p-10" id="physique">
              
              <div>
                <div className="flex">
                  <label htmlFor="physique8">8</label>
                  <input type="radio" id="physique8" name="physique" value="8" defaultChecked />
                </div>
                <div className="flex">
                  <label htmlFor="physique7">7</label>
                  <input type="radio" id="physique7" name="physique" value="7" />
                </div>
                <div className="flex">
                  <label htmlFor="physique6">6</label>
                  <input type="radio" id="physique6" name="physique" value="6" />
                </div>
                <div className="flex">
                  <label htmlFor="physique5">5</label>
                  <input type="radio" id="physique5" name="physique" value="5" />
                </div>
              </div>
              <div>
                <div className="flex">
                  <input type="radio" id="physique4" name="physique" value="4" />
                  <label htmlFor="physique4">4</label>
                </div>
                <div className="flex">
                  <input type="radio" id="physique3" name="physique" value="3" />
                  <label htmlFor="physique3">3</label>
                </div>
                <div className="flex">
                  <input type="radio" id="physique2" name="physique" value="2" />
                  <label htmlFor="physique2">2</label>
                </div>
                <div className="flex">
                  <input type="radio" id="physique1" name="physique" value="1" />
                  <label htmlFor="physique1">1</label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2>Mon état émotionnel</h2>
            <div className="flex gap-10">
              <div className="flex flex-col justify-center">
                <input
                  type="radio"
                  id="emotionnel1"
                  name="emotionnel"
                  value="1"
                  defaultChecked
                />
                <label htmlFor="emotionnel1">
                  <img className="h-12" src="./form/star0.png" alt="4" />
                </label>
              </div>
              <div className="flex flex-col justify-center">
                <input
                  type="radio"
                  id="emotionnel2"
                  name="emotionnel"
                  value="2"
                />
                <label htmlFor="emotionnel2">
                  <img className="h-12" src="./form/star1.png" alt="3" />
                </label>
              </div>
              <div className="flex flex-col justify-center">
                <input
                  type="radio"
                  id="emotionnel3"
                  name="emotionnel"
                  value="3"
                />
                <label htmlFor="emotionnel3">
                  <img className="h-12" src="./form/star1.png" alt="2" />
                </label>
              </div>
              <div className="flex flex-col justify-center">
                <input
                  type="radio"
                  id="emotionnel4"
                  name="emotionnel"
                  value="4"
                />
                <label htmlFor="emotionnel4">
                  <img className="h-12" src="./form/star2.png" alt="1" />
                </label>
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
