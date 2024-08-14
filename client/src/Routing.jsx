import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Layout from "./Layout";

const Routing = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/profile",
            element: <Profile />
        }
      ]
    },
    {
      path: "/auth",
      element: <Auth />,
    },
  ]);
  return (
    <div className="h-screen w-full">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Routing;
