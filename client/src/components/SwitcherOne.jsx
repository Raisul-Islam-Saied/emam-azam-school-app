import { useState } from "react";

const SwitcherOne = ({ className, enabled, setEnabled }) => {


  return (
    <div className="">
      <label
        htmlFor="toggle1"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative ">
          <input
            type="checkbox"
            id="toggle1"
            className="sr-only"
            onChange={() => {
              setEnabled(!enabled);
             
            }}
          />
          <div className="block h-4 w-7 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
          <div
            className={`absolute left-[0.17rem] top-[0.14rem] h-3 w-3 rounded-full bg-white transition ${
              enabled && "!right-1 !translate-x-full !bg-primary dark:!bg-white"
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default SwitcherOne;
