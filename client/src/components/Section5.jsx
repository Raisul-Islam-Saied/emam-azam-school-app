import React from "react";
import PageTitle from "./Heading/PageTitle";
import PageHead from "./Heading/PageHead";
import PageSubtitle from "./Heading/PageSubtitle";
import PageHeadingImage from "./Heading/HeadingImage";
import instructor from "../assets/images/instructor.webp";
import useIntersection from "../hooks/useIntersection";

//images

function Section5() {
  const [ref, visible] = useIntersection({ threshold: 0.9 });
  return (
    <section
      id="instructor"
      className="w-full  relative    py-24 bg-violet-600 border-t border-gray-300 dark:bg-slate-800/30 dark:border-gray-400/50"
    >
      <div className="container w-[90%] mx-auto ">
        <PageTitle className="">
          <PageHead className="text-white"> কোর্স ইন্সট্রাক্টর </PageHead>
        </PageTitle>

        <div className="flex  flex-col gap-20 lg:flex-row lg:mt-6 items-center lg:px-5 lg:py-10">
          <div className="relative flex-[0.5] lg:mt-[5rem]">
            <div
              className="relative -mt-5 mx-auto rounded-lg shadow-xl  top-20
            lg:top-0 left-0    z-0  h-[300px] w-[200px] border-4 border-white !bg-[#8E6AC8] lg:h-[350px] lg:w-[280px]"
            ></div>
            <div
              ref={ref}
              className={` rounded-md mt-[7rem] absolute -top-[3.3rem] 
              z-0 -left-40 lg:-left-[8rem] lg:-top-[9rem] mx-auto h-[300px] w-[200px] border-4 border-white lg:h-[350px] lg:w-[280px] transition-transform duration-200 ${
                visible
                  ? " -rotate-6  translate-x-[57%]"
                  : "rotate-0 , translate-x-[73%]"
              }`}
            >
              <img
                loading="lazy"
                className="!object-cover h-full"
                src={instructor}
              />
            </div>
          </div>

          <div className="pt-16 p-6 lg:py-0  flex flex-col text-slate-100  gap-6 lg:flex-[0.6] lg:border-l-2 border-l-yellow-500 ">
            <h5 className="dark:text-gray-400 lg:text-lg">
              সুমিত সাহা একজন প্রযুক্তি উদ্যোক্তা। বুয়েটে কম্পিউটার সায়েন্স এন্ড
              ইঞ্জিনিয়ারিং নিয়ে পড়া অবস্থায় ২০০৮ সালে তিনি প্রতিষ্ঠা করেন
              বাংলাদেশের প্রথম ডিজিটাল এজেন্সি - অ্যানালাইজেন। প্রোগ্রামিং এর
              প্রতি ভালবাসা এবং মানুষকে শেখানোর প্রতি আগ্রহ থেকে এরপরে তিনি ২০২০
              সালে প্রতিষ্ঠা করেন লার্ন উইথ সুমিত প্লাটফর্ম যেখানে প্রায় ৩৫০+
              প্রোগ্রামিং রিলেটেড ভিডিও টিউটোরিয়াল রয়েছে। লার্ন উইথ সুমিত ইউটিউব
              চ্যানেল এবং পাবলিক ফেসবুক গ্রুপ থেকে প্রায় এক লক্ষেরও বেশি মানুষ
              ফ্রি প্রোগ্রামিং শিখছে। <br />
              তিনি নিজে একজন ফুল স্ট্যাক ওয়েব ডেভেলপার ও সফটওয়্যার আর্কিটেক্ট
              এবং দীর্ঘ 14 বছর ধরে তিনি ওয়েব ডেভেলপমেন্ট ও সফটওয়্যার পেশার সাথে
              জড়িত।
            </h5>
            <div className="flex flex-col">
              <span className="font-bold">সুমিত সাহা </span>{" "}
              <span className="text-slate-200 text-sm pt-1">
                প্রতিষ্ঠাতা - লার্ন উইথ সুমিত
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section5;
