import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Contaxt/ShopContext";
import Title from "../Components/Title";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../../../admin/src/App";

const Orders = () => {
  const { token, currency } = useContext(ShopContext); // Access token from context
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback image URL
  const fallbackImage = 'https://via.placeholder.com/150'; // Placeholder image URL

  const loadOrderData = async () => {
    // if (!token) {
    //   console.log("No token found");
    //   return null; // Exit if no token
    // }

    try {
      setLoading(true);
      console.log(backendUrl);

      const response = await axios.post(`${backendUrl}/api/order/userOrders`, {}, {
        headers: { Authorization: `Bearer ${token}` }, // Correctly set the token header
      });

      if (response.data.success) {
        setOrderData(response.data.orders || []);
      } else {
        toast.error(response.data.message || "Failed to load orders.");
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error("An error occurred while fetching your orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]); // Re-fetch orders if token changes

  return (
    <div className="border-t pt-14">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {loading ? (
          <p className="text-center text-gray-500">Loading your orders...</p>
        ) : orderData.length === 0 ? (
          <p className="text-center text-gray-700">No orders found.</p>
        ) : (
          orderData.map((order, index) => (
            <div
              key={index}
              className="py-4 border-b text-gray-700 flex flex-col gap-4"
            >
              {order.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center gap-6 text-sm"
                >
                  {/* Image Section */}
                  <img
                    src={item.images && item.images.length > 0 ? item.images[0] : fallbackImage}
                    alt={item.name || "Product"}
                    className="w-16 sm:w-20 rounded-md"
                  />

                  {/* Product Details Section */}
                  <div className="flex flex-col flex-1">
                    <p className="font-medium">{item.name}</p>
                    <div className="flex gap-4">
                    <p>
                      <span className="font-medium">Price: </span>
                      {currency}{item.price}
                    </p>
                    <p>
                      <span className="font-medium">Quantity: </span>{item.quantity}
                    </p>
                    <p>
                      <span className="font-medium">Size: </span>{item.size || "N/A"}
                    </p>
                    </div>

                    <p>
                      <span className="font-medium mt-2">Date: </span>{new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Order Status Section */}
                  <div className="text-center flex gap-36 md:text-right">
                    <p className="text-sm">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      {order.status}
                    </p>
                    <button 
  className="px-4 py-2 rounded-md text-xs" 
  onClick={() => window.location.reload()}
>
  Track Order
</button>

                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
