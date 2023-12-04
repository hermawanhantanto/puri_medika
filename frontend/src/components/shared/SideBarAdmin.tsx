import { sideBarLinks } from "@/constant";
import { useAuth } from "@/hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

const SideBarAdmin = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <section className="flex flex-col p-12 bg-blue-600 min-h-screen overflow-y-auto min-w-[340px]">
      <img
        src="/assets/images/puri_medika.png"
        alt="logo"
        width={180}
        height={150}
        className="object-contain"
      />
      <ul className="flex flex-col w-full mt-12 gap-8 text-white text-xl">
        {sideBarLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center gap-8 px-6 py-4 hover:bg-blue-500 rounded ${
                  isActive && "bg-blue-500"
                }`}
              >
                {link.icon} <p>{link.name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
      {user && (
        <Button
          className="px-6 py-4 text-white bg-blue-800 hover:bg-blue-800 rounded mt-8"
          onClick={handleLogout}
        >
          Logout
        </Button>
      )}
    </section>
  );
};

export default SideBarAdmin;
