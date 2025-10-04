import React, { useContext, useEffect, useState } from "react";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handelLogout();
      return;
    }

    navigate(route);
  };

  const handelLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    if(user){
      setSideMenuData(user?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA)
    }
    return () => {};
  }, [user]);

  return (
    <div className="w-full md:w-64 h-full md:h-[calc(100vh-73px)] bg-white dark:bg-dark-surface text-neutral-900 dark:text-dark-text border-r border-neutral-200/50 dark:border-dark-border sticky top-[73px] z-20 overflow-y-auto">
      {/* User Profile Section */}
      <div className="flex flex-col items-center justify-center mb-8 pt-8 px-6">
        <div className="relative group">
          <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-primary-200 dark:ring-primary-700 group-hover:ring-primary-400 dark:group-hover:ring-primary-500 transition-all duration-300">
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="Profile Image"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-accent-500 text-white font-bold text-2xl transition-transform duration-300 group-hover:scale-110 ${user?.profileImageUrl ? 'hidden' : 'flex'}`}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
          
          {/* Online indicator */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success-500 rounded-full border-4 border-white dark:border-dark-surface flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>

        {user?.role === "admin" && (
          <div className="text-xs font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-1.5 rounded-full mt-3 shadow-soft">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              Admin
            </span>
          </div>
        )}

        <h5 className="text-neutral-900 dark:text-dark-text font-semibold text-lg leading-6 mt-4 text-center">
          {user?.name || ""}
        </h5>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center mt-1">{user?.email || ""}</p>
      </div>

      {/* Navigation Menu */}
      <div className="px-4 space-y-2">
        {sideMenuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-sm font-medium py-3 px-4 rounded-xl transition-all duration-200 group ${
              activeMenu === item.label
                ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600 dark:border-primary-400 shadow-soft"
                : "text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/10 hover:translate-x-1"
            }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className={`text-xl transition-transform duration-200 ${
              activeMenu === item.label ? 'scale-110' : 'group-hover:scale-110'
            }`} />
            <span className="flex-1 text-left">{item.label}</span>
            {activeMenu === item.label && (
              <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse"></div>
            )}
          </button>
        ))}

        {/* Logout Button */}
        <div className="pt-4 border-t border-neutral-200 dark:border-dark-border">
          <button
            className="w-full flex items-center gap-4 text-sm font-medium text-error-600 dark:text-error-400 hover:text-error-700 dark:hover:text-error-300 hover:bg-error-50 dark:hover:bg-error-900/10 py-3 px-4 rounded-xl transition-all duration-200 group hover:translate-x-1"
            onClick={() => handleClick("logout")}
          >
            <HiOutlineLogout className="text-xl transition-transform duration-200 group-hover:scale-110" />
            <span className="flex-1 text-left">Logout</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="text-center text-xs text-neutral-500 dark:text-neutral-400">
          <p>Task Manager v1.0</p>
          <p className="mt-1">© 2024 All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
