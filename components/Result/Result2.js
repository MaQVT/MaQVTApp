import React from 'react'
import { generateTotalData } from '../../utils/otherFunctions'

function Result2({ formData }) {
  const total = generateTotalData(formData);
  return (
    <div className='flex flex-row w-full justify-center items-center flex-1 font-PlayfairDisplay gap-5 sm:flex-col-reverse'>
      <div className='flex flex-col gap-5 sm:items-center'>
        <div className='bg-white opacity-60 p-4 rounded-lg w-[400px] h-max flex flex-col justify-start items-center sm:w-max-[300px] sm:w-[80%]'>
          <div className="flex flex-col justify-center items-center gap-1">
            <div className=''>
              <p className='font-bold text-xl mt-5 text-center text-[#325ba8]'>Mon taux d&apos;harmonie générale</p>
            </div>
            <div className="font-thin text-customGray italic text-center text-xs">
              Niveau de satisfaction de mes besoins
              <br /> au travail actuellement
            </div>
          </div>
          <div>
            <p className='text-[#325ba8] font-bold text-6xl my-4'>{total.Harmonie}%</p>
          </div>
        </div>
        <div className='bg-white opacity-60 p-4 rounded-lg w-[400px] h-max flex flex-col justify-start items-center sm:w-max-[300px] sm:w-[80%]'>
          <div className="flex flex-col justify-center items-center gap-1">
            <div>
              <p className='font-bold text-xl mt-5 text-center text-[#b82baa]'>Mon indice QVT global</p>
            </div>
            <div className="font-thin text-customGray italic text-center text-xs">
              La façon dont je me sens <br /> au travail actuellement
            </div>
          </div>
          <div>
            <p className='text-[#b82baa] font-bold text-6xl my-4'>{total.QVT}%</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-around gap-20'>
        <div className="flex flex-col justify-center items-center gap-1">
          <p className='font-normal text-7xl mt-5 font-MoonTime text-customGray'>Indices <br />globaux</p>
        </div>
        <div className='bg-white opacity-60 p-4 rounded-lg w-[300px] h-max flex flex-col justify-start items-center sm:w-max-[300px] sm:w-[95%]'>
          <div className='flex flex-col justify-center text-center'>
            <span className='font-bold text-xl mt-5 text-center text-[#c67524]'>Zone grise</span>
            <span className='font-thin text-customGray italic text-center text-xs'>Occurence de réponses neutres</span>
            <p className='text-[#c67524] font-bold text-6xl my-4'>{total.Grise}%</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Result2