import React, { useEffect, useState } from "react";
import ResultButton from "./ResultButton";
import SumaryTableLt from "./SumaryTableLt";
import convertToBanglaNumber from "../../helper/convertToBanglaNumber";
import SubjectTableLt from "./SubjectTableLt";

function ClassBaseResults({ results, setResults }) {
  const [total_failed, setfailed] = useState(0);
  useEffect(() => {
    if (results && results[1] && results.length > 1) {
      const failed = results.filter((result) => {
        const failedReuslt = result.grade === "F";
        return failedReuslt;
      });
      if (failed.length > 0) {
        setfailed(failed.length);
      }
    }
  }, [results]);

  return (
    <>
      <SumaryTableLt>
        <thead>
          <tr className="divide-x divide-gray-200 dark:divide-gray-700 ">
            <th
              scope="col"
              colSpan="2"
              className="px-6 py-[10px] text-left text-sm font-normal text-slate-800  dark:text-slate-400 uppercase"
            >
              পরিক্ষার্থীর সংখ্যা
            </th>
            <th
              colSpan="1"
              scope="col"
              className="px-6 py-[10px] text-left text-sm font-normal text-slate-800  dark:text-slate-400 uppercase font-bangla2"
            >
              {convertToBanglaNumber(results[0]?.total_examinee)}
            </th>

            <th
              colSpan="2"
              scope="col"
              className="px-6 py-[10px] text-left text-sm font-normal text-slate-800  dark:text-slate-400 uppercase"
            >
              মোট নম্বর
            </th>
            <th
              colSpan="1"
              scope="col"
              className="px-6 py-[10px] text-right text-sm font-normal text-slate-800  dark:text-slate-400 uppercase font-bangla2"
            >
              {convertToBanglaNumber(results[0]?.subjects.length * 100)}
            </th>
            <th
              colSpan="2"
              scope="col"
              className="px-6 py-[10px] text-right text-sm font-normal text-slate-800  dark:text-slate-400 uppercase"
            >
              সর্বোচ্চ নম্বর
            </th>
            <th
              colSpan="1"
              scope="col"
              className="px-6 py-[10px] text-right text-sm font-normal text-slate-800  dark:text-slate-400 uppercase font-bangla2"
            >
              {convertToBanglaNumber(results[0]?.best_marks)}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          <tr className="divide-x divide-gray-200 dark:divide-gray-700 ">
            <th
              scope="col"
              colSpan="2"
              className="px-6 py-[10px] text-left text-sm font-normal text-slate-800  dark:text-slate-400 uppercase"
            >
              পাশে করেছেন
            </th>
            <th
              colSpan="1"
              scope="col"
              className="px-6 py-[10px] text-left text-sm font-normal text-slate-800  dark:text-slate-400 uppercase font-bangla2"
            >
              {convertToBanglaNumber(results[0]?.total_examinee - total_failed)}
            </th>

            <th
              colSpan="2"
              scope="col"
              className="px-6 py-[10px] text-left text-sm font-normal text-slate-800  dark:text-slate-400 uppercase"
            >
              ফেল করেছেন
            </th>
            <th
              colSpan="1"
              scope="col"
              className="px-6 py-[10px] text-center text-sm font-normal text-slate-800  dark:text-slate-400 uppercase font-bangla2"
            >
              {convertToBanglaNumber(total_failed)}
            </th>
            <th
              colSpan="2"
              scope="col"
              className="px-6 py-[10px] text-right text-sm font-normal text-slate-800  dark:text-slate-400 uppercase"
            >
              পাশের হার
            </th>
            <th
              colSpan="1"
              scope="col"
              className="px-6 py-[10px] text-right text-sm font-normal  uppercase text-slate-800  dark:text-slate-400 "
            >
              {convertToBanglaNumber(
                ((results[0]?.total_examinee - total_failed) * 100) /
                  results[0].total_examinee
              ) + "%"}
            </th>
          </tr>
        </tbody>
      </SumaryTableLt>
      <SubjectTableLt>
        <thead>
          <tr className="divide-x divide-gray-200 dark:divide-gray-700 bg-gray-300 dark:bg-slate-700/70 ">
            <th
              scope="col"
              colSpan="1"
              className="px-6 py-[10px] text-left text-sm font-normal text-slate-800 uppercase dark:text-slate-400"
            >
              রোল
            </th>
            <th
              colSpan="5"
              scope="col"
              className="px-6 py-[10px] text-left text-sm font-normal text-slate-800 uppercase dark:text-slate-400"
            >
              নাম
            </th>
            <th
              colSpan="2"
              scope="col"
              className="px-6 py-[10px] text-left text-sm font-normal text-slate-800 uppercase dark:text-slate-400 "
            >
              নম্বর
            </th>
            <th
              colSpan="2"
              scope="col"
              className="px-6 py-[10px] text-left text-sm font-normal text-slate-800 uppercase  dark:text-slate-400 "
            >
              পয়েন্ট
            </th>
            <th
              colSpan="2"
              scope="col"
              className="px-6 py-[10px] text-left text-sm font-normal text-slate-800 uppercase  dark:text-slate-400  "
            >
              গ্রেড
            </th>{" "}
            <th
              colSpan="2"
              scope="col"
              className="px-6 py-[10px] text-left text-sm font-normal text-slate-800 uppercase  dark:text-slate-400  "
            >
              স্থান
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {results?.map((result, index) => {
            return (
              <tr
                key={result._id}
                className="divide-x divide-gray-200
                         dark:divide-gray-700 even:bg-slate-100
                         dark:even:bg-slate-800 dark:hover:bg-slate-800 hover:bg-slate-100 "
              >
                <td
                  scope="col"
                  colSpan="1"
                  className="px-6 py-[10px] text-left text-sm text-slate-800  dark:text-slate-400 font-bangla2 "
                >
                  {convertToBanglaNumber(result.roll)}
                  {" " + result.sakha.split(" ")[0]}
                </td>
                <td
                  colSpan="5"
                  scope="col"
                  className="px-6 py-[10px] text-left text-sm  text-slate-800  dark:text-slate-400  "
                >
                  {result.name}
                </td>

                <td
                  colSpan="2"
                  scope="col"
                  className="px-6 py-[10px] text-left text-sm  text-slate-800  dark:text-slate-400 uppercase font-bangla2"
                >
                  {convertToBanglaNumber(result.total_marks)}
                </td>
                <td
                  colSpan="2"
                  scope="col"
                  className="px-6 py-[10px] text-left text-sm  text-slate-800  dark:text-slate-400 "
                >
                  {convertToBanglaNumber(
                    String(result.gpa).length === 1
                      ? result.gpa + ".00"
                      : result.gpa
                  )}
                </td>
                <td
                  colSpan="2"
                  scope="col"
                  className="px-6 py-[10px] text-left text-sm  text-slate-800  dark:text-slate-400 uppercase"
                >
                  {result.grade}
                </td>
                <td
                  colSpan="2"
                  scope="col"
                  className="px-6 py-[10px] text-left text-sm  text-slate-800  dark:text-slate-400 uppercase"
                >
                  {result.position}
                </td>
              </tr>
            );
          })}
        </tbody>
      </SubjectTableLt>
      <ResultButton setResults={(v) => setResults(v)} />
    </>
  );
}

export default ClassBaseResults;
