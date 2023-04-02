import { useState } from "react";

export default function PlanActionAutorisation({
  handlePrev,
  handleNext,
  stepName,
  position,
  titleName,
}) {
  const [values, setValues] = useState({
    accept_transmission: false,
    receive_report: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFormSubmit = (event) => {
    console.log(values)
    event.preventDefault();
    handleNext(values);
  };
  return (
    <div className="flex flex-col text-center justify-center">
      <h2 className="font-Trocchi font-light mb-10 text-2xl">{'""" '}{titleName}{' """'}</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex flex-col items-center font-PlayfairDisplay gap-4">
          <div className="flex">
            <input
            className="rounded-full"
              type="checkbox"
              id="accept_transmission"
              name="accept_transmission"
              onChange={handleChange}
              value={true}
            />
            <label htmlFor="accept_transmission">
              Je souhaite recevoir mon rapport personnel sur ma messagerie
              professionnelle
            </label>
          </div>
          <div className="flex">
            <input
              type="checkbox"
              id="receive_report"
              name="receive_report"
              onChange={handleChange}
              value={true}
            />
            <label htmlFor="receive_report">
              J&apos;accepte que mes résultats soient transmis de manière
              anonyme pour éditer une synthèse collective
            </label>
          </div>
        </div>

        <div  className='absolute bottom-[30px] w-full'>
          {(position > 0 || position == -1) && (
            <button type="button" onClick={handlePrev} className="w-[100px] h-[50px] rounded">
              Précédant
            </button>
          )}
          <button type="submit" className="w-[100px] h-[50px] rounded mx-40">
            {position == -1 ? "Terminer" : "Suivant"}
          </button>
        </div>
      </form>
    </div>
  );
}
