import React from "react";

function SumaryTableLt({ children }) {
  return (
    <div className="flex flex-col px-10 py-5 font-bangla ">
      <div className="-m-1.5 overflow-x-auto scrollbar ">
        <div className="p-1.5 min-w-full max-w-full inline-block align-middle">
          <div className="border rounded-md   dark:border-gray-700 dark:shadow-gray-900 overflow-x-scroll scrollbar ">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-fixed w-full   ">
              {children}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SumaryTableLt;
