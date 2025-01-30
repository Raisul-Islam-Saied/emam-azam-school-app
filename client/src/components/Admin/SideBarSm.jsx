import React from "react";
import { useLocation } from "react-router-dom";

function SideBarSm({ showNav, setShowNav }) {
  const loacation = useLocation();
  const path = String(loacation.pathname).split("/").slice(2, 10);
  return (
    <div className=" flex fixed lg:hidden  mt-[4rem] py-4  w-full z-10 bg-white/60 backdrop-blur-lg dark:bg-slate-900 ">
      <div className=" px-5 flex gap-1 items-center font-mono  text-slate-600 dark:text-slate-400 ">
        <button
          onClick={() => setShowNav(!showNav)}
          type="button"
          className="text-gray-700 hover:text-gray-600 lg:hidden "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="currentColor"
            className="w-6 h-6 text-slate-600 dark:text-slate-400"
          >
            {" "}
            {showNav ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
        <div className=" z-10    pl-1 flex gap-1">
          <span>DASHBOARD</span>
          {path &&
            path.map((singlePath, index) => (
              <span
                key={index}
                className="flex justify-center items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                  />
                </svg>

                {singlePath.split("_").join(" ").toLocaleUpperCase()}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SideBarSm;
