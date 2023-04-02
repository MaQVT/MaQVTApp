import { useState } from 'react'
import RadioNormal from './RadioNormal'

export default function FormVTM3({ handlePrev, handleNext, stepName, position, titleName }) {
  const [values, setValues] = useState({
    vecuS: '4',
    vecuP: '4',
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
        <h2 className="font-thin text-3xl my-6 mt-0 font-PlayfairDisplay text-customGray">Ces temps ci,</h2>
      <div className='m-4'>
        <h3 className='font-thin text-xl my-6 mt-0 font-AnticDidone text-customGray'>c{")"} Est-ce que je vis une situation dégradée dans mon travail ?</h3>
        <hr />
        <RadioNormal name={"vecuS"} handleChange={handleChange} color={"#7E5240"} />
      </div>
      <div className='m-4'>
        <h3 className='font-thin text-xl my-6 mt-0 font-AnticDidone text-customGray'>d{")"} Est-ce que, dans ma vie personnelle, je vis une situation dégradée qui a un <br /> impact sur ma façon de voir/vivre le travail ?</h3>
        <hr />
        <RadioNormal name={"vecuP"} handleChange={handleChange} color={"#7E5240"} />
      </div>
    </form>
    <div className='absolute bottom-[30px] flex flex-row justify-center items-center w-full'>
          {(position > 0 || position == -1) && (
            <button type="button" onClick={handlePrev} className="w-[100px] h-[50px] rounded">
              Précédant
            </button>
          )}
          <button onClick={handleFormSubmit} className="w-[100px] h-[50px] rounded mx-40" type="submit">{position == -1 ? "Terminer" : "Suivant"}</button>
          </div>
    </div>
  )
}
