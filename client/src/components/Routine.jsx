import React, { useCallback, useRef, useState } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";
import Select from "./FormControl/Select";
import FormControl from "./FormControl/FormControl";
import FormTitle from "./FormControl/FormTitle";
import Input from "./FormControl/Input";
import { useFormik } from "formik";
import { date, number, object, string } from "yup";
import { subjects, nameOfClass, sakha, classOpenDay } from "./data.json";

import { useQueryClient } from "react-query";

import {
  ChevronDoubleRightIcon,
  PencilIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { day } from "./data.json";
import ResultPageLayout from "./result/ResultPageLayout";
import convertToBanglaNumber from "../helper/convertToBanglaNumber";
import ResultButton from "./result/ResultButton";
import useFetch from "../hooks/useFetch";
import Modal from "./Modal";

import axios from "axios";
const teachers = [
  {
    name: "raisul islam saied",
    teacher_id: "53452123",
    image: "/images/default.jpg",
  },
  {
    name: "asdfsf islam saied",
    teacher_id: "11111111",
    image: "/images/default.jpg",
  },
];
import { useQuery } from "react-query";
import { useAuth } from "../context/AuthContext";
import timeConverter from "../helper/timeConverter";

function Routine({ edit = true }) {
  const { routine, setRoutine } = useAuth();
  const [open, setOpen] = useState(false);
  const { mutation, error, data, isLoading } = useFetch();

  const cancelButtonRef = useRef(null);

  const updateRoutine = (data, dayIndex, priority) => {
    const updatedRoutine = { ...routine };
    // Create a copy of the routine array

    updatedRoutine.routine[dayIndex][priority - 1] = {
      ...updatedRoutine.routine[dayIndex][priority - 1],
      ...data, // Update the subject property
    };
    setRoutine(updatedRoutine);
  };

  const formik = useFormik({
    initialValues: {
      _id: "",
      subject: "",
      from: "",
      to: "",
      teacher: "",
      teacher_id: "",
      nameOfClass: "",
      sakha: "",
      day: "",
      priority: "",
      dayIndex: "",
    },

    validationSchema: object().shape({
      subject: string().required().min(3).max(30).equals(subjects),

      teacher: string().required().min(3).max(40).trim(),
      teacher_id: string().required().length(8),
    }),

    onSubmit: async (v) => {
      const url = `routine/add_routine`;
      console.log(v);
      await mutation.mutateAsync(
        {
          allFormData: v,
          url,
          method: "post",
        },
        {
          onSuccess: (data) => {
            updateRoutine(data?.data?.payload, v.dayIndex, v.priority);
            setOpen(false);
          },
        }
      );

      setOpen(false);
    },
  });

  const selectedTeacher = () => {
    return teachers.filter(
      (teacher) => teacher.teacher_id === formik.values.teacher_id
    );
  };

  return (
    <div className="flex justify-center">
      <div className="       overflow-scroll   scrollbar  ">
        <div className="w-[7.93in]  overflow-x-scroll scrollbar bg-white dark:bg-slate-900 rounded-md shadow-sm   dark:border-slate-400/50  px-3 ">
          <div className="text-center pt-10  text-xl text-slate-800 dark:text-slate-400 font-bangla">
            <h1 className="">ইমাম আজম আবু হানিফা (র:) স্কুল</h1>
            <h1 className="text-[17px]">
              ক্লাস : {routine?.info?.nameOfClass}
              <span className="font-bangla">
                {" "}
                শাখা : {routine?.info?.sakha}
              </span>{" "}
              <span className="font-bangla"> {routine?.info?.year}</span>{" "}
            </h1>
          </div>
          <div className="flex flex-col  py-5 font-bangla ">
            <div className="-m-1.5 overflow-x-auto scrollbar ">
              <div className="p-1.5 min-w-full max-w-full  inline-block align-middle ">
                <div className="border rounded-sm   dark:border-gray-700 dark:shadow-gray-900">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 w-full    table-fixed">
                    <thead>
                      <tr
                        className="divide-x divide-gray-200 dark:divide-gray-700 
                       "
                      >
                        <th
                          scope="col"
                          colSpan="2"
                          className="px-6 py-[10px] text-left  text-xs md:text-sm font-normal text-slate-800  dark:text-slate-400   uppercase font-bangla"
                        >
                          বার / ঘন্টা
                        </th>
                        <th
                          colSpan="2"
                          scope="col"
                          className="px-6 py-[10px] text-left  text-xs md:text-sm font-normal text-slate-800  dark:text-slate-400  "
                        >
                          প্রথম
                        </th>
                        <th
                          colSpan="2"
                          scope="col"
                          className="px-6 py-[10px] text-left  text-xs md:text-sm font-normal text-slate-800  dark:text-slate-400 uppercase font-bangla2"
                        >
                          দ্বিতীয়
                        </th>
                        <th
                          colSpan="2"
                          scope="col"
                          className="px-6 py-[10px] text-left  text-xs md:text-sm font-normal text-slate-800   uppercase dark:text-slate-400"
                        >
                          তৃতীয়
                        </th>{" "}
                        <th
                          colSpan="2"
                          scope="col"
                          className="px-6 py-[10px] text-left  text-xs md:text-sm font-normal text-slate-800   uppercase dark:text-slate-400"
                        >
                          চতুর্থ
                        </th>
                        <th
                          colSpan="2"
                          scope="col"
                          className="px-6 py-[10px] text-left  text-xs md:text-sm font-normal text-slate-800   uppercase dark:text-slate-400"
                        >
                          পঞ্চম
                        </th>
                        <th
                          colSpan="2"
                          scope="col"
                          className="px-6 py-[10px] text-left  text-xs md:text-sm font-normal text-slate-800   uppercase dark:text-slate-400"
                        >
                          ষষ্ঠ
                        </th>{" "}
                        <th
                          colSpan="2"
                          scope="col"
                          className="px-6 py-[10px] text-left  text-xs md:text-sm font-normal text-slate-800   uppercase dark:text-slate-400"
                        >
                          সপ্তম
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {routine?.routine?.map((dayRoutine, dayIndex) => {
                        return (
                          <tr
                            key={dayIndex}
                            className="divide-x divide-gray-200 dark:divide-gray-700  "
                          >
                            <th
                              scope="col"
                              colSpan="2"
                              className="px-6 py-[10px] text-left  text-xs md:text-sm font-normal text-slate-800  dark:text-slate-400   uppercase font-bangla"
                            >
                              {dayRoutine[0]?.day || dayRoutine[2]?.day}
                            </th>
                            {dayRoutine.map((singleRoutine, index) => {
                              return (
                                <th
                                  key={index}
                                  onClick={() => console.log(singleRoutine.id)}
                                  colSpan="2"
                                  scope="col"
                                  className="  text-left  text-xs md:text-sm font-normal text-slate-800  dark:text-slate-400  relative  h-[9rem]  cursor-pointer transition-colors duration-200 ring group ring-violet-600"
                                >
                                  <div className=" -rotate-90 text-center  w-[9rem] h-24 -mt-12 -ml-7 absolute  flex flex-col  justify-center px-2 gap-y-1 items-center overflow-hidden duration-150 group-hover:opacity-30 ">
                                    <span>
                                      {singleRoutine.from &&
                                        singleRoutine.to && (
                                          <span className="text-[0.700rem]  bg-fuchsia-500/80 px-2 rounded-md font-bangla2 dark:text-slate-200">
                                            {convertToBanglaNumber(
                                              timeConverter(singleRoutine?.from)
                                            )}{" "}
                                            -
                                            {convertToBanglaNumber(
                                              timeConverter(singleRoutine?.to)
                                            )}
                                          </span>
                                        )}
                                    </span>
                                    <span
                                      className="truncate w-[9rem] overflow-hidden 
                                     font-semibold  "
                                    >
                                      {singleRoutine?.subject}
                                    </span>
                                    <span className="truncate  text-[0.800rem] ">
                                      {singleRoutine?.teacher &&
                                        singleRoutine.teacher}
                                    </span>
                                  </div>
                                  {edit && (
                                    <div className="  text-center  w-full h-full -mt-18 -ml-0 absolute  flex flex-col  justify-center hover:bg-gray-50/20 px-1 gap-y-1 items-center overflow-hidden   opacity-100  ">
                                      {singleRoutine.teacher ? (
                                        <>
                                          {" "}
                                          <span
                                            onClick={() => {
                                              setOpen(true);
                                              Object.keys(
                                                formik.initialValues
                                              ).map((v) => {
                                                formik.setFieldValue(
                                                  v,
                                                  singleRoutine[v]
                                                );
                                              });

                                              Object.keys(
                                                formik.initialValues
                                              ).map((v) => {
                                                formik.setFieldValue(
                                                  v,
                                                  singleRoutine[v]
                                                );
                                              });
                                              formik.setFieldValue(
                                                "dayIndex",
                                                dayIndex
                                              );
                                            }}
                                            className="bg-purple-600 w-full rounded-full flex justify-center py-1 items-center text-slate-100 gap-1 translate-y-26  group-hover:translate-y-0 duration-300  ease "
                                          >
                                            <PencilSquareIcon
                                              strokeWidth={2}
                                              className="w-4 h-4 stroke-slate-100"
                                            />
                                            <span className="-mb-1">Edit</span>
                                          </span>
                                          <span
                                            onClick={() => {
                                              mutation.mutateAsync({
                                                url: `routine/delete_routine/${singleRoutine._id}`,
                                                method: "delete",
                                              });
                                              const updateRoutine = () => {
                                                const updatedRoutine = {
                                                  ...routine,
                                                };
                                                // Create a copy of the routine array

                                                updatedRoutine.routine[
                                                  dayIndex
                                                ][index] = {
                                                  priority:
                                                    singleRoutine?.priority,
                                                  day: singleRoutine?.day,
                                                };
                                                setRoutine(updatedRoutine);
                                              };
                                              updateRoutine();
                                            }}
                                            className="bg-red-500 w-full rounded-full flex justify-center py-1 items-center text-slate-100 gap-1 translate-y-26 group-hover:translate-y-0 duration-300  delay-100"
                                          >
                                            <TrashIcon
                                              strokeWidth={2}
                                              className="w-4 h-4 stroke-slate-100"
                                            />
                                            <span className="-mb-1">Edit</span>
                                          </span>
                                        </>
                                      ) : (
                                        <>
                                          {" "}
                                          <span
                                            className="bg-pink-600 w-full rounded-full flex justify-center py-1 items-center text-slate-100 gap-1 translate-y-26  group-hover:translate-y-0 duration-300  ease "
                                            onClick={() => {
                                              setOpen(true);
                                              Object.keys(
                                                formik.initialValues
                                              ).map((v) => {
                                                formik.setFieldValue(
                                                  v,
                                                  singleRoutine[v] || ""
                                                );
                                              });

                                              formik.setFieldValue(
                                                "dayIndex",
                                                dayIndex
                                              );
                                              formik.setFieldValue(
                                                "sakha",
                                                routine?.info?.sakha
                                              );
                                              formik.setFieldValue(
                                                "nameOfClass",
                                                routine?.info?.nameOfClass
                                              );
                                            }}
                                          >
                                            <PlusCircleIcon
                                              strokeWidth={2}
                                              className="w-4 h-4 stroke-slate-100"
                                            />
                                            <span className="">Add</span>
                                          </span>{" "}
                                          {formik.values.subject && (
                                            <span
                                              className="bg-yellow-500 w-full rounded-full flex justify-center py-1 items-center text-slate-100 gap-1 translate-y-26 group-hover:translate-y-0 duration-300  delay-100"
                                              onClick={() => {
                                                setOpen(true);
                                                formik.setFieldValue(
                                                  "priority",
                                                  singleRoutine?.priority
                                                );
                                                formik.setFieldValue(
                                                  "dayIndex",
                                                  dayIndex
                                                );
                                                formik.setFieldValue(
                                                  "day",
                                                  singleRoutine.day
                                                );
                                              }}
                                            >
                                              <ArrowPathIcon
                                                strokeWidth={2}
                                                className="w-4 h-4 stroke-slate-100"
                                              />
                                              <span className="">marge</span>
                                            </span>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  )}
                                </th>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="print:hidden">
          {" "}
          <ResultButton setResults={false} />
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={() => {
                setOpen(false);
              }}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className=" sm:items-start">
                          <div className="mt-3  sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-base text-center font-semibold leading-6 text-gray-900"
                            >
                              {formik.values._id
                                ? "রুটিন এডিট করুন"
                                : "রুটিন যোগ করুন"}
                            </Dialog.Title>
                            <form
                              onSubmit={formik.handleSubmit}
                              className="mt-2"
                            >
                              <div className="flex gap-x-3 flex-2 justify-between">
                                <FormControl className="mb-0 w-full">
                                  <FormTitle title="শুরু হবে" />
                                  <Input
                                    className="h-8"
                                    type="time"
                                    name="from"
                                    onChange={formik.handleChange}
                                    value={formik.values.from}
                                    errorMessage={
                                      (formik.touched.from &&
                                        formik?.errors?.from) ||
                                      error?.from?.msg
                                    }
                                  />
                                </FormControl>
                                <FormControl className="mb-0 w-full">
                                  <FormTitle title="শেষ হবে" />
                                  <Input
                                    defaultValue="12:33"
                                    className="h-8"
                                    type="time"
                                    name="to"
                                    onChange={formik.handleChange}
                                    value={formik.values.to}
                                    errorMessage={
                                      (formik.touched.to &&
                                        formik?.errors?.to) ||
                                      error?.to?.msg
                                    }
                                  />
                                </FormControl>
                              </div>
                              <FormControl className="mb-0 ">
                                <FormTitle title="সাবজেক্ট এর নাম" />
                                <Select
                                  options={[
                                    formik.values.subject
                                      ? formik.values.subject
                                      : "সাবজেক্ট এর নাম",
                                    ...subjects,
                                  ]}
                                  buttonClass="!py-[0.30rem] h-8 "
                                  name="subject"
                                  onChange={(selectedOption) =>
                                    formik.setFieldValue(
                                      "subject",
                                      selectedOption
                                    )
                                  }
                                  value={formik.values.subject}
                                  errorMessage={error?.subject?.msg}
                                />
                              </FormControl>
                              <FormControl className="mb-0 ">
                                <FormTitle title="শিক্ষক এর নাম" />
                                <Select
                                  object={
                                    formik.values.teacher
                                      ? [...selectedTeacher(), ...teachers]
                                      : teachers
                                  }
                                  image="image"
                                  whatWillShow="name"
                                  buttonClass="!py-[0.30rem] h-8 "
                                  name="teacher"
                                  onChange={(selectedOption) => {
                                    formik.setFieldValue(
                                      "teacher",
                                      selectedOption.name
                                    );
                                    formik.setFieldValue(
                                      "teacher_id",
                                      selectedOption.teacher_id
                                    );
                                  }}
                                  value={formik.values.teacher}
                                  errorMessage={error?.teacher?.msg}
                                />
                              </FormControl>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="submit"
                          onClick={formik.handleSubmit}
                          className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 sm:ml-3 sm:w-auto"
                        >
                          সাবমিট করুন
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => {
                            setOpen(false);
                          }}
                          ref={cancelButtonRef}
                        >
                          বাদ দিন
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </div>
    </div>
  );
}

export default Routine;
