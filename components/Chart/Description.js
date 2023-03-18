function Description({ harmonie, qvt, bgcolor1, bgcolor2}) {

  return (
    <div className="flex gap-4">
        <div className="flex flex-col justify-center items-center gap-1">
          <div>
            <span className={`${bgcolor1} text-white px-4 py-0.5`}>
              HARMONIE
            </span>
            <span className={`${bgcolor2} text-black px-4 py-0.5`}>
              {harmonie}%
            </span>
          </div>
          <div className="text-gray-600 italic text-center text-xs">
            Niveau de satisfaction de mes <br /> besoins au travail actuellement
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <div>
            <span className={`${bgcolor1} text-white px-4 py-0.5`}>
              INDICE QVT
            </span>
            <span className={`${bgcolor2} text-black px-4 py-0.5`}>
              {qvt}%
            </span>
          </div>
          <div className="text-gray-600 italic text-center text-xs">
            La façon dont je me sens <br /> au travail actuellement
          </div>
        </div>
      </div>
  );
}

export default Description;
