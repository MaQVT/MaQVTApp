import React from "react";

function NavigationButton({ handlePrev, handleNext, position, texte }) {
  return (
    <div>
      {position > 0 && (
        <button type="button" onClick={handlePrev}>
          Précédant
        </button>
      )}
      {(position == 0 || position == 1) && <button onClick={handleNext}>Suivant</button>}
      {position == 2 && <button onClick={handleNext}>Terminer</button>}
      {position == -1 && (
        <button onClick={handleNext}>{texte}</button>
      )}
    </div>
  );
}

export default NavigationButton;
