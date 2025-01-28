import React from "react";
import img from "../assets/images/instructor.webp";
function IdCard() {
  return (
    <section className="w-full relative    py-24  border-t border-gray-300  dark:border-gray-400/50">
      <div className="container w-[90%] mx-auto flex ">
        <div
          style={{ width: "204px", height: "323.5px" }}
          className=" rounded-sm bg-slate-100 p-1 mr-1"
        >
          <div className="bg-[#0D509F] w-full h-[53px] rounded-sm px-2 py-1 text-slate-200 flex">
            <img
              loading="lazy"
              src="/images/logo.png"
              className="bg-slate-200 rounded-full p-1 "
              alt=""
            />
            <div className="text-right  text-[13px] ml-[4px] items-start leading-[17px] ">
              <h1>ইমাম আজম আবু হানিফা (র:) স্কুল</h1>
              <span className="text-[10px] mb-1 font-sans">reg no 14523</span>
            </div>
          </div>
          <div className="flex flex-col w-full items-center  py-1 ">
            <img
              loading="lazy"
              src={img}
              className="w-20 h-24 object-cover  border-[3px] border-slate-50 shadow-md"
              alt=""
            />
            <h2 className="text-[#CE6A4A] font-normal text-[12px] font-sans2">
              RAISUL ISLAM SAIED
            </h2>
          </div>
        </div>
        <img
          loading="lazy"
          src="images/model_14.jpg"
          alt=""
          className="w-[204px]"
        />
      </div>
    </section>
  );
}

export default IdCard;
