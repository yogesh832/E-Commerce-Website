import React from "react";
import { Link } from "react-router-dom";
import BestSellerHallmark from "./BestSellerHallmark";

const ProductItem = ({ id, image, name, price, bestseller }) => {
  // console.log("Image in ProductItem: ", image); // Debugging: Check if the image is being passed correctly

  return (
    <Link
      className="text-gray-700 cursor-pointer hover:text-indigo-900"
      to={`/product/${id}`}
    >
      <div className="overflow-hidden">
        {bestseller && <BestSellerHallmark />}
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image || "https://via.placeholder.com/150"} // Fallback image if no image is passed
          alt={name}
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop in case of error
            e.target.src = "https://via.placeholder.com/150"; // Fallback image
          }}
        />
      </div>
      <p className="pt-3 pb-1 text-small">{name}</p>
      <p className="text-sm font-medium">
        ₹{price}
      </p>
    </Link>
  );
};

export default ProductItem;
