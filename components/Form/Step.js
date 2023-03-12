import { useState } from 'react'
import Form from './Form'

export default function Step({ handlePrev, handleNext, stepName, position, titleName }) {
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
      <h2>{titleName}</h2>
      <Form handlePrev = {handlePrev} handleChange = {handleChange} handleFormSubmit = {handleFormSubmit} position={position} />
    </>
  )
}
