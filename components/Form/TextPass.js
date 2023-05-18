export default function TextPass({ handlePrev, handleNext, text, position, texteSuivant }) {

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="font-PlayfairDisplay text-center">
            {text}
        </div>
        <div className='absolute bottom-[110px]'>
          {/* {(position > 0 || position == -1) && <button type="button" onClick={handlePrev}>Précédent</button>} */}
          {(position > 0) && <button type="button" className="w-[100px] h-[50px] rounded" onClick={handlePrev}>Précédent</button>}
          {(position != -1) && <button className={`w-[100px] h-[50px] rounded  ${position == 0 ? "" : "ml-40"}`} onClick={handleNext}>Suivant</button>}
          {(position == -1) && (texteSuivant ? <button className="min-w-[100px] h-[50px] rounded mx-40" onClick={handleNext} >{texteSuivant}</button> : <button onClick={handleNext} className="w-min[100px] h-[50px] rounded mx-20">Voir mes resultats</button>)}
        </div>
    </div>
      
  )
}
