import React from "react";

function NavigationButton({ handlePrev, handleNext, position, texte }) {
  return (
    <div className="flex absolute bottom-[110px] justify-center w-screen md:relative md:bottom-0 md:mb-10 md:mt-5">
      {position > 0 && (
        <button type="button" onClick={handlePrev} className="w-[100px] h-[50px]">
          Précédent
        </button>
      )}
      {(position == 0 || position == 1) && <button onClick={handleNext} className={`w-[100px] h-[50px] rounded  ${position == 0 ? "" : "ml-40 sm:ml-5"}`}>Suivant</button>}
      {position == 2 && <button onClick={handleNext} className="w-[100px] h-[50px] rounded ml-40 sm:ml-5">Terminer</button>}
      {position == -1 && (
        <button onClick={handleNext} className="min-w-[100px] h-[50px] rounded">{texte}</button>
      )}
    </div>
  );
}

export default NavigationButton;
