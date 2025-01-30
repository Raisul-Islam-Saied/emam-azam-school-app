import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { useQuery, useQueryClient } from "react-query";
import { useRef } from "react";
import Barcode from "react-barcode";
import { useParams } from "react-router-dom";
import axios from "axios";
import convertToBanglaNumber from "../../helper/convertToBanglaNumber";
import NoData from "../NoData";
function StudentInfo() {
  const params = useParams();

  const queryClient = useQueryClient();
  const fatchQuery = () => {
    const url = `${import.meta.env.VITE_SERVER_URL}/api/student/${
      params.student_id
    }`;
    return axios({
      method: "get",
      url: url,
    });
  };
  const { data, isLoading, isError, isFetching, error } = useQuery(
    ["student_info"],
    fatchQuery,
    { retry: false }
  );
  console.log(error);
  if (isError) {
    return <NoData>{error?.response?.data?.errors?.common?.msg}</NoData>;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (data) {
    return (
      <div className=" text-sm pt-20 flex justify-center items-center gap-3">
        <div className="bg-[#F2F2F2] w-[3.78in] h-[2.2in] relative ">
          <div className=" rounded-t-md bg-[#4472C4] w-[3.78in] h-[0.4in] flex justify-center items-center">
            <h3 className="text-xl text-slate-200 uppercase">
              Student Id Card
            </h3>
          </div>
          <img
            src={
              data?.data?.payload?.avatar &&
              `data:image/jpg; base64, ${data?.data.payload.avatar}`
            }
            className=" rounded-b-md ring-1 ring-[#4472C4] rounded-md w-[0.87in] h-[0.95in] absolute bottom-16 object-cover left-3 "
          />
          <div className=" rounded-b-md  rounded-md w-[15rem] h-[8rem] absolute bottom-8 right-2 flex overflow-hidden ">
            <div className="flex flex-col">
              {" "}
              <span>নাম</span>
              <span>পিতা</span>
              <span>ক্লাস</span>
              <span>রোল</span>
              <span>মোবাইল</span>
              <span>ঠিকানা</span>
            </div>
            <div className="flex flex-col ml-2">
              <div className="flex gap-2">
                <span>:</span>{" "}
                <span className="truncate w-40">
                  {" "}
                  {data?.data?.payload?.name_bangla}
                </span>
              </div>
              <div className="flex gap-2">
                <span>:</span>{" "}
                <span> {data?.data?.payload?.father?.name_bangla} </span>
              </div>
              <div className="flex   gap-4 ">
                <div className="flex gap-2">
                  <span>:</span>
                  <span>{data?.data?.payload?.nameOfClass}</span>
                </div>

                <span>{data?.data?.payload?.sakha}</span>
              </div>
              <div className="flex  gap-4 justify-between ">
                <div className="flex gap-2">
                  <span>:</span>
                  <span>{data?.data?.payload?.nameOfClass}</span>
                </div>
                <span>গ্রুপ : &nbsp;{data?.data?.payload?.group}</span>
              </div>

              <span className="flex gap-2">
                {" "}
                <span>:</span> <span>{data?.data?.payload?.phone}</span>
              </span>
              <span className="flex gap-2">
                {" "}
                <span>:</span> <span>{data?.data?.payload?.address_bn}</span>
              </span>
            </div>
          </div>

          <div className=" right-0 absolute bottom-[0.30rem]">
            <Barcode
              height={20}
              value={data?.data?.payload?.student_id}
              background="#F2F2F2"
              width={2.6}
              displayValue={false}
            />{" "}
          </div>
          <div className=" rounded-b-md bg-[#4472C4] w-[3.78in] h-[0.1in] absolute bottom-0"></div>
        </div>{" "}
        <div className="bg-[#F2F2F2] w-[3.78in] h-[2.2in] relative">
          <div className=" rounded-t-md bg-[#4472C4] w-[3.78in] h-[0.4in] flex justify-center items-center">
            <h3 className="text-xl text-slate-200 uppercase">
              Student Id Card
            </h3>
          </div>
          <img
            src="/images/default.jpg"
            className=" rounded-b-md ring-1 ring-[#4472C4] rounded-md w-[0.87in] h-[1.07in] absolute bottom-14 left-3 "
          />
          <div className=" rounded-b-md  rounded-md w-[15rem] h-[8rem] absolute bottom-8 right-2 flex overflow-hidden ">
            <div className="flex flex-col">
              {" "}
              <span>নাম</span>
              <span>পিতা</span>
              <span>ক্লাস</span>
              <span>ঠিকানা</span>
            </div>
            <div className="flex flex-col ml-2">
              <div className="flex gap-2">
                <span>:</span>{" "}
                <span className="truncate w-40">
                  {" "}
                  মোহাম্মদ রায়সুল ইসলাম সাঈদ sadfsdafsdf{" "}
                </span>
              </div>
              <div className="flex gap-2">
                <span>:</span> <span> মোহাম্মদ ফিরোজ আহমদ</span>
              </div>
              <div className="flex justify-between gap-4 ">
                <div className="flex gap-2">
                  <span>:</span> <span>পঞ্চম</span>
                </div>
                <span>রোল : ১০ (দশ)</span>
              </div>
              <div className="flex flex-col">
                <span className="flex gap-2">
                  {" "}
                  <span>:</span>{" "}
                  <span>
                    মেীলানাগ্রাম, পশ্চিম সরফভাটা,রাঙ্গুনিয়া, চট্টগ্রাম
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className=" right-0 absolute bottom-[0.30rem]">
            <Barcode
              height={20}
              value="3453345455"
              background="#F2F2F2"
              width={2.5}
              displayValue={false}
            />{" "}
          </div>
          <div className=" rounded-b-md bg-[#4472C4] w-[3.78in] h-[0.1in] absolute bottom-0"></div>
        </div>{" "}
      </div>
    );
  }
}

export default StudentInfo;
