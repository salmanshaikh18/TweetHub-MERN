import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Routing from "./Routing";
import Layout from "./Layout";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        <div className="bg-slate-900 h-screen sm:min-h-screen w-full text-zinc-200">
          <Routing />
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
