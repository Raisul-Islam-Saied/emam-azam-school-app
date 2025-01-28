import React, { useState } from "react";
import PageTitle from "./Heading/PageTitle";
import PageHead from "./Heading/PageHead";
import PageSubtitle from "./Heading/PageSubtitle";
import PageHeadingImage from "./Heading/HeadingImage";
import {
  nameOfClass,
  exam_name,
  sakha,
  subjects,
  religion,
  gender,
  group,
  blood_group,
} from "./data.json";
import useIntersection from "../hooks/useIntersection";
import {
  Link,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowDownLeftIcon,
  ArrowDownTrayIcon,
  LinkIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

//images
import peep from "../assets/images/peep9.svg";
import html from "../assets/images/html.svg";
import css from "../assets/images/css.svg";
import javascript from "../assets/images/javascript.svg";
import vscode from "../assets/images/vscode.svg";
import github from "../assets/images/github.svg";
import react from "../assets/images/react.svg";
import Button from "./Button";
import { ArrowDownIcon } from "@heroicons/react/20/solid";
import Input from "./FormControl/Input";
import Select from "./FormControl/Select";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import convertToBanglaNumber from "../helper/convertToBanglaNumber";
import NotFound from "./NotFound";
import NoData from "./NoData";
const currentYear = new Date().getFullYear(); // Get the current year
const year = [currentYear];

for (let i = 2022; i <= 2099; i++) {
  year.push(i);
}


function Syllabus() {
  const [examYear, setExamYear] = useState(currentYear);
  const [currentClass, setNameOFCalss] = useState("");
  const [ref, visible] = useIntersection({ threshold: 0.1 });
  const fatchQuery = () => {
    const queryParams = new URLSearchParams({
      nameOfClass: currentClass && currentClass,
      exam_year: examYear && examYear,
    }).toString();
    const url = `${
      import.meta.env.VITE_SERVER_URL
    }/api/syllabus/get_syllabus?${queryParams}`;
    return axios({
      method: "get",
      url: url,
    });
  };

  const queryClient = useQueryClient();
  const { data, isLoading, isError, isFetching, error } = useQuery(
    ["syllabus"],
    fatchQuery,
    { retry: false, refetchOnWindowFocus: true }
  );

  return (
    <section
      id="what-should-know"
      ref={ref}
      className="w-full relative min-h-screen   py-24 bg-slate-100 border-t border-gray-300 dark:bg-slate-800/30 dark:border-gray-400/50"
    >
      <div className="container w-[90%] mx-auto ">
        <div className="flex  flex-col gap-5 lg:gap-20  lg:flex-row ">
          <PageTitle className=" !justify-start !items-start !gap-5 lg:flex-[3]">
            <PageHeadingImage src={peep} visible={true} />
            <PageHead className="!text-left">
              এখান থেকে{" "}
              <span className="primary-highlighter ">সিলেবাস ডাউনলোড করুন</span>
            </PageHead>

            <form
              className="w-full justify-center flex lg:flex-col gap-5"
              action=""
            >
              <Select
                onChange={(e) => {
                  queryClient.removeQueries("syllabus");
                  if (e !== "ক্লাস সিলেক্ট করুন") {
                    setNameOFCalss(e);
                  } else {
                    setNameOFCalss("");
                  }
                }}
                options={["ক্লাস সিলেক্ট করুন", ...nameOfClass]}
              />{" "}
              <Select
                options={["পরিক্ষার সাল", ...year]}
                onChange={(e) => {
                  queryClient.removeQueries("syllabus");
                  if (e !== "পরিক্ষার সাল") {
                    setExamYear(e);
                  } else {
                    setExamYear(currentYear);
                  }
                }}
              />
            </form>
          </PageTitle>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:h-screen scrollbar overflow-y-scroll flex-[6] lg:gap-0">
            {data?.data?.payload?.syllabus?.map((syllabus) => {
              return (
                <div className="section3-grid bg-white h-60 dark:bg-gray-900 m-2  ">
                  <div className="  bg-orange-600 p-3 rounded-full">
                    <PencilSquareIcon className="w-4 h-4 stroke-white" />
                  </div>
                  <h2 className=" font-semibold text-gray-700 dark:text-slate-200">
                    {syllabus.nameOfClass} -{" "}
                    <span className="font-bangla2">
                      {convertToBanglaNumber(syllabus.exam_year)}
                    </span>
                  </h2>
                  <div class=" flex flex-col  items-start gap-3   text-xs  w-full ">
                    <div class=" sm:inline-flex sm:shrink-0 sm:items-center gap-2 flex w-full">
                      <svg
                        class="h-4 w-4 text-indigo-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                        />
                      </svg>
                      <div className="flex w-full items-center justify-between">
                        <p class="text-gray-500">পরিক্ষার সাল</p>

                        <p class="font-medium">
                          <span className="font-bangla2">
                            {convertToBanglaNumber(syllabus.exam_year)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div class=" sm:inline-flex sm:shrink-0 sm:items-center gap-2 flex w-full">
                      <svg
                        class="h-4 w-4 text-indigo-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                        />
                      </svg>
                      <div className="flex w-full items-center justify-between">
                        <p class="text-gray-500">প্রকাশ কাল</p>

                        <p class="font-medium">
                          <span className="font-bangla2">
                            {convertToBanglaNumber(
                              String(syllabus.createdAt)
                                .slice(0, 10)
                                .split("-")
                                .reverse()
                                .join("-")
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                  <a href={syllabus.syllabus} download>
                    {" "}
                    <Button className=" !py-1  text-sm ">
                      <ArrowDownTrayIcon strokeWidth={2} className="w-4 h-4" />{" "}
                      ডাউনলোড
                    </Button>
                  </a>
                </div>
              );
            })}
            {!data && !isLoading && isError && (
              <div className="  col-span-3 row-span-2 ">
                <NoData>
                  {isError && error?.response?.data?.errors?.common?.msg}
                </NoData>
              </div>
            )}
            {isLoading &&
              !data &&
              [3, 3, 3, 3, 3, 3].map(() => {
                return (
                  <div className="  duration-500 section3-grid bg-white h-60 dark:bg-gray-900 m-2  ">
                    <div className="animate-pulse   bg-gray-500 p-5 rounded-full "></div>
                    <div className=" animate-pulse bg-gray-400 rounded-sm dark:text-slate-200 p-2 w-full block"></div>
                    <div class=" flex flex-col  items-start gap-3   text-xs  w-full ">
                      <div class=" sm:inline-flex sm:shrink-0 sm:items-center gap-2 flex w-full">
                        <svg
                          class="h-4 w-4 text-transparent bg-gray-400 rounded-sm"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                          />
                        </svg>
                        <div className="flex w-full items-center justify-between">
                          <p class="text-transparent bg-gray-400 animate-pulse rounded-sm">
                            পরিক্ষার সাল
                          </p>

                          <p class="font-medium text-transparent bg-gray-400 animate-pulse">
                            <span className="font-bangla2">3453453</span>
                          </p>
                        </div>
                      </div>{" "}
                      <div class=" sm:inline-flex sm:shrink-0 sm:items-center gap-2 flex w-full">
                        <svg
                          class="h-4 w-4 text-transparent bg-gray-400 rounded-sm"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                          />
                        </svg>
                        <div className="flex w-full items-center justify-between">
                          <p class="text-transparent bg-gray-400 animate-pulse rounded-sm">
                            পরিক্ষার
                          </p>

                          <p class="font-medium text-transparent bg-gray-400 animate-pulse">
                            <span className="font-bangla2">3453dsfg453</span>
                          </p>
                        </div>
                      </div>
                      <div className=" animate-pulse bg-gray-500 rounded-sm dark:text-slate-200 p-3 w-full block"></div>
                    </div>{" "}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Syllabus;
