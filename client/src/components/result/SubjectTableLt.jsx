import React, { Children } from "react";

function SubjectTableLt({
  children,
  className,
  hideOverFlow = false,
  scrollHigth = "",
}) {
  return (
    <div className={`flex flex-col px-10 py-5 font-bangla ${className} `}>
      <div
        className={`-m-1.5  ${
          !hideOverFlow ? "overflow-x-auto scrollbar" : ""
        }`}
      >
        <div className="p-1.5 min-w-full max-w-full inline-block align-middle ">
          <div
            className={`border rounded-md  overflow-hidden dark:border-gray-700 dark:shadow-gray-900 min-w-[450px] overflow-x-scroll scrollbar ${scrollHigth}`}
          >
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 w-ful table-fixed   ">
              {children}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubjectTableLt;
