import MobileNav from "@/components/shared/MobileNav";
import SideBarAdmin from "@/components/shared/SideBarAdmin";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <section className="flex min-h-screen w-full">
      <SideBarAdmin />
      <div className="absolute top-10 left-2">
        <MobileNav />
      </div>

      <main className="flex flex-col lg:p-20 max-lg:mt-20 p-5 flex-1">
        <Outlet />
      </main>
    </section>
  );
};

export default LayoutAdmin;
