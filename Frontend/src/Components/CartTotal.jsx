import React, { useContext } from "react";
import { ShopContext } from "../Contaxt/ShopContext";
import Title from "../Components/Title";

const CartTotal = ({ showButton = true }) => {
  const {
    currency,
    delivery_fee,
    cartItems,
    products,
    getTotalQuantity,
    navigate,
  } = useContext(ShopContext);

  const getDiscountPercentage = (totalQty) => {
    if (totalQty >= 20) return 12;
    if (totalQty >= 10) return 10;
    if (totalQty >= 5) return 5;
    return 0;
  };

  const totalQty = getTotalQuantity();
  const discountPercent = getDiscountPercentage(totalQty);

  let subtotal = 0;
  for (const itemId in cartItems) {
    for (const size in cartItems[itemId]) {
      const product = products.find((p) => p._id === itemId);
      if (product) {
        subtotal += product.price * cartItems[itemId][size];
      }
    }
  }

  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal - discountAmount + (subtotal === 0 ? 0 : delivery_fee);

  // 🟢 Bulk info message
  const getBulkMessage = () => {
    if (totalQty < 5)
      return "Buy 5 or more items to get 5% discount on your order!";
    if (totalQty < 10)
      return "Nice! You unlocked a 5% discount. Buy 10 or more to get 10% off!";
    if (totalQty < 20)
      return "Great! You’re saving 10%. Buy 20 or more to get 12% off!";
    return "Awesome! You’re enjoying the maximum 12% bulk discount!";
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 p-5 rounded-lg shadow-md">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <p>Subtotal</p>
          <p>
            {currency}
            {subtotal.toFixed(2)}
          </p>
        </div>

        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <p>Discount ({discountPercent}%)</p>
          <p className="text-green-600">
            -{currency}
            {discountAmount.toFixed(2)}
          </p>
        </div>

        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <p>Delivery Fee</p>
          <p>
            {currency}
            {subtotal === 0 ? 0 : delivery_fee.toFixed(2)}
          </p>
        </div>

        <div className="flex justify-between text-orange-500 text-lg font-bold">
          <p>Total</p>
          <p>
            {currency}
            {total.toFixed(2)}
          </p>
        </div>

        {/* 🟦 Bulk Info */}
        <div className="mt-3 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800 p-2 rounded-md border border-blue-200 dark:border-blue-600">
          {getBulkMessage()}
        </div>

        {showButton && (
          <div className="flex justify-end mt-3">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-orange-500 text-white px-8 py-3 text-sm active:bg-orange-700 font-bold uppercase rounded shadow hover:shadow-md outline-none focus:outline-none transition-all duration-150"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartTotal;
