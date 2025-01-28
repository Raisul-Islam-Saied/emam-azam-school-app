import React from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
const navLinks = [
  {
    link: "fgas",
    text: "হোম",
  },
  {
    link: "",
    text: "এপ্লিকেশন",
  },
  {
    link: "/result",
    text: "রেজাল্ট",
  },
  {
    link: "/syllabus",
    text: "সিলেবাস",
  },
  {
    link: "/routine",
    text: "রুটিন",
  },
  {
    link: "",
    text: "হোম ওয়ার্ক",
  },
  {
    link: "",
    text: "আমাদের সম্পর্কে",
  },
  {
    link: "",
    text: "রোলর্স",
  },
  {
    link: "",
    text: "মডিউলস",
  },

  {
    link: "/support",
    text: "সাপোর্ট",
  },
  {
    link: "",
    text: "সাকসেস স্টোরিস",
  },
];
function SmallScreenSidebar({ open, close }) {
  const { currentUser } = useAuth();
  return (
    <>
      {open && (
        <div className=" flex flex-col p-4 w-screen text-sm">
          <div className="links flex flex-col gap-3 text-slate-600 mb-2 font-semibold dark:text-slate-400 animate-modal">
            {navLinks.map((link, index) => (
              <NavLink
                to={link.link}
                onClick={() => close(false)}
                key={index}
                className="rounded-md p-2 hover:bg-slate-800 hover:text-slate-100 transition ease-in-out cursor-pointer"
              >
                {link.text}
              </NavLink>
            ))}
          </div>
          <div
            className="action flex flex-col gap-3 mt-4 border-t border-stone-300
          dark:border-stone-200/10  font-semibold "
          >
            {" "}
            <NavLink
              onClick={() => close(false)}
              className="bg-gray-800 mt-6 text-slate-100 p-1  text-center rounded-full font-bold dark:bg-violet-500"
              to={currentUser ? "/dashboard" : "/login"}
            >
              {currentUser ? "dashboard" : "লগইন"}
            </NavLink>
            <NavLink
              onClick={() => close(false)}
              className="bg-fuchsia-500 p-1 dark:bg-rose-500 rounded-full font-bold text-slate-100 text-center "
            >
              এনরোল করুন
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}

export default SmallScreenSidebar;
