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
    <div className="h-full bg-rose_pr flex flex-col items-center">
      <h2 className="w-full font-bold text-6xl text-center font-MoonTime mt-5 text-customGray">
        {titleName}
      </h2>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-row h-full w-full justify-around font-bold text-6xl pt-20"
      >
        <div className="flex flex-col mb-20 justify-start items-center">
          <h2 className="font-thin text-3xl my-6 mt-0 font-PlayfairDisplay text-customGray">
            Mon état physique
          </h2>
          <div className="flex p-10 flex-col" id="physique">
            <div className="flex flex-row my-4">
              <div className="flex mx-4">
                <input
                  type="radio"
                  id="physique8"
                  name="physique"
                  value="8"
                  defaultChecked
                  onChange={handleChange}
                  className="peer hidden"
                />
                <label
                  htmlFor="physique8"
                  className="block my-4 cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-red-500"
                >
                  8
                </label>
              </div>
              <div className="flex mx-4">
                <input
                  type="radio"
                  id="physique7"
                  name="physique"
                  value="7"
                  onChange={handleChange}
                  className="peer hidden"
                />
                <label
                  htmlFor="physique7"
                  className="block my-4 cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-red-500"
                >
                  7
                </label>
              </div>
              <div className="flex mx-4">
                <input
                  type="radio"
                  id="physique6"
                  name="physique"
                  value="6"
                  onChange={handleChange}
                  className="peer hidden"
                />
                <label
                  htmlFor="physique6"
                  className="block my-4 cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-red-500"
                >
                  6
                </label>
              </div>
              <div className="flex mx-4">
                <input
                  type="radio"
                  id="physique5"
                  name="physique"
                  value="5"
                  onChange={handleChange}
                  className="peer hidden"
                />
                <label
                  htmlFor="physique5"
                  className="block my-4 cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-red-500"
                >
                  5
                </label>
              </div>
            </div>
            <div className="flex flex-row my-4">
              <div className="flex mx-4">
                <input
                  type="radio"
                  id="physique4"
                  name="physique"
                  value="4"
                  onChange={handleChange}
                  className="peer hidden"
                />
                <label
                  htmlFor="physique4"
                  className="block my-4 cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-red-500"
                >
                  4
                </label>
              </div>
              <div className="flex mx-4">
                <input
                  type="radio"
                  id="physique3"
                  name="physique"
                  value="3"
                  onChange={handleChange}
                  className="peer hidden"
                />
                <label
                  htmlFor="physique3"
                  className="block my-4 cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-red-500"
                >
                  3
                </label>
              </div>
              <div className="flex mx-4">
                <input
                  type="radio"
                  id="physique2"
                  name="physique"
                  value="2"
                  onChange={handleChange}
                  className="peer hidden"
                />
                <label
                  htmlFor="physique2"
                  className="block my-4 cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-red-500"
                >
                  2
                </label>
              </div>
              <div className="flex mx-4">
                <input
                  type="radio"
                  id="physique1"
                  name="physique"
                  value="1"
                  onChange={handleChange}
                  className="peer hidden"
                />
                <label
                  htmlFor="physique1"
                  className="block my-4 cursor-pointer border-2 border-white select-none rounded-xl p-2 text-center peer-checked:border-red-500"
                >
                  1
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-20 justify-start">
          <h2 className="font-thin text-3xl my-6 mt-0 font-PlayfairDisplay text-customGray">
            Mon état émotionnel
          </h2>
          <div className="flex gap-10">
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
                <img className="h-12" src="/form/star0.png" alt="4" />
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
                <img className="h-12" src="/form/star1.png" alt="3" />
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
                <img className="h-12" src="/form/star1.png" alt="2" />
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
                <img className="h-12" src="/form/star2.png" alt="1" />
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
