import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function PlanActionRating({
  handlePrev,
  handleNext,
  stepName,
  position,
  titleName,
}) {
  const [values, setValues] = useState({
    rating: 3,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = (event) => {
    console.log(values);
    event.preventDefault();
    handleNext(values);
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-Benedict font-light text-8xl text-center mb-10 text-customGray">
        {titleName}
      </h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex gap-10">
          <div className="flex flex-col justify-center">
            <input
              type="radio"
              id="rating1"
              name="rating"
              value="1"
              onChange={handleChange}
              defaultChecked
            />
            <label htmlFor="rating1">
              <FontAwesomeIcon
                icon={faStar}
                style={{ fontSize: 40, color: "#C81F2A" }}
              />
            </label>
          </div>
          <div className="flex flex-col justify-center">
            <input
              type="radio"
              id="rating2"
              name="rating"
              value="2"
              onChange={handleChange}
            />
            <label htmlFor="rating2">
              <FontAwesomeIcon
                icon={faStar}
                style={{ fontSize: 40, color: "#F4912E" }}
              />
            </label>
          </div>
          <div className="flex flex-col justify-center">
            <input
              type="radio"
              id="rating3"
              name="rating"
              value="3"
              onChange={handleChange}
            />
            <label htmlFor="rating3">
              <FontAwesomeIcon
                icon={faStar}
                style={{ fontSize: 40, color: "#F4C741" }}
              />
            </label>
          </div>
          <div className="flex flex-col justify-center">
            <input
              type="radio"
              id="rating4"
              name="rating"
              value="4"
              onChange={handleChange}
            />
            <label htmlFor="rating4">
              <FontAwesomeIcon
                icon={faStar}
                style={{ fontSize: 40, color: "#B5D930" }}
              />
            </label>
          </div>
          <div className="flex flex-col justify-center">
            <input
              type="radio"
              id="rating5"
              name="rating"
              value="5"
              onChange={handleChange}
            />
            <label htmlFor="rating5">
              <FontAwesomeIcon
                icon={faStar}
                style={{ fontSize: 40, color: "#84CE2F" }}
              />
            </label>
          </div>
        </div>
        <div  className='absolute bottom-[110px]'>
          {(position > 0 || position == -1) && (
            <button type="button" onClick={handlePrev} className="w-[100px] h-[50px] rounded">
              Précédent
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
