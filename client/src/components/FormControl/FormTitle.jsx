import React from "react";

function FormTitle({ title, subtitle, notRequired = false, className }) {
  return (
    <>
      <span
        className={` font-semibold text-sm text-gray-600 dark:text-slate-300/90 ${
          !notRequired
            ? "after:content-['*'] after:ml-0.5 after:text-red-500"
            : null
        } ${className}`}
      >
        {title}
      </span>
      {subtitle && (
        <span className={`text-[12px] mb-1 text-slate-500 dark:text-slate-400`}>
          {subtitle}
        </span>
      )}
    </>
  );
}

export default FormTitle;
