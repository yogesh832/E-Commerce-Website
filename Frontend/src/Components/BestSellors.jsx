import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Contaxt/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSellers = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products.length) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct.slice(0, 4)); // Limit to 4 bestsellers
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Explore our most-loved styles that everyone’s talking about! From
          everyday essentials to standout pieces, these best sellers are
          customer favorites for their perfect blend of comfort and fashion.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {bestSeller.length > 0 ? (
          bestSeller.map((item, index) => (
            <ProductItem
              key={item._id} // Better to use item._id if available instead of index
              id={item._id}
              image={
                item.images && item.images.length > 0
                  ? item.images[0]
                  : "https://via.placeholder.com/150"
              }
              name={item.name}
              price={item.price}
              bestseller={item.bestseller} // Make sure bestseller exists in the product object
            />
          ))
        ) : (
          <p>No best sellers available.</p> // Handle no products scenario
        )}
      </div>
    </div>
  );
};

export default BestSellers;
