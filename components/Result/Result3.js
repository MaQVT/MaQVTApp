import React from 'react'
import ChartComponent from '../Chart/ChartComponent'

function Result3({formData}) {
  return (
    <div className='flex h-full'>
        <div className='w-[60%] h-[75%] flex justify-center items-center my-10 pl-5'>
          <ChartComponent formData={formData} step="" />
        </div>
        <div className='flex justify-center items-center flex-1 text-center text-6xl font-thin my-6 mt-0 font-MoonTime text-customGray'>
            Vision globale de ma QVT personnelle
        </div>
    </div>
  )
}

export default Result3