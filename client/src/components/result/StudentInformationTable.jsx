import React from "react";
import convertToBanglaNumber from "../../helper/convertToBanglaNumber";

function StudentInformationTable({ results }) {
  return (
    <div className="flex flex-col px-10 py-5 font-bangla ">
      <div className="-m-1.5 overflow-x-auto scrollbar ">
        <div className="p-1.5 min-w-full max-w-full  inline-block align-middle ">
          <div className="border rounded-md  overflow-scroll scrollbar dark:border-gray-700 dark:shadow-gray-900">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 w-full    table-fixed">
              <thead>
                <tr className="divide-x divide-gray-200 dark:divide-gray-700 whitespace-normal ">
                  <th
                    scope="col"
                    colSpan="2"
                    className="px-6 py-[10px] text-left  text-xs md:text-sm font-normal text-slate-800  dark:text-slate-400   uppercase font-bangla"
                  >
                    রোল :{" "}
                    <span className="font-bangla2s">
                      {convertToBanglaNumber(results[0]?.roll)}
                    </span>
                  </th>

                  <th
                    colSpan="2"
                    scope="col"
                    className="px-6 py-[10px] text-left  text-xs md:text-sm font-normal text-slate-800  dark:text-slate-400  "
                  >
                    আইডি নং
                  </th>
                  <th
                    colSpan="2"
                    scope="col"
                    className="px-6 py-[10px] text-left  text-xs md:text-sm font-normal text-slate-800  dark:text-slate-400 uppercase font-bangla2"
                  >
                    {convertToBanglaNumber(results[0]?.student_id)}
                  </th>

                  <th
                    colSpan="2"
                    scope="col"
                    className="px-6 py-[10px] text-left  text-xs md:text-sm font-normal text-slate-800   uppercase dark:text-slate-400"
                  >
                    {results[0]?.sakha}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="divide-x divide-gray-200 dark:divide-gray-700">
                  <td
                    colSpan="2"
                    className="px-6 py-[10px] whitespace-nowrap  text-xs md:text-sm text-slate-800 dark:text-slate-400 "
                  >
                    শিক্ষার্থীর নাম
                  </td>
                  <td
                    colSpan="5"
                    className="px-6 py-[10px] whitespace-nowrap  text-xs md:text-sm text-slate-800 dark:text-slate-400 "
                  >
                    {results[0]?.name_bangla}
                  </td>
                  {results[0] && results[0]?.avatar && (
                    <td
                      colSpan="1"
                      rowSpan="3"
                      className="px-3 py-3 w-[7rem] whitespace-nowrap  text-xs md:text-sm text-slate-800 dark:text-slate-400  "
                    >
                      <img
                        loading="lazy"
                        src={results[0]?.avatar}
                        className="w-[7rem] object-cover dark:brightness-75"
                      />
                    </td>
                  )}
                </tr>{" "}
                <tr className="divide-x divide-gray-200 dark:divide-gray-700">
                  <td
                    colSpan="2"
                    className="px-6 py-[10px] whitespace-nowrap  text-xs md:text-sm text-slate-800 dark:text-slate-400 "
                  >
                    বাবার নাম
                  </td>
                  <td
                    colSpan="5"
                    className="px-6 py-[10px] whitespace-nowrap  text-xs md:text-sm text-slate-800 dark:text-slate-400 "
                  >
                    {results[0]?.father_name_bangla}
                  </td>
                </tr>
                <tr className="divide-x divide-gray-200 dark:divide-gray-700">
                  <td
                    colSpan="2"
                    className="px-6 py-[10px] whitespace-nowrap  text-xs md:text-sm text-slate-800 dark:text-slate-400"
                  >
                    মায়ের নাম
                  </td>
                  <td
                    colSpan="4"
                    className="px-6 py-[10px] whitespace-nowrap  text-xs md:text-sm text-slate-800 dark:text-slate-400 "
                  >
                    {results[0]?.mother_name_bangla}
                  </td>
                </tr>
                <tr className="divide-x divide-gray-200 dark:divide-gray-700">
                  <td
                    colSpan="2"
                    className="px-6 py-[10px] whitespace-nowrap  text-xs md:text-sm text-slate-800 dark:text-slate-400"
                  >
                    জন্ম তারিখ
                  </td>
                  <td
                    colSpan="2"
                    className="px-6 py-[10px] whitespace-nowrap  text-xs md:text-sm text-slate-800 dark:text-slate-400 font-bangla2 "
                  >
                    {convertToBanglaNumber(
                      results[0]?.date_of_birth
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join("-")
                    )}
                  </td>
                  <td
                    colSpan="2"
                    className="px-6 py-[10px] whitespace-nowrap  text-xs md:text-sm text-slate-800 dark:text-slate-400"
                  >
                    শিক্ষার্বষ
                  </td>
                  <td
                    colSpan="2"
                    className="px-6 py-[10px] whitespace-nowrap  text-xs md:text-sm text-slate-800 dark:text-slate-400 font-bangla2 "
                  >
                    {convertToBanglaNumber(results[0]?.exam_year)}
                  </td>
                </tr>
                <tr className="divide-x divide-gray-200 dark:divide-gray-700">
                  <td
                    colSpan="2"
                    className="px-6 py-[10px] whitespace-nowrap  text-xs md:text-sm text-slate-800 dark:text-slate-400"
                  >
                    বিভাগ
                  </td>
                  <td
                    colSpan="2"
                    className="px-6 py-[10px] whitespace-nowrap  text-xs md:text-sm text-slate-800 dark:text-slate-400 "
                  >
                    {results[0]?.mother_name_bangla || "- -"}
                  </td>
                  <td
                    colSpan="2"
                    className="px-6 py-[10px] whitespace-nowrap  text-xs md:text-sm text-slate-800 dark:text-slate-400"
                  >
                    লিঙ্গ
                  </td>
                  <td
                    colSpan="2"
                    className="px-6 py-[10px] whitespace-nowrap  text-xs md:text-sm text-slate-800 dark:text-slate-400 "
                  >
                    {results[0]?.gender}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentInformationTable;
