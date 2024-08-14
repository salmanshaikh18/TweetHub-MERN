import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Routing from "./Routing";
import Layout from "./Layout";
import { ThemeProvider } from "./components/ui/theme-provider";

const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="bg-slate-900 h-screen sm:min-h-screen w-full text-zinc-200">
          <Routing />
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
