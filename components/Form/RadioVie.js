import React from "react";

function RadioVie({name, handleChange}) {
  return (
    <>
      <label>
        <input type="radio" name={name} value="1" onChange={handleChange} />
        Très mal
      </label>
      <label>
        <input type="radio" name="vecu" value="2" onChange={handleChange} />
        Mal
      </label>
      <label>
        <input type="radio" name="vecu" value="3" onChange={handleChange} />
        Assez mal
      </label>
      <label>
        <input
          type="radio"
          name="vecu"
          value="4"
          onChange={handleChange}
          defaultChecked
        />
        Neutre
      </label>
      <label>
        <input type="radio" name="vecu" value="5" onChange={handleChange} />
        Plûtot bien
      </label>
      <label>
        <input type="radio" name="vecu" value="6" onChange={handleChange} />
        Bien
      </label>
      <label>
        <input type="radio" name="vecu" value="7" onChange={handleChange} />
        Très bien
      </label>
    </>
  );
}

export default RadioVie;
