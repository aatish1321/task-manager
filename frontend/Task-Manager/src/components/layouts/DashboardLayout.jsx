import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="bg-base-100 min-h-screen">
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

          <div className="flex-grow p-5 text-neutral">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
