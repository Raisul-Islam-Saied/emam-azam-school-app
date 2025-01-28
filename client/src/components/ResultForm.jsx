import React, { useEffect, useState } from "react";
import FormControl from "./FormControl/FormControl";
import Input from "./FormControl/Input";
import { nameOfClass, exam_name } from "./data.json";
import { useMutation } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import FormTitle from "./FormControl/FormTitle";
import Select from "./FormControl/Select";
import FormCommonError from "./FormControl/FormCommonError";
import { useFormik } from "formik";
import { object, string, ref, number } from "yup";
import Button from "./Button";
import useFetch from "../hooks/useFetch";
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

function ResultForm({ result }) {
  const { data, error, isLoading, mutation } = useFetch();

  useEffect(() => {
    if (data) {
      result(data);
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      exam_name: exam_name[0],
      student_id: "",
      exam_year: year[0],
      result_type: "",
      nameOfClass: nameOfClass[0],
    },
    validationSchema: object().shape({
      exam_name: string()
        .oneOf(exam_name)
        .required("আপনার পরিক্ষার নাম র্নিবাচন করুন"),
      exam_year: number().required().oneOf(year),
      result_type: string()
        .oneOf(["রোল ভিত্তিক", "ক্লাস ভিত্তিক"], "রেজাল্ট টাইপ সিলেক্ট করুন")
        .required("রেজাল্ট টাইপ সিলেক্ট করুন"),
      student_id: string().optional().min(10).max(10),
      nameOfClass: string().optional().oneOf(nameOfClass),
    }),
    onSubmit: async (v) => {
      const { exam_year, nameOfClass, student_id, exam_name, result_type } = v;
      if (result_type === "রোল ভিত্তিক") {
        mutation.mutateAsync({
          allFormData: { student_id, exam_name, exam_year, result_type },
          url: `result/get_result`,
          method: "post",
        });
      }
      if (result_type === "ক্লাস ভিত্তিক") {
      
        const allFormData = {
          nameOfClass,
          exam_name,
          exam_year,
          result_type,
        };
        await mutation.mutateAsync({
          allFormData,
          url: `result/get_results`,
          method: "post",
        });
      }
    },
  });
  const { touched } = formik;
  return (
    <>
      <form action="" className="pt-10" onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormTitle
            title="আপনার পরিক্ষার নাম"
            subtitle="আপনার পরিক্ষার নাম র্নিবাচন করুন"
          />
          <Select
            options={exam_name}
            name="exam_name"
            id="exam_name"
            onChange={(selectedOption) =>
              formik.setFieldValue("exam_name", selectedOption)
            }
            value={formik.values.exam_name}
            errorMessage={
              (touched.exam_name && formik?.errors?.exam_name) ||
              error?.exam_name?.msg
            }
          />
        </FormControl>{" "}
        <FormControl>
          <FormTitle
            title="আপনার পরিক্ষার সাল"
            subtitle="আপনার পরিক্ষার সাল র্নিবাচন করুন"
          />
          <Select
            options={year}
            name="exam_year"
            onChange={(selectedOption) =>
              formik.setFieldValue("exam_year", selectedOption)
            }
            value={formik.values.exam_year}
            errorMessage={
              (touched.exam_year && formik?.errors?.exam_year) ||
              error?.exam_year?.msg
            }
          />
        </FormControl>
        <FormControl>
          <FormTitle title="রেজাল্ট টাইপ" />
          <Select
            options={["রেজাল্ট টাইপ", "রোল ভিত্তিক", "ক্লাস ভিত্তিক"]}
            name="result_type"
            required
            onChange={(selectedOption) =>
              formik.setFieldValue("result_type", selectedOption)
            }
            errorMessage={
              formik.touched.result_type && formik?.errors?.result_type
            }
            value={formik.values.result_type}
          />
        </FormControl>
        {formik.values.result_type === "রোল ভিত্তিক" && (
          <FormControl>
            <FormTitle
              title="আপনার আইডি নাম্বার"
              subtitle="আপনার আইডি নাম্বার লিখুন"
            />
            <Input
              required
              name="student_id"
              onChange={formik.handleChange}
              value={formik.values.student_id}
              errorMessage={formik.errors && formik?.errors?.student_id}
            />
          </FormControl>
        )}
        {formik.values.result_type === "ক্লাস ভিত্তিক" && (
          <FormControl>
            <FormTitle
              title="ক্লাসের নাম"
              subtitle="ক্লাসের নাম র্নিবাচন করুন"
            />
            <Select
              options={nameOfClass}
              name="nameOfClass"
              onChange={(selectedOption) =>
                formik.setFieldValue("nameOfClass", selectedOption)
              }
              value={formik.values.nameOfClass}
            />
          </FormControl>
        )}
        {error && (
          <FormCommonError>
            {error?.common?.msg || error?.serverError}
          </FormCommonError>
        )}
        <div className="flex justify-between items-center ">
          <Button isLoading={isLoading}>রেজাল্ট দেখুন</Button>
        </div>
      </form>
    </>
  );
}

export default ResultForm;
