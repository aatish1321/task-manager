import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-base-100 min-h-screen">
      <Navbar activeMenu={activeMenu} />

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
