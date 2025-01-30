import React, { useEffect, useState } from "react";

import illustration from "/images/routine.svg";
import useIntersection from "../hooks/useIntersection";
import PageTitle from "../components/Heading/PageTitle";
import PageHead from "../components/Heading/PageHead";
import PageSubtitle from "../components/Heading/PageSubtitle";

import ResultForm from "../components/ResultForm";

import ClassBaseResults from "../components/result/ClassBaseResults";
import ResultPageLayout from "../components/result/ResultPageLayout";
import IndivisualResult from "../components/result/IndivisualResult";

function Result() {
  const [ref, visible] = useIntersection({ threshold: 0.1 });
  const [results, setResults] = useState(false);
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <section
      className="print:py-4 print:bg-white scroll-mb-0  w-full relative min-h-screen py-28 border-b border-slate-300 dark:border-gray-700 dark:bg-slate-900 selection:bg-violet-500 selection:text-slate-100  bg-slate-100"
      ref={ref}
    >
      <div className=" lg:container overflow-x-scroll scrollbar   lg:w-[100%] w-[95%]    mx-auto  ">
        {!results ? (
          <div className="mt-5 flex container mx-auto h-[50rem]   flex-col lg:flex-row gap-2">
            {" "}
            <div className="flex-1">
              <PageTitle>
                <PageHead>
                  <span className="primary-highlighter"> রেজাল্ট</span> দেখুন
                </PageHead>
                <PageSubtitle>আপনার পরীক্ষার রেজাল্ট দেখুন</PageSubtitle>
              </PageTitle>
              <ResultForm
                result={(v) => {
                  if (v.length > 0) {
                    setResults(v);
                  }
                }}
              />
            </div>
            <div
              className=" hidden lg:flex 
            flex-1 items-start lg:mt-30 lg:justify-end mt-5"
            >
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
        ) : (
          <ResultPageLayout results={results && results[0] && results}>
            {results && results.length === 1 ? (
              <IndivisualResult
                results={results && results[0] && results}
                setResults={setResults}
              />
            ) : (
              results &&
              results[1] &&
              results.length > 1 && (
                <ClassBaseResults
                  results={
                    results && results[0] && results.length > 1 && results
                  }
                  setResults={setResults}
                />
              )
            )}
          </ResultPageLayout>
        )}
      </div>
    </section>
  );
}

export default Result;
