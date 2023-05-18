import { useState } from 'react'
import RadioNormal from './RadioNormal'

export default function FormVTM3({ handlePrev, handleNext, stepName, position, titleName, pageNumber }) {
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
    <div className="h-full flex flex-col" >
      {/* <h2 className="w-full font-bold text-6xl">La vie au travail et moi</h2> */}
      <form onSubmit={handleFormSubmit}
        className="flex flex-col justify-center items-center flex-1"
      >
        <h2 className="font-thin text-3xl my-6 mt-0 font-PlayfairDisplay text-customGray">
          <span className="text-purple-800 font-Benedict mr-8 text-5xl">{pageNumber}</span>
          Actuellement,
        </h2>
        <div className='m-4'>
          <h3 className='font-thin text-xl my-6 mt-0 font-AnticDidone text-customGray'>a{")"} Je ressens une détérioration de ma situation de travail</h3>
          <RadioNormal name={"vecuS"} handleChange={handleChange} color={"#7E5240"} />
        </div>
        <div className='m-4'>
          <h3 className='font-thin text-xl my-6 mt-0 font-AnticDidone text-customGray'>b{")"} Dans ma vie personnelle, je vis une situation particulière qui peut avoir <br /> un impact sur ma façon de voir/vivre le travail</h3>
          <RadioNormal name={"vecuP"} handleChange={handleChange} color={"#7E5240"} />
        </div>
      </form>
      <div className='absolute bottom-[110px] flex flex-row justify-center items-center w-full'>
        {(position > 0 || position == -1) && (
          <button type="button" onClick={handlePrev} className="w-[100px] h-[50px] rounded">
            Précédent
          </button>
        )}
        <button onClick={handleFormSubmit} className="w-[100px] h-[50px] rounded mx-40" type="submit">{position == -1 ? "Terminer" : "Suivant"}</button>
      </div>
    </div>
  )
}
