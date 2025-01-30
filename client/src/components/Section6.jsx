import React, { useState } from "react";
import PageTitle from "./Heading/PageTitle";
import { HomeIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

import PageHead from "./Heading/PageHead";
import PageSubtitle from "./Heading/PageSubtitle";
import PageHeadingImage from "./Heading/HeadingImage";

import useIntersection from "../hooks/useIntersection";

//images
import peep from "../assets/images/peep6.svg";

const teachersData = [
  {
    image: "/images/teachers/al-amin.webp",
    title: "Junior Frontend Engineer",
    name: "Al Amin",
    home: "HypeScout",
    education: "Cumilla Victoria Govt. College (NU)",
  },
  {
    image: "/images/teachers/ariful-islam.webp",
    title: "Frontend Developer",
    name: "Ariful Islam",
    home: "iBOS Limited",
    education: "National Institute of Technology",
  },
  {
    image: "/images/teachers/debasree.webp",
    title: "Junior Frontend Software Developer",
    name: "Debasree Bhowmik",
    home: "iBOS Limited",
    education: "Mawlana Bhashani Science and Technology University",
  },
  {
    image: "/images/teachers/ferdous-hassan.webp",
    title: "Frontend Developer Intern",
    name: "Khurshida Jahan Meem",
    home: "iBOS Limited",
    education: "Institute of Science Trade and Technology",
  },
  {
    image: "/images/teachers/majedul.webp",
    title: "Jr. MERN stack developer",
    name: "Majedul Hasan",
    home: "NDA",
    education: "Jagannath University, Dhaka",
  },
  {
    image: "/images/teachers/mamun-ahmed.webp",
    title: "Junior Node JS Developer",
    name: "Mamun Ahmed",
    home: "M360 ICT",
    education: "Rupasdi Sujon-Dulo College",
  },
  {
    image: "/images/teachers/meem.webp",
    title: "Frontend Developer",
    name: "Masud Pervez",
    home: "Semicolon It Solutions",
    education: "Jeshore polytechnic Institute",
  },
  {
    image: "/images/teachers/al-amin.webp",
    title: "Junior Frontend Engineer",
    name: "Al Amin",
    home: "HypeScout",
    education: "Cumilla Victoria Govt. College (NU)",
  },
  {
    image: "/images/teachers/ariful-islam.webp",
    title: "Frontend Developer",
    name: "Ariful Islam",
    home: "iBOS Limited",
    education: "National Institute of Technology",
  },
  {
    image: "/images/teachers/debasree.webp",
    title: "Junior Frontend Software Developer",
    name: "Debasree Bhowmik",
    home: "iBOS Limited",
    education: "Mawlana Bhashani Science and Technology University",
  },
  {
    image: "/images/teachers/ferdous-hassan.webp",
    title: "Frontend Developer Intern",
    name: "Khurshida Jahan Meem",
    home: "iBOS Limited",
    education: "Institute of Science Trade and Technology",
  },
  {
    image: "/images/teachers/majedul.webp",
    title: "Jr. MERN stack developer",
    name: "Majedul Hasan",
    home: "NDA",
    education: "Jagannath University, Dhaka",
  },
  {
    image: "/images/teachers/mamun-ahmed.webp",
    title: "Junior Node JS Developer",
    name: "Mamun Ahmed",
    home: "M360 ICT",
    education: "Rupasdi Sujon-Dulo College",
  },
  {
    image: "/images/teachers/meem.webp",
    title: "Frontend Developer",
    name: "Masud Pervez",
    home: "Semicolon It Solutions",
    education: "Jeshore polytechnic Institute",
  },
];

function Section6() {
  const [open, setOpen] = useState(false);
  const [ref, visible] = useIntersection({ threshold: 0.1 });
  return (
    <section
      id="success-stories"
      ref={ref}
      className="w-full relative    py-24 bg-slate-100 border-t border-gray-300 dark:bg-slate-800/30 dark:border-gray-400/50"
    >
      <div className="container w-[90%] mx-auto relative">
        <div
          className={`flex  flex-col gap-20  overflow-hidden ${
            open ? "h-auto" : "h-[60rem] md:h-[46rem]"
          }`}
        >
          <PageTitle>
            <PageHeadingImage src={peep} visible={true} className="w-[80px]" />
            <PageHead>
              কোর্স
              <span className="primary-highlighter "> সাকসেস </span>স্টোরি
            </PageHead>
            <PageSubtitle>
              যাদের চাকরি প্রাপ্তিতে আমাদের কোর্স সাহায্য করেছে
            </PageSubtitle>
          </PageTitle>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3  flex-[6] lg:gap-3 ">
            {teachersData &&
              teachersData.map((teacher, i) => {
                const { image, title, name, home, education } = teacher;
                return (
                  <div
                    className="section3-grid bg-white dark:bg-gray-900 flex flex-row gap-6 py-7 pl-2"
                    key={i}
                  >
                    {" "}
                    <img
                      loading="lazy"
                      className="rounded-full flex-[0.1]  "
                      src={image}
                      alt=""
                    />
                    <div className="flex flex-col text-[12px] flex-[0.8] text-slate-700 dark:text-slate-300/80 ">
                      <span>{title}</span>
                      <span className="text-sm font-semibold mb-1 dark:text-slate-200">
                        {name}
                      </span>
                      <div className="flex gap-1">
                        <HomeIcon className="w-4 h-4" />
                        <span>{home}</span>
                      </div>
                      <div className="flex gap-1">
                        <AcademicCapIcon className="w-4 h-4" />
                        <span>{education}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {open ? null : (
          <div className="absolute left-[50%] py-6 w-full -translate-x-[50%] bottom-0 bg-gradient-to-t  from-white   text-center dark:from-slate-900   ">
            <button
              onClick={() => setOpen(true)}
              className="bg-slate-800 dark:bg-blue-500 hover:bg-gray-900 transition duration-200 dark:hover:bg-blue-600 text-slate-100 px-7 py-[7px] rounded-full font-bold text-sm"
            >
              আরো দেখুন
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Section6;
