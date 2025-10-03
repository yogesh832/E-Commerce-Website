import React from "react";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between border-b border-gray-300">
     <Link to={"/"}> <img
        className="w-[max(10%, 100px)]"
        style={{ width: "max(10%, 100px)" }}
        src={assets.newLogo}
        alt=""
      /></Link>
      <button
        onClick={() => setToken("")}
        className="bg-gray-500 text-white px-4 py-2 sm:px-7 sm:py-3 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
