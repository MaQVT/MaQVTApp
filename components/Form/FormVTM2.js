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
    <div className="h-full bg-rose_pr flex flex-col" >
      {/* <h2 className="w-full font-bold text-6xl">La vie au travail et moi</h2> */}
      <form onSubmit={handleFormSubmit}
        className="flex flex-col justify-center items-center flex-1"
      >
        <h2 className="font-thin text-3xl my-6 mt-0 font-PlayfairDisplay text-customGray">En général, ces temps ci</h2>
        <div className="m-4">
          <h3 className="font-thin text-xl my-6 mt-0 font-AnticDidone text-customGray">a{")"} Est-ce que je me sens bien au travail ?</h3>
          <hr />
          <RadioNormal name={"sensation"} handleChange={handleChange} color={"#7E5240"} />
        </div>
        <div className="m-4">
          <h3 className="font-thin text-xl my-6 mt-0 font-AnticDidone text-customGray">b{")"} Est-ce que je suis motivé.e par mon travail ?</h3>
          <hr />
          <RadioNormal name={"motivation"} handleChange={handleChange} color={"#7E5240"} />
        </div>
        <div className='absolute bottom-[30px]'>
          {(position > 0 || position == -1) && (
            <button type="button" onClick={handlePrev} className="w-[100px] h-[50px] rounded">
              Précédant
            </button>
          )}
          <button onClick={handleFormSubmit} className="w-[100px] h-[50px] rounded mx-40" type="submit">{position == -1 ? "Terminer" : "Suivant"}</button>
          </div>
      </form>
    </div>
  );
}
