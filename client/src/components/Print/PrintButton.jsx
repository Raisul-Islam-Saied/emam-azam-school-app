// PrintButton.js
import React from "react";
import PrintComponent from "./PrintComponent";

const PrintButton = () => {
  const handlePrint = () => {
    const printContent = document.getElementById("printThisDiv");

    if (printContent) {
      // Trigger the print dialog
      window.print();
    }
  };

  return (
    <div>
      <button onClick={handlePrint}>Print</button>
      <PrintComponent />
    </div>
  );
};

export default PrintButton;
