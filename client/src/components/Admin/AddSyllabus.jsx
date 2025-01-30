import React, { useEffect, useRef, useState, useCallback } from "react";

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
import Drop from "../Drop";
import useFetch from "../../hooks/useFetch";
// Define Bangla day names

const currentYear = new Date().getFullYear(); // Get the current year
const year = [currentYear];

for (let i = 2022; i <= 2099; i++) {
  year.push(i);
}

function AddSyllabus({ result }) {
  const [file, setFile] = useState(null);
  const [schema, setSchema] = useState(null);
  const [selectedSubject, setSubjects] = useState(null);
  const { data, error, isLoading, mutation } = useFetch();

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
      nameOfClass: "",
      exam_year: "",
    },

    onSubmit: async (v, { resetForm }) => {
      const data = {
        ...v,
        syllabus: file,
      };
      const url = `syllabus/add_syllabus`;
      mutation.mutateAsync({
        allFormData: data,
        url,
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });

  const { touched } = formik;
  return (
    <div className="overflow-x-hidden  m-0 p-0   mx-auto  ">
      <div className="  flex justify-center mt-10">
        <div className="mt-5  flex justify-center items-center flex-col md:flex-row gap-2 pb-10  ">
          {" "}
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
                রেজাল্ট স্কিমা সর্তকতার সাথে তৈরি করুন পরর্বতীতে আপনি কোনো তথ্য
                পরিবর্তন করতে পারবেন না
              </PageSubtitle>
            </PageTitle>

            <form
              action=""
              className="pt-10 md:grid md:grid-cols-2 md:gap-x-5 "
              onSubmit={formik.handleSubmit}
            >
              {" "}
              <FormControl>
                <FormTitle title="পরিক্ষার সাল" />
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
                <FormTitle title="ক্লাসের নাম" />
                <Select
                  options={nameOfClass}
                  name="nameOfClass"
                  onChange={(selectedOption) =>
                    formik.setFieldValue("nameOfClass", selectedOption)
                  }
                  value={formik.values.nameOfClass}
                />
              </FormControl>
              <Drop
                name="syllabus"
                btnValue="UPLOAD"
                classes=""
                setFile={setFile}
                className="col-span-2"
                acceptFileName={" PDF"}
                errorMessage={error?.file?.msg}
              />
              <div className="flex  justify-center col-span-2  mt-3 items-center ">
                <Button isLoading={isLoading} className="py-[0.6rem]">
                  {" "}
                  এড করুন
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AddSyllabus;
