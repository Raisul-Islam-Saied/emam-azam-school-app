import {
  ArrowUpIcon,
  CalendarIcon,
  ClipboardDocumentIcon,
  CodeBracketIcon,
  TvIcon,
  UsersIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import peep from "../assets/images/peep1.svg";
import useIntersection from "../hooks/useIntersection";
import { motion } from "framer-motion";
import PageTitle from "./Heading/PageTitle";
import PageHeadingImage from "./Heading/HeadingImage";
import PageHead from "./Heading/PageHead";
import PageSubtitle from "./Heading/PageSubtitle";
import { Link } from "react-router-dom";
const Section1 = () => {
  const [ref, visible] = useIntersection({ threshold: 0.1 });

  return (
    <section
      id="our-course"
      className="w-full relative   lg:bg-[url('./assets/images/section1.svg')] dark:bg-none bg-no-repeat bg-left py-16 "
      ref={ref}
    >
      <div className="container w-[90%] mx-auto ">
        <PageTitle>
          {" "}
          <PageHeadingImage src={peep} visible={visible} />
          <PageHead>
            {" "}
            এক নজরে আমাদের <span className="primary-highlighter">রিডাক্স </span>
            কোর্স
          </PageHead>
          <PageSubtitle>এই কোর্সে যা যা থাকছে</PageSubtitle>
        </PageTitle>
        <div className="grid items-center justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3  border border-gray-400/20 rounded-md shadow-xl mt-10  dark:bg-slate-800/[0.6] bg-white p-6 ">
          <div className="p-8 h-[18rem] md:py-10 border-b border-b-slate-300   mx-auto dark:border-slate-600 md:border-r border-r-slate-300  ">
            <div
              className="flex flex-col justify-center items-center text-center   cursor-pointer gap-2 duration-500  transition-transform hover:scale-105 "
            >
              <CalendarIcon className="w-[3rem] stroke-violet-600 dark:stroke-blue-500 " />
              <p className="font-semibold text-gray-700 dark:text-slate-200">
                10 টি প্রজেক্ট
              </p>
              <p className="text-gray-600 dark:text-slate-300/60">
                পুরো কোর্সটিতে আমরা প্রজেক্ট ভিত্তিক লার্নিং প্রসেস ফলো করেছি।
                কোর্সে আমরা মিলেমিশে 10 টি প্রজেক্ট করবো। কিছু প্রজেক্ট সরাসরি
                মডিউলে করে দেখানো হবে এবং কিছু নিজেরা করবেন।
              </p>
            </div>
          </div>{" "}
          <div className="p-8 h-[18rem] md:py-10 border-b border-b-slate-300  mx-auto dark:border-slate-600 lg:border-r border-r-slate-300 ">
            <div className="flex flex-col justify-center items-center text-center   cursor-pointer gap-2 duration-500  transition-transform hover:scale-105 ">
              <UsersIcon className="w-[3rem] stroke-violet-600 dark:stroke-blue-500 " />
              <p className="font-semibold text-gray-700 dark:text-slate-200">
                ৫ টি রেকোর্ডেড সেশন
              </p>
              <p className="text-gray-600 dark:text-slate-300/60">
                এসাইনমেন্টের উপর গুরুত্ত্বপূর্ণ টপিক নিয়ে আলোচনা সহ রেকোর্ডেড
                সেশন থাকবে যেগুলো দেখে আপনারা নিজে নিজে এসাইনমেন্ট করতে সহযোগিতা
                পাবেন।
              </p>
            </div>
          </div>{" "}
          <div className="p-8 h-[18rem] md:py-10 border-b border-b-slate-300  mx-auto dark:border-slate-600 md:border-r lg:border-r-0   ">
            <div className="flex flex-col justify-center items-center text-center   cursor-pointer gap-2 duration-500  transition-transform hover:scale-105 ">
              <CodeBracketIcon className="w-[3rem] stroke-violet-600 dark:stroke-blue-500 " />
              <p className="font-semibold text-gray-700 dark:text-slate-200">
                10 টি এসাইনমেন্ট
              </p>
              <p className="text-gray-600 dark:text-slate-300/60">
                প্রতিটি মডিউল শেষেই থাকবে এসাইনমেন্ট যেগুলো আপনারা নিজে করবেন।
                এসাইনমেন্ট এর সল্যুশন গিটহাবে রিপোজিটরিতে শেয়ার করে দেয়া হবে যেন
                নিজেরা প্র্যাকটিস করতে পারেন।
              </p>
            </div>
          </div>{" "}
          <div className="p-8 h-[18rem] md:py-10 border-b border-b-slate-300 lg:border-b-0  mx-auto dark:border-slate-600 lg:border-r lg:border-r-slate-300  ">
            <div className="flex flex-col justify-center items-center text-center   cursor-pointer gap-2 duration-500  transition-transform hover:scale-105 ">
              <VideoCameraIcon className="w-[3rem] stroke-violet-600 dark:stroke-blue-500 " />
              <p className="font-semibold text-gray-700 dark:text-slate-200">
                12 টি মডিউলে 135+ ভিডিও
              </p>
              <p className="text-gray-600 dark:text-slate-300/60">
                আপনারা যেন ধাপে ধাপে শিখতে পারেন সেজন্য পুরো কোর্সটি 12টি মডিউলে
                ও 135+ ভিডিওতে ভাগ করে সাজানো হয়েছে।
              </p>
            </div>
          </div>{" "}
          <div className="p-8 h-[18rem] md:py-10 border-b border-b-slate-300 md:border-b-0  mx-auto dark:border-slate-600 md:border-r border-r-slate-300  ">
            <div className="flex flex-col justify-center items-center text-center   cursor-pointer gap-2 duration-500  transition-transform hover:scale-105 ">
              <TvIcon className="w-[3rem] stroke-violet-600 dark:stroke-blue-500 " />
              <p className="font-semibold text-gray-700 dark:text-slate-200">
                30 ঘণ্টার 15GB রেকোর্ডেড কন্টেন্ট
              </p>
              <p className="text-gray-600 dark:text-slate-300/60">
                সময় এবং ব্যান্ডউইডথ খরচ এর বিষয়টি বিবেচনা করে ভিডিও সাইজ এবং
                ডিউরেশন অপটিমাইজ করা হয়েছে।
              </p>
            </div>
          </div>{" "}
          <div className="p-8 h-[18rem] md:py-10 md:border-none  mx-auto dark:border-slate-600    ">
            <div className="flex flex-col justify-center items-center text-center   cursor-pointer gap-2 duration-500  transition-transform hover:scale-105 ">
              <ClipboardDocumentIcon className="w-[3rem] stroke-violet-600 dark:stroke-blue-500 " />
              <p className="font-semibold text-gray-700 dark:text-slate-200">
                120+ টি কুইজ
              </p>
              <p className="text-gray-600 dark:text-slate-300/60">
                আপনারা যেন শেখার সাথে সাথে নিজেদের প্রোগ্রেস যাচাই করতে পারেন
                সেজন্য প্রতিটি ভিডিও শেষে ব্যাখ্যা ও উত্তর সহ কুইজ থাকবে।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
