import logo from "/assets/images/puri_medika.png";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between bg-blue-600 sm:p-12 p-5">
      <img
        src={logo}
        alt="logo"
        width={180}
        height={80}
        className="max-lg:hidden"
      />
      <p className="text-white sm:text-lg text-xs">
        &copy; Puri Medika. All Right Reserved.
      </p>
      <div className="flex items-center sm:gap-6 gap-2 text-white sm:text-3xl text-sm">
        <FaInstagram className="cursor-pointer" />
        <FaSquareXTwitter className="cursor-pointer" />
        <FaFacebook className="cursor-pointer" />
      </div>
    </footer>
  );
};

export default Footer;
