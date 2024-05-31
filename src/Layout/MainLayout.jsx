import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Headers/Footer";
import Navbar from "../Components/Headers/Navbar";

const MainLayout = () => {
  return (
    <main className="dark:bg-black overflow-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
