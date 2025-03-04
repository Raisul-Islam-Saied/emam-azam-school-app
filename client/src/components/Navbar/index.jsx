import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import NavModal from "./NavModal";
import NavLargeScreen from "./NavLargeScreen";
import SmallScreenSidebar from "./SmallScreenSidebar";
import NavActionLg from "./NavActionLg";
import NavActionSm from "./NavActionSm";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <nav className="relative z-50 select-none print:hidden">
      <div className="bg-slate-50/60 flex-col justify-start items-start fixed font-bangla dark:bg-[#0B1120]/80 border-b border-stale-900/10 dark:border-stone-300/20 transition-colors duration-100 [...]
        <div className="w-screen flex flex-row px-6 flex-shrink-0 items-center justify-between h-16 ">
          <div className="brand">
            <Link to="/" className="flex flex-col text-violet-700 dark:text-violet-500">
              <span>রায়সুল</span>{" "}
              <span className="text-blue-500 dark:text-blue-500">
                ইসলাম সাঈদ স্কুল
              </span>
            </Link>
          </div>
          <NavActionSm open={open} doOpen={() => setOpen(!open)} />
          <NavLargeScreen setModalOpen={() => setModalOpen(!modalOpen)} />
          <NavActionLg />
        </div>

        <SmallScreenSidebar open={open} close={(v) => setOpen(false)} />
      </div>
      {modalOpen && <NavModal setOpen={setModalOpen} />}
    </nav>
  );
}

export default Navbar;
