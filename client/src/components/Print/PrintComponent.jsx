import React from "react";

const PrintComponent = () => {
  return (
    <div id="printThisDiv" className="hidden print:block">
      {/* Your content goes here */}
      <h1>Hello, this is the content to be printed!</h1>
    </div>
  );
};

export default PrintComponent;
