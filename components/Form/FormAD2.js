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
    window.scrollTo(0, 0)
    handleNext({ [stepName]: values });
  };
  return (
    <div className="h-full flex flex-col items-center md:px-5">
      <h2 className="w-full font-bold text-6xl text-center font-MoonTime mt-5 text-customGray md:text-5xl md:mt-10">
        {titleName}
      </h2>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-row h-full w-full justify-around font-bold text-6xl pt-20 sm:flex-col"
      >
        <div className="flex flex-col mb-20 justify-start items-center">
          <h2 className="font-thin text-3xl my-6 mt-0 font-PlayfairDisplay text-customGray sm:text-lg sm:text-center">
            Mon état physique
          </h2>
          <div className="flex p-10 text-base items-center gap-6 justify-center" id="physique">
            <div className="">
              <div className="flex">
                <label
                  htmlFor="physique8"
                  className=""
                >
                  8
                </label>
                <input
                  type="radio"
                  id="physique8"
                  name="physique"
                  value="8"
                  defaultChecked
                  onChange={handleChange}
                  className=""
                />
              </div>
              <div className="flex">
                <label
                  htmlFor="physique7"
                  className=""
                >
                  7
                </label>
                <input
                  type="radio"
                  id="physique7"
                  name="physique"
                  value="7"
                  onChange={handleChange}
                  className=""
                />
              </div>
              <div className="flex">
                <label
                  htmlFor="physique6"
                  className=""
                >
                  6
                </label>
                <input
                  type="radio"
                  id="physique6"
                  name="physique"
                  value="6"
                  onChange={handleChange}
                  className=""
                />
              </div>
              <div className="flex">
                <label
                  htmlFor="physique5"
                  className=""
                >
                  5
                </label>
                <input
                  type="radio"
                  id="physique5"
                  name="physique"
                  value="5"
                  onChange={handleChange}
                  className=""
                />
              </div>
            </div>
            <div className="">
              <div className="flex">
                <input
                  type="radio"
                  id="physique4"
                  name="physique"
                  value="4"
                  onChange={handleChange}
                  className=""
                />
                <label
                  htmlFor="physique4"
                  className=""
                >
                  4
                </label>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  id="physique3"
                  name="physique"
                  value="3"
                  onChange={handleChange}
                  className=""
                />
                <label
                  htmlFor="physique3"
                  className=""
                >
                  3
                </label>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  id="physique2"
                  name="physique"
                  value="2"
                  onChange={handleChange}
                  className=""
                />
                <label
                  htmlFor="physique2"
                  className=""
                >
                  2
                </label>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  id="physique1"
                  name="physique"
                  value="1"
                  onChange={handleChange}
                  className=""
                />
                <label
                  htmlFor="physique1"
                  className=""
                >
                  1
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-20 justify-start">
          <h2 className="font-thin text-3xl my-6 mt-0 font-PlayfairDisplay text-customGray sm:text-lg text-center">
            Mon état émotionnel
          </h2>
          <div className="flex gap-10 justify-center sm:flex-wrap">
            <div className="flex flex-col justify-center">
              <input
                type="radio"
                id="emotionnel0"
                name="emotionnel"
                value="0"
                onChange={handleChange}
                defaultChecked
              />
              <label htmlFor="emotionnel0">
                <img className="h-16 bg-white rounded-full" src="/form/starte0.png" alt="4" />
              </label>
            </div>
            <div className="flex flex-col justify-center">
              <input
                type="radio"
                id="emotionnel1"
                name="emotionnel"
                value="1"
                onChange={handleChange}
                defaultChecked
              />
              <label htmlFor="emotionnel1">
                <img className="h-16 bg-white rounded-full" src="/form/starte1.png" alt="4" />
              </label>
            </div>
            <div className="flex flex-col justify-center">
              <input
                type="radio"
                id="emotionnel2"
                name="emotionnel"
                onChange={handleChange}
                value="2"
              />
              <label htmlFor="emotionnel2">
                <img className="h-16 bg-white rounded-full" src="/form/starte2.png" alt="3" />
              </label>
            </div>
            <div className="flex flex-col justify-center">
              <input
                type="radio"
                id="emotionnel3"
                name="emotionnel"
                onChange={handleChange}
                value="3"
              />
              <label htmlFor="emotionnel3">
                <img className="h-16 bg-white rounded-full" src="/form/starte3.png" alt="2" />
              </label>
            </div>
            <div className="flex flex-col justify-center">
              <input
                type="radio"
                id="emotionnel4"
                name="emotionnel"
                onChange={handleChange}
                value="4"
              />
              <label htmlFor="emotionnel4">
                <img className="h-16 bg-white rounded-full" src="/form/starte4.png" alt="1" />
              </label>
            </div>
            <div className="flex flex-col justify-center">
              <input
                type="radio"
                id="emotionnel5"
                name="emotionnel"
                onChange={handleChange}
                value="1"
              />
              <label htmlFor="emotionnel5">
                <img className="h-16 rounded-full" src="/form/starteq.png" alt="1" />
              </label>
            </div>
          </div>
        </div>
      </form>
      <div className="absolute bottom-[110px] md:relative md:bottom-0 md:mb-10">
        {(position > 0 || position == -1) && (
          <button
            type="button"
            onClick={handlePrev}
            className="w-[100px] h-[50px] rounded"
          >
            Précédent
          </button>
        )}
        <button
          onClick={handleFormSubmit}
          className="w-[100px] h-[50px] rounded mx-40 sm:mx-5"
          type="submit"
        >
          {position == -1 ? "Terminer" : "Suivant"}
        </button>
      </div>
    </div>
  );
}
