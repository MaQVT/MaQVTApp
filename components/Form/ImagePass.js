import Image from 'next/image'

export default function ImagePass({ handlePrev, handleNext, image, alt, position }) {

  return (
    <div>
        <Image src={image} alt={alt} width={600} height={500} objectFit='contain' />
        {(position > 0 || position == -1) && <button type="button" onClick={handlePrev}>Previous</button>}
        {(position != -1) && <button onClick={handleNext}>Next</button>}
    </div>
      
  )
}
