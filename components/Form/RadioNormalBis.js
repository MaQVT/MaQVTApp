import React from "react";

function RadioNormalBis({name, handleChange, color}) {
  return (
    <>
      <div
        className="grid w-[50rem] grid-cols-7 my-4 space-x-2 rounded-xl bg-gray-200 p-2"
        x-data="app"
      >
          <div>
            <input type="radio" name={name} value="1" onChange={handleChange} id={`${name}1`} className="peer hidden"/>
            <label
              htmlFor={`${name}1`}
              className={`block  cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#842e63] peer-checked:font-bold peer-checked:text-white`}
            >
              Pas du tout
            </label>
          </div>
          <div>
            <input type="radio" name={name} value="2" onChange={handleChange} id={`${name}2`} className="peer hidden"/>
            <label
              htmlFor={`${name}2`}
              className={`block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#842e63] peer-checked:font-bold peer-checked:text-white`}
            >
              Non
            </label>
          </div>
          <div>
            <input type="radio" name={name} value="3" onChange={handleChange} id={`${name}3`} className="peer hidden"/>
            <label
              htmlFor={`${name}3`}
              className={`block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#842e63] peer-checked:font-bold peer-checked:text-white`}
            >
              Peu
            </label>
          </div>
          <div>
            <input type="radio" name={name} value="4" id={`${name}4`} onChange={handleChange} className="peer hidden" defaultChecked/>
            <label
              htmlFor={`${name}4`}
              className={`block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#842e63] peer-checked:font-bold peer-checked:text-white`}
            >
              Neutre
            </label>
          </div>
          <div>
            <input type="radio" name={name} value="5" id={`${name}5`} onChange={handleChange} className="peer hidden"/>
            <label
              htmlFor={`${name}5`}
              className={`block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#842e63] peer-checked:font-bold peer-checked:text-white`}
            >
              Un Peu
            </label>
          </div>
          <div>
            <input type="radio" name={name} value="6" id={`${name}6`} onChange={handleChange} className="peer hidden"/>
            <label
              htmlFor={`${name}6`}
              className={`block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#842e63] peer-checked:font-bold peer-checked:text-white`}
            >
              Oui
            </label>
          </div>
          <div>
            <input type="radio" name={name} value="7" id={`${name}7`} onChange={handleChange} className="peer hidden"/>
            <label
              htmlFor={`${name}7`}
              className={`block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#842e63] peer-checked:font-bold peer-checked:text-white`}
            >
              Tout à fait
            </label>
          </div>
      </div>
    </>
  );
}

export default RadioNormalBis;
