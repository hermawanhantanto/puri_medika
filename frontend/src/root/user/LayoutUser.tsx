import Footer from "@/components/shared/Footer";
import MobileUserNav from "@/components/shared/MobileUserNav";
import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";

const LayoutUser = () => {
  return (
    <main className="w-full flex-col flex">
      <div className="flex flex-col sm:px-12 sm:py-8 py-12 px-5">
        <MobileUserNav />
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default LayoutUser;
