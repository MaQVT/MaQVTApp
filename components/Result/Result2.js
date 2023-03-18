import React from 'react'
import { generateTotalData } from '../../utils/otherFunctions'

function Result2({formData}) {
    const total = generateTotalData(formData);
  return (
    <div className='flex justify-around'>
      <div className='flex flex-col justify-center'>
        <div className="flex flex-col justify-center items-center gap-1">
          <div>
            <span>Mon taux d&apos;harmonie générale</span>
          </div>
          <div className="text-gray-600 italic text-center text-xs">
            Niveau de satisfaction de mes besoins
            <br /> au travail actuellement
          </div>
        </div>
        <div>
            <span>{total.Harmonie}%</span>
        </div>
      </div>
      <div className='flex flex-col justify-center'>
        <div className="flex flex-col justify-center items-center gap-1">
          <div>
            <span>Mon indice QVT global</span>
          </div>
          <div className="text-gray-600 italic text-center text-xs">
            La façon dont je me sens <br /> au travail actuellement
          </div>
        </div>
        <div>
            <span>{total.QVT}%</span>
        </div>
      </div>
      <div className='flex flex-col justify-center'>
        <div>
            <span>Indices globaux</span>
        </div>
        <div className='flex flex-col justify-center'>
            <span>Zone grise</span>
            <span>Occurence de réponses neutres</span>
            <span>{total.Grise}%</span>
        </div>
      </div>
    </div>
  )
}

export default Result2