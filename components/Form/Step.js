import { useState } from 'react'
import Form from './Form'

export default function Step({ handlePrev, handleNext, stepName, position, titleName, pageNumber }) {
  const [values, setValues] = useState({
    ideal: '4',
    actu: '4',
    vecu: '4',
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
    <>
      <div className="w-full h-full">
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <h2 className='font-thin text-3xl my-10 mt-0 font-PlayfairDisplay text-customGray text-center'>
            <span className="text-purple-800 font-Benedict mr-8 text-5xl">{pageNumber}</span>
            {titleName}
          </h2>
          <Form handlePrev={handlePrev} handleChange={handleChange} handleFormSubmit={handleFormSubmit} position={position} stepName={stepName} />
        </div>
      </div>
    </>
  )
}
