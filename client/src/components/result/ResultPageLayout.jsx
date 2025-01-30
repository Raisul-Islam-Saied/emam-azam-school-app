import React from "react";
import convertToBanglaNumber from "../../helper/convertToBanglaNumber";

function ResultPageLayout({ results, children }) {
  return (
    <div className=" w-[7.8in]      mx-auto  bg-slate-50   font-sans flex-col justify-center dark:bg-slate-800/50 dark:border dark:border-slate-600 py-6 pb-10 ">
      <div className="text-center pt-10  text-xl text-slate-800 dark:text-slate-400 font-bangla">
        <h1 className="">ইমাম আজম আবু হানিফা (র:) স্কুল</h1>
        <h1 className="text-[17px]">
          {results[0]?.exam_name || results[0]?.exam_name}’র রেজাল্ট -{" "}
          <span className="font-bangla2">
            {convertToBanglaNumber(
              Number(results[0]?.exam_year || results[0]?.exam_year)
            )}
          </span>{" "}
        </h1>
        <h3 className="text-[17px]">
          {" "}
          {results[0]?.nameOfClass || results[0]?.nameOfClass}
        </h3>
      </div>
      {children}
      <div className="flex flex-col justify-between  text-slate-700 dark:text-slate-400 text-xs px-10 font-bangla gap-1 pt-3 ">
        <div>
          Published :{" "}
          {results && results.length === 1
            ? String(results[0]?.updatedAt)
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-")
            : results && results.length > 1
            ? String(results[0]?.updatedAt && results[0].updatedAt)
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-")
            : "- -"}
        </div>
        <div>
          Developer :{" "}
          <a
            href="https://www.raisulislamsaied.com"
            target="_blank"
            className="text-violet-400 cursor-pointer hover:underline hover:text-violet-600"
          >
            Raisul Islam Saied
          </a>
        </div>
      </div>
    </div>
  );
}

export default ResultPageLayout;
