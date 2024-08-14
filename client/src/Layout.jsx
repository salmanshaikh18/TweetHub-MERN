import React from "react";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex w-full h-screen">
      <LeftSidebar />
      <Outlet />
      <RightSidebar />
    </div>
  );
};

export default Layout;
