import React from 'react'
import ChartComponent from '../Chart/ChartComponent'

function Result3({formData}) {
  return (
    <div className='flex'>
        <div className='w-[50vw] h-[80vh]'><ChartComponent formData={formData} step="" /></div>
        <div className='flex justify-center items-center flex-1'>
            Vision globale de ma QVT personnelle
        </div>
    </div>
  )
}

export default Result3