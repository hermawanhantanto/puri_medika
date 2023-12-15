import { navbar } from "@/constant";
import logo from "/assets/images/puri_medika.png";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
const Navbar = () => {
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
    <nav className="flex justify-between items-center">
      <img src={logo} alt="logo" width={180} height={80} />
      <ul className="flex items-center gap-6">
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
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button onClick={handleLogin}>Login</Button>
      )}
    </nav>
  );
};

export default Navbar;
