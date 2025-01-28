import React from "react";
import PageTitle from "./Heading/PageTitle";
import PageHead from "./Heading/PageHead";
import PageSubtitle from "./Heading/PageSubtitle";
import PageHeadingImage from "./Heading/HeadingImage";

import useIntersection from "../hooks/useIntersection";
import { Link } from "react-router-dom";
import { LinkIcon } from "@heroicons/react/24/outline";

//images
import peep from "../assets/images/peep9.svg";
import html from "../assets/images/html.svg";
import css from "../assets/images/css.svg";
import javascript from "../assets/images/javascript.svg";
import vscode from "../assets/images/vscode.svg";
import github from "../assets/images/github.svg";
import react from "../assets/images/react.svg";

function Section4() {
  const [ref, visible] = useIntersection({ threshold: 0.1 });

  return (
    <section
      id="what-should-know"
      ref={ref}
      className="w-full relative    py-24 bg-slate-100 border-t border-gray-300 dark:bg-slate-800/30 dark:border-gray-400/50"
    >
      <div className="container w-[90%] mx-auto ">
        <div className="flex  flex-col gap-20 lg:flex-row lg:h-screen">
          <PageTitle className=" !justify-start !items-start !gap-5 lg:flex-[3]">
            <PageHeadingImage src={peep} visible={true} />
            <PageHead className="!text-left">
              কোর্স করতে{" "}
              <span className="primary-highlighter ">যা জানতে হবে</span>
            </PageHead>
            <PageSubtitle className="text-[17px] !font-light dark:text-slate-300 !text-left">
              এই কোর্সটি একেবারে বিগিনারদের জন্য নয়। কোর্সটি করতে হলে উল্লিখিত
              বিষয়গুলো সম্পর্কে আপনার ধারণা থাকতে হবে। এই কোর্সে ধরে নেয়া হবে
              আপনি বিষয়গুলো জানেন। যদি না জানেন, তাহলে রেকোমেন্ডেড লিঙ্ক থেকে
              শিখে নিতে পারেন।
            </PageSubtitle>
          </PageTitle>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:h-[3rem] flex-[6] lg:gap-3">
            <div className="section3-grid bg-white dark:bg-gray-900 ">
              <div className=" bg-orange-600 p-3 rounded-full">
                <img loading="lazy" width="24rem" src={html} />
              </div>
              <h2 className="font-semibold text-gray-700 dark:text-slate-200">
                বেসিক HTML
              </h2>
              <p className="text-sm text-gray-600 -mt-1 dark:text-slate-300/70 text-center">
                HTML সম্পর্কে প্রাথমিক ধারণা থাকতে হবে।{" "}
              </p>

              <Link className="btnLink ">
                <LinkIcon className="w-4" />
                <span> এখান থেকে শিখুন </span>
              </Link>
            </div>
            <div className="section3-grid bg-white dark:bg-gray-900 ">
              <div className=" bg-blue-500 p-3 rounded-full">
                <img loading="lazy" width="24rem" src={css} />
              </div>
              <h2 className="font-semibold text-gray-700 dark:text-slate-200">
                বেসিক CSS
              </h2>
              <p className="text-sm text-gray-600 -mt-1 dark:text-slate-300/70 text-center">
                CSS সম্পর্কে প্রাথমিক ধারণা থাকতে হবে।{" "}
              </p>

              <Link className="btnLink ">
                <LinkIcon className="w-4" />
                <span> এখান থেকে শিখুন </span>
              </Link>
            </div>
            <div className="section3-grid bg-white dark:bg-gray-900 ">
              <div className=" bg-yellow-500 p-3 rounded-full">
                <img loading="lazy" width="24rem" src={javascript} />
              </div>
              <h2 className="font-semibold text-gray-700 dark:text-slate-200">
                বেসিক JAVASCRIPT
              </h2>
              <p className="text-sm text-gray-600 -mt-1 dark:text-slate-300/70 text-center">
                JAVASCRIPT সম্পর্কে প্রাথমিক ধারণা থাকতে হবে।{" "}
              </p>

              <Link className="btnLink ">
                <LinkIcon className="w-4" />
                <span> এখান থেকে শিখুন </span>
              </Link>
            </div>
            <div className="section3-grid bg-white dark:bg-gray-900 ">
              <div className=" bg-sky-500 p-3 rounded-full">
                <img loading="lazy" width="24rem" src={react} />
              </div>
              <h2 className="font-semibold text-gray-700 dark:text-slate-200">
                বেসিক React.js
              </h2>
              <p className="text-sm text-gray-600 -mt-1 dark:text-slate-300/70 text-center">
                React.js সম্পর্কে প্রাথমিক ধারণা থাকতে হবে।{" "}
              </p>

              <Link className="btnLink ">
                <LinkIcon className="w-4" />
                <span> এখান থেকে শিখুন </span>
              </Link>
            </div>
            <div className="section3-grid bg-white dark:bg-gray-900 ">
              <div className=" bg-black  p-3 rounded-full">
                <img loading="lazy" width="24rem" src={github} />
              </div>
              <h2 className="font-semibold text-gray-700 dark:text-slate-200">
                বেসিক Git/GitHub
              </h2>
              <p className="text-sm text-gray-600 -mt-1 dark:text-slate-300/70 text-center">
                Git/GitHub সম্পর্কে প্রাথমিক ধারণা থাকতে হবে।{" "}
              </p>

              <Link className="btnLink ">
                <LinkIcon className="w-4" />
                <span> এখান থেকে শিখুন </span>
              </Link>
            </div>

            <div className="section3-grid bg-white dark:bg-gray-900 ">
              <div className=" bg-blue-500 p-3 rounded-full">
                <img loading="lazy" width="24rem" src={vscode} />
              </div>
              <h2 className="font-semibold text-gray-700 dark:text-slate-200">
                VS Code এডিটর
              </h2>
              <p className="text-sm text-gray-600 -mt-1 dark:text-slate-300/70 text-center">
                VS Code এডিটরে কাজ করার অভ্যাস থাকতে হবে।{" "}
              </p>

              <Link className="btnLink ">
                <LinkIcon className="w-4" />
                <span> এখান থেকে শিখুন </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section4;
