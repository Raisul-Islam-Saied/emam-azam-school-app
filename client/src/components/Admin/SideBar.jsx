import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const menu = [
  {
    name: "Dasbord",
    href: "#",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    ),
  },
  {
    name: "Students",

    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    ),
    submenus: [
      {
        name: "Add User",
        href: "/dashboard/add_user",
      },
      {
        name: "All Users",
        href: "#",
      },
      {
        name: "Add User",
        href: "#",
      },
    ],
  },
  {
    name: "Result",
    href: "#",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
      />
    ),
    submenus: [
      {
        name: "Add Result",
        href: "/dashboard/results/add_result",
      },
      {
        name: "See result",
        href: "/dashboard/results/see_result",
      },
      {
        name: "Publish Result",
        href: "/dashboard/results/publish_result",
      },
    ],
  },
];

function SideBar({ showNav, setShowNav }) {
  const [show, setShow] = useState(null);

  const toggle = (index) => {
    if (index === show) {
      setShow(100);
    } else {
      setShow(index);
    }
  };
  return (
    <div
      id="docs-Index"
      className={` -translate-x-full transition-transform duration-300 transform  fixed top-0 pl-6 left-0 bottom-0 w-[16rem]  bg-white/60 border-r border-gray-200/80  pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-slate-900 dark:border-gray-700 mt-[6rem] h-screen  m-auto z-10 backdrop-blur-lg ${
        showNav
          ? " translate-x-0 lg:right-auto bottom-0 scrollbar-y h-screen mt-[7rem]"
          : ""
      }`}
    >
      <nav className="hs-accordion-group p-6  flex flex-col ">
        <ul className="space-y-1.5 ">
          {menu.map((singleMenu, index) => {
            return (
              <li
                key={index}
                className="hs-accordion "
                id="bu-users-accordion  "
                onClick={() => {
                  if (singleMenu.submenus) {
                    setShow(index);
                  }
                }}
              >
                <NavLink
                  href={singleMenu.href}
                  className={`flex items-center  gap-x-[0.700rem] py-2 px-2.5 hs-accordion-active:hover:bg-transparent text-md text-slate-700  hover:text-violet-500  dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-violet-500 hover:font-medium  cursor-pointer ${
                    index === show &&
                    "text-violet-500 font-medium dark:text-violet-500"
                  }`}
                  onClick={() => {
                    if (singleMenu.submenus) {
                      toggle(index);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4  mb-[0.20rem]"
                  >
                    {singleMenu.icon}
                  </svg>
                  {singleMenu.name}

                  {singleMenu.submenus && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`w-4 h-4 ml-auto ${
                        index === show && "rotate-180"
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  )}
                </NavLink>

                {singleMenu.submenus && (
                  <Transition
                    show={index === show}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <div
                      id="bu-users-accordion"
                      className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 "
                    >
                      {singleMenu.submenus.map((singleSubmenu, index) => (
                        <ul
                          key={index}
                          className="hs-accordion-group pl-3 pt-1 cursor-pointer"
                        >
                          <li
                            className="hs-accordion"
                            id="bu-users-accordion-sub-1"
                            onClick={() => setShowNav(false)}
                          >
                            <NavLink
                              to={singleSubmenu.href}
                              className="hs-accordion-toggle flex items-center justify-start gap-x-3.5 py-1 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent ml-5 text-md text-slate-700 rounded-md hover:text-violet-500 dark:hover:text-violet-500 hover:font-medium   dark:text-slate-400 dark:hs-accordion-active:text-white "
                            >
                              {singleSubmenu.name}
                            </NavLink>
                          </li>
                        </ul>
                      ))}
                    </div>
                  </Transition>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;
