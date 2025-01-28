import { BookOpenIcon } from "@heroicons/react/24/outline";
import heroImage from "../assets/images/friends.svg";
import axios from "axios";
import { useEffect } from "react";

function Hero({ refarence }) {
  useEffect(() => {
    const getdata = async () => {
      await axios
        .get("https://bdapis.com/api/v1.1/division/chattogram")
        .then((data) => console.log(data));
    };
    getdata();
  }, []);

  return (
    <section
      ref={refarence}
      id="hero"
      className=" select-none  pb-20   border-b dark:border-gray-500/80 border-stone-300 relative pt-[7rem]  bg-[url('./assets/images/hero.svg')] bg-slate-200/50   overflow-y-clip overflow-hidden dark:bg-[#0B1120] dark:bg-none dark:text-slate-50 "
    >
      <div className=" absolute h-[40rem] bg-purple-500 opacity-30  w-[5rem] top-[0rem] left-0 rotate-45 filter  blur-2xl font-bangla "></div>

      <div
        className="  absolute h-[12rem] 
     bg-purple-500 lg:bg-purple-500 w-[12rem] rounded-full opacity-40 lg:opacity-30 lg:h-[23rem] lg:w-[23rem]   filter left-[60%] lg:left-[60%] lg:top-[25%] top-[60%] animate-blob blur-xl   md:w-[20rem] md:h-[20rem]  md:left-[50%] md:top-[40%] dark:lg:opacity-20 dark:md:opacity-20"
      ></div>

      <div className="absolute bottom-44 -left-64 hidden lg:block h-[150px] w-[900px] -rotate-45 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-800 opacity-30  filter  lg:bottom-10 lg:left-[10rem] lg:h-28 lg:w-[250px] blur-2xl lg:-rotate-12 lg:opacity-20 xl:h-40 xl:w-[400px]"></div>

      <div className="absolute right-[28%] top-0 hidden lg:block h-[150px] w-[200px] rotate-12 rounded-3xl bg-gradient-to-l from-blue-600 to-sky-400 opacity-20 blur-3xl filter dark:block dark:opacity-30 lg:top-44 lg:-right-20 lg:h-72 lg:w-[350px] xl:h-80 xl:w-[500px]"></div>
      <div className="container w-[90%] mx-auto  lg:h-full lg:items-center lg:py-0 relative  lg:flex lg:justify-between">
        <div className="flex flex-col justify-center items-center gap-1  lg:flex-[0.8] lg:items-start  ">
          <div className="flex flex-col justify-center items-center gap-2 lg:items-start">
            <span className="material-symbols-outlined text-[5rem]  text-link">
              <BookOpenIcon className="w-16" />
            </span>
            <p className="text-link font-bold text-[0.8rem] dark:text-sky-500 ">
              {" "}
              জ্ঞানে প্রবেশ করুন, আলোকিত ভবিষ্যতের দিকে
            </p>
            <h1 className="text-[2.2rem] font-extrabold text-gray-800 dark:text-slate-100 text-center lg:text-left ">
              <span className="text-blue-500">ইমাম আজম </span>
              <br className="md:hidden lg:block" />
              আবু হানিফা (রাহ:) স্কুল
            </h1>

            <p className="font-semibold ">
              পশ্চিম সরফভাটা, সরফভাটা , রাঙ্গুনিয়া , চট্টগ্রাম
            </p>
          </div>
          <p className="py-6 text-center text-md opacity-70 font-normal lg:text-left">
            আমরা একটি শিক্ষা প্রতিষ্ঠান, যেখানে জ্ঞানের আলোয় পড়ে, সহজে হৃদয়ে
            প্রবেশ করে, এবং শিক্ষার মাধ্যমে ছাত্র-ছাত্রীদের আত্মবিশ্বাস,
            সমাজবাদ, এবং নৈতিক মূল্যগুলি উন্নত করে। আমরা একটি সহযোগী সাথী, উন্নত
            শিক্ষা প্রদান করে যা আমাদের ছাত্র-ছাত্রীদের প্রত্যেকটি দিকে অগ্রসর
            করে এবং একটি উদ্বিকাসশীল সমাজ তৈরি করতে সাহায্য করে।
          </p>

          <button className="flex bg-slate-900 p-2 rounded-full px-4 gap-2 justify-center items-center text-slate-100 dark:bg-sky-600 hover:bg-slate-700 dark:hover:bg-sky-400/70 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>1,100 টাকা</span>
            <span className="text-violet-500 font-bold">|</span>
            <span>এনরোল করুন</span>
          </button>

          <div className="flex gap-2 text-[12px] opa  pt-2">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <p>
              এনরোলমেন্টের সময় বাংলাদেশি মোবাইল নাম্বার ব্যবহার না করলে কোর্স ফি
              হবে 1,200 টাকা
            </p>
          </div>
        </div>
        <div className="hidden  lg:flex ">
          <img
            loading="lazy"
            width="450rem"
            height="450rem"
            src={heroImage}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
