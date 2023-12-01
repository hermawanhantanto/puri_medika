import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex">
      <img
        src="/assets/images/login-puri_medika.png"
        alt="logo"
        className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
      />
      <section className="flex flex-1 items-center justify-center py-10">
        <Outlet />
      </section>
    </div>
  );
};

export default AuthLayout;
