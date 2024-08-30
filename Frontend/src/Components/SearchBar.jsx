import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Contaxt/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if the pathname includes 'collection' or is exactly '/'
    if (location.pathname.includes('collection') || location.pathname === '/') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="flex justify-center border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-2/3 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="flex-1 outline-none bg-inherit text-sm"
          placeholder="Search Here..."
          name=""
          id=""
        />
        <img className="w-4" src={assets.search_icon} alt="Search Icon" />
      </div>
      <img
        src={assets.cross_icon}
        alt="Close Icon"
        className="h-5 mt-7 w-4 inline cursor-pointer"
        onClick={() => setShowSearch(false)}
      />
    </div>
  ) : null;
};

export default SearchBar;
