import { useState } from 'react'
import Form from './Form'

export default function StepTwo({ handlePrev, handleNext }) {
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
    handleNext({ stepTwo: values })
  }

  return (
    <>
      <h2>Je me sens en sécurité dans mon travail.</h2>
      <Form handlePrev = {handlePrev} handleChange = {handleChange} handleFormSubmit = {handleFormSubmit} position={1} />
    </>
  )
}
