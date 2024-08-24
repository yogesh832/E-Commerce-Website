import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import newLogo from "../assets/newLogo.png";
const Footer = () => {
  return (
    <div>
      <div className="flex flex-col   text-sm my-10 mt-40 text-gray-800">
        <img src={newLogo} alt="" className="mb-5 w-32" />
        <p className="w-1/4 md:w-2/3 text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          eligendi dignissimos esse quam repellat deserunt, in aliquid fugiat
          est saepe,
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          eligendi dignissimos esse quam repellat deserunt, in aliquid fugiat
          est saepe,
         </p>
      </div>
    </div>
  );
};

export default Footer;
