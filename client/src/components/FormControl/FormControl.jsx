import React from "react";

function FormControl({ children, className }) {
  return (
    <div className={`formControl flex  flex-col gap-[1px] mb-5 ${className}`}>
      {children}
    </div>
  );
}

export default FormControl;
