"use client";
import { QRCodeSVG } from "qrcode.react";

import divisions from "../../data/divisions.json";

import React, { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { RadioGroup, Transition } from "@headlessui/react";
import FormControl from "../FormControl/FormControl";
import Input from "../FormControl/Input";
// import Radio  from "../FormControl/Radio";
import {
  nameOfClass,
  exam_name,
  sakha,
  subjects,
  religion,
  gender,
  group,
  blood_group,
} from "../data.json";
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
import { object, string, ref, number, array, date } from "yup";
import Button2 from "../FormControl/Button2";
import PageTitle from "../Heading/PageTitle";
import PageHead from "../Heading/PageHead";
import PageSubtitle from "../Heading/PageSubtitle";
import Stepper from "../Stepper";
import toast from "react-hot-toast";
import SubjectTableLt from "../result/SubjectTableLt";
import convertToBanglaNumber from "../../helper/convertToBanglaNumber";
import { TrashIcon } from "@heroicons/react/20/solid";

import RadioGroup1 from "../FormControl/RadioGroup1";
import Mobile from "../FormControl/MobileNo";
import useFetch from "../../hooks/useFetch";
import getAddress from "../../helper/getAddress";
import ImageInput from "../FormControl/ImageInput";
import Button from "../Button";
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

for (let i = currentYear - 20; i <= currentYear + 10; i++) {
  year.push(i);
}

function AddTeacher({ result }) {
  const [guardianFiledDisable, setguardianFiledDisable] = useState(false);
  const [schema, setSchema] = useState(null);
  const [selectedSubject, setSubjects] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const { error, isLoading, mutation } = useFetch();

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

  const formik = useFormik({
    initialValues: {
      name: "",
      name_bangla: "",
      date_of_birth: "",
      religion: religion[0],
      phone: "",
      email: "",
      gender: "",
      blood_group: "",
      birth_no: "",

      father: {
        name: "",
        name_bangla: "",
        date_of_birth: "",
        birth_no: "",
        nid_no: "",
        phone: "",
        email: "",
      },
      mother: {
        name: "",
        birth_no: "",
        name_bangla: "",
        date_of_birth: "",
        nid_no: "",
        phone: "",
        email: "",
      },
      guardian: {
        relation: "",
        name: "",
        name_bangla: "",
        date_of_birth: "",
        nid_no: "",
        birth_no: "",
        phone: "",
        email: "",
      },
      address_bn: " , মাওলানা গ্রাম,সরফভাটা, রাঙ্গুনিয়া, চট্টগ্রাম",
      address: " , Mawlanagram, Sarafbhath, Rangunia, Chattogram",
      date_of_admission: new Date().toISOString().split("T")[0],
      academic_year: year[0],
      nameOfClass: nameOfClass[0],
      sakha: sakha[0],
      group: group[0],
      roll: "",
    },

    validationSchema: object().shape({
      name: string().min(3).max(30).required().trim(),
      name_bangla: string().min(3).max(30).required().trim(),
      date_of_birth: date().required(),

      religion: string().oneOf(religion).required().trim(),
      phone: string().required().min(5).max(18).trim(),
      email: string().email().required(),
      gender: string().oneOf(gender).required().trim(),
      birth_no: number().required(),
      blood_group: string().oneOf(blood_group).required().trim(),
      father: object().shape({
        name: string().min(3).max(30).required().trim(),
        name_bangla: string().min(3).max(30).required().trim(),
        date_of_birth: date().required(),

        phone: string().required().min(5).max(18).trim(),
        email: string().email(),
        nid_no: string().required().trim(),
        birth_no: string().optional().length(17),
      }),
      mother: object().shape({
        name: string().min(3).max(30).required().trim(),
        name_bangla: string().min(3).max(30).required().trim(),
        date_of_birth: date().required(),
        nid_no: string().required().trim(),
        birth_no: string().optional().length(17),
        phone: string().required().min(5).max(18).trim(),
        email: string().email(),
      }),
      guardian: object().shape({
        relation: string()
          .oneOf(["পিতা", "মাতা", "অন্যান্য"])
          .required("relation is required"),
        name: string().min(3).max(30).required().trim(),
        name_bangla: string().min(3).max(30).required().trim(),
        date_of_birth: date().required(),
        nid_no: string().required().trim(),
        birth_no: string().optional().length(17),
        phone: string().required().min(5).max(18).trim(),
        email: string().email(),
      }),
      academic_year: string().required(),
      date_of_admission: date("not a valid date").required(),
      sakha: string().required().oneOf(sakha),
      nameOfClass: string().required().oneOf(nameOfClass),
      group: string().required().oneOf(group),
      roll: number().positive().min(1).max(1000),
    }),

    onSubmit: async (v) => {
      const url = `teacher/add_teacher`;

      await mutation.mutateAsync({
        allFormData: { ...v, teacher_image: avatar },
        url,
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
  const { touched } = formik;
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
    <div className="  m-0 p-0  mx-auto  ">
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <motion.div initial={{ x: "100vh" }} animate={{ x: 0 }}>
          <PageTitle className="my-5">
            {" "}
            <PageHead className="!text-lg">
              <span className="primary-highlighter">শিক্ষকের</span> তথ্য দিন
            </PageHead>
          </PageTitle>
          <div className="  w-full flex flex-col md:flex-row  pb-10 gap-x-6">
            <div className=" w-full  flex-1/2">
              <FormControl className="mb-0 ">
                <FormTitle
                  title="শিক্ষকের নাম বাংলায়"
                  subtitle="সকল কমিউনিকেশনে এই নামটি ব্যবহৃত হবে। তাই সঠিক নাম প্রদান করুন। "
                />
                <Input
                  type="text"
                  name="name_bangla"
                  onChange={formik.handleChange}
                  value={formik.values.name_bangla}
                  errorMessage={
                    (formik.touched.name_bangla &&
                      formik?.errors?.name_bangla) ||
                    error?.name_bangla?.msg
                  }
                  className="h-8 "
                  placeholder="আমার নাম বস"
                />
              </FormControl>
              <FormControl className="mb-0">
                <FormTitle
                  title="শিক্ষকের নাম ইংরেজিতে"
                  subtitle="সকল কমিউনিকেশনে এই নামটি ব্যবহৃত হবে। তাই সঠিক নাম প্রদান করুন। কোন ছদ্মনাম ব্যবহার না করার অনুরোধ রইল।"
                />
                <Input
                  type="text"
                  className="h-8"
                  placeholder="raiusl islam saied"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  errorMessage={
                    (formik.touched.name && formik?.errors?.name) ||
                    error?.name?.msg
                  }
                />
              </FormControl>
              <FormControl className="mb-0">
                <FormTitle
                  title="শিক্ষকের জন্ম তারিখ"
                  subtitle="শিক্ষকের জন্ম তারিখ সিলেক্ট করুন"
                />
                <Input
                  type="date"
                  className="h-8 "
                  name="date_of_birth"
                  errorMessage={
                    (formik.touched.date_of_birth &&
                      formik?.errors?.date_of_birth) ||
                    error?.date_of_birth?.msg
                  }
                  onChange={(e) => {
                    formik.handleChange(e);
                    const teacher_id =
                      String(e.target.value).split("-").join("") +
                      String(Math.floor(Math.random() * 90) + 10);

                    formik.setFieldValue("teacher_id", teacher_id);
                  }}
                  value={formik.values.date_of_birth}
                  placeholder="raiusl islam saied"
                />
              </FormControl>
              <FormControl className="mb-0 ">
                <FormTitle
                  title="শিক্ষকের ধর্ম"
                  subtitle="শিক্ষকের ধর্ম সিলেক্ট করুন"
                />
                <Select
                  options={religion}
                  name="religion"
                  onChange={(selectedOption) =>
                    formik.setFieldValue("religion", selectedOption)
                  }
                  value={formik.values.religion}
                  errorMessage={
                    (formik.touched.religion && formik?.errors?.religion) ||
                    error?.religion?.msg
                  }
                  buttonClass="!py-[0.30rem] h-8 "
                />
              </FormControl>
              <FormControl className="mb-0">
                <FormTitle
                  title="শিক্ষকের জন্ম নিবন্ধন নং"
                  subtitle="শিক্ষকের জন্ম নিবন্ধন নম্বর লিখুন"
                />
                <Input
                  className="h-8"
                  name="birth_no"
                  onChange={formik.handleChange}
                  value={formik.values.birth_no}
                  errorMessage={
                    (formik.touched.birth_no && formik?.errors?.birth_no) ||
                    error?.birth_no?.msg
                  }
                />
              </FormControl>
              <ImageInput
                name="saied"
                setAvatar={(e) => {
                  setAvatar(e);
                }}
                errorMessage={error?.avatar?.msg}
              />
            </div>
            <div className=" w-full flex-1/2">
              <FormControl className="mb-0">
                <FormTitle
                  title="আপনার জেন্ডার সিলেক্ট করুন "
                  subtitle="সকল কমিউনিকেশনে উপযুক্ত সম্বোধনের জন্য ব্যবহৃত হবে।"
                />
                <RadioGroup1
                  name="gender"
                  onChange={formik.handleChange}
                  selected={formik.values.gender}
                  values={["Male", "Female"]}
                  errorMessage={
                    (formik.touched.gender && formik?.errors?.gender) ||
                    error?.gender?.msg
                  }
                />
              </FormControl>
              <FormControl className="mb-0 ">
                <FormTitle
                  title="শিক্ষকের রক্তের গ্রুপ"
                  subtitle="শিক্ষকের রক্তের গ্রুপ সিলেক্ট করুন"
                />
                <Select
                  options={["Blood Group", ...blood_group]}
                  buttonClass="!py-[0.30rem] h-8 "
                  name="blood_group"
                  onChange={(selectedOption) =>
                    formik.setFieldValue("blood_group", selectedOption)
                  }
                  value={formik.values.blood_group}
                  errorMessage={
                    (formik.touched.blood_group &&
                      formik?.errors?.blood_group) ||
                    error?.blood_group?.msg
                  }
                />
              </FormControl>
              <FormControl className="mb-0">
                <FormTitle
                  title="শিক্ষকের মোবাইল নাম্বার"
                  subtitle="শিক্ষকের মোবাইল নাম্বার লিখুন"
                />
                <Mobile
                  name="phone"
                  onChange={(v) => {
                    formik.setFieldValue("phone", v);
                  }}
                  errorMessage={
                    (formik.touched.phone && formik?.errors?.phone) ||
                    error?.phone?.msg
                  }
                />
              </FormControl>
              <FormControl className="mb-0">
                <FormTitle
                  title="আপনার ইমেইল এড্রেস"
                  subtitle="সব কমিউনিকেশন এই ইমেইল এড্রেসে করা হবে  ইয়াহু ইমেইল গ্রহণযোগ্য নয়!"
                />
                <Input
                  type="email"
                  className="h-8"
                  placeholder="boss@gmail.com"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  errorMessage={
                    (formik.touched.email && formik?.errors?.email) ||
                    error?.email?.msg
                  }
                />
              </FormControl>
              <FormControl className="mb-0">
                <FormTitle
                  title="শিক্ষকের ঠিকানা বাংলায়"
                  subtitle="বাড়ির নাম , গ্রাম/রাস্তা, ইউনিয়ন, উপজেলা, জেলা কমা দিয়ে লিখুন "
                />
                <Input
                  type="text"
                  className="h-8"
                  placeholder=""
                  name="address_bn"
                  onChange={formik.handleChange}
                  value={formik.values.address_bn}
                  errorMessage={
                    (formik.touched.address_bn && formik?.errors?.address_bn) ||
                    error?.address_bn?.msg
                  }
                />
              </FormControl>
              <FormControl className="mb-0">
                <FormTitle
                  title="শিক্ষকের ঠিকানা ইংরেজিতে"
                  subtitle="বাড়ির নাম , গ্রাম/রাস্তা, ইউনিয়ন, উপজেলা, জেলা কমা দিয়ে লিখুন "
                />
                <Input
                  type="text"
                  className="h-8"
                  placeholder=""
                  name="address"
                  spallCheck={false}
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  errorMessage={
                    (formik.touched.email && formik?.errors?.email) ||
                    error?.email?.msg
                  }
                />
              </FormControl>
            </div>
          </div>
        </motion.div>
        <>
          <PageTitle className="my-5">
            {" "}
            <PageHead className="!text-lg">
              <span className="primary-highlighter"> শিক্ষকের পিতার</span> তথ্য
              দিন
            </PageHead>
          </PageTitle>
          <div className="  w-full flex flex-col md:flex-row  pb-10 gap-x-6">
            <div className=" w-full  flex-1/2">
              <FormControl className="mb-0 ">
                <FormTitle
                  title="শিক্ষকের পিতার নাম"
                  subtitle="সকল কমিউনিকেশনে এই নামটি ব্যবহৃত হবে। তাই সঠিক নাম প্রদান করুন। "
                />
                <Input
                  type="text"
                  name="father.name_bangla"
                  onChange={formik.handleChange}
                  value={formik.values.father?.name_bangla}
                  errorMessage={
                    (formik.touched.father?.name_bangla &&
                      formik?.errors?.father?.name_bangla) ||
                    error?.father_name_bangla?.msg
                  }
                  className="h-8 "
                  placeholder="আমার নাম বস"
                />
              </FormControl>
              <FormControl className="mb-0">
                <FormTitle
                  title="শিক্ষকের পিতার নাম ইংরেজিতে"
                  subtitle="সকল কমিউনিকেশনে এই নামটি ব্যবহৃত হবে। তাই সঠিক নাম প্রদান করুন।"
                />
                <Input
                  type="text"
                  className="h-8"
                  placeholder="raiusl islam saied"
                  name="father.name"
                  onChange={formik.handleChange}
                  value={formik.values.father?.name}
                  errorMessage={
                    (formik.touched.father?.name &&
                      formik?.errors?.father?.name) ||
                    error?.father_name?.msg
                  }
                />
              </FormControl>
              <FormControl className="mb-0">
                <FormTitle
                  title="শিক্ষকের পিতার জন্ম তারিখ"
                  subtitle="শিক্ষকের পিতার জন্ম তারিখ সিলেক্ট করুন"
                />
                <Input
                  type="date"
                  className="h-8 "
                  name="father.date_of_birth"
                  errorMessage={
                    (formik.touched.father?.date_of_birth &&
                      formik?.errors?.father?.date_of_birth) ||
                    error?.father_date_of_birth?.msg
                  }
                  onChange={formik.handleChange}
                  value={formik.values.father?.date_of_birth}
                  placeholder="raiusl islam saied"
                />
              </FormControl>
              <FormControl className="mb-0">
                <FormTitle
                  title="শিক্ষকের পিতার জন্ম নিবন্ধন নং"
                  subtitle="শিক্ষকের পিতার জন্ম নিবন্ধন নম্বর লিখুন"
                  notRequired
                />
                <Input
                  type="number"
                  className="h-8"
                  name="father.birth_no"
                  onChange={formik.handleChange}
                  value={formik.values.father?.birth_no}
                  errorMessage={
                    (formik.touched.birth_no &&
                      formik?.errors?.father?.birth_no) ||
                    error?.father_birth_no?.msg
                  }
                />
              </FormControl>
            </div>
            <div className=" w-full flex-1/2">
              <FormControl className="mb-0">
                <FormTitle
                  title="পিতার জাতীয় পরিচয় পত্র নম্বর"
                  subtitle="শিক্ষকের পিতার আইডি নম্বর লিখুন"
                />
                <Input
                  type="number"
                  className="h-8"
                  name="father.nid_no"
                  onChange={formik.handleChange}
                  value={formik.values.father?.nid_no}
                  errorMessage={
                    (formik.touched.father?.nid_no &&
                      formik?.errors?.father?.nid_no) ||
                    error?.father_nid_no?.msg
                  }
                />
              </FormControl>

              <FormControl className="mb-0">
                <FormTitle
                  title="পিতার মোবাইল নাম্বার"
                  subtitle="OTP পাঠিয়ে ভেরিফাই করা হবে। বাংলাদেশি মোবাইল
          নাম্বার ছাড়া অন্য মোবাইল নাম্বার ব্যবহার করলে কোর্স ফি হবে 1,200 টাকা।"
                />
                <Mobile
                  name="father.phone"
                  onChange={(v) => {
                    formik.setFieldValue("father.phone", v);
                  }}
                  errorMessage={
                    (formik.touched.father?.phone &&
                      formik?.errors?.father?.phone) ||
                    error?.father_phone?.msg
                  }
                />
              </FormControl>
              <FormControl className="mb-0">
                <FormTitle
                  title="পিতার ইমেইল এড্রেস"
                  subtitle="সব কমিউনিকেশন এই ইমেইল এড্রেসে করা হবে  ইয়াহু ইমেইল গ্রহণযোগ্য নয়!"
                />
                <Input
                  type="email"
                  className="h-8"
                  placeholder="boss@gmail.com"
                  name="father.email"
                  onChange={formik.handleChange}
                  value={formik.values.father?.email}
                  errorMessage={
                    (formik.touched.father?.email &&
                      formik?.errors?.father?.email) ||
                    error?.father_email?.msg
                  }
                />
              </FormControl>
            </div>
          </div>
        </>

        <>
          <PageTitle className="my-5">
            {" "}
            <PageHead className="!text-lg">
              <span className="primary-highlighter"> শিক্ষকের মাতার</span> তথ্য
              দিন
            </PageHead>
          </PageTitle>
          <div className="  w-full flex flex-col md:flex-row  pb-10 gap-x-6">
            <div className=" w-full  flex-1/2">
              <FormControl className="mb-0 ">
                <FormTitle
                  title="শিক্ষকের মাতার নাম"
                  subtitle="সকল কমিউনিকেশনে এই নামটি ব্যবহৃত হবে। তাই সঠিক নাম প্রদান করুন। "
                />
                <Input
                  type="text"
                  name="mother.name_bangla"
                  onChange={formik.handleChange}
                  value={formik.values.mother?.name_bangla}
                  errorMessage={
                    (formik.touched.mother?.name_bangla &&
                      formik?.errors?.mother?.name_bangla) ||
                    error?.mother_name_bangla?.msg
                  }
                  className="h-8 "
                  placeholder="আমার নাম বস"
                />
              </FormControl>
              <FormControl className="mb-0">
                <FormTitle
                  title="শিক্ষকের মাতার নাম ইংরেজিতে"
                  subtitle="সকল কমিউনিকেশনে এই নামটি ব্যবহৃত হবে। তাই সঠিক নাম প্রদান করুন।"
                />
                <Input
                  type="text"
                  className="h-8"
                  placeholder="raiusl islam saied"
                  name="mother.name"
                  onChange={formik.handleChange}
                  value={formik.values.mother?.name}
                  errorMessage={
                    (formik.touched.mother?.name &&
                      formik?.errors?.mother?.name) ||
                    error?.mother_name?.msg
                  }
                />
              </FormControl>
              <FormControl className="mb-0">
                <FormTitle
                  title="শিক্ষকের মাতার জন্ম তারিখ"
                  subtitle="শিক্ষকের মাতার জন্ম তারিখ সিলেক্ট করুন"
                />
                <Input
                  type="date"
                  className="h-8 "
                  name="mother.date_of_birth"
                  errorMessage={
                    (formik.touched.mother?.date_of_birth &&
                      formik?.errors?.mother?.date_of_birth) ||
                    error?.mother_date_of_birth?.msg
                  }
                  onChange={formik.handleChange}
                  value={formik.values.mother?.date_of_birth}
                  placeholder="raiusl islam saied"
                />
              </FormControl>
              <FormControl className="mb-0">
                <FormTitle
                  title="শিক্ষকের মাতার জন্ম নিবন্ধন নং"
                  subtitle="শিক্ষকের মাতার জন্ম নিবন্ধন নম্বর লিখুন"
                />
                <Input
                  type="number"
                  className="h-8"
                  name="mother.birth_no"
                  onChange={formik.handleChange}
                  value={formik.values.mother?.birth_no}
                  errorMessage={
                    (formik.touched.birth_no &&
                      formik?.errors?.mother?.birth_no) ||
                    error?.mother_birth_no?.msg
                  }
                />
              </FormControl>
            </div>
            <div className=" w-full flex-1/2">
              <FormControl className="mb-0">
                <FormTitle
                  title="মাতার জাতীয় পরিচয় পত্র নম্বর"
                  subtitle="শিক্ষকের মাতার আইডি নম্বর লিখুন"
                />
                <Input
                  type="number"
                  className="h-8"
                  name="mother.nid_no"
                  onChange={formik.handleChange}
                  value={formik.values.mother?.nid_no}
                  errorMessage={
                    (formik.touched.mother?.nid_no &&
                      formik?.errors?.mother?.nid_no) ||
                    error?.mother_nid_no?.msg
                  }
                />
              </FormControl>

              <FormControl className="mb-0">
                <FormTitle
                  title="মাতার মোবাইল নাম্বার"
                  subtitle="OTP পাঠিয়ে ভেরিফাই করা হবে। বাংলাদেশি মোবাইল
          নাম্বার ছাড়া অন্য মোবাইল নাম্বার ব্যবহার করলে কোর্স ফি হবে 1,200 টাকা।"
                />
                <Mobile
                  name="mother.phone"
                  onChange={(v) => {
                    formik.setFieldValue("mother.phone", v);
                  }}
                  errorMessage={
                    (formik.touched.mother?.phone &&
                      formik?.errors?.mother?.phone) ||
                    error?.mother_phone?.msg
                  }
                />
              </FormControl>
              <FormControl className="mb-0">
                <FormTitle
                  notRequired
                  title="মাতার ইমেইল এড্রেস"
                  subtitle="সব কমিউনিকেশন এই ইমেইল এড্রেসে করা হবে  ইয়াহু ইমেইল গ্রহণযোগ্য নয়!"
                />
                <Input
                  type="email"
                  className="h-8"
                  placeholder="boss@gmail.com"
                  name="mother.email"
                  onChange={formik.handleChange}
                  value={formik.values.mother?.email}
                  errorMessage={
                    (formik.touched.mother?.email &&
                      formik?.errors?.mother?.email) ||
                    error?.mother_email?.msg
                  }
                />
              </FormControl>
            </div>
          </div>
        </>

        <>
          <PageTitle className="my-5">
            {" "}
            <PageHead className="!text-lg">
              <span className="primary-highlighter"> শিক্ষকের অভিবাবকের</span>{" "}
              তথ্য দিন
            </PageHead>
          </PageTitle>
          <div className="  w-full flex  flex-row py-3 justify-center md:items-center  gap-4">
            <div className="  flex flex-col gap-y-2 items-center">
              {" "}
              <div className="w-8  h-8 ring-2 ring-purple-500 rounded-full justify-center items-center flex font-bold text-lg">
                1
              </div>
              <div className="w-1 rounded-full h-full bg-slate-300 flex justify-center items-center "></div>
            </div>
            <div className="flex flex-[0.9] gap-x-4 flex-col md:flex-row">
              <FormControl className="mb-0 md:w-20 ">
                <FormTitle title="পরিক্ষা" subtitle="" />
                <Select
                  options={["JSC/JDC", "HSC/ALIM"]}
                  name="religion"
                  onChange={(selectedOption) =>
                    formik.setFieldValue("religion", selectedOption)
                  }
                  value={formik.values.religion}
                  errorMessage={
                    (formik.touched.religion && formik?.errors?.religion) ||
                    error?.religion?.msg
                  }
                  buttonClass="!py-[0.30rem] h-8 "
                />
              </FormControl>
              <FormControl className="mb-0 md:w-20 ">
                <FormTitle title="বোর্ড" subtitle="" />
                <Select
                  object={[
                    { bn_name: "বোর্ড" },
                    ...divisions,
                    { bn_name: "মাদ্রাসা" },
                  ]}
                  whatWillShow={"bn_name"}
                  name="religion"
                  onChange={(selectedOption) =>
                    formik.setFieldValue("religion", selectedOption)
                  }
                  value={formik.values.religion}
                  errorMessage={
                    (formik.touched.religion && formik?.errors?.religion) ||
                    error?.religion?.msg
                  }
                  buttonClass="!py-[0.30rem] h-8 "
                />
              </FormControl>{" "}
              <FormControl className="md:w-20">
                <FormTitle title="বোর্ড" subtitle="" />
                <Input
                  type="number"
                  className="h-8 mt-1"
                  placeholder="boss@gmail.com"
                  name="father.email"
                  onChange={formik.handleChange}
                  value={formik.values.father?.email}
                  errorMessage={
                    (formik.touched.father?.email &&
                      formik?.errors?.father?.email) ||
                    error?.father_email?.msg
                  }
                />
              </FormControl>{" "}
              <FormControl className="md:w-60">
                <FormTitle title="প্রতিষ্ঠানের নাম" subtitle="" />
                <Input
                  type="text"
                  className="h-8 mt-1"
                  placeholder="boss@gmail.com"
                  name="father.email"
                  onChange={formik.handleChange}
                  value={formik.values.father?.email}
                  errorMessage={
                    (formik.touched.father?.email &&
                      formik?.errors?.father?.email) ||
                    error?.father_email?.msg
                  }
                />
              </FormControl>
              <FormControl className="md:mt-6">
                <Button className=" h-8 w-18 bg-purple-400">add</Button>
              </FormControl>
            </div>
          </div>{" "}
          <div className="  w-full flex  flex-row    justify-center md:items-center  gap-4">
            <div className="  flex flex-col gap-y-2 items-center">
              {" "}
              <div className="w-8  h-8 ring-2 ring-purple-500 rounded-full justify-center items-center flex font-bold text-lg">
                1
              </div>
              <div className="w-1 rounded-full h-full bg-slate-300 flex justify-center items-center "></div>
            </div>
            <div className="flex flex-[0.9] gap-x-4 flex-col md:flex-row">
              <FormControl className="mb-0 md:w-20 ">
                <FormTitle title="পরিক্ষা" subtitle="" />
                <Select
                  options={["JSC/JDC", "HSC/ALIM"]}
                  name="religion"
                  onChange={(selectedOption) =>
                    formik.setFieldValue("religion", selectedOption)
                  }
                  value={formik.values.religion}
                  errorMessage={
                    (formik.touched.religion && formik?.errors?.religion) ||
                    error?.religion?.msg
                  }
                  buttonClass="!py-[0.30rem] h-8 "
                />
              </FormControl>
              <FormControl className="mb-0 md:w-20 ">
                <FormTitle title="বোর্ড" subtitle="" />
                <Select
                  object={[
                    { bn_name: "বোর্ড" },
                    ...divisions,
                    { bn_name: "মাদ্রাসা" },
                  ]}
                  whatWillShow={"bn_name"}
                  name="religion"
                  onChange={(selectedOption) =>
                    formik.setFieldValue("religion", selectedOption)
                  }
                  value={formik.values.religion}
                  errorMessage={
                    (formik.touched.religion && formik?.errors?.religion) ||
                    error?.religion?.msg
                  }
                  buttonClass="!py-[0.30rem] h-8 "
                />
              </FormControl>{" "}
              <FormControl className="md:w-20">
                <FormTitle title="বোর্ড" subtitle="" />
                <Input
                  type="number"
                  className="h-8 mt-1"
                  placeholder="boss@gmail.com"
                  name="father.email"
                  onChange={formik.handleChange}
                  value={formik.values.father?.email}
                  errorMessage={
                    (formik.touched.father?.email &&
                      formik?.errors?.father?.email) ||
                    error?.father_email?.msg
                  }
                />
              </FormControl>{" "}
              <FormControl className="md:w-60">
                <FormTitle title="প্রতিষ্ঠানের নাম" subtitle="" />
                <Input
                  type="text"
                  className="h-8 mt-1"
                  placeholder="boss@gmail.com"
                  name="father.email"
                  onChange={formik.handleChange}
                  value={formik.values.father?.email}
                  errorMessage={
                    (formik.touched.father?.email &&
                      formik?.errors?.father?.email) ||
                    error?.father_email?.msg
                  }
                />
              </FormControl>
              <FormControl className="md:mt-6">
                <Button className=" h-8 w-18 bg-purple-400">add</Button>
              </FormControl>
            </div>
          </div>
        </>

        <PageTitle className="my-5">
          {" "}
          <PageHead className="!text-lg">
            <span className="primary-highlighter"> একাডেমিক</span> তথ্য দিন
          </PageHead>
        </PageTitle>
        <div className="  w-full flex flex-col md:flex-row  pb-10 gap-x-6">
          <div className=" w-full  flex-1/2">
            <FormControl className="mb-0 ">
              <FormTitle title="ক্লাস" />

              <Select
                options={nameOfClass}
                buttonClass="!py-[0.30rem] h-8 "
                name="nameOfClass"
                onChange={(selectedOption) =>
                  formik.setFieldValue("nameOfClass", selectedOption)
                }
                value={formik.values.nameOfClass}
                errorMessage={
                  (formik.touched.nameOfClass && formik?.errors?.nameOfClass) ||
                  error?.nameOfClass?.msg
                }
              />
            </FormControl>
            <FormControl className="mb-0 ">
              <FormTitle title="শাখা" />

              <Select
                options={sakha}
                buttonClass="!py-[0.30rem] h-8 "
                name="sakha"
                onChange={(selectedOption) =>
                  formik.setFieldValue("sakha", selectedOption)
                }
                value={formik.values.sakha}
                errorMessage={
                  (formik.touched.sakha && formik?.errors?.sakha) ||
                  error?.sakha?.msg
                }
              />
            </FormControl>
            <FormControl className="mb-0 ">
              <FormTitle title="গ্রুপ" />

              <Select
                options={group}
                buttonClass="!py-[0.30rem] h-8 "
                name="group"
                onChange={(selectedOption) =>
                  formik.setFieldValue("group", selectedOption)
                }
                value={formik.values.group}
                errorMessage={
                  (formik.touched.group && formik?.errors?.group) ||
                  error?.group?.msg
                }
              />
            </FormControl>
            <FormControl className="mb-0">
              <FormTitle title="এডমিশনের তারিখ" />
              <Input
                type="date"
                className="h-8 "
                name="date_of_admission"
                errorMessage={
                  (formik.touched.date_of_admission &&
                    formik?.errors?.date_of_admission) ||
                  error?.date_of_admission?.msg
                }
                onChange={formik.handleChange}
                value={formik.values.date_of_admission}
              />
            </FormControl>
          </div>
          <div className=" w-full flex-1/2">
            <FormControl className="mb-0">
              <FormTitle title="শিক্ষকের আইডি নং" />
              <Input
                type="text"
                className="h-8"
                name="teacher_id"
                onChange={formik.handleChange}
                value={formik.values.teacher_id}
                errorMessage={
                  (formik.touched.teacher_id && formik?.errors?.teacher_id) ||
                  error?.teacher_id?.msg
                }
              />
            </FormControl>
            <FormControl className="mb-0">
              <FormTitle title="শিক্ষকের রোল" />
              <Input
                type="text"
                className="h-8"
                name="roll"
                onChange={formik.handleChange}
                value={formik.values.roll}
                errorMessage={
                  (formik.touched.roll && formik?.errors?.roll) ||
                  error?.roll?.msg
                }
              />
            </FormControl>
            <FormControl className="mb-0 ">
              <FormTitle title="একাডেমিক ইয়ার" />

              <Select
                options={year}
                buttonClass="!py-[0.30rem] h-8 "
                name="academic_year"
                onChange={(selectedOption) =>
                  formik.setFieldValue("academic_year", selectedOption)
                }
                value={formik.values.academic_year}
                errorMessage={
                  (formik.touched.academic_year &&
                    formik?.errors?.academic_year) ||
                  error?.academic_year?.msg
                }
              />
            </FormControl>
          </div>
        </div>

        <div className="  w-full flex flex-col md:flex-row  pb-10 gap-x-6">
          <div className=" w-full  flex-1/2"></div>
        </div>
        <Button2 type="submit" arrowRight>
          পরর্বতী ধাপে যান
        </Button2>
      </form>
    </div>
  );
}

export default AddTeacher;
