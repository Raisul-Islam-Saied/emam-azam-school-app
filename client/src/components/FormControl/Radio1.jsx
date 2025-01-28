import { useState } from "react";
// .sr-only {
//     position: absolute;
//     width: 1px;
//     height: 1px;
//     padding: 0;
//     margin: -1px;
//     overflow: hidden;
//     clip: rect(0, 0, 0, 0);
//     white-space: nowrap;
//     border-width: 0;
// }

const Radio1 = ({ name, selected, onChange, value , classes }) => {
  console.log(selected);
  return (
  
      <label
        htmlFor={value}
        className="flex cursor-pointer select-none items-center text-slate-600 dark:text-slate-400"
      >
        <div className="relative">
          <input
            type="radio"
            id={value}
            value={value}

            checked={selected}
            className="sr-only"
            onChange={onChange}
            name={name}
          />
          <div
            className={`mr-3 flex h-5 w-5 items-center justify-center rounded-full border ${
              selected === value && "border-primary"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                selected === value && "!bg-primary"
              }`}
            ></span>
          </div>
        </div>
        {value}
      </label>
   
  );
};

export default Radio1;
