import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Contaxt/ShopContext";
import Title from "./Title";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const productCopy = products.filter(
        (product) =>
          product.category === category && product.subCategory === subCategory
      );
      setRelated(productCopy.slice(0, 5)); // Limit to 5 related products
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"Related"} text2={"Products"} />
      </div>

      {related.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {related.map((product) => (
            <div key={product._id} className="p-4 border rounded shadow-sm">
              <img
                src={
                  product.images && product.images.length > 0
                    ? product.images[0] // Access the first image if it's an array
                    : "https://via.placeholder.com/150" // Fallback image
                }
                alt={product.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null; // Prevents looping in case fallback also fails
                  e.target.src = "https://via.placeholder.com/150"; // Second fallback
                }}
              />
              <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">No related products found.</p>
      )}
    </div>
  );
};

export default RelatedProducts;
