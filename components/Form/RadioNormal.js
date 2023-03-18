import React from "react";

function RadioNormal({name, handleChange}) {
  return (
    <>
      <label>
        <input type="radio" name={name} value="1" onChange={handleChange} />
        Pas du tout
      </label>
      <label>
        <input type="radio" name={name} value="2" onChange={handleChange} />
        Non
      </label>
      <label>
        <input type="radio" name={name} value="3" onChange={handleChange} />
        Peu
      </label>
      <label>
        <input
          type="radio"
          name={name}
          value="4"
          onChange={handleChange}
          defaultChecked
        />
        Neutre
      </label>
      <label>
        <input type="radio" name={name} value="5" onChange={handleChange} />
        Un peu
      </label>
      <label>
        <input type="radio" name={name} value="6" onChange={handleChange} />
        Oui
      </label>
      <label>
        <input type="radio" name={name} value="7" onChange={handleChange} />
        Tout à fait
      </label>
    </>
  );
}

export default RadioNormal;
