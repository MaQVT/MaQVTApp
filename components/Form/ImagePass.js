import Image from 'next/image'

export default function ImagePass({ handlePrev, handleNext, image, alt, position, texteSuivant }) {

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
        <Image src={image} alt={alt} fill />
        <div className='absolute bottom-[30px]'>
          {/* {(position > 0 || position == -1) && <button type="button" onClick={handlePrev}>Précédant</button>} */}
          {(position > 0) && <button type="button" className="w-[100px] h-[50px] rounded" onClick={handlePrev}>Précédant</button>}
          {(position != -1) && <button className={`w-[100px] h-[50px] rounded  ${position == 0 ? "" : "ml-40"}`} onClick={handleNext}>Suivant</button>}
          {(position == -1) && (texteSuivant ? <button className="min-w-[100px] h-[50px] rounded mx-40" onClick={handleNext} >{texteSuivant}</button> : <button onClick={handleNext} className="w-min[100px] h-[50px] rounded mx-20">Voir mes resultats</button>)}
        </div>
    </div>
      
  )
}
