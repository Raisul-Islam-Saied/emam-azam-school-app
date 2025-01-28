import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
const navSubLink = [
  {
    text: "সাকসেস স্টোরিস",
    href: "#success-stories",
    iconColor: "text-rose-500",
    icon: "directions_run",
  },
  {
    text: "প্রোজেক্ট",
    href: "#project",
    iconColor: "text-orange-500",
    icon: "local_library",
  },
  {
    text: "আমাদের কোর্স",
    href: "#our-course",
    iconColor: "text-green-500",
    icon: "tv",
  },
  {
    text: "কি কি পাবেন",
    href: "#what-you-get ",
    iconColor: "text-lime-500",
    icon: "live_help",
  },
  {
    text: "যা যা জানতে হবে",
    href: "#what-should-know",
    iconColor: "text-cyan-400",
    icon: "unknown_document",
  },
  {
    text: "কোর্স ইন্সট্রাক্টর",
    href: "#instructor",
    iconColor: "text-violet-500",
    icon: "app_registration",
  },
  {
    text: "সচরাচর জানতে চাওয়া প্রশ্নের উত্তর",
    href: "/#faq",
    iconColor: "text-fuchsia-500",
    icon: "cast_for_education",
  },
  {
    text: "কিভাবে চলবে",
    href: "#",
    iconColor: "text-Purple-500",
    icon: "school",
  },
];
function NavModal({ setOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div
      className="w-screen h-screen  block fixed"
      onClick={() => {
        setOpen = !setOpen() ;
      }}
    >
      <div className=" top-36 right-6 w-[28rem] bg-slate-100 fixed lg:top-[3.4rem] lg:left-[15rem] dark:bg-gray-900 rounded-md border dark:border-stone-50/25  py-4 animate-modal">
        <div>
          <div className=" grid grid-cols-2 gap-2">
            {navSubLink.map((link, index) => {
              const { href, iconColor, text } = link;
              return (
                <a
                  key={index}
                  onClick={() => {
                    setOpen(false);
                    if (location.pathname !== "/") {
                      navigate("/");
                    }
                  }}
                  href={href}
                  className="flex  items-center gap-4 pl-5 text-sm font-semibold text-slate-700 cursor-pointer transition hover:scale-105  h-11 dark:text-gray-300 "
                >
                  <span className={`${iconColor} animate-pulse`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                      />
                    </svg>
                  </span>
                  <span>{text}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavModal;
