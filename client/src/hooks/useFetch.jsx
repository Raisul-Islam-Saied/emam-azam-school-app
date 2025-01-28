import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import axios from "axios";
const useFetch = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const mutation = useMutation(
    ({ allFormData, url, method, headers }) => {
      return axios({
        method,
        url: `${import.meta.env.VITE_SERVER_URL}/api/${url}`,
        data: allFormData,

        withCredentials: true,
        headers: headers,
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

      onError: (e) => {
        setIsLoading(false);

        const errorMessage = e?.response?.data?.errors;

        if (errorMessage) {
          const modifiedError = {};

          Object.keys(errorMessage).forEach((key) => {
            const modifiedKey = key.includes(".")
              ? key.replace(/\./g, "_")
              : key;
            modifiedError[modifiedKey] = errorMessage[key];
          });

          setError(modifiedError);

          if (errorMessage?.common) {
            toast.error(<p>{errorMessage.common.msg}</p>, { id: 1 });
          } else {
            toast.error(<p>failed</p>, { id: 1 });
          }
        } else {
          const genericErrorMessage = e.message.includes(".")
            ? e.message.replace(/\./g, "_")
            : e.message;
          toast.error(<p>{genericErrorMessage}</p>, { id: 1 });
          setError({
            common: {
              msg: genericErrorMessage,
            },
          });
        }
      },

      onSuccess: (data) => {
        setError(null);
        setIsLoading(false);
        setData(data?.data?.payload);

        toast.success(<p>{data?.data?.message}</p>, {
          id: 1,
        });
      },
    }
  );

  return { error, isLoading, data, mutation };
};
export default useFetch;
