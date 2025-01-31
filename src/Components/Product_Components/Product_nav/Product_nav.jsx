import React, { useState } from "react";
import { FaShoppingBag, FaUser, FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Drawers from "../../Drawer/Drawer";

const ProductNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const Quantity = useSelector((state) => state.Cart);
  const Product = useSelector((state) => state.Cart.Cart);
  const [DrawerState, setDrawerState] = useState(false);
  const [icon, setIcon] = useState(<FaBars />);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const ToggleDrawer = () => {
    setDrawerState(!DrawerState);
  };

  const updateIcon = () => {
    toggleDropdown();
    setIcon(isDropdownOpen ? <FaBars /> : <IoMdClose />);
  };

  return (
    <>
      <Drawers open={DrawerState} toggleDrawer={ToggleDrawer} />
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <section>
          <img
            src="https://websitedemos.net/earth-store-02/wp-content/uploads/sites/1171/2022/11/EARTH-STORE-200x35.png"
            alt="Logo"
            className="h-10"
          />
        </section>

        <section className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-800 hover:text-gray-600">HOME</Link>
          <Link to="/About" className="text-gray-800 hover:text-gray-600">ABOUT</Link>
          <Link to="/Shop" className="text-gray-800 hover:text-gray-600">SHOP</Link>
          <span className="text-gray-800 hover:text-gray-600">CONTACT</span>
        </section>

        <section className="flex items-center space-x-4">
          <button className="relative" onClick={ToggleDrawer}>
            <FaShoppingBag size={26} className="text-gray-800" />
            {Product.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {Product.length}
              </span>
            )}
          </button>

          <FaUser size={26} className="text-gray-800" />
          
          <button className="md:hidden" onClick={updateIcon}>
            {icon}
          </button>
        </section>
      </nav>

      {isDropdownOpen && (
        <div className="md:hidden bg-white shadow-md p-4 absolute w-full flex flex-col items-center space-y-3">
          <Link to="/" className="text-gray-800 hover:text-gray-600">HOME</Link>
          <Link to="/About" className="text-gray-800 hover:text-gray-600">ABOUT</Link>
          <Link to="/Shop" className="text-gray-800 hover:text-gray-600">SHOP</Link>
          <span className="text-gray-800 hover:text-gray-600">CONTACT</span>
        </div>
      )}
    </>
  );
};

export default ProductNavbar;
