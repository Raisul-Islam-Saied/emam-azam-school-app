import React from "react";
import useTheme from "../../hooks/useTheme";
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
function NavActionSm({ open, doOpen }) {
  const [dark, changeTheme] = useTheme();
  return (
    <div className="flex  gap-4 pr-3 ease-in duration-75 lg:hidden">
      <button className="flex w-5 text-slate-600" onClick={changeTheme}>
        {" "}
        {!dark ? (
          <MoonIcon className="w-6 h-6 " strokeWidth={1.2} />
        ) : (
          <SunIcon className="w-6 h-6 stroke-[#FDB813]" />
        )}
      </button>

      <button className=" " onClick={doOpen}>
        {!open ? (
          <Bars3Icon className="w-6 h-6" strokeWidth={1.1} />
        ) : (
          <XMarkIcon className="w-6 h-6 stroke-slate-600 dark:stroke-slate-300" strokeWidth={1.3} />
        )}
      </button>
    </div>
  );
}

export default NavActionSm;
