import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch all orders
  const fetchAllOrders = async () => {
    if (!token) {
      toast.error("Authentication required. Please log in.");
      return;
    }

    try {
      const response = await axios.get(`${backendUrl}/api/order/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        // Sort orders by date in descending order (most recent first)
        const sortedOrders = response.data.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(sortedOrders);
        console.log("Orders fetched:", sortedOrders);
      } else {
        toast.error(response.data.message || "Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Internal Server Error. Please try again later.");
    }
  };



  // Function to handle status change
  const statusHandler = async (event, orderId) => {
  if (!token) {
    toast.error("Authentication required. Please log in.");
    return;
  }
  try {
    const response = await axios.post(
      `${backendUrl}/api/order/status/`,
      { orderId, status: event.target.value },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    if (response.data.success) {
      await fetchAllOrders();
    }
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }

  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">Order Page</h3>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-300 rounded-md gap-10 p-4 flex"
          >
            {/* Order Details */}
            <div className="flex flex-col md:flex-row w-full md:w-3/4">
              <img
                src={assets.parcel_icon}
                alt="Order Icon"
                className="w-12 h-12 mb-4 md:mb-0 md:mr-4"
              />
              <div>
                {order.items.map((item, index) => (
                  <p key={index} className="text-sm">
                    {item.name} x {item.quantity}{" "}
                    <span className="text-gray-500">({item.size})</span>
                  </p>
                ))}
                <p className="font-bold my-2">
                  {order.firstName} {order.lastName}
                </p>
                <p className="text-sm">{order.address}</p>
                <p className="text-sm">{order.phone}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="flex flex-col text-left mt-4 md:mt-0 w-full md:w-1/4">
              <p className="text-sm">Items: {order.items.length}</p>
              <p className="text-sm">
                Method: {order.paymentMethod || "N/A"}
              </p>
              <p className="text-sm">
                Payment: {order.payment ? "Done" : "Pending"}
              </p>
              <p className="text-sm">
                Date: {new Date(order.date).toLocaleDateString()}
              </p>
              <p className="font-bold mt-2">
                {currency}
                {order.amount}
              </p>
            </div>

            {/* Dropdown aligned to the top-right */}
            <select
  className="border border-gray-300 rounded-md p-1 w-32 h-10"
  value={order.status}
  onChange={(event)=>{statusHandler(event,order._id)}}
>
  <option value="order placed">Order Placed</option>
  <option value="packing">Packing</option>
  <option value="shipped">Shipped</option>
  <option value="delivered">Delivered</option>
  <option value="out for delivery">Out for Delivery</option>
</select>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
