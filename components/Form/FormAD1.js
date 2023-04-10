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
    <div className="h-full bg-rose_pr flex flex-col items-center">
      <h2 className="w-full font-bold text-6xl text-center font-MoonTime mt-5 text-customGray">
        {titleName}
      </h2>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-row justify-center items-start h-full font-bold text-6xl pt-20"
      >
        <div className="flex flex-col mb-20 justify-start items-center">
          <h2 className="font-thin text-3xl my-6 mt-0 font-PlayfairDisplay text-customGray">
            Ma disponibilité
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
                className="block mt-[119px] mr-6 cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-red-500"
              >
                <img className="" src="/form/moins.png" alt="-" />
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
                className="block cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-red-500"
              >
                <img className="" src="/form/egal.png" alt="=" />
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
                className="block mt-[119px] ml-6 cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-red-500"
              >
                <img className="" src="/form/plus.png" alt="+" />
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-20 justify-start items-center w-full">
          <h2 className="font-thin text-3xl my-6 mt-0 font-PlayfairDisplay text-customGray">
            Ma Motivation
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
                className="block my-4 cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-red-500"
              >
                <img src="/form/motivation4.png" alt="4" />
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
                className="block my-4 cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-red-500"
              >
                <img src="/form/motivation3.png" alt="3" />
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
                className="block my-4 cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-red-500"
              >
                <img src="/form/motivation2.png" alt="2" />
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
                className="block my-4 cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-red-500"
              >
                <img src="/form/motivation1.png" alt="1" />
              </label>
            </div>
          </div>
        </div>
      </form>
      <div className="absolute bottom-[30px]">
        {(position > 0 || position == -1) && (
          <button
            type="button"
            onClick={handlePrev}
            className="w-[100px] h-[50px] rounded"
          >
            Précédant
          </button>
        )}
        <button
          onClick={handleFormSubmit}
          className="w-[100px] h-[50px] rounded mx-40"
          type="submit"
        >
          {position == -1 ? "Terminer" : "Suivant"}
        </button>
      </div>
    </div>
  );
}
