import React from "react";

function ResultButton({ setResults }) {
  return (
    <div className="flex justify-center items-center print:hidden ">
      <button
        className="text-[11px] py-2 px-2 bg-fuchsia-500 font-semibold text-slate-100 rounded-l-md uppercase focus:animate-button "
        onClick={() => setResults(false)}
      >
        Search Again
      </button>
      <button
        onClick={() => window.print()}
        className="text-[11px] py-2 px-2 bg-slate-800 font-semibold text-slate-100 rounded-r-md focus:animate-button uppercase "
      >
        print result
      </button>
    </div>
  );
}

export default ResultButton;
