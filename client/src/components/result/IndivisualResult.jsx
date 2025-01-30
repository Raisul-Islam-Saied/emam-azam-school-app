import React from "react";
import StudentInformationTable from "./StudentInformationTable";
import SumaryTableLt from "./SumaryTableLt";
import convertToBanglaNumber from "../../helper/convertToBanglaNumber";
import ResultButton from "./ResultButton";
import SubjectTableLt from "./SubjectTableLt";

function IndivisualResult({ results, setResults }) {
  return (
    <>
      <StudentInformationTable results={results[0] && results} />
      <SumaryTableLt>
        <thead>
          <tr className="divide-x divide-gray-200 dark:divide-gray-700 ">
            <th
              scope="col"
              colSpan="2"
              className="px-6 py-[10px] text-left text-xs lg:text-sm font-normal text-slate-800  dark:text-slate-400 uppercase"
            >
              পরিক্ষার্থীর সংখ্যা
            </th>
            <th
              colSpan="1"
              scope="col"
              className="px-6 py-[10px] text-left text-xs lg:text-sm font-normal text-slate-800  dark:text-slate-400 uppercase font-bangla2"
            >
              {convertToBanglaNumber(results[0]?.total_examinee)}
            </th>

            <th
              colSpan="2"
              scope="col"
              className="px-6 py-[10px] text-left text-xs lg:text-sm font-normal text-slate-800  dark:text-slate-400 uppercase whitespace-normal"
            >
              মোট নম্বর
            </th>
            <th
              colSpan="1"
              scope="col"
              className="px-6 py-[10px] text-right text-xs lg:text-sm font-normal text-slate-800  dark:text-slate-400 uppercase font-bangla2"
            >
              {convertToBanglaNumber(results[0]?.total_marks)}
            </th>
            <th
              colSpan="2"
              scope="col"
              className="px-6 py-[10px] text-right text-xs lg:text-sm font-normal text-slate-800  dark:text-slate-400 uppercase"
            >
              সর্বোচ্চ নম্বর
            </th>
            <th
              colSpan="1"
              scope="col"
              className="px-6 py-[10px] text-right text-xs lg:text-sm font-normal text-slate-800  dark:text-slate-400 uppercase font-bangla2"
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
              className="px-6 py-[10px] text-left text-xs lg:text-sm font-normal text-slate-800  dark:text-slate-400 uppercase"
            >
              গড় নম্বর
            </th>
            <th
              colSpan="1"
              scope="col"
              className="px-6 py-[10px] text-left text-xs lg:text-sm font-normal text-slate-800  dark:text-slate-400 uppercase font-bangla2"
            >
              {convertToBanglaNumber(results[0]?.avarage_marks)}
            </th>

            <th
              colSpan="2"
              scope="col"
              className="px-6 py-[10px] text-left text-xs lg:text-sm font-normal text-slate-800  dark:text-slate-400 uppercase"
            >
              গড় পয়েন্ট
            </th>
            <th
              colSpan="1"
              scope="col"
              className="px-6 py-[10px] text-center text-xs lg:text-sm font-normal text-slate-800  dark:text-slate-400 uppercase font-bangla2"
            >
              {convertToBanglaNumber(results[0]?.avarage_point)}
            </th>
            <th
              colSpan="2"
              scope="col"
              className="px-6 py-[10px] text-right text-xs lg:text-sm font-normal text-slate-800  dark:text-slate-400 uppercase"
            >
              গড় গ্রেড
            </th>
            <th
              colSpan="1"
              scope="col"
              className="px-6 py-[10px] text-right text-xs lg:text-sm font-normal  uppercase text-slate-800  dark:text-slate-400 "
            >
              {results[0]?.avarage_grade}
            </th>
          </tr>
          <tr className="divide-x divide-gray-200 dark:divide-gray-700 ">
            <th
              scope="col"
              colSpan="2"
              className="px-6 py-[10px] text-left text-xs lg:text-sm font-normal text-slate-800  dark:text-slate-400 uppercase"
            >
              গ্রেড
            </th>
            <th
              colSpan="1"
              scope="col"
              className={`px-6 py-[10px]  text-left text-xs lg:text-sm font-semibold text-md  ${
                results[0]?.grade === "F" ? "text-red-500" : "text-green-500"
              }`}
            >
              {results[0]?.grade}
            </th>

            <th
              colSpan="2"
              scope="col"
              className="px-6 py-[10px] text-left text-xs lg:text-sm font-normal text-slate-800  dark:text-slate-400 uppercase"
            >
              পয়েন্ট
            </th>
            <th
              colSpan="1"
              scope="col"
              className={`px-6 py-[10px]  text-center text-xs lg:text-sm font-semibold text-md  ${
                results[0]?.grade === "F" ? "text-red-500" : "text-green-500"
              }`}
            >
              {convertToBanglaNumber(
                String(results[0]?.gpa).length === 1
                  ? results[0]?.gpa + ".00"
                  : results[0]?.gpa
              )}
            </th>
            <th
              colSpan="2"
              scope="col"
              className="px-6 py-[10px] text-right text-xs lg:text-sm font-normal text-slate-800  dark:text-slate-400 uppercase"
            >
              স্থান
            </th>
            <th
              colSpan="1"
              scope="col"
              className="px-6 py-[10px] text-right text-xs lg:text-sm font-normal font-bangla2  uppercase "
            >
              {convertToBanglaNumber(results[0]?.position)}
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
              className="px-6 py-[10px] text-left text-xs lg:text-sm font-normal text-slate-800 uppercase dark:text-slate-400"
            >
              নং
            </th>
            <th
              colSpan="5"
              scope="col"
              className="px-6 py-[10px] text-left text-xs lg:text-sm font-normal text-slate-800 uppercase dark:text-slate-400"
            >
              বিষয়ের নাম
            </th>

            <th
              colSpan="2"
              scope="col"
              className="px-6 py-[10px] text-left text-xs lg:text-sm font-normal text-slate-800 uppercase dark:text-slate-400 "
            >
              নম্বর
            </th>
            <th
              colSpan="2"
              scope="col"
              className="px-6 py-[10px] text-left text-xs lg:text-sm font-normal text-slate-800 uppercase  dark:text-slate-400 "
            >
              পয়েন্ট
            </th>
            <th
              colSpan="2"
              scope="col"
              className="px-6 py-[10px] text-left text-xs lg:text-sm font-normal text-slate-800 uppercase  dark:text-slate-400  "
            >
              গ্রেড
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {results[0]?.subjects.map((subject, index) => {
            return (
              <tr
                key={subject._id}
                className="divide-x divide-gray-200
                         dark:divide-gray-700 even:bg-slate-100
                         dark:even:bg-slate-800 dark:hover:bg-slate-800 hover:bg-slate-100 "
              >
                <td
                  scope="col"
                  colSpan="1"
                  className="px-6 py-[10px] text-left text-xs lg:text-sm text-slate-800  dark:text-slate-400 font-bangla2 "
                >
                  {convertToBanglaNumber(index + 1)}
                </td>
                <td
                  colSpan="5"
                  scope="col"
                  className="px-6 py-[10px] text-left text-xs lg:text-sm  text-slate-800  dark:text-slate-400  "
                >
                  {subject.subject}
                </td>

                <td
                  colSpan="2"
                  scope="col"
                  className="px-6 py-[10px] text-left text-xs lg:text-sm  text-slate-800  dark:text-slate-400 uppercase font-bangla2"
                >
                  {convertToBanglaNumber(subject.marks)}
                </td>
                <td
                  colSpan="2"
                  scope="col"
                  className="px-6 py-[10px] text-left text-xs lg:text-sm  text-slate-800  dark:text-slate-400 "
                >
                  {convertToBanglaNumber(
                    String(subject.point).length === 1
                      ? subject.point + ".00"
                      : subject.point
                  )}
                </td>
                <td
                  colSpan="2"
                  scope="col"
                  className="px-6 py-[10px] text-left text-xs lg:text-sm  text-slate-800  dark:text-slate-400 uppercase"
                >
                  {subject.grade}
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

export default IndivisualResult;
