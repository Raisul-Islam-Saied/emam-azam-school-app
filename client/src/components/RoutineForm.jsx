import React, { useEffect, useState } from "react";
import FormControl from "./FormControl/FormControl";
import Input from "./FormControl/Input";
import { nameOfClass, sakha } from "./data.json";
import { Link } from "react-router-dom";
import FormTitle from "./FormControl/FormTitle";
import Select from "./FormControl/Select";
import FormCommonError from "./FormControl/FormCommonError";
import { string, object, number } from "yup";
import { useFormik } from "formik";
import useFetch from "../hooks/useFetch";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function RoutineForm() {
  const { setRoutine } = useAuth();

  const { mutation, error, isLoading, data } = useFetch();
  useEffect(() => {
    if (data) {
      setRoutine(data);
    }
  }, [data]);
  const formik = useFormik({
    initialValues: {
      sakha: "",
      nameOfClass: "",
    },
    validationSchema: object().shape({
      nameOfClass: string().required().oneOf(nameOfClass),
      sakha: string().required().oneOf(sakha),
    }),
    onSubmit: async (v) => {
      const urldata = new URLSearchParams(v);
      mutation.mutateAsync({
        url: `routine/get_routine?${urldata}`,
        method: "get",
      });
    },
  });

  return (
    <>
      <form
        action=""
        className="pt-10 print:pt-0 "
        onSubmit={formik.handleSubmit}
      >
        <FormControl>
          <FormTitle
            title="আপনার ক্লাস"
            subtitle="আপনি যে ক্লাসে পড়েন তা সিলেক্ট করুন"
          />
          <Select
            options={["আপনার ক্লাস", ...nameOfClass]}
            value={formik.values.nameOfClass}
            onChange={(e) => formik.setFieldValue("nameOfClass", e)}
            errorMessage={
              (formik.touched.nameOfClass && formik?.errors?.nameOfClass) ||
              error?.nameOfClass?.msg
            }
          />
        </FormControl>
        <FormControl>
          <FormTitle title="আপনার শাখা" subtitle="আপনার শাখা র্নিবাচন করুন" />
          <Select
            options={["আপনার শাখা", ...sakha]}
            value={formik.values.sakha}
            onChange={(e) => formik.setFieldValue("sakha", e)}
            errorMessage={
              (formik.touched.sakha && formik?.errors?.sakha) ||
              error?.sakha?.msg
            }
          />
        </FormControl>

        <div className="flex justify-between items-center ">
          <button className="bg-gray-800  text-slate-100 p-2 px-5 rounded-md font-semibold  dark:bg-violet-500 hover:bg-gray-700 focus:animate-button w-full">
            রুটিন দেখুন
          </button>
        </div>
      </form>
    </>
  );
}

export default RoutineForm;
