import React from "react";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row w-full sm:h-screen">
      <LeftSidebar />
      <Outlet />
      <RightSidebar />
    </div>
  );
};

export default Layout;
