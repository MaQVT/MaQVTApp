import { useState } from 'react'

export default function Form({ handlePrev, handleChange, handleFormSubmit, position }) {
  

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <h3>Dans l&apos;idéal, est-ce important pour moi ?</h3>
        <label>
          <input type="radio" name="q1" value="1" onChange={handleChange} />
          Pas du tout
        </label>
        <label>
          <input type="radio" name="q1" value="2" onChange={handleChange} />
          Non
        </label>
        <label>
          <input type="radio" name="q1" value="3" onChange={handleChange} />
          Peu
        </label>
        <label>
          <input type="radio" name="q1" value="4" onChange={handleChange} defaultChecked />
          Neutre
        </label>
        <label>
          <input type="radio" name="q1" value="5" onChange={handleChange} />
          Un peu
        </label>
        <label>
          <input type="radio" name="q1" value="6" onChange={handleChange} />
          Oui
        </label>
        <label>
          <input type="radio" name="q1" value="7" onChange={handleChange} />
          Tout à fait
        </label>
      </div>
      <div>
        <h3>Dans mon travail actuel, est-ce le cas ?</h3>
        <label>
          <input type="radio" name="q2" value="1" onChange={handleChange} />
          Pas du tout
        </label>
        <label>
          <input type="radio" name="q2" value="2" onChange={handleChange} />
          Non
        </label>
        <label>
          <input type="radio" name="q2" value="3" onChange={handleChange} />
          Peu
        </label>
        <label>
          <input type="radio" name="q2" value="4" onChange={handleChange} defaultChecked />
          Neutre
        </label>
        <label>
          <input type="radio" name="q2" value="5" onChange={handleChange} />
          Un peu
        </label>
        <label>
          <input type="radio" name="q2" value="6" onChange={handleChange} />
          Oui
        </label>
        <label>
          <input type="radio" name="q2" value="7" onChange={handleChange} />
          Tout à fait
        </label>
      </div>
      <div>
        <h3>Comment est-ce que je le vis ?</h3>
        <label>
          <input type="radio" name="q3" value="1" onChange={handleChange} />
          Très mal
        </label>
        <label>
          <input type="radio" name="q3" value="2" onChange={handleChange} />
          Mal
        </label>
        <label>
          <input type="radio" name="q3" value="3" onChange={handleChange} />
          Assez mal
        </label>
        <label>
          <input type="radio" name="q3" value="4" onChange={handleChange} defaultChecked />
          Neutre
        </label>
        <label>
          <input type="radio" name="q3" value="5" onChange={handleChange} />
          Plûtot bien
        </label>
        <label>
          <input type="radio" name="q3" value="6" onChange={handleChange} />
          Bien
        </label>
        <label>
          <input type="radio" name="q3" value="7" onChange={handleChange} />
          Très bien
        </label>
      </div>
      {(position > 0 || position == -1) && <button type="button" onClick={handlePrev}>Previous</button>}
      <button type="submit">{position == -1 ? "Finish" : "Next"}</button>
    </form>
  )
}
