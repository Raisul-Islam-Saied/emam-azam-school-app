import React from "react";
import FormControl from "./FormControl";

function FormCommonError({ children, className }) {
  return (
    <FormControl className={className}>
      <span className="bg-red-400/10 p-2 rounded-[4px]  text-[13px] py-[13px] flex gap-5 items-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 stroke-red-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
        {children}
      </span>
    </FormControl>
  );
}

export default FormCommonError;
