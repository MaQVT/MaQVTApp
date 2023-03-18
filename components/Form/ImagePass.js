import Image from 'next/image'

export default function ImagePass({ handlePrev, handleNext, image, alt, position, texteSuivant }) {

  return (
    <div>
        <Image src={image} alt={alt} width={600} height={500} objectFit='contain' />
        {/* {(position > 0 || position == -1) && <button type="button" onClick={handlePrev}>Précédant</button>} */}
        {(position > 0) && <button type="button" onClick={handlePrev}>Précédant</button>}
        {(position != -1) && <button onClick={handleNext}>Suivant</button>}
        {texteSuivant && (position == -1) ? <button onClick={handleNext}>{texteSuivant}</button> : <button onClick={handleNext}>Voir mes resultats</button>}
    </div>
      
  )
}
