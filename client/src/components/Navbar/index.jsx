import { useEffect, useState } from "react";
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
      <div className="bg-slate-50/60 flex-col justify-start items-start fixed font-bangla dark:bg-[#0B1120]/80 border-b border-stale-900/10 dark:border-stone-300/20 transition-colors duration-100 backdrop-blur-2xl dark:text-slate-100 text-sm font-semibold max-h-screen overflow-y-scroll z-50">
        <div className="w-screen  flex flex-row px-6 flex-shrink-0 items-center justify-between h-16 ">
          <div className="brand">
            <div className=" flex flex-col text-violet-700 dark:text-violet-500">
              <span>ইমাম আজম</span>{" "}
              <span className="text-blue-500 dark:text-blue-500">
                আবু হানিফা (র:) স্কুল
              </span>
            </div>
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
