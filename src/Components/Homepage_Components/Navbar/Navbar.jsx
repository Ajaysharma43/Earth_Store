import React, { useState } from "react";
import { FaShoppingBag, FaUser, FaBars   } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Drawers from "../../Drawer/Drawer";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const Quantity = useSelector((state) => state.Cart)
  const Product = useSelector((state) => state.Cart.Cart)
  const [CartItems, setCartItems] = useState(Quantity.length);
  const [DrawerState , setDrawerState] = useState(false)
  const [icon,seticon] = useState(<FaBars/>)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const ToggleDrawer = () => {
    if(DrawerState == true)
    {
      setDrawerState(false)
    }
    else
    {
      setDrawerState(true)
    }
  }

  const updateicon = () => {
    toggleDropdown();
    if (isDropdownOpen == false)
    {
      seticon(<IoMdClose />)
    }
    else
    {
      seticon(<FaBars/>)
    }
  }

  

  return (
    <>
    <Drawers open={DrawerState} toggleDrawer={ToggleDrawer}/>
      <nav id="Navbar">
        <section>
        <Link to='/' style={{textDecorationLine:"none"}}>
          <img
            src="https://websitedemos.net/earth-store-02/wp-content/uploads/sites/1171/2022/11/EARTH-STORE-200x35.png"
            alt=""
            id="Navbar_Title"
          />
          </Link>
        </section>

        <section>
          <center>
            <div className="Navbar_Elements">
              <Link to='/' style={{textDecorationLine:"none"}}>
              <h3 className="Navbar_Element">HOME</h3>
              </Link>

              <Link to='/About' style={{textDecorationLine:"none"}}>
              <h3 className="Navbar_Element">ABOUT</h3>
              </Link>

              <Link to='/Shop'>
              <h3 className="Navbar_Element">SHOP</h3>
              </Link>

              <h3 className="Navbar_Element">CONTACT</h3>

              <button id="Navbar_Icon_Cart">
                <FaShoppingBag size={26} onClick={ToggleDrawer}/>
                <h6 id="Navbar_Icon_Cart_Data">{Product.length ? Product.length : "0"}</h6>
              </button>

              <h3 id="Navbar_Icon_User">
                <FaUser size={26} />
              </h3>

              <h3 id="Navbar_DropDown" onClick={()=>updateicon()}>
                {icon}
              </h3>
            </div>
          </center>
        </section>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="Navbar_Dropdown">
            <ul>
            <Link to='/' style={{textDecorationLine:"none"}}>
              <li>HOME</li>
              </Link>

              <Link to='/About' style={{textDecorationLine:"none"}}>
              <li>ABOUT</li>
              </Link>
              <Link to='/Shop'>
              <li>SHOP</li>
              </Link>
              <li>CONTACT</li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
