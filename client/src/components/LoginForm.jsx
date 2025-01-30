import FormControl from "./FormControl/FormControl";
import Input from "./FormControl/Input";
import { Link } from "react-router-dom";
import FormTitle from "./FormControl/FormTitle";
import React, { useEffect, useRef, useState } from "react";

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import axios from "axios";

import { useFormik } from "formik";
import { object, string, ref, number, array } from "yup";

import toast from "react-hot-toast";
import FormCommonError from "./FormControl/FormCommonError";
import useFetch from "../hooks/useFetch";

function LoginForm() {
  const { error, isLoading, mutation } = useFetch();
  // const mutation = useMutation(
  //   ({ allFormData, url, method }) => {
  //     return axios({
  //       method: method,
  //       url: url,
  //       data: allFormData,
  //       withCredentials: true,
  //     });
  //   },

  //   {
  //     onMutate: () => {
  //       setError(null);
  //       setIsLoading(true);
  //       toast.loading("loading", {
  //         id: 134,
  //         className:
  //           "dark:bg-slate-800 dark:border border-slate-600 font-bangla dark:text-slate-300",
  //       });
  //     },

  //     onError: (error) => {
  //       setIsLoading(false);

  //       const errorMessage = error?.response?.data?.errors;
  //       setError(errorMessage);
  //       if (errorMessage && errorMessage.common) {
  //         toast.error(<p>{errorMessage.common.msg}</p>, { id: 134 });
  //       } else {
  //         toast.error(<p>{error.message}</p>, { id: 134 });
  //         setError({
  //           common: {
  //             msg: error.message,
  //           },
  //         });
  //       }
  //     },

  //     onSuccess: (data) => {
  //       setError(null);
  //       setIsLoading(false);
  //       toast.success(<p>{data?.data?.message}</p>, {
  //         id: 134,
  //       });
  //
  //     },
  //   }
  // );
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: object().shape({
      email: string().required().email(),
      password: string().required().min(6),
    }),
    onSubmit: async (v, { resetForm }) => {
      const url = `auth/login`;

      await mutation.mutateAsync({ allFormData: v, url, method: "post" });

      resetForm({});
      localStorage.setItem("isIn", true);
      window.location.replace("/dashboard");
    },
  });
  const { touched } = formik;
  return (
    <>
      <form action="" onSubmit={formik.handleSubmit} className="pt-10">
        <FormControl>
          <FormTitle
            title="আপনার ইমেইল এড্রেস"
            subtitle="যে ইমেইল এড্রেস দিয়ে আপনি নিবন্ধন করেছিলেন।"
          />
          <Input
            name="email"
            placeholder="boss@gmail.com"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            errorMessage={
              (touched.email && formik.errors.email) ||
              (error && error?.email?.msg)
            }
          />
        </FormControl>{" "}
        <FormControl>
          <FormTitle
            title="পাসওয়ার্ড দিন "
            subtitle="পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে এবং সেখানে কমপক্ষে 1 টি লেটার এবং 1 টি নাম্বার থাকতেই হবে।"
          />
          <Input
            name="password"
            placeholder="45sd!@aqwer"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            errorMessage={
              (touched.password && formik.errors.password) ||
              (error && error?.password?.msg)
            }
          />
        </FormControl>
        {error && <FormCommonError>{error?.common?.msg}</FormCommonError>}
        <div className="flex justify-between items-center ">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-gray-800  text-slate-100 p-2 px-5 rounded-full font-semibold  dark:bg-violet-500 hover:bg-gray-700 focus:animate-button"
          >
            লগইন করুন
          </button>
          <Link className="text-sm text-violet-700 font-normal">
            পাসওয়ার্ড ভুলে গেছেন?
          </Link>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
