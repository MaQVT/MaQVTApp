import React from 'react'

function PriorityLegend() {
  return (
    <div className='w-[374px] h-[392px] m-2 p-3 flex flex-col justify-around font-PlayfairDisplay'>
        <h1 className='text-6xl font-MoonTime'>Priorités suggérées</h1>
        <div className='flex gap-5'>
            <div>
                <span>A préserver 🟢</span>
                <br /> <br />
                <p className='text-xs leading-none italic text-gray-500'>Ce qui contribue à mon bien-être au travail et que j&apos;ai envie de conserver</p>
            </div>
            <div>
                <span>A améliorer 🔴</span>
                <br /> <br />
                <p className='text-xs leading-none italic text-gray-500'>Ce qui nuit à mon bien-être au travail et qui me donne envie de trouver des solutions</p>
            </div>
        </div>
        <div>
        ❗ Besoin asymétrique
        </div>
    </div>
  )
}

export default PriorityLegend