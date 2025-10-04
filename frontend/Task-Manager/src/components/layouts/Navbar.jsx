import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex gap-5 bg-base-100 text-neutral border-b border-neutral/20 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 shadow-sm">
      <button
        className="block lg:hidden text-neutral"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <h2 className="text-lg font-medium text-neutral">Task Manager</h2>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-7 bg-base-100 w-full h-full">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
