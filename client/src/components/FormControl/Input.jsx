import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      placeholder,
      name,
      type = "text",
      className,
      errorMessage,
      notRequired,
      autocomplete = "off",
      id,
      defaultValue,
      disabled = false,
      ...rest
    },
    ref // The ref parameter needs to be included here
  ) => {
    return (
      <>
        <input
          {...rest}
          ref={ref} // Forward the ref to the input element
          autoComplete={autocomplete} // camelCase for consistency
          defaultValue={defaultValue}
          type={type}
          name={name}
          disabled={disabled}
          id={id ? id : name}
          placeholder={placeholder}
          className={`handelInput text-sm ${
            errorMessage
              ? "border-red-500 ring-red-500 ring-[0.4px]"
              : "border-slate-300"
          } ${className}`}
        />

        <span
          className={`text-[13px] truncate h-5 my-1 text-red-500 ${
            errorMessage ? "visible" : "hidden"
          }`}
        >
          {errorMessage}
        </span>
      </>
    );
  }
);

export default Input;
