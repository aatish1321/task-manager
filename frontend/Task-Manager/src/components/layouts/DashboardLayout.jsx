import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const handleThemeChange = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="bg-neutral-50 dark:bg-dark-bg min-h-screen transition-colors duration-300">
      <Navbar
        activeMenu={activeMenu}
        isDarkMode={isDarkMode}
        onThemeChange={handleThemeChange}
      />

      {user && (
        <div className="flex">
          <div className="hidden lg:block">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className="flex-grow p-6 text-neutral-900 dark:text-dark-text animate-fade-in">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
