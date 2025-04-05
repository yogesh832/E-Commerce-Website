import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Orders = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const fetchAllOrders = async () => {
    if (!token) return; // Exit if no token is available
    try {
      const response = await axios.get(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } } );
      if(response.data.success){
setOrders(response.data)

console.log(response.data);

      }
      else{
        toast.error(response.data.message)
      }
     
    
      setOrders(response.data.orders); // Adjust according to your API response
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      setError("Unable to fetch orders. Please try again later.");
    }
  };
  

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      
    </div>
  )
}

export default Orders