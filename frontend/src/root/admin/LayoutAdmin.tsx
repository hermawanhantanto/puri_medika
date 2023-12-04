import SideBarAdmin from "@/components/shared/SideBarAdmin";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <section className="flex min-h-screen w-full">
      <SideBarAdmin />
      <main className="flex flex-col p-20 flex-1">
        <Outlet />
      </main>
    </section>
  );
};

export default LayoutAdmin;
