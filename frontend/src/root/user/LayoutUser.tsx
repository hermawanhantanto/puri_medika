import React from "react";
import { Outlet } from "react-router-dom";

const LayoutUser = () => {
  return (
    <div>
      Navbar
      <Outlet />
      Footer
    </div>
  );
};

export default LayoutUser;
