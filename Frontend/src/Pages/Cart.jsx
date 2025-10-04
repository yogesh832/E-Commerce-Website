import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Contaxt/ShopContext";
import Title from "../Components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../Components/CartTotal";

const Cart = () => {
  const { products, cartItems, currency, updateQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  // ✅ Function to determine discount percentage based on quantity
  const getDiscountPercentage = (quantity) => {
    if (quantity >= 20) return 12;
    if (quantity >= 10) return 10;
    if (quantity >= 5) return 5;
    return 0;
  };

  // ✅ Prepare cart data
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

      {/* CART ITEMS */}
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          if (!productData) return null;

          const { images, name, price } = productData;
          const discountPercent = getDiscountPercentage(item.quantity);
          const discountedPrice =
            discountPercent > 0 ? price * (1 - discountPercent / 100) : price;

          return (
            <div
              key={index}
              className="border-t border-b text-gray-700 flex flex-col sm:grid sm:grid-cols-[4fr_5fr_0.5fr] items-center gap-4 py-3"
            >
              {/* PRODUCT IMAGE + DETAILS */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  className="w-16 sm:w-20 rounded-md"
                  src={images[0]}
                  alt={name}
                />
                <div>
                  <p className="text-sm sm:text-lg font-medium">{name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="text-sm sm:text-base">
                      {currency}
                      {discountedPrice.toFixed(2)}{" "}
                      {discountPercent > 0 && (
                        <span className="text-green-600 text-xs ml-2 font-semibold">
                          (-{discountPercent}% off)
                        </span>
                      )}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 text-sm rounded-md">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              {/* QUANTITY CONTROL BUTTONS */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    updateQuantity(item._id, item.size, item.quantity - 1)
                  }
                  className="border rounded-md w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-gray-100"
                >
                  −
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item._id, item.size, item.quantity + 1)
                  }
                  className="border rounded-md w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* DISCOUNT MESSAGE (MOBILE FRIENDLY) */}
              {discountPercent > 0 && (
                <p className="text-xs text-green-600 sm:hidden">
                  {discountPercent}% bulk discount applied!
                </p>
              )}

              {/* DELETE ICON */}
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-5 cursor-pointer hover:opacity-70"
                src={assets.bin_icon}
                alt="Remove item"
              />
            </div>
          );
        })}
      </div>

      {/* ✅ CART TOTAL SECTION */}
      <div className="flex justify-end my-20">
        <CartTotal />
      </div>
    </div>
  );
};

export default Cart;
