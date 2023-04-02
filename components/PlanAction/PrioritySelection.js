import React, { useState } from "react";
import { allQVTNames } from "../../utils/someData";

function ProritySelection({
  handlePrev,
  handleNext,
  stepName,
  position,
  titleName,
}) {
  const [selectedOptionsPreserve, setSelectedOptionsPreserve] = useState([]);
  const [selectedOptionsAmeliorate, setSelectedOptionsAmeliorate] = useState(
    []
  );

  const handleCheckboxChangePreserve = (event) => {
    const optionValue = event.target.value;
    if (event.target.checked) {
      setSelectedOptionsPreserve((prevSelectedOptions) => [
        ...prevSelectedOptions,
        optionValue,
      ]);
    } else {
      setSelectedOptionsPreserve((prevSelectedOptions) =>
        prevSelectedOptions.filter((option) => option !== optionValue)
      );
    }
  };

  const handleCheckboxChangeAmeliorate = (event) => {
    const optionValue = event.target.value;
    if (event.target.checked) {
      setSelectedOptionsAmeliorate((prevSelectedOptions) => [
        ...prevSelectedOptions,
        optionValue,
      ]);
    } else {
      setSelectedOptionsAmeliorate((prevSelectedOptions) =>
        prevSelectedOptions.filter((option) => option !== optionValue)
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedOptionsPreserve);
    console.log(selectedOptionsAmeliorate);
    handleNext({
      [stepName[0]]: selectedOptionsPreserve,
      [stepName[1]]: selectedOptionsAmeliorate,
    });
  };

  const options = allQVTNames;

  const halfIndex = Math.ceil(options.length / 2);
  const firstHalfOptions = options.slice(0, halfIndex);
  const lastHalfOptions = options.slice(halfIndex);

  const firstHalfCheckboxesPreserve = firstHalfOptions.map((option) => (
    <div key={option}>
      <label>
        <input
          type="checkbox"
          name={option}
          value={option}
          onChange={handleCheckboxChangePreserve}
        />
        {option}
      </label>
      <br />
    </div>
  ));

  const lastHalfCheckboxesPreserve = lastHalfOptions.map((option) => (
    <div key={option}>
      <label>
        <input
          type="checkbox"
          name={option}
          value={option}
          onChange={handleCheckboxChangePreserve}
        />
        {option}
      </label>
      <br />
    </div>
  ));

  const firstHalfCheckboxesAmeliorate = firstHalfOptions.map((option) => (
    <div key={option}>
      <label>
        <input
          type="checkbox"
          name={option}
          value={option}
          onChange={handleCheckboxChangeAmeliorate}
        />
        {option}
      </label>
      <br />
    </div>
  ));

  const lastHalfCheckboxesAmeliorate = lastHalfOptions.map((option) => (
    <div key={option}>
      <label>
        <input
          type="checkbox"
          name={option}
          value={option}
          onChange={handleCheckboxChangeAmeliorate}
        />
        {option}
      </label>
      <br />
    </div>
  ));

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-6xl my-4 text-center font-MoonTime">{titleName}</h1>
      <div className="flex flex-wrap justify-around font-PlayfairDisplay">
        <div>
          <h3 className="text-3xl mb-2 font-MoonTime">A préserver</h3>
          <div className="flex flex-wrap justify-around">
            <div>{firstHalfCheckboxesPreserve}</div>
            <div>{lastHalfCheckboxesPreserve}</div>
          </div>
        </div>
        <div>
          <h3 className="text-3xl mb-2 font-MoonTime">A Améliorer</h3>
          <div className="flex flex-wrap justify-around">
            <div>{firstHalfCheckboxesAmeliorate}</div>
            <div>{lastHalfCheckboxesAmeliorate}</div>
          </div>
        </div>
      </div>

      <br />
      {(position > 0 || position == -1) && (
        <button type="button" onClick={handlePrev} className="w-[100px] h-[50px] rounded">
          Précédant
        </button>
      )}
      <button type="submit" className="w-[100px] h-[50px] rounded mx-40">{position == -1 ? "Terminer" : "Suivant"}</button>
    </form>
  );
}

export default ProritySelection;
