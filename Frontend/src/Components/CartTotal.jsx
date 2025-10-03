import React, { useContext } from "react";
import { ShopContext } from "../Contaxt/ShopContext";
import Title from "../Components/Title";

const CartTotal = ({ showButton = true }) => {
  const { currency, delivery_fee, getCartAmount, navigate } =
    useContext(ShopContext);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between text-gray-700">
          <p>Subtotal</p>
          <p>
            {currency}
            {getCartAmount()}
          </p>
        </div>
        <div className="flex justify-between text-gray-700">
          <p>Delivery Fee</p>
          <p>
            {currency}
            {delivery_fee}
          </p>
        </div>
        <div className="flex justify-between text-orange-500 text-lg font-bold">
          <p>Total</p>
          <p>
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}
          </p>
        </div>
        {showButton && (
          <div className="flex justify-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-orange-500 text-white px-8 py-3 text-sm active:bg-orange-700 font-bold uppercase rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
