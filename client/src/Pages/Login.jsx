import React from "react";
import LoginForm from "../components/LoginForm";
import illustration from "../assets/images/login.webp";
import useIntersection from "../hooks/useIntersection";
import PageTitle from "../components/Heading/PageTitle";
import PageHead from "../components/Heading/PageHead";
import PageSubtitle from "../components/Heading/PageSubtitle";
function Login() {
  const [ref, visible] = useIntersection({ threshold: 0.1 });
  return (
    <section
      className="w-full relative min-h-screen py-28 border-b border-slate-300 dark:border-gray-700"
      ref={ref}
    >
      <div className="container w-[90%] mx-auto flex  flex-col lg:flex-row gap-2 ">
        <div className="flex-1">
          <PageTitle>
            <PageHead>
              <span className="primary-highlighter">লগইন</span> করুন
            </PageHead>
            <PageSubtitle>
              আপনার লগইন তথ্য কারো সাথে শেয়ার করবেন না
            </PageSubtitle>
          </PageTitle>
          <LoginForm />
        </div>
        <div className=" flex flex-1 items-end lg:justify-end mt-5">
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
    </section>
  );
}

export default Login;
