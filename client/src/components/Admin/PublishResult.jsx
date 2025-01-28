import React, { useEffect, useRef, useState } from "react";
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
import { TrashIcon } from "@heroicons/react/20/solid";
import { motion, inView } from "framer-motion";
import NoData from "../NoData";
import Modal from "./Modal";
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

function PublishResult({ result }) {
  const { mutation, isLoading, error } = useFetch();

  const queryClient = useQueryClient();
  const fatchQuery = () => {
    const url = `${
      import.meta.env.VITE_SERVER_URL
    }/api/result/get_unpublish_results`;
    return axios({
      url: url,
      withCredentials: true,
    });
  };
  const { data: results } = useQuery(["publish_results"], () => fatchQuery());

  return (
    <div className="overflow-x-hidden m-0 p-0  -mt-5">
      <div className="  flex justify-center ">
        <div className="mt-5  flex justify-center items-center flex-col md:flex-row gap-2 pb-10 mb-10 ">
          {" "}
          <div className="flex-1 ">
            {results && (
              <PageTitle>
                <PageHead>
                  <span className="primary-highlighter"> রেজাল্ট </span> পাবলিশ
                  করুন
                </PageHead>
                <PageSubtitle>
                  রেজাল্ট যদি বার্ষিক পরিক্ষার হয় তাহলে শিক্ষার্থীর ক্লাস রোল ও
                  অন্যান্য তথ্য আপডেট হয়ে যাবে <br />
                  রেজাল্ট একবার পাবলিশ হয়ে গেলে তা আর পরিবর্তন করা যাবে না
                </PageSubtitle>
              </PageTitle>
            )}

            {!results && <NoData>পাবলিশ করা হয়নি এমন কোনো রেজাল্ট নেই</NoData>}

            {results &&
              results.data &&
              results?.data?.payload?.map((result, index) => {
                return (
                  <motion.div
                    initial={
                      index / 2 === 0
                        ? { x: "100vh", opacity: 0 }
                        : { x: "-100vh", opacity: 0 }
                    }
                    animate={inView && { x: 0, opacity: 1 }}
                    key={result?.id}
                    className="flow-root rounded-lg border border-gray-100 dark:border-slate-600 py-3 shadow-sm mt-10  md:w-[40rem] mx-auto px-5 pt-5 "
                  >
                    <dl className="-my-3 divide-y divide-gray-100 dark:divide-slate-500 text-sm">
                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 dark:even:bg-slate-800/50  sm:grid-cols-3 sm:gap-4 px-5">
                        <dt className="font-medium text-gray-900 dark:text-slate-300">
                          পরিক্ষার নাম
                        </dt>
                        <dd className="text-gray-700 dark:text-slate-400 sm:col-span-2">
                          {result?.exam_name}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 dark:even:bg-slate-800/50 sm:grid-cols-3 sm:gap-4 px-5">
                        <dt className="font-medium text-gray-900 dark:text-slate-300">
                          ক্লাসের নাম
                        </dt>
                        <dd className="text-gray-700 dark:text-slate-400 sm:col-span-2">
                          {result?.nameOfClass}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 dark:even:bg-slate-800/50 sm:grid-cols-3 sm:gap-4 px-5">
                        <dt className="font-medium text-gray-900 dark:text-slate-300">
                          শাখা
                        </dt>
                        <dd className="text-gray-700 dark:text-slate-400 sm:col-span-2">
                          {result?.sakha}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 dark:even:bg-slate-800/50 sm:grid-cols-3 sm:gap-4 px-5 ">
                        <dt className="font-medium text-gray-900 dark:text-slate-300 ">
                          মোট পরিক্ষার্থী
                        </dt>
                        <dd className="text-gray-700 dark:text-slate-400 sm:col-span-2 font-bangla2">
                          {convertToBanglaNumber(result?.total_examinee)}

                          <span className="pl-20 ">
                            সাল :{" "}
                            <span className="font-bangla2">
                              {convertToBanglaNumber(result?.exam_year)}
                            </span>
                          </span>
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 px-5 even:bg-gray-50 dark:even:bg-slate-800/50 sm:grid-cols-3 sm:gap-4 ">
                        <dd className="text-gray-700 dark:text-slate-400 sm:col-span-4">
                          <Button
                            isLoading={isLoading}
                            onClick={async () => {
                              const allFormData = {
                                nameOfClass: result.nameOfClass,
                                sakha: result.sakha,
                                exam_year: result.exam_year,
                                exam_name: result.exam_name,
                              };
                              const url = `result/publish_results`;
                              await mutation.mutateAsync({
                                allFormData,
                                url,
                                method: "PUT",
                              });
                              queryClient.resetQueries("publish_results");
                            }}
                            className="my-3 "
                          >
                            পাবলিশ করুন
                          </Button>
                        </dd>
                      </div>
                    </dl>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublishResult;
