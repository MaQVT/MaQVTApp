import { useState } from 'react'
import Form from './Form'

export default function StepFour({ handlePrev, handleNext }) {
  const [values, setValues] = useState({
    q1: '4',
    q2: '4',
    q3: '4',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    handleNext({ stepFour: values })
  }

  return (
    <>
      <h2>Mes objectifs et mes tâches sont clairs.</h2>
      <Form handlePrev = {handlePrev} handleChange = {handleChange} handleFormSubmit = {handleFormSubmit} position={1} />
    </>
  )
}
