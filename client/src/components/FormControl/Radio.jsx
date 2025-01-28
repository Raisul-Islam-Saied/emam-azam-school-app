import React from "react";

function Radio({ items = [], onChange, checked }) {
  return (
    <div className="flex gap-x-6 font-bangla text-sm my-1">
      {items &&
        items.map((item, index) => {
          return (
            <div className="flex  ">
              <input
                type="radio"
                name={items}
                className="shrink-0 mt-0.5 border-gray-200  rounded-full  text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800  dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 "
                id={index}
                onChange={onChange}
                checked={checked}
              />
              <label
                for={index}
                className="text-md text-gray-500 ms-2 dark:text-gray-400 pt-[0.20rem]"
              >
                {item}
              </label>
            </div>
          );
        })}
    </div>
  );
}

export default Radio;
