import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function NavLargeScreen({ setModalOpen }) {
  const location = useLocation();
  return (
    <div className=" hidden lg:flex gap-6 text-slate-700 font-medium  dark:text-slate-400 ">
      <NavLink
        to="/"
        className={`largeNavLink  ${location.pathname === "/" && "linkActive"}`}
      >
        হোম
      </NavLink>
      <span onClick={setModalOpen} className={`largeNavLink `}>
        বিস্তারিত দেখুন
        <span className=" ml-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </span>
      <NavLink
        to="/routine"
        className={`largeNavLink ${
          location.pathname === "/routine" && "linkActive"
        } `}
      >
        ক্লাস রুটিন
      </NavLink>
      <NavLink
        to="/result"
        className={`largeNavLink ${
          location.pathname === "/result" && "linkActive"
        }`}
      >
        রেজাল্ট
      </NavLink>{" "}
      <NavLink
        to="/support"
        className={`largeNavLink ${
          location.pathname === "/support" && "linkActive"
        }`}
      >
        সাপোর্ট
      </NavLink>{" "}
      {/* <NavLink
            to='/'
            
           
            className={`largeNavLink `}
          >
            {link.text}
            {index === 1 && (

            )}
          </NavLink> */}
    </div>
  );
}

export default NavLargeScreen;
