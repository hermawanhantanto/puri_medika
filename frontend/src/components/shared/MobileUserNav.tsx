import { navbar } from "@/constant";
import { useAuth } from "@/hooks/useAuth";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import logo from "/assets/images/puri_medika.png";

const MobileUserNav = () => {
  const pathname = useLocation().pathname;
  const user = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="lg:hidden">
            <GiHamburgerMenu style={{ fontSize: "1.4rem" }} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="py-12 px-5 flex flex-col gap-4">
          <img src={logo} alt="logo" width={120} height={80} />
          <ul className="flex flex-col gap-12 p-4">
            {navbar.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={` hover:text-blue-500 transition-colors ${
                    pathname === item.path ? "text-blue-500" : "text-slate-500"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {user.user && (
              <li>
                <Link
                  to="/Profile"
                  className={` hover:text-blue-500 transition-colors ${
                    pathname === "/Profile" ? "text-blue-500" : "text-slate-500"
                  }`}
                >
                  Profile
                </Link>
              </li>
            )}
          </ul>
          {user.user ? (
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="mt-12"
            >
              Logout
            </Button>
          ) : (
            <Button onClick={handleLogin} className="mt-12">
              Login
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileUserNav;
