import React, { useState, useEffect } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import newLogo from '../assets/newLogo.png'
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [them, setThem] = useState(false);

  const handleOnThem = () => {
    setThem((prevThem) => !prevThem);
  };

  useEffect(() => {
    if (them) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [them]);

  return (
    <div className="flex items-center    justify-between px-4 py-3 font-medium border-gray-200 dark:bg-gray-900 dark:text-white">
      <Link to="/">
        <img src={newLogo} className="w-[20vw]  "  alt="Logo" />
      </Link>
      <ul className="hidden sm:flex gap-[1vw] text-gray-700 dark:text-gray-300">
        <NavLink className="flex w-[10vw] flex-col items-center gap-1" to="/">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden dark:bg-gray-300" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/collection">
          <p>COLLECTIONS</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden dark:bg-gray-300" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/contact">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden dark:bg-gray-300" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/about">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden dark:bg-gray-300" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          className="w-5 min  cursor-pointer"
          alt="Search"
        />
      </div>
      <div className="group relative">
        <img
          src={assets.profile_icon}
          className="w-5 cursor-pointer"
          alt="Profile"
        />
        <div className="absolute hidden dropdown-menu z-99 right-0 pt-4 group-hover:block bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
          <div className="flex flex-col items-center gap-2 w-36 py-3 px-5 bg-slate-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded">
            <p className="cursor-pointer hover:text-black dark:hover:text-white">
              My Profile
            </p>
            <p className="cursor-pointer hover:text-black dark:hover:text-white">
              Orders
            </p>
            <p className="cursor-pointer hover:text-black dark:hover:text-white">
              Logout
            </p>
          </div>
        </div>
      </div>

      <Link to="/cart" className="relative">
        <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
        <p className="absolute right-[-8px] top-[6px] w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white">
          10
        </p>
      </Link>

      <button
        onClick={handleOnThem}
        className="text-gray-700 dark:text-gray-300"
      >
        <FontAwesomeIcon icon={them ? faSun : faMoon} />
      </button>

      <img
        onClick={() => setVisible(true)}
        src={assets.menu_icon}
        className="w-5 cursor-pointer sm:hidden"
        alt="Menu"
      />
      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 left-0 overflow-hidden transition-all bg-white dark:bg-gray-900 z-50 ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 dark:text-gray-300">
          <div
            onClick={() => setVisible(false)}
            className="cursor-pointer pt-10 flex items-center gap-4 p-4"
          >
            <img
              src={assets.dropdown_icon}
              alt="Back"
              className="h-4 rotate-180"
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border cursor-pointer hover:text-black dark:hover:text-white"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border cursor-pointer hover:text-black dark:hover:text-white"
            to="/collection"
          >
            COLLECTIONS
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border cursor-pointer hover:text-black dark:hover:text-white"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border cursor-pointer hover:text-black dark:hover:text-white"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
