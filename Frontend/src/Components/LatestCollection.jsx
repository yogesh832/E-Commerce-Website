import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Contaxt/ShopContext";
import Title from "../Components/Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    // Ensure to set the latest products whenever the products array changes
    if (products.length) {
      setLatestProduct(products.slice(0, 12)); // Get the first 8 products
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our newest range of stylish and comfortable outfits designed
          to match every mood and moment. From trendy everyday wear to elegant
          essentials — find your perfect look at Cloths4U.
        </p>
      </div>

      {/* Rendering Process */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {latestProduct.length > 0 ? (
          latestProduct.map((item, index) => (
            <ProductItem
              key={item._id} // Use item._id as the key for better uniqueness
              id={item._id}
              // Use the first image with fallback in case it's undefined
              image={
                item.images && item.images.length > 0
                  ? item.images[0]
                  : "https://via.placeholder.com/150"
              }
              name={item.name}
              price={item.price}
            />
          ))
        ) : (
          <p>No products available.</p> // Fallback message if no products
        )}
      </div>
    </div>
  );
};

export default LatestCollection;
