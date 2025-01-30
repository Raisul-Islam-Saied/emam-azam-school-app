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
import { TrashIcon } from "@heroicons/react/20/solid";
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

function AddResult({ result }) {
  const [error, setError] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [schema, setSchema] = useState(null);
  const [selectedSubject, setSubjects] = useState(null);

  const queryClient = useQueryClient();
  const fatchQuery = () => {
    const data = {
      exam_name: schema?.exam_name,
      exam_year: schema?.exam_year,
      nameOfClass: schema?.nameOfClass,
      sakha: schema?.sakha,
    };
    const queryParams = new URLSearchParams(data).toString();
    const url = `${
      import.meta.env.VITE_SERVER_URL
    }/api/result/get_all_result?${queryParams}`;
    return axios({
      url: url,

      withCredentials: true,
    });
  };
  const { data: results } = useQuery(["results"], () => fatchQuery(schema), {
    retry: 1,
    enabled: !!selectedSubject,
  });

  const mutation = useMutation(
    ({ allFormData, url, method }) => {
      return axios({
        method: method,
        url: url,
        data: allFormData,
        withCredentials: true,
      });
    },

    {
      onMutate: () => {
        setError(null);
        setIsLoading(true);
        toast.loading("loading", {
          id: 1,
          className:
            "dark:bg-slate-800 dark:border border-slate-600 font-bangla dark:text-slate-300",
        });
      },

      onError: (error) => {
        setIsLoading(false);
        if (error.message) {
          toast.error(<p>{error.message}</p>, { id: 1 });
        }
        const errorMessage = error.response.data.errors;

        const schemaKey = Object.keys(schema);

        if (errorMessage && errorMessage.common) {
          toast.error(<p>{errorMessage.common.msg}</p>, { id: 1 });
        }

        schemaKey.forEach((key) => {
          if (errorMessage && errorMessage[key]) {
            toast.error(<p>{errorMessage[key].msg}</p>, { id: 1 });
          }
        });

        setError(errorMessage);
      },

      onSuccess: (data) => {
        queryClient.resetQueries("results");

        setError(null);
        setIsLoading(false);
        toast.success(<p>{data?.data?.message}</p>, {
          id: 1,
        });
      },
    }
  );

  const schemaFormik = useFormik({
    initialValues: {
      exam_name: exam_name[0],
      exam_year: year[0],
      nameOfClass: nameOfClass[0],
      total_examinee: "",
      sakha: sakha[0],
    },
    validationSchema: object().shape({
      exam_name: string()
        .oneOf(exam_name)
        .required("পরিক্ষার নাম র্নিবাচন করুন"),
      exam_year: number().required().oneOf(year),
      sakha: string().oneOf(sakha).required("শাখা র্নিবাচন করুন"),
      nameOfClass: string().optional().oneOf(nameOfClass),
      total_examinee: number()
        .required()
        .min(2)
        .positive()
        .integer()
        .test(
          "no-leading-zero",
          "Leading zero is not allowed",
          (value, context) => {
            return (
              context.originalValue && !context.originalValue.startsWith("0")
            );
          }
        ),
    }),
    onSubmit: async (v) => {
      setSchema(v);
    },
  });
  const subjectFormik = useFormik({
    initialValues: {
      subjects: [],
    },
    validationSchema: object().shape({
      subjects: array().min(1, "Select at least one subject"),
    }),
    onSubmit: async (v) => {
      setSubjects(
        v.subjects.map((selectedSubject) => {
          return { subject: selectedSubject, marks: 0 };
        })
      );
      queryClient.invalidateQueries("results");
    },
  });
  const formik = useFormik({
    initialValues: {
      roll: "",
      subjects: {},
    },
    validationSchema: object().shape({
      roll: number().required().integer().min(1),

      subjects: object().shape(
        selectedSubject &&
          selectedSubject.reduce((acc, subject) => {
            acc[subject.subject] = number()
              .required("it is required")
              .typeError("Marks must be a number")
              .min(0, "Marks must be greater than or equal to 0")
              .max(100, "Marks must be less than or equal to 100")
              .integer("Marks must be an integer")
              .required("Marks are required for all subjects");

            return acc;
          }, {})
      ),
    }),
    onSubmit: async (v, { resetForm }) => {
      const updatedMarks = selectedSubject.map((subject) => ({
        subject: subject.subject,
        marks: v.subjects[subject.subject] || 0,
      }));
      const data = {
        ...schema,
        roll: v.roll,
        subjects: [...updatedMarks],
      };
      const url = `${import.meta.env.VITE_SERVER_URL}/api/result/add_result`;
      mutation.mutate({ allFormData: data, url, method: "post" });
      if (mutation.isSuccess) {
        mutation.isSuccess(resetForm({}));
      }
    },
  });
  const deleteResult = async (id) => {
    const url = `${
      import.meta.env.VITE_SERVER_URL
    }/api/result/delete_result/${id}`;
    mutation.mutate({ allFormData: "", url, method: "delete" });
    if (mutation.isSuccess) {
      queryClient.resetQueries("results");
    }
  };
  const { touched } = schemaFormik;
  const isFinish = () => {
    if (results && results?.data?.payload?.results) {
      if (
        results?.data?.payload?.results[0]?.total_examinee ===
        results.data.payload.results.length
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <div className="overflow-x-hidden  m-0 p-0   mx-auto  ">
      <Stepper
        items={[
          {
            title: "রেজাল্ট স্কিমা",
            subTitle: "রেজাল্ট স্কিমা তৈরি করুন",
            done: schema,
          },

          {
            title: "সাবজেক্ট",
            subTitle: "সাবজেক্ট নির্বাচন করুন",
            done: selectedSubject,
          },
          {
            title: "শেষ করুন",
            subTitle: `বাকি আছে : ${convertToBanglaNumber(
              schema?.total_examinee ||
                0 - (results?.data?.payload?.results.length || 0)
            )} টি`,
            done:
              selectedSubject &&
              (schema?.total_examinee || 0) -
                (results?.data?.payload?.results.length || 0) ===
                0,
          },
        ]}
      />
      <div className="  flex justify-center mt-10">
        <div className="mt-5  flex justify-center items-center flex-col md:flex-row gap-2 pb-10  ">
          {" "}
          {!schema && !selectedSubject && (
            <motion.div
              initial={{ x: "100vh" }}
              animate={{ x: 0 }}
              className="w-[90%] lg:w-[100%] min-h-[40rem]"
            >
              <PageTitle>
                <PageHead>
                  <span className="primary-highlighter"> রেজাল্ট স্কিমা</span>{" "}
                  তৈরি করুন
                </PageHead>
                <PageSubtitle>
                  রেজাল্ট স্কিমা সর্তকতার সাথে তৈরি করুন পরর্বতীতে আপনি কোনো
                  তথ্য পরিবর্তন করতে পারবেন না
                </PageSubtitle>
              </PageTitle>

              <form
                action=""
                className="pt-10 md:grid md:grid-cols-2 md:gap-x-5 "
                onSubmit={schemaFormik.handleSubmit}
              >
                {" "}
                <FormControl>
                  <FormTitle title="পরিক্ষার সাল" />
                  <Select
                    options={year}
                    name="exam_year"
                    onChange={(selectedOption) =>
                      schemaFormik.setFieldValue("exam_year", selectedOption)
                    }
                    value={schemaFormik.values.exam_year}
                    errorMessage={
                      (touched.exam_year && schemaFormik?.errors?.exam_year) ||
                      error?.exam_year?.msg
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormTitle title="পরিক্ষার নাম" />
                  <Select
                    options={exam_name}
                    name="exam_name"
                    id="exam_name"
                    onChange={(selectedOption) =>
                      schemaFormik.setFieldValue("exam_name", selectedOption)
                    }
                    value={schemaFormik.values.exam_name}
                    errorMessage={
                      (touched.exam_name && schemaFormik?.errors?.exam_name) ||
                      error?.exam_name?.msg
                    }
                  />
                </FormControl>{" "}
                <FormControl>
                  <FormTitle title="ক্লাসের নাম" />
                  <Select
                    options={nameOfClass}
                    name="nameOfClass"
                    onChange={(selectedOption) =>
                      schemaFormik.setFieldValue("nameOfClass", selectedOption)
                    }
                    value={schemaFormik.values.nameOfClass}
                  />
                </FormControl>
                <FormControl>
                  <FormTitle title="শাখা" />
                  <Select
                    options={sakha}
                    name="sakha"
                    onChange={(selectedOption) =>
                      schemaFormik.setFieldValue("sakha", selectedOption)
                    }
                    value={schemaFormik.values.sakha}
                    errorMessage={
                      (touched.sakha && schemaFormik?.errors?.sakha) ||
                      error?.sakha?.msg
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormTitle title="মোট পরিক্ষার্থী" />
                  <Input
                    className="mt-2 !py-[0.63rem]"
                    required
                    name="total_examinee"
                    onChange={schemaFormik.handleChange}
                    value={schemaFormik.values.total_examinee}
                    errorMessage={
                      schemaFormik.touched.total_examinee &&
                      schemaFormik.errors &&
                      schemaFormik?.errors?.total_examinee
                    }
                  />
                </FormControl>
                <div className="flex md:-mt-7 justify-between items-center ">
                  <Button isLoading={isLoading} className="py-[0.6rem]">
                    {" "}
                    পরর্বতী ধাপে যান{" "}
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
                </div>
              </form>
            </motion.div>
          )}
          {schema && !selectedSubject && (
            <motion.div
              initial={{ x: "100vh" }}
              animate={{ x: 0 }}
              className="flex-1  "
            >
              <PageTitle>
                <PageHead>
                  <span className="primary-highlighter"> সাবজেক্ট</span> সিলেক্ট
                  করুন
                </PageHead>
                <PageSubtitle>
                  পরিক্ষার সব সাবজেক্ট সিলেক্ট করুন , যে পরিক্ষা আগে হয়েছে তা
                  আগে সিলেক্ট করুন
                </PageSubtitle>
              </PageTitle>

              <form
                action=""
                className="pt-10 md:grid grid-cols-3  gap-5 "
                onSubmit={subjectFormik.handleSubmit}
              >
                {" "}
                {subjects.map((subject, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center pl-4 my-5 md:my-0 border border-gray-200 rounded dark:border-gray-700"
                    >
                      <input
                        id={subject.split(" ").join("")}
                        style={{ backgroundColor: "red" }}
                        type="checkbox"
                        value={subject}
                        onChange={subjectFormik.handleChange}
                        name="subjects"
                        className="w-5 h-5  text-blue-600 bg-gray-100 border-gray-300 rounded   dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor={subject.split(" ").join("")}
                        className="w-full py-4 ml-2 text-sm font-medium text-slate-700 dark:text-gray-300"
                      >
                        {subject}
                      </label>
                    </div>
                  );
                })}
                <div className="flex border-t-2 border-slate-300 dark:border-slate-500 pt-3 col-start-1 col-span-3   gap-5 justify-between items-center ">
                  <Button
                    type="reset"
                    onClick={() => {
                      setSchema(null);
                      schemaFormik.handleReset();
                      queryClient.removeQueries("results");
                      subjectFormik.handleReset();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-4 h-4 rotate-180"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </svg>
                    র্পূববতী ধাপে যান{" "}
                  </Button>
                  <Button
                    type="reset"
                    onClick={subjectFormik.resetForm}
                    className="bg-rose-600 dark:!bg-rose-500 hidden md:block"
                  >
                    রিসেট করুন
                  </Button>
                  <Button type="submit">
                    পরর্বতী ধাপে যান
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-4 h-4 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </svg>
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
          {schema && selectedSubject && (
            <motion.div
              initial={{ x: "100vh" }}
              animate={{ x: 0 }}
              className="  "
            >
              <PageTitle>
                <PageHead>
                  <span className="primary-highlighter"> রোল নম্বর </span> এবং
                  প্রাপ্ত নম্বর দিন
                </PageHead>
                <PageSubtitle>
                  <span> {schema?.nameOfClass} | </span>
                  <span> {schema?.sakha} | </span>
                  <span> {schema?.exam_name} | </span>
                  <span className="font-bangla2">
                    {" "}
                    {convertToBanglaNumber(schema?.exam_year)} |{" "}
                  </span>
                  <span className="font-bangla2">
                    {" "}
                    {convertToBanglaNumber(schema?.total_examinee)} জন{" "}
                  </span>
                  <br />
                </PageSubtitle>
              </PageTitle>
              <form
                action=""
                className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-x-5 px-2 lg:px-0 justify-center md:w-[100%] w-[80%]  items-center mx-auto   "
                onSubmit={formik.handleSubmit}
              >
                <FormControl className="!mb-0 !mt-0    px-[1px]">
                  <FormTitle className="truncate" title="রোল নং" />
                  <Input
                    className="mt-2 "
                    required
                    id={"a1"}
                    name="roll"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.roll}
                    errorMessage={
                      formik.touched.roll &&
                      formik.errors &&
                      formik?.errors?.roll
                    }
                    disabled={isFinish()}
                  />
                </FormControl>
                {selectedSubject &&
                  selectedSubject.map((subject, index) => {
                    return (
                      <FormControl
                        key={index}
                        className="!mb-0 !mt-0 !items-start  truncate px-[1px]"
                      >
                        <FormTitle
                          className="truncate"
                          title={subject.subject}
                        />

                        <Input
                          className="mt-2 "
                          name={`subjects.${subject.subject}`}
                          onChange={formik.handleChange}
                          required
                          type="number"
                          id="wer"
                          value={formik.values.subjects[subject.subject]}
                          errorMessage={
                            formik.touched.subjects?.[subject.subject] &&
                            formik.errors?.subjects?.[subject?.subject]
                          }
                          disabled={isFinish()}
                        />
                      </FormControl>
                    );
                  })}
                {error && error?.common && (
                  <FormCommonError className="col-span-2 md:col-span-4">
                    {error?.common?.msg || error?.serverError}
                  </FormCommonError>
                )}
                <div className="flex  justify-between items-end col-span-2 md:col-span-4  gap-x-10 border-t pt-4 border-slate-300 dark:border-slate-500 ">
                  <Button
                    type="reset"
                    onClick={() => {
                      formik.handleReset();
                      subjectFormik.handleReset();
                      setSubjects("");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-4 h-4 rotate-180"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </svg>
                    র্পূববতী
                  </Button>
                  <Button
                    type="reset"
                    onClick={formik.resetForm}
                    className="bg-rose-600 dark:!bg-rose-500 hidden md:block "
                    disabled={isFinish()}
                  >
                    রিসেট করুন
                  </Button>
                  <Button disabled={isFinish()} isLoading={isLoading}>
                    {isFinish ? (
                      "তৈরি করা শেষ"
                    ) : (
                      <>
                        {" "}
                        জমা দিন
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
                      </>
                    )}
                  </Button>
                </div>
              </form>{" "}
              <PageTitle className="mt-10">
                <PageSubtitle>সম্প্রতি তৈরি করা ফলাফল</PageSubtitle>
              </PageTitle>
              <div className="overflow-x-scroll scrollbar w-[80%] lg:w-full  ">
                <SubjectTableLt
                  className="!px-0 justify-center mx-auto   mt-5      "
                  scrollHigth="!overflow-y-scroll !max-h-[20rem] !overflow-x-hidden"
                  hideOverFlow
                >
                  <thead className="pt-20">
                    <tr className="divide-x divide-gray-200 dark:divide-gray-700 bg-gray-300 dark:bg-slate-700/70  ">
                      <th
                        scope="col"
                        colSpan="1"
                        className="px-6 w-1 py-[10px] text-left text-sm font-normal text-slate-800 uppercase dark:text-slate-400"
                      >
                        রোল
                      </th>
                      <th
                        colSpan="5"
                        scope="col"
                        className="px-6 py-[10px] text-left text-sm !w-10 font-normal text-slate-800 uppercase dark:text-slate-400"
                      >
                        নাম
                      </th>

                      <th
                        colSpan="1"
                        scope="col"
                        className="px-6 py-[10px] text-left text-sm font-normal text-slate-800 uppercase dark:text-slate-400 "
                      >
                        নম্বর
                      </th>
                      <th
                        colSpan="1"
                        scope="col"
                        className="px-6 py-[10px] text-left text-sm font-normal text-slate-800 uppercase  dark:text-slate-400 "
                      >
                        পয়েন্ট
                      </th>
                      <th
                        colSpan="1"
                        scope="col"
                        className="px-6 py-[10px] text-left text-sm font-normal text-slate-800 uppercase  dark:text-slate-400  "
                      >
                        গ্রেড
                      </th>
                      <th
                        colSpan="1"
                        scope="col"
                        className="px-6 py-[10px] text-left text-sm font-normal text-slate-800 uppercase  dark:text-slate-400  "
                      >
                        ডিলিট
                      </th>
                      {results?.data?.payload?.results &&
                        results?.data?.payload?.results[0].subjects?.map(
                          (subject, index) => {
                            return (
                              <th
                                key={index}
                                scope="col"
                                className="px-3 py-[10px] text-left text-sm !w-1 !truncate font-normal text-slate-800 uppercase overflow-hidden dark:text-slate-400"
                              >
                                {String(subject.subject).slice(0, 4)}
                              </th>
                            );
                          }
                        )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700   ">
                    {results?.data?.payload?.results &&
                      results?.data?.payload?.results.map((result) => (
                        <tr
                          className="divide-x divide-gray-200
                         dark:divide-gray-700 even:bg-slate-100
                         dark:even:bg-slate-800 dark:hover:bg-slate-800 hover:bg-slate-100 "
                        >
                          <td
                            scope="col"
                            colSpan="1"
                            className="px-6 py-[10px] text-left text-sm text-slate-800  dark:text-slate-400 font-bangla2 "
                          >
                            {convertToBanglaNumber(result?.roll)}
                          </td>
                          <td
                            colSpan="1"
                            scope="col"
                            className="px-6 py-[10px] text-left text-sm  text-slate-800  dark:text-slate-400 !w-10 "
                          >
                            {result?.name_bangla || result.name}
                          </td>

                          <td
                            colSpan="5"
                            scope="col"
                            className="px-6 py-[10px] text-left text-sm  text-slate-800  dark:text-slate-400 uppercase font-bangla2"
                          >
                            {convertToBanglaNumber(result?.total_marks)}
                          </td>
                          <td
                            colSpan="1"
                            scope="col"
                            className="px-6 py-[10px] text-left text-sm  text-slate-800  dark:text-slate-400 "
                          >
                            {convertToBanglaNumber(result?.gpa)}
                          </td>
                          <td
                            colSpan="1"
                            scope="col"
                            className="px-6 py-[10px] text-left text-sm  text-slate-800  dark:text-slate-400 uppercase"
                          >
                            {result?.grade}
                          </td>
                          <td
                            colSpan="1"
                            scope="col"
                            className="px-6 py-[10px] text-left text-sm  text-slate-800  dark:text-slate-400 uppercase"
                          >
                            <button
                              onClick={() => {
                                deleteResult(result._id);
                              }}
                              disabled={result?.published === true}
                              className="peer"
                            >
                              <TrashIcon
                                className={` w-4 h-4 fill-red-500 hover:fill-slate-500 hover:scale-105 peer-disabled:fill-green-600 ${
                                  result?.published === true
                                    ? "fill-slate-500"
                                    : "fill-red-500"
                                }`}
                              />
                            </button>
                          </td>
                          {result.subjects.map((subject, index) => {
                            return (
                              <td
                                key={index}
                                scope="col"
                                className="px-3 py-[10px] text-left text-sm  text-slate-800  dark:text-slate-400 uppercase "
                              >
                                {convertToBanglaNumber(subject?.marks)}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                  </tbody>
                </SubjectTableLt>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddResult;
