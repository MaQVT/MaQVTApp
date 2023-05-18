import React, { useState } from "react";

const MonPlan = ({
  handlePrev,
  handleNext,
  stepName,
  position,
  titleName,
  subTitle,
  columnOneQuestion,
}) => {
  const [formData, setFormData] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
    input9: "",
    textArea: "",
    checkbox: false,
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    const data = {
      reponse: [formData.input1, formData.input4, formData.input7],
      priorite: [formData.input2, formData.input5, formData.input8],
      qui: [formData.input3, formData.input6, formData.input9],
      envie: formData.textArea,
      capacite: formData.checkbox,
    };
    event.preventDefault();
    console.log(data);
    handleNext({
      [stepName]: data,
    });
    // Do something with the selected options, such as sending them to a server
  };

  return (
    <div>
      <h1 className="font-MoonTime text-6xl">{titleName}</h1>
      <h2 className="font-MoonTime text-4xl font-normal">{subTitle}</h2>
      <form onSubmit={handleSubmit} className="w-max">
        <table className="font-PlayfairDisplay my-2 bg-neutral-100" id="tableMonPlan">
          <thead>
            <tr className="text-customGray text-sm">
              <th className="max-w-xs sm:max-w-sm lg:max-w-[480px] p-4 text-left font-light">{columnOneQuestion}</th>
              <th className="max-w-[30px] sm:max-w-[60px] lg:max-w-[100px] p-4 text-left font-light">{"Avec quelle priorité ?(1 : faible / 3 : forte)"}</th>
              <th className="max-w-[60px] sm:max-w-[100px] lg:max-w-sm p-4 text-left font-light">
                {"De qui est-ce que cela dépend ? (de moi ? si non, de qui ?)"}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="input1"
                  value={formData.input1}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="input2"
                  value={formData.input2}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="input3"
                  value={formData.input3}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  name="input4"
                  value={formData.input4}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="input5"
                  value={formData.input5}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="input6"
                  value={formData.input6}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  name="input7"
                  value={formData.input7}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="input8"
                  value={formData.input8}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="input9"
                  value={formData.input9}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <h2 className="font-PlayfairDisplay text-customGray uppercase font-light tracking-widest">
          {"Ce que cette réflexion me donne envie de faire désormais :  "}
        </h2>
        <textarea
        className="w-[100%] h-[100px] bg-orange-100 focus:outline-none p-2 my-2"
          name="textArea"
          value={formData.textArea}
          onChange={handleInputChange}
        />
        <div className="my-2">
          <input
            id="checkbox"
            type="checkbox"
            name="checkbox"
            checked={formData.checkbox}
            onChange={handleInputChange}
          />
          <label
            htmlFor="checkbox"
            className="font-PlayfairDisplay text-customGray"
          >
            {"Je m'en sens capable"}
          </label>
        </div>
        {(position > 0 || position == -1) && (
          <button type="button" onClick={handlePrev} className="w-[100px] h-[50px] rounded">
            Précédent
          </button>
        )}
        <button type="submit" className="w-[100px] h-[50px] rounded mx-5">{position == -1 ? "Terminer" : "Suivant"}</button>
      </form>
    </div>
  );
};

export default MonPlan;
