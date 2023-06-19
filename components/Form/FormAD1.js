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
    window.scrollTo(0, 0)
    handleNext({ [stepName]: values });
  };
  return (
    <div className="h-full w-full flex flex-col items-center md:px-5">
      <h2 className="w-full font-bold text-6xl text-center font-MoonTime mt-5 text-customGray md:text-5xl md:mt-10">
        {titleName}
      </h2>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-row justify-center items-start h-full font-bold text-6xl pt-20 sm:flex-col"
      >
        <div className="flex flex-col mb-20 justify-start items-center basis-1/2">
          <h2 className="font-thin text-2xl my-6 mt-0 font-PlayfairDisplay text-customGray sm:text-lg sm:text-center">
          Ma disponibilité à réaliser cet auto-diagnostic
          </h2>
          <div className="flex flex-row justify-center p-4">
            <div className="flex">
              <input
                type="radio"
                id="dispo1"
                name="dispo"
                value="1"
                className="peer hidden"
                onChange={handleChange}
              />
              <label
                htmlFor="dispo1"
                className="block mt-[119px] mr-6 cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-[#625240]"
              >
                <img className="" src="/form/moins.png" alt="Pas du tout disponible" title="Pas du tout disponible" />
              </label>
            </div>
            <div className="flex flex-col">
              <input
                type="radio"
                id="dispo2"
                name="dispo"
                value="2"
                className=" hidden peer "
                defaultChecked
                onChange={handleChange}
              />
              <label
                htmlFor="dispo2"
                className="block cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-[#625240]"
              >
                <img className="" src="/form/egal.png" alt="Moyennement disponible" title="Moyennement disponible" />
              </label>
            </div>
            <div className="flex">
              <input
                type="radio"
                id="dispo3"
                name="dispo"
                value="3"
                className="hidden peer"
                onChange={handleChange}
              />
              <label
                htmlFor="dispo3"
                className="block mt-[119px] ml-6 cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-[#625240]"
              >
                <img className="" src="/form/plus.png" alt="Tout à fait disponible" title="Tout à fait disponible" />
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-20 justify-start items-center w-full basis-1/2">
          <h2 className="font-thin text-2xl my-6 mt-0 font-PlayfairDisplay text-customGray sm:text-lg sm:text-center">
          Ma motivation à réaliser cet auto-diagnostic
          </h2>
          <div>
            <div className="flex flex-col justify-center">
              <input
                type="radio"
                id="motivation1"
                name="motivation"
                className="peer hidden"
                value="4"
                onChange={handleChange}
                defaultChecked
              />
              <label
                htmlFor="motivation1"
                className="block my-4 cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-[#625240]"
              >
                <img src="/form/motivation4.png" alt="Très motivé·e" title="Très motivé·e" />
              </label>
            </div>
            <div className="flex flex-col justify-center">
              <input
                type="radio"
                id="motivation2"
                name="motivation"
                className="peer hidden"
                onChange={handleChange}
                value="3"
              />
              <label
                htmlFor="motivation2"
                className="block my-4 cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-[#625240]"
              >
                <img src="/form/motivation3.png" alt="Plutôt motivé·e" title="Plutôt motivé·e" />
              </label>
            </div>
            <div className="flex flex-col justify-center">
              <input
                type="radio"
                id="motivation3"
                name="motivation"
                className="peer hidden"
                onChange={handleChange}
                value="2"
              />
              <label
                htmlFor="motivation3"
                className="block my-4 cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-[#625240]"
              >
                <img src="/form/motivation2.png" alt="Moyennement motivé·e" title="Moyennement motivé·e" />
              </label>
            </div>
            <div className="flex flex-col justify-center">
              <input
                type="radio"
                id="motivation4"
                name="motivation"
                className="peer hidden"
                onChange={handleChange}
                value="1"
              />
              <label
                htmlFor="motivation4"
                className="block my-4 cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-[#625240]"
              >
                <img src="/form/motivation1.png" alt="Pas du tout motivé·e" title="Pas du tout motivé·e" />
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
