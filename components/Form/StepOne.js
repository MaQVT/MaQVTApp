import { useState } from 'react'
import Form from './Form'

export default function StepOne({ handlePrev, handleNext }) {
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
    handleNext({ stepOne: values })
  }

  return (
    <>
      <h2>Mon travail contribue à ma sécurité matérielle 
et à celle de ma famille.</h2>
      <Form handlePrev = {handlePrev} handleChange = {handleChange} handleFormSubmit = {handleFormSubmit} position={1} />
    </>
  )
}
