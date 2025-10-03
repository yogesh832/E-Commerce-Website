import React, { useContext, useState } from "react";
import Title from "../Components/Title";
import CartTotal from "../Components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../Contaxt/ShopContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const backendUrl = "https://e-commerce-website-o8xx.onrender.com"; // Replace with your backend URL

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
    additionalInfo: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleMethod = (method) => {
    setMethod(method);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const address = `${formData.street}, ${formData.city}, ${formData.state}, ${formData.zipcode}`;

      let orderData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone, // Fix: 'phone' instead of 'mobile'
        address: address,
        pincode: formData.zipcode,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
      };

      console.log("Order data being sent:", orderData);

      switch (method) {
        case "cod":
          const response = await fetch(`${backendUrl}/api/order/place`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
          });

          const responseData = await response.json();
          if (response.ok && responseData.success) {
            console.log("Order placed successfully:", responseData);
            setCartItems({}); // Clear cart items
            navigate("/orders"); // Navigate to success page
          } else {
            console.error("Order creation failed:", responseData.message);
            alert(`Order creation failed: ${responseData.message}`);
          }
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            `${backendUrl}/api/order/razorpay`,
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log("Response from Razorpay:", responseRazorpay.data);
          // Add Razorpay payment handling logic here
          break;

        default:
          break;
      }
    } catch (error) {
      toast.error(
        "An error occurred while placing the order. Please try again."
      );
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="bg-white rounded-md p-4 shadow-md">
      <div className="text-xl sm:text-2xl mb-4">
        <Title text1="DELIVERY" text2="INFORMATION" />
      </div>

      <form onSubmit={onSubmitHandler} className="flex flex-row gap-20">
        {/* Left Section */}
        <div className="flex max-w-[520px] flex-col gap-3">
          <div className="flex gap-3">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              placeholder="First Name"
              className="border border-gray-300 px-3 py-2 rounded-md"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              placeholder="Last Name"
              className="border border-gray-300 px-3 py-2 rounded-md"
              required
            />
          </div>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            placeholder="Street/Milestone"
            className="border border-gray-300 px-3 py-2 rounded-md"
            required
          />
          <div className="flex gap-3">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              placeholder="City/Village"
              className="border border-gray-300 px-3 py-2 rounded-md"
              required
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              placeholder="State"
              className="border border-gray-300 px-3 py-2 rounded-md"
              required
            />
          </div>
          <div className="flex gap-3">
            <input
              type="number"
              name="zipcode"
              value={formData.zipcode}
              onChange={onChangeHandler}
              placeholder="Pin Code"
              className="border border-gray-300 px-3 py-2 rounded-md"
              required
            />
            <input
              type="number"
              name="phone" // Fix: 'phone' instead of 'mobile'
              value={formData.phone}
              onChange={onChangeHandler}
              placeholder="Mobile No."
              className="border border-gray-300 px-3 py-2 rounded-md"
              required
            />
          </div>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={onChangeHandler}
            rows={5}
            placeholder="Additional Information"
            className="border border-gray-300 px-3 py-2 rounded-md"
            required
          />
        </div>

        {/* Right Section */}
        <div className="mt-0">
          <div className="min-w-80">
            <CartTotal showButton={false} />
          </div>

          <div className="mt-5">
            <Title text1="PAYMENT" text2="METHOD" />
            <div className="flex gap-3 flex-col lg:flex-row">
              <div
                onClick={() => handleMethod("stripe")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "stripe" ? "bg-green-400" : ""
                  }`}
                ></p>
                <img
                  className="h-5 mx-4"
                  src={assets.stripe_logo}
                  alt="Stripe"
                />
              </div>

              <div
                onClick={() => handleMethod("razorpay")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "razorpay" ? "bg-green-400" : ""
                  }`}
                ></p>
                <img
                  className="h-5 mx-4"
                  src={assets.razorpay_logo}
                  alt="Razorpay"
                />
              </div>

              <div
                onClick={() => handleMethod("cod")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "cod" ? "bg-green-400" : ""
                  }`}
                ></p>
                <p className="text-gray-500 text-sm font-medium mx-4">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>

            <div className="w-full text-end mt-8">
              <button
                type="submit"
                className="bg-black text-white px-16 py-3 text-sm"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
