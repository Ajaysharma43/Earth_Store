import { useEffect } from "react";
import Logout from "../../Logout/Logout";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  useEffect(() => {}, [Logout]);

  return (
    <div className="bg-white text-black py-8  border-t-[1px] border-solid">
      <div className="flex flex-col md:flex-row justify-center gap-[16%] items-center">
        <nav className="md:flex lg:flex xl:flex 2xl:flex lg:space-x-8 xl:space-x-8 2xl:space-x-8 ">
        <Link to='/' style={{textDecorationLine:"none"}}>
          <h1 className="text-lg font-semibold hover:text-gray-400">Home</h1>
          </Link>
          <Link to='/About' style={{textDecorationLine:"none"}}>
          <h1 className="text-lg font-semibold hover:text-gray-400">About</h1>
          </Link>
          <Link to='/Shop'>
          <h1 className="text-lg font-semibold hover:text-gray-400">Shop</h1>
          </Link>
          <h1 className="text-lg font-semibold hover:text-gray-400">Contact</h1>
        </nav>

        <div className="my-4 md:my-0">
          <img
            src="https://websitedemos.net/earth-store-02/wp-content/uploads/sites/1171/2022/11/EARTH-STORE-200x35.png"
            alt="Earth Store Logo"
            className="w-40"
          />
        </div>

        <div>
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Footer;
