import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useQuery, useQueryClient } from "react-query";
import { useRef } from "react";
import Barcode from "react-barcode";
import { useParams } from "react-router-dom";
import axios from "axios";
import convertToBanglaNumber from "../../helper/convertToBanglaNumber";
import Loader from "../Loader";
import NoData from "../NoData";
import Input from "../FormControl/Input";
import Button from "../Button";
function StudentInfo() {
  const [input, setInput] = useState();
  const [student_id, setStudentId] = useState();
  const handleClick = () => {
    setStudentId(input);
  };
  const queryClient = useQueryClient();
  const fatchQuery = () => {
    const url = `${import.meta.env.VITE_SERVER_URL}/api/student/${student_id}`;
    return axios({
      method: "get",
      url: url,
    });
  };
  console.log(student_id);
  const { data, isLoading, isError, isFetching, error } = useQuery(
    ["student_info"],
    fatchQuery,
    { retry: false, enabled: !!student_id }
  );

  if (student_id) {
    if (isError) {
      return (
        <NoData className="my-0 py-30 ">
          {error?.response?.data?.errors?.common?.msg}
        </NoData>
      );
    }
    if (isLoading) {
      return <Loader />;
    }
    if (data) {
      return (
        <div className="overflow-x-scroll scrollbar">
          <div className="border  w-[7.8in]  h-[11.19in] m-auto p-5 ">
            <div className="flex gap-4 justify-around items-center">
              <div>
                <QRCodeSVG
                  className="w-20 text-slate-800"
                  fgColor="rgb(30 41 59 / var(--tw-text-opacity))"
                  value={
                    "  Lorem ipsum dolor sit amet, $2a$10$esL7G3pbaJ3PiGAoIYhoNuozjrSDozSozklI6QZ4W4Kqe6CNimy8G"
                  }
                />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-xl text-slate-800">
                  IMAM AZAM ABU HANIFA (RH:) SCHOOL
                </h3>
                <address>Sarafbhata, Rangunia, Chittagong</address>
                EIN No : 432523 Esta : 1990
              </div>
              <div>
                <picture loading="lazy">
                  <img
                    src={
                      data?.data?.payload?.avatar &&
                      `data:image/jpg; base64, ${data?.data.payload.avatar}`
                    }
                    className="w-18 h-22 object-cover border "
                    alt=""
                  />
                </picture>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <span className="text-center p-3 py-1 text-xl ring-1 uppercase font-bangla2 ring-violet-500 rounded ">
                Student Information{" "}
              </span>
            </div>
            <div>
              <div>
                <span>ID : {data?.data.payload?.student_id} </span>
                <table className="w-full mt-5">
                  <tbody className="divide-y-2 ">
                    <tr className="flex justify-between py-[2.7rem] items-center text-center ">
                      <td>শিক্ষার্থীর নাম</td>
                      <td> {data?.data.payload?.name_bangla}</td>{" "}
                      <td>Studnt's Name</td>
                      <td>{data?.data.payload?.name}</td>
                    </tr>

                    <tr className="flex justify-between py-2 items-center text-center ">
                      <td>জন্ম তারিখ</td>
                      <td>
                        {" "}
                        {convertToBanglaNumber(
                          String(data?.data.payload?.date_of_birth)
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")
                        )}
                      </td>
                      <td>মোবাইল নম্বর</td>
                      <td>{data?.data?.payload?.phone}</td>
                    </tr>
                    <tr className="flex justify-between py-2 items-center text-center ">
                      <td>জন্ম নিবন্ধন নম্বর</td>
                      <td>{data?.data?.payload?.birth_no}</td>
                      <td>ভর্তির তারিখ </td>
                      <td>
                        {convertToBanglaNumber(
                          String(data?.data.payload?.date_of_admission)
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")
                        )}
                      </td>
                    </tr>

                    <tr className="flex flex-3 justify-between  py-2 items-center">
                      <td className="flex-1">
                        শ্রেনী &nbsp; &nbsp; {data?.data?.payload?.nameOfClass}
                      </td>

                      <td className="flex-1">
                        রোল &nbsp; &nbsp; {data?.data?.payload?.roll}
                      </td>
                      <td className="flex-1">
                        শাখা &nbsp; &nbsp; {data?.data?.payload?.sakha}
                      </td>
                      <td className="flex-1">
                        গ্রুপ &nbsp; &nbsp; {data?.data?.payload?.group}
                      </td>
                    </tr>
                    <tr className="flex flex-3 justify-between  py-2 items-center">
                      <td className="flex-1">
                        শিক্ষাবর্ষ &nbsp; &nbsp;
                        {data?.data?.payload?.academic_year}
                      </td>
                      <td className="flex-1">
                        রক্তের গ্রুপ &nbsp; &nbsp;{" "}
                        {data?.data?.payload?.blood_group}
                      </td>

                      <td className="flex-1">
                        ধর্ম &nbsp; &nbsp; {data?.data?.payload?.religion}
                      </td>

                      <td className="flex-1">
                        লিঙ্গ &nbsp; &nbsp;{data?.data?.payload?.gender}
                      </td>
                    </tr>

                    <tr className="flex justify-between py-2 items-center text-center ">
                      <td className="text-left flex gap-4">
                        <span>ঠিকানা </span>
                        <span> {data?.data?.payload?.address_bn}</span>
                      </td>
                      <td className="text-left flex gap-4">
                        <span>Address </span>
                        <span> {data?.data?.payload?.address}</span>
                      </td>
                    </tr>
                  </tbody>

                  <tbody className="divide-y-2 ">
                    <tr className="text-center flex gap-20 justify-center ">
                      <td className="mt-2  font-semibold"> পিতার তথ্য</td>
                    </tr>
                    <tr className="flex justify-between py-2 items-center text-center ">
                      <td>পিতার নাম</td>
                      <td>{data?.data?.payload?.father?.name_bangla}</td>
                      <td>father's Name</td>
                      <td>{data?.data?.payload?.father?.name}</td>
                    </tr>
                    <tr className="flex justify-between py-2 items-center text-center ">
                      <td>জন্ম তারিখ</td>
                      <td>
                        {convertToBanglaNumber(
                          String(data?.data.payload?.father?.date_of_birth)
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")
                        )}
                      </td>
                      <td>মোবাইল নম্বর</td>
                      <td>{data?.data?.payload?.father?.phone}</td>
                    </tr>
                    <tr className="flex justify-between py-2 items-center text-center ">
                      <td>জন্ম নিবন্ধন নম্বর</td>
                      <td>{data?.data?.payload?.father?.birth_no}</td>
                      <td>এন আইডি নং</td>
                      <td>{data?.data?.payload?.father?.nid_no}</td>
                    </tr>
                  </tbody>
                  <tbody className="divide-y-2">
                    <tr className="text-center flex gap-20  justify-center">
                      <td className="mt-2  font-semibold ">মাতার তথ্য</td>
                    </tr>
                    <tr className="flex justify-between py-2 items-center text-center ">
                      <td>মাতার নাম</td>
                      <td>{data?.data?.payload?.mother?.name_bangla}</td>
                      <td>mother's Name</td>
                      <td>{data?.data?.payload?.father?.name}</td>
                    </tr>
                    <tr className="flex justify-between py-2 items-center text-center ">
                      <td>জন্ম তারিখ</td>
                      ৩০-০৭-২০০৩
                      <td>মোবাইল নম্বর</td>
                      <td>+8801854654</td>
                    </tr>
                    <tr className="flex justify-between py-2 items-center text-center ">
                      <td>জন্ম নিবন্ধন নম্বর</td>
                      ১৫১৭০৮৬১৭১৫
                      <td>এন আইডি নং</td>
                      <td>৩৪৫৩৪৫৬২৩৪</td>
                    </tr>
                  </tbody>
                  <tbody className="divide-y-2">
                    <tr className="text-center flex gap-20 justify-center ">
                      <td className="mt-2  font-semibold"> অভিবাবকের তথ্য</td>
                    </tr>

                    <tr className="flex justify-between py-2 items-center text-center ">
                      <td>mother's Name</td>
                      <td>Mohammad raisul islam saied</td>
                      <td>মাতার নাম</td>
                      মোহাম্মদ রায়সুল ইসলাম সাঈদ
                    </tr>
                    <tr className="flex justify-between py-2 items-center text-center ">
                      <td>জন্ম তারিখ</td>
                      ৩০-০৭-২০০৩
                      <td>মোবাইল নম্বর</td>
                      <td>+8801854654</td>
                    </tr>
                    <tr className="flex justify-between py-2 items-center text-center ">
                      <td>জন্ম নিবন্ধন নম্বর</td>
                      ১৫১৭০৮৬১৭১৫
                      <td>এন আইডি নং</td>
                      <td>৩৪৫৩৪৫৬২৩৪</td>
                    </tr>
                  </tbody>
                  <div></div>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="pt-10 flex gap-5 flex-col lg:flex-row">
        <Input
          value={input}
          onChange={(e) => {
            console.log(e);
            setInput(e.target.value);
          }}
        />
        <Button onClick={handleClick}>Submit</Button>
      </div>
    );
  }
}

export default StudentInfo;
