import React from "react";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";
import pymantImage from "/images/footer/sslcommerz-banner.webp";

const link1 = [
  {
    link: "http://www.facebook.com/raisulislamsaied",
    icon: "M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z",
  },
  {
    link: "http://www.facebook.com/raisulislamsaied",
    icon: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z",
  },
  {
    link: "http://www.facebook.com/raisulislamsaied",
    icon: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z",
  },
  {
    link: "http://www.facebook.com/raisulislamsaied",
    icon: "M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z",
  },
  {
    link: "http://www.facebook.com/raisulislamsaied",
    icon: "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z",
  },
];
const link2 = [
  {
    title: "পেমেন্ট করুন",
    link: "#",
  },
  {
    title: "ভেরিফাই ইমেইল",
    link: "#",
  },
  {
    title: "ফেসবুক গ্রুপ",
    link: "#",
  },
  {
    title: "আমাদের সম্পর্কে",
    link: "#",
  },

  {
    title: "যোগাযোগ",
    link: "#",
  },
];
const link3 = [
  {
    title: "সাপোর্টেড ব্রাউজার",
    link: "#",
  },
  {
    title: "শর্তাবলি",
    link: "#",
  },
  {
    title: "রিফান্ড পলিসি",
    link: "#",
  },
  {
    title: "প্রাইভেসি পলিসি",
    link: "#",
  },
];
function Footer() {
  return (
    <footer className="py-20 pb-10 print:hidden ">
      <div className="container w-[90%] mx-auto">
        <div className="flex flex-col justify-center items-center gap-7">
          <img
            loading="lazy"
            className="w-32 ml-20 dark:ml-0 "
            src={logo}
            alt=""
          />
          <div className="flex flex-col gap-5 lg:flex-row  lg:w-full lg:justify-between  lg:border-b lg:border-b-slate-200 dark:lg:border-b-slate-700 lg:pb-5">
            <div className="flex text-[11px] md:text-[14px] justify-between gap-4  text-slate-600/80 order-last lg:order-first dark:text-slate-200/50 ">
              {link2.map((link, index) => {
                return (
                  <Link
                    className="transition duration-200 hover:text-violet-600 hover:scale-105 dark:hover:text-blue-500 "
                    to={link.link}
                    key={index}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </div>
            <div className="text-red-500 flex gap-3 justify-center items-center">
              {link1.map((link, index) => {
                return (
                  <Link className="" key={index}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      className="fill-violet-500 w-5  hover:fill-violet-600 dark:fill-blue-500/70 dark:hover:fill-blue-500"
                    >
                      <path d={link.icon} />
                    </svg>
                  </Link>
                );
              })}
            </div>
          </div>
          <img loading="lazy" src={pymantImage} alt="" />
          <div className="flex flex-col gap-5 text-slate-600/80 text-[12px] dark:text-slate-200/50 lg:flex-row lg:w-full lg:justify-between lg:py-8">
            <div className="flex  justify-between gap-4  ">
              {link3.map((link, index) => {
                return (
                  <Link
                    className="transition duration-200 hover:text-violet-600 dark:hover:text-blue-500 "
                    to={link.link}
                    key={index}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </div>
            <span className=" flex  justify-center  ">
              কপিরাইট ©2023 লার্ন উইথ সুমিত। সর্বস্বত্ব সংরক্ষিত।
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
