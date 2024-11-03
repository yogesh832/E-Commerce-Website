import React, { useContext, useEffect } from "react";
import { ShopContext } from "../Contaxt/ShopContext";
import Title from "../Components/Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  useEffect(() => {
    console.log("Products Data: ", products); // Check what data you're receiving
  }, [products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl ">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="">
        {/* Ensure products exist before mapping */}
        {products && products.slice(1, 4).map((item, index) => {
          // Log each product item to check the image field and structure
          console.log("Product Item: ", item);

          // Safeguard to ensure item exists
          if (!item) {
            return (
              <div key={index} className="py-4 border-b border-t text-gray-700">
                <p className="text-center text-gray-500">Product data is missing</p>
              </div>
            );
          }

          // Make sure the property is correct (item.images or item.image)
          const imageUrl = item.image && item.image.length > 0 ? item.image[0] : null;

          // Fallback image URL
          const fallbackImage = "https://via.placeholder.com/150";

          return (
            <div
              key={index}
              className="py-4 border-b border-t text-gray-700 flex flex-col md:flex-row md:items-center gap-4"
            >
              <div className="flex items-center gap-6 text-sm">
                {/* Display the image if available, otherwise show fallback */}
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={item.name || "Unknown Product"}
                    className="w-16 sm:w-20"
                    onError={(e) => {
                      e.target.onerror = null; // Prevents loop in case fallback also fails
                      e.target.src = fallbackImage; // Replace broken image with fallback
                    }}
                  />
                ) : (
                  <div className="w-16 sm:w-20 bg-gray-200 text-center text-gray-500">
                    No Image Available
                  </div>
                )}
              </div>

              <div className="">
                <p className="text-base font-medium">{item.name || "Unknown Product"}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p>
                    {currency}
                    {item.price || "N/A"}
                  </p>
                  <p>Quantity: 1</p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                    Size: {item.size || "N/A"}
                  </p>
                </div>
                <p className="mt-2">
                  Date: <span className="text-gray-400">25 Jul 2024</span>
                </p>
              </div>

              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">Ready To Ship</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
