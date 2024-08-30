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
      setRelated(productCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"Related"} text2={"Products"} />
      </div>
      {related.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {related.map((product, index) => (
            <div key={index} className="p-4 border rounded shadow-sm">
              <img
                src={product.image}
                alt={product.title}
                key={index}
                className="w-full h-48 object-cover"
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
