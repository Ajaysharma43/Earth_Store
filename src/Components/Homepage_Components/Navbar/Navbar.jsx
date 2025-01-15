import React, { useState } from "react";
import { FaShoppingBag, FaUser, FaBars   } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [icon,seticon] = useState(<FaBars/>)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
      <nav id="Navbar">
        <section>
          <img
            src="https://websitedemos.net/earth-store-02/wp-content/uploads/sites/1171/2022/11/EARTH-STORE-200x35.png"
            alt=""
            id="Navbar_Title"
          />
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

              <h3 className="Navbar_Element">SHOP</h3>
              <h3 className="Navbar_Element">CONTACT</h3>

              <div id="Navbar_Icon_Cart">
                <FaShoppingBag size={26} />
                <h6 id="Navbar_Icon_Cart_Data">5</h6>
              </div>

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
              
              <li>SHOP</li>
              <li>CONTACT</li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
