import React from "react";
import useTheme from "../../hooks/useTheme";
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
function NavActionLg() {
  const [dark, changeTheme] = useTheme();
  const { currentUser } = useAuth();
  return (
    <div
      className="action hidden lg:flex   
          dark:border-stone-200/10  font-semibold items-center gap-3 pr-6"
    >
      <button
        className="flex w-5 font-thin text-slate-700"
        onClick={changeTheme}
      >
        {!dark ? (
          <MoonIcon className="w-6 h-6 " strokeWidth={1.2} />
        ) : (
          <SunIcon className="w-6 h-6 stroke-[#FDB813]" />
        )}
      </button>
      <button className="bg-gray-800  text-slate-100 p-1 px-3 rounded-full font-bold dark:bg-violet-500      focus:animate-button">
        {currentUser ? (
          <NavLink to="/dashboard">ড্যাশবোর্ড</NavLink>
        ) : (
          <NavLink to="/login">লগইন করুন</NavLink>
        )}
      </button>
      <button className="bg-fuchsia-500 p-1 dark:bg-rose-500 rounded-full font-bold text-slate-100 px-2 focus:animate-button ">
        এনরোল করুন
      </button>
    </div>
  );
}

export default NavActionLg;
