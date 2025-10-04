import React, { useContext, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { HiOutlineBell, HiOutlineCog6Tooth } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import DarkModeToggle from "../DarkModeToggle";
import { UserContext } from "../../context/userContext";

const Navbar = ({ activeMenu, isDarkMode, onThemeChange }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  return (
    <div className="flex justify-between items-center gap-5 bg-white/80 dark:bg-dark-bg/80 text-neutral-900 dark:text-dark-text border-b border-neutral-200/50 dark:border-dark-border backdrop-blur-md py-4 px-7 sticky top-0 z-30 shadow-soft">
      <div className="flex items-center gap-5">
        <button
          className="block lg:hidden text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-dark-surfaceHover"
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

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TM</span>
          </div>
          <h2 className="text-xl font-semibold gradient-text">Task Manager</h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-dark-surfaceHover group">
          <HiOutlineBell className="text-xl" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full animate-pulse"></span>
        </button>

        {/* Settings */}
        <button 
          onClick={() => navigate("/admin/settings")}
          className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-dark-surfaceHover"
        >
          <HiOutlineCog6Tooth className="text-xl" />
        </button>

        {/* Dark Mode Toggle */}
        <DarkModeToggle 
          isDarkMode={isDarkMode} 
          onToggle={onThemeChange}
          size="default"
        />

        {/* User Profile */}
        <div className="relative group">
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary-200 dark:ring-primary-700 hover:ring-primary-400 dark:hover:ring-primary-500 transition-all duration-200 cursor-pointer">
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="Profile Image"
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-accent-500 text-white font-bold text-sm transition-transform duration-200 group-hover:scale-110 ${user?.profileImageUrl ? 'hidden' : 'flex'}`}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
          
          {/* Online indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-500 rounded-full border-2 border-white dark:border-dark-bg"></div>
        </div>
      </div>

      {/* Mobile Side Menu Overlay */}
      {openSideMenu && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpenSideMenu(false)}
          />
          <div className="fixed top-[73px] left-0 right-0 bg-white dark:bg-dark-surface shadow-soft-lg animate-slide-in">
            <SideMenu activeMenu={activeMenu} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
