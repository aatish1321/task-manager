import React, { useContext, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import { LuMoon, LuSun } from "react-icons/lu";
import { UserContext } from "../../context/userContext";

const Navbar = ({ activeMenu, isDarkMode, onThemeChange }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const { user } = useContext(UserContext);

  return (
    <div className="flex justify-between items-center gap-5 bg-base-100 text-neutral border-b border-neutral/20 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-5">
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
      </div>

      <div className="flex items-center gap-4">
        <button onClick={onThemeChange}>
          {isDarkMode ? (
            <LuSun className="text-xl" />
          ) : (
            <LuMoon className="text-xl" />
          )}
        </button>

        <div className="w-9 h-9 rounded-full">
          <img
            src={user?.profileImageUrl}
            alt="Profile Image"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-7 bg-base-100 w-full h-full">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
