import { useState } from "react";
import RadioNormal from "./RadioNormal";
import RadioVie from "./RadioVie";

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
    <div className="h-full bg-rose_pr flex flex-col">
      {/* <h2 className="w-full font-bold text-6xl">La vie au travail et moi</h2> */}
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col justify-center items-center flex-1"
      >
        <h2 className="font-thin text-3xl my-6 mt-0 font-PlayfairDisplay text-customGray">{titleName}</h2>
        <div className="m-4">
          {/* <h3>Le travail a t-il une place importante dans ma vie ?</h3> */}
          <RadioNormal
            className="m-4"
            name={"placeT"}
            color={"#7E5240"}
            handleChange={handleChange}
          />
        </div>
        <div className="m-4">
          <h3 className="font-thin text-3xl my-6 mt-0 font-Benedict text-customGray">Comment est-ce que je le vis ?</h3>
          <RadioVie
            className="m-4"
            name={"vecuT"}
            color={"#FE06FF"}
            handleChange={handleChange}
          />
        </div>
        <div className="absolute bottom-[30px] flex flex-row justify-center items-center w-full">
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
      </form>
    </div>
  );
}
