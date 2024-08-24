import React, { useContext } from "react";
import { ShopContext } from "../Contaxt/ShopContext";
import { Link } from "react-router-dom";
import BestSellerHallmark from "./BestSellerHallmark";

const ProductItem = ({ id, image, name, price, bestseller }) => {
  const { currency } = useContext(ShopContext);

  return (
    <>
      <Link
        className="text-gray-700 cursor-pointer hover:text-indigo-900  "
        to={`/product/${id}`}
      >
        <div className="overflow-hidden">
          {bestseller && <BestSellerHallmark />}
          <img
            className="hover:scale-110 transition ease-in-out"
            src={image[0]}
            alt={name}
          />
        </div>
        <p className="pt-3 pb-1 text-small">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </Link>
    </>
  );
};

export default ProductItem;
