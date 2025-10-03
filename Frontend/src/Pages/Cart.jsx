import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Contaxt/ShopContext";
import Title from "../Components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../Components/CartTotal"; // Import the CartTotal component

const Cart = () => {
  const { products, cartItems, currency, updateQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="pt-4 border-t">
      <div className="text-2xl mb-3 font-bold">
        <Title text1="Your" text2="Cart" />
      </div>
      <div className="">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          // Check if productData exists and has the necessary properties
          if (!productData) {
            console.warn(`Product data is missing for item: ${item._id}`);
            return null; // Skip rendering this item
          }

          const { images, name, price } = productData;

          // Ensure the images array exists and has at least one image
          if (!images || images.length === 0 || !name || !price) {
            console.warn(`Incomplete product data for item: ${item._id}`);
            return null; // Skip rendering if key data is missing
          }

          return (
            <div
              key={index}
              className="border-t border-b text-gray-700 grid grid-cols-[4fr_5fr_0.5fr] items-center gap-4 py-2"
            >
              <div className="flex items-center gap-4">
                <img className="w-16 sm:w-20" src={images[0]} alt={`${name}`} />
                <div className="">
                  <p className="text-sm sm:text-lg font-medium">{name}</p>
                </div>
                <div className="flex items-center gap-5 mt-2">
                  <p>
                    {currency}
                    {price}
                  </p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                    {item.size}
                  </p>
                </div>
              </div>
              <input
                className="border max-w-10 sm:max-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) =>
                  updateQuantity(item._id, item.size, parseInt(e.target.value))
                }
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="Remove item"
              />
            </div>
          );
        })}
      </div>

      {/* Add CartTotal Component here */}
      <div className="flex justify-end my-20">
        <CartTotal />
      </div>
    </div>
  );
};

export default Cart;
