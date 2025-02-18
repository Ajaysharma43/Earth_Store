import React, { useState } from "react";
import { Link } from "react-router-dom"; // assuming you are using React Router for navigation

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to handle mobile menu toggle

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <Link to="/Dashboard" className="text-white text-2xl font-semibold">
          Dashboard
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/Dashboard"
            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-lg"
          >
            Home
          </Link>
          <Link
            to="/dashboard/products"
            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-lg"
          >
            Products
          </Link>
          <Link
            to="/dashboard/upload"
            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-lg"
          >
            Upload
          </Link>
          <Link
            to="/dashboard/Users"
            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-lg"
          >
            Users
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {/* Hamburger icon for closed menu */}
          {!isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          ) : (
            // Close icon for open menu
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-gray-800`}>
        <Link
          to="/dashboard"
          className="block text-white px-3 py-2 rounded-md text-lg"
          onClick={toggleMenu}
        >
          Home
        </Link>
        <Link
            to="/dashboard/products"
            className="block text-white px-3 py-2 rounded-md text-lg"
          >
            Products
          </Link>
        <Link
            to="/dashboard/upload"
            className="block text-white px-3 py-2 rounded-md text-lg"
          >
            Upload
          </Link>
        <Link
          to="/dashboard/Users"
          className="block text-white px-3 py-2 rounded-md text-lg"
          onClick={toggleMenu}
        >
          Users
        </Link>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
