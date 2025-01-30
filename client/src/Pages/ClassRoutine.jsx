import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import illustration from "/images/routine.svg";
import useIntersection from "../hooks/useIntersection";
import PageTitle from "../components/Heading/PageTitle";
import PageHead from "../components/Heading/PageHead";
import PageSubtitle from "../components/Heading/PageSubtitle";
import RoutineForm from "../components/RoutineForm";
import Routine from "../components/Routine";
import ResultForm from "../components/ResultForm";
import { useAuth } from "../context/AuthContext";
function ClassRoutine() {
  const [ref, visible] = useIntersection({ threshold: 0.1 });
  const { routine, setRoutine } = useAuth();
  return (
    <section
      className="w-full relative min-h-screen py-28 print:py-0 border-b border-slate-300 dark:border-gray-700"
      ref={ref}
    >
      <div className="w-[98%]">
        {!routine ? (
          <div className="container  mx-auto">
            <div className="mt-5 flex  flex-col lg:flex-row gap-2">
              {" "}
              <div className="flex-1">
                <PageTitle>
                  <PageHead>
                    <span className="primary-highlighter">ক্লাস রুটিন</span>{" "}
                    দেখুন
                  </PageHead>
                  <PageSubtitle>আপনার ক্লাসর রুটিন ও সময় দেখুন</PageSubtitle>
                </PageTitle>
                <RoutineForm routine={setRoutine} />
              </div>
              <div className=" hidden lg:flex flex-1 items-end lg:justify-end mt-5">
                {visible && (
                  <img
                    loading="lazy"
                    style={{ animationDuration: "1s" }}
                    src={illustration}
                    alt=""
                    className="animate-peep w-[90%]"
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <Routine routine={routine} />
        )}
      </div>
    </section>
  );
}

export default ClassRoutine;
