import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Transition } from "@headlessui/react";
import FormControl from "../FormControl/FormControl";
import Input from "../FormControl/Input";
import { nameOfClass, exam_name, sakha, subjects } from "../data.json";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import FormTitle from "../FormControl/FormTitle";
import Select from "../FormControl/Select";
import FormCommonError from "../FormControl/FormCommonError";
import { useFormik } from "formik";
import { object, string, ref, number, array } from "yup";
import Button from "../Button";
import PageTitle from "../Heading/PageTitle";
import PageHead from "../Heading/PageHead";
import PageSubtitle from "../Heading/PageSubtitle";
import Stepper from "../Stepper";
import toast from "react-hot-toast";
import SubjectTableLt from "../result/SubjectTableLt";
import convertToBanglaNumber from "../../helper/convertToBanglaNumber";
import {
  EyeSlashIcon,
  PrinterIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { EyeDropperIcon, EyeIcon } from "@heroicons/react/24/outline";
import NoData from "../NoData";
import Modal from "./Modal";
import Loader from "../Loader";
import Switch1 from "../Switch";
import SwitcherOne from "../SwitcherOne";
import useFetch from "../../hooks/useFetch";
// Define Bangla day names
const banglaDayNames = [
  "শনিবার",
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
];

// Define Bangla month names
const banglaMonthNames = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

const currentYear = new Date().getFullYear(); // Get the current year
const year = [currentYear];

for (let i = 2022; i <= 2099; i++) {
  year.push(i);
}

function SeeResults() {
  const { isLoading, mutation } = useFetch();

  const [showAll, setShowAll] = useState(false);

  const [query, setQuery] = useState({ page: 1 });
  const [modalResult, setModalResult] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pagination, setPagination] = useState(null);

  const queryClient = useQueryClient();
  const fatchQuery = (page) => {
    const queryParams = new URLSearchParams({ ...query, page }).toString();
    const url = `${
      import.meta.env.VITE_SERVER_URL
    }/api/result/get_all_result?${queryParams}`;
    return axios({
      url: url,
      withCredentials: true,
    });
  };
  const {
    data: results,
    isLoading: resultLoading,
    isError: resultsError,
    isFetching,
  } = useQuery(["see_results", query.page], () => fatchQuery(query.page), {
    keepPreviousData: true,
    retry: false,
  });


  const formik = useFormik({
    initialValues: {
      exam_name: "",
      exam_year: "",
      nameOfClass: "",
      sakha: "",
      search: "",
      limit: "",
    },

    onSubmit: async (v, { resetForm }) => {
      queryClient.clear("see_results");
      queryClient.resetQueries("see_results");
      setQuery((prev) => {
        return {
          page: 1,
          exam_name: v.exam_name === "পরিক্ষার নাম" ? "" : v.exam_name,
          exam_year: v.exam_year === "পরিক্ষার সাল" ? "" : v.exam_year,
          nameOfClass: v.nameOfClass === "ক্লাসের নাম" ? "" : v.nameOfClass,
          sakha: v.sakha === " শাখা" ? "" : v.sakha,
          search: v.search,
          limit: v.limit,
        };
      });
    },
  });

  const handelSeeResutModal = (result) => {
    setModalResult([result]);
    setModalOpen(true);
    console.log(modalOpen);
  };
  const deleteResult = async (id) => {
    const url = `result/delete_result/${id}`;
    await mutation.mutateAsync({ allFormData: "", url, method: "delete" });
    queryClient.resetQueries(["see_results", query.page]);
  };

  useEffect(() => {
    if (results && results.data.payload) {
      setPagination(results.data.payload.pagination);
    }
  }, [results]);

  return (
    <div className=" m-0 p-0 w-[95%] mx-auto ">
      <div className="  flex justify-center   flex-col">
        {" "}
        <div>
          <Modal
            open={modalOpen}
            setOpen={setModalOpen}
            results={modalResult}
          />
          <form
            action=""
            className=" print:hidden  grid grid-cols-2 md:grid-cols-4 gap-x-2  px-5 lg:px-0 justify-center items-center mx-auto "
            onSubmit={formik.handleSubmit}
          >
            <FormControl>
              <Select
                options={["পরিক্ষার সাল", ...year]}
                name="exam_year"
                onChange={(selectedOption) =>
                  formik.setFieldValue("exam_year", selectedOption)
                }
                value={formik.values.exam_year}
              />
            </FormControl>
            <FormControl>
              <Select
                options={["পরিক্ষার নাম", ...exam_name]}
                name="exam_name"
                id="exam_name"
                onChange={(selectedOption) =>
                  formik.setFieldValue("exam_name", selectedOption)
                }
                value={formik.values.exam_name}
              />
            </FormControl>{" "}
            <FormControl>
              <Select
                options={["ক্লাসের নাম", ...nameOfClass]}
                name="nameOfClass"
                onChange={(selectedOption) =>
                  formik.setFieldValue("nameOfClass", selectedOption)
                }
                value={formik.values.nameOfClass}
              />
            </FormControl>
            <FormControl>
              <Select
                options={["শাখা", ...sakha]}
                name="sakha"
                onChange={(selectedOption) =>
                  formik.setFieldValue("sakha", selectedOption)
                }
                value={formik.values.sakha}
              />
            </FormControl>
            <FormControl className=" h-8">
              <Input
                className="py-2 pb-[0.7] "
                placeholder="কতটি দেখতে চান?"
                name="limit"
                onChange={formik.handleChange}
                value={formik.values.limit}
              />
            </FormControl>
            <FormControl className=" h-8">
              <Input
                className="py-2 pb-[0.7] "
                placeholder="আইডি অথবা নাম দিয়ে খুঁজোন"
                name="search"
                onChange={formik.handleChange}
                value={formik.values.search}
              />
            </FormControl>
            <FormControl className="pt-1">
              <Button className="" disabled={isLoading} isLoading={isLoading}>
                Apply
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </Button>
            </FormControl>
          </form>{" "}
          {resultsError && <NoData>no data found</NoData>}
          {resultLoading && <Loader />}
          {results && results?.data?.payload?.results.length > 0 && (
            <div class=" pt-10 mx-auto">
              <div class="flex flex-col">
                <div className="flex justify-between p-2 print:hidden">
                  <span>found {pagination?.totalDocument} documents</span>
                  <div className="flex gap-7">
                    <span className="flex items-center gap-x-2 ">
                      {" "}
                      <SwitcherOne enabled={showAll} setEnabled={setShowAll} />
                      full page
                    </span>{" "}
                    <span
                      onClick={() => {
                        setShowAll(true);
                        setTimeout(() => {
                          window.print();
                        }, 100);
                      }}
                      className="flex gap-2 cursor-pointer"
                    >
                      {" "}
                      <PrinterIcon className="w-4 " />
                      print
                    </span>
                  </div>
                </div>
                <div
                  class={` w-[100%]  overflow-scroll scrollbar border border-gray-200 dark:border-gray-700 rounded-md ${
                    showAll ? "h-auto" : "max-h-[23rem]"
                  }`}
                >
                  <table class=" overflow-x-scroll  divide-y divide-gray-200 dark:divide-gray-700 w-full">
                    <thead class="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          class="py-3.5 px-4 text-sm font-normal  text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <div class="flex items-center gap-x-3">
                            শিক্ষার্থী
                          </div>
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          পরিক্ষা
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          রেজাল্ট
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          প্রকাশিত
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 print:hidden"
                        >
                          একশন
                        </th>
                      </tr>
                    </thead>
                    <motion.tbody
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
                    >
                      {isFetching && <Loader />}
                      {!isFetching &&
                        results?.data?.payload?.results?.map((result) => (
                          <tr>
                            <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap  truncate ">
                              <div class="flex items-center gap-x-2">
                                <div>
                                  <h2 class="text-sm font-medium text-gray-800 dark:text-white ">
                                    {result?.name_bangla}
                                  </h2>
                                  <p class="text-xs font-normal text-gray-600 dark:text-gray-400">
                                    {result?.student_id}
                                  </p>{" "}
                                  <p class="text-xs font-normal text-gray-600 dark:text-gray-400">
                                    {result?.nameOfClass} &nbsp; &nbsp;
                                    {result?.sakha}
                                  </p>
                                </div>
                              </div>
                            </td>{" "}
                            <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap  truncate ">
                              <div class="flex items-center gap-x-2">
                                <div>
                                  <h2 class="text-sm font-medium text-gray-800 dark:text-white ">
                                    {result?.exam_name}
                                  </h2>
                                  <p class="text-xs font-normal text-gray-600 dark:text-gray-400">
                                    সাল :
                                    <span className="font-bangla2">
                                      {convertToBanglaNumber(result?.exam_year)}
                                    </span>
                                  </p>
                                  <p class="text-xs font-normal text-gray-600 dark:text-gray-400">
                                    পরিক্ষার্থী :{" "}
                                    <span className="font-bangla2">
                                      {convertToBanglaNumber(
                                        result?.total_examinee
                                      )}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </td>{" "}
                            <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap  truncate ">
                              <div class="flex items-center gap-x-2">
                                <div>
                                  <h2 class="text-sm font-medium text-gray-800 dark:text-white ">
                                    {result?.status === "Failed"
                                      ? "ফেল করেছেন"
                                      : "পাশ করেছেন"}
                                  </h2>
                                  <p class="text-xs font-normal text-gray-600 dark:text-gray-400">
                                    মোট নম্বর :{" "}
                                    <span className="font-bangla2">
                                      {convertToBanglaNumber(
                                        result?.total_marks
                                      )}
                                    </span>
                                  </p>{" "}
                                  <p class="text-xs font-normal text-gray-600 dark:text-gray-400">
                                    জিপিএ :{" "}
                                    <span className="font-bangla2">
                                      {convertToBanglaNumber(result?.gpa)}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              <div
                                class={`inline-flex items-center px-3 py-1 rounded-full gap-x-2  ${
                                  result?.published
                                    ? "text-emerald-500 bg-emerald-100/60 dark:bg-gray-800"
                                    : " text-red-500  bg-red-100/60 dark:bg-gray-800"
                                }`}
                              >
                                {" "}
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  {result?.published ? (
                                    <path
                                      d="M10 3L4.5 8.5L2 6"
                                      stroke="currentColor"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  ) : (
                                    <path
                                      d="M9 3L3 9M3 3L9 9"
                                      stroke="currentColor"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  )}{" "}
                                </svg>
                              </div>
                            </td>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap print:hidden">
                              <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-violet-500 bg-violet-500/20 dark:bg-gray-800 hover:ring-2 ring-violet-600 dark:ring-offset-black ring-offset-2">
                                <button
                                  onClick={() => handelSeeResutModal(result)}
                                  className="hover:text-green-500"
                                >
                                  {" "}
                                  <EyeIcon strokeWidth={2} className="w-4" />
                                </button>
                                <button
                                  onClick={() => deleteResult(result?._id)}
                                  className="hover:text-red-500"
                                >
                                  <TrashIcon strokeWidth={2} className="w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </motion.tbody>
                  </table>
                </div>
              </div>

              <div class="flex items-center justify-between mt-6 print:hidden">
                <button
                  onClick={() => {
                    if (pagination?.previousPage && query.page > 1) {
                      setQuery((prev) => {
                        return {
                          ...prev,
                          page: prev.page - 1,
                        };
                      });
                    }
                  }}
                  class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 rtl:-scale-x-100"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>

                  <span>previous</span>
                </button>

                <div class="items-center hidden md:flex gap-x-3">
                  {pagination?.previousPage && (
                    <button
                      onClick={() =>
                        setQuery((prev) => {
                          return {
                            ...prev,
                            page: 1,
                          };
                        })
                      }
                      class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                    >
                      1
                    </button>
                  )}
                  {pagination?.previousPage &&
                    pagination?.previousPage - 1 > 0 && (
                      <button
                        onClick={() =>
                          setQuery((prev) => {
                            return {
                              ...prev,
                              page:
                                pagination.previousPage &&
                                pagination.currentPage - 1,
                            };
                          })
                        }
                        class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                      >
                        {pagination.previousPage && pagination.currentPage - 1}
                      </button>
                    )}
                  <span class="px-2 py-1 text-sm  text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">
                    {pagination?.currentPage}
                  </span>

                  {pagination?.nextPage && (
                    <button
                      onClick={() =>
                        setQuery((prev) => {
                          return {
                            ...prev,
                            page: pagination.nextPage,
                          };
                        })
                      }
                      class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                    >
                      {pagination.nextPage}
                    </button>
                  )}
                  {pagination?.currentPage !== pagination?.totalPages &&
                    pagination?.currentPage + 1 !== pagination?.totalPages && (
                      <button
                        onClick={() =>
                          setQuery((prev) => {
                            return {
                              ...prev,
                              page: pagination?.totalPages,
                            };
                          })
                        }
                        class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                      >
                        {pagination?.totalPages}
                      </button>
                    )}
                </div>

                <button
                  onClick={() => {
                    if (pagination?.nextPage) {
                      setQuery((prev) => {
                        return {
                          ...prev,
                          page: prev.page + 1,
                        };
                      });
                    }
                  }}
                  href="#"
                  class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  <span>Next</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 rtl:-scale-x-100"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SeeResults;
