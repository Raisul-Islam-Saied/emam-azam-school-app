import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import React from "react";

function Stepper({ items }) {
  return (
    <div className="grid md:grid-cols-3  md:gap-5 grid-cols-1  ">
      {" "}
      {items.map((item, index) => {
        return (
          <div
            key={index}
            className=" flex justify-between   md:items-center flex-col   md:flex-row "
          >
            <div className="flex   gap-3">
              <div
                className={`h-[2.7rem] w-[2.7rem]  rounded-full border  flex justify-center items-center  ${
                  item.done
                    ? "bg-violet-600 border-0"
                    : !item.done || index === 0
                    ? "border-violet-500  border-[2.7px]"
                    : "border-slate-300"
                }`}
              >
                <span className=" font-bold dark:text-slate-200 text-slate-700">
                  {!item.done ? (
                    index + 1
                  ) : (
                    <svg
                      width="22"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#fff"
                    >
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </div>
              <div>
                <h2 className="font-semibold text-[17px] text-slate-600 dark:text-slate-400">
                  {item.title}
                </h2>
                <h4 className="text-sm text-slate-500 font-medium max-w-[10rem] truncate">
                  {item.subTitle}
                </h4>
              </div>
            </div>
            {items.length > 1 && (
              <>
                {" "}
                <div
                  className={` ${
                    items.length - (index + 1) === 0 || index === 2
                      ? "hidden"
                      : "md:block"
                  } hidden  mx-1 w-17 bg-slate-300 h-[2px] rounded-full dark:bg-slate-400 `}
                ></div>{" "}
                <div
                  className={`md:hidden ml-5 my-1 h-10 bg-slate-300 dark:bg-slate-400 w-[2px] rounded-full ${
                    items.length - (index + 1) === 0 ? "hidden" : "block"
                  } `}
                ></div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Stepper;
