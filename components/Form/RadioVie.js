import React from "react";

function RadioVie({name, handleChange, color}) {
  return (
    <div className="grid w-[50rem] my-4 grid-cols-7 space-x-2 rounded-xl bg-gray-200 p-2 sm:grid-cols-1 sm:w-[20rem]">
      
      <div>
      <input type="radio" name={name} value="1" id={`${name}1`} onChange={handleChange} className="peer hidden"/>
      <label
        className={`block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#FE06FF] peer-checked:font-bold peer-checked:text-white`}
        htmlFor={`${name}1`}
      >
        Très mal
      </label>
      </div>
      <div>
        <input type="radio" name={name} id={`${name}2`} value="2" onChange={handleChange} className="peer hidden"/>
        <label
          htmlFor={`${name}2`}
          className={`block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#FE06FF] peer-checked:font-bold peer-checked:text-white`}
          >
          Mal
        </label>
      </div>
      <div>
        <input type="radio" name={name} value="3" id={`${name}3`} onChange={handleChange} className="peer hidden"/>
        <label
          htmlFor={`${name}3`}
          className={`block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#FE06FF] peer-checked:font-bold peer-checked:text-white`}
        >
          Assez mal
        </label>
      </div>
      <div>
        <input
          type="radio"
          name={name}
          id={`${name}4`}
          value="4"
          className="peer hidden"
          onChange={handleChange}
          defaultChecked
        />
        <label
          htmlFor={`${name}4`}
          className={`block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#FE06FF] peer-checked:font-bold peer-checked:text-white`}
        >
          Neutre
        </label>
      </div>
      <div>
        <input type="radio" id={`${name}5`} className="peer hidden" name={name} value="5" onChange={handleChange} />
        <label
          htmlFor={`${name}5`}
          className={`block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#FE06FF] peer-checked:font-bold peer-checked:text-white`}
        >
          Plutôt bien
        </label>
      </div>
      <div>
        <input type="radio" name={name} id={`${name}6`} value="6" className="peer hidden" onChange={handleChange} />
        <label
          htmlFor={`${name}6`}
          className={`block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#FE06FF] peer-checked:font-bold peer-checked:text-white`}
        >
          Bien
        </label>
      </div>
      <div>
      <input type="radio" name={name} value="7" id={`${name}7`} className="peer hidden" onChange={handleChange} />
      <label
        htmlFor={`${name}7`}
        className={`block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#FE06FF] peer-checked:font-bold peer-checked:text-white`}
      >
        Très bien
      </label>
    </div></
    div>
  );
}

export default RadioVie;
