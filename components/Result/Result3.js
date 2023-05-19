import React from 'react'
import ChartComponent from '../Chart/ChartComponent'

function Result3({ formData }) {
  return (
    <div className='flex h-full'>
      <div className='w-[60%] h-[75%] flex justify-center items-center my-10 pl-5'>
        <ChartComponent formData={formData} step="" />
      </div>
      <div className='flex flex-col justify-center items-center gap-5'>
        <div className='flex justify-center items-center text-center text-6xl font-thin font-MoonTime text-customGray'>
          Vision globale de ma QVT personnelle
        </div>
        <div className='flex gap-5'>
          <div className='bg-white opacity-60 p-4 rounded-lg w-auto flex flex-col justify-start items-center'>
            <div className="flex flex-col justify-center items-center gap-1">
              <p className='font-bold text-xl mt-5 text-center text-[#325ba8]'>Harmonie</p>
              <div className="font-thin text-customGray italic text-center text-xs">
                Niveau de satisfaction de mes besoins
                <br /> au travail actuellement
              </div>
            </div>
          </div>
          <div className='bg-white opacity-60 p-4 rounded-lg w-auto flex flex-col justify-start items-center'>
            <div className="flex flex-col justify-center items-center gap-1">
              <p className='font-bold text-xl mt-5 text-center text-[#b82baa]'>Indice QVT</p>
              <div className="font-thin text-customGray italic text-center text-xs">
                La façon dont je me sens <br /> au travail actuellement
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result3