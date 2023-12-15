import Navbar from "@/components/shared/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const LayoutUser = () => {
  return (
    <main className="w-full flex-col flex px-12 py-8">
      <Navbar />
      <Outlet />
      Footer
    </main>
  );
};

export default LayoutUser;
