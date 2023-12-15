import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { sideBarLinks } from "@/constant";
import { useAuth } from "@/hooks/useAuth";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
const MobileNav = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="lg:hidden">
          <GiHamburgerMenu />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex flex-col bg-blue-600 min-h-screen overflow-y-auto w-[100px] text-white "
        side="left"
      >
        <ul className="flex flex-col w-full mt-24 gap-8 text-white text-xl items-center">
          {sideBarLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex gap-4 px-4 py-2 w-fit hover:bg-blue-500 rounded ${
                    isActive && "bg-blue-500"
                  }`}
                >
                  {link.icon}
                </Link>
              </li>
            );
          })}
        </ul>
        {user && (
          <Button
            className="px-4 py-2 mt-36 w-fit bg-blue-700 hover:bg-blue-700"
            onClick={handleLogout}
          >
            <CiLogout className="text-white  text-xl" />
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
