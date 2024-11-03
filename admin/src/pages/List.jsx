import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  console.log("Token:", token);

  // Fetch product list
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      console.log("Fetched Products:", response.data); // Log the full response
      if (response.data.success && Array.isArray(response.data.products)) {
        setProducts(response.data.products); // Set products array from response
      } else {
        console.error("Unexpected response format", response.data);
        setProducts([]); // Fallback to an empty array
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // Fallback to an empty array on error
    } finally {
      setLoading(false); // End loading regardless of success/failure
    }
  };

  // Remove a product by name
  const removeProduct = async (productName) => {
    try {
        // Retrieve the token from local storage or your state management
        const token = localStorage.getItem('token'); // or however you're storing your token

        const response = await axios.post(`${backendUrl}/api/product/remove`, {
            name: productName,  // Send the product name
        }, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the headers
            },
        });

        console.log(response.data);
        toast.success("Product removed successfully.");
        await fetchList(); // Refresh product list after removal
    } catch (error) {
        if (error.response) {
            console.error("Error removing product:", error.response.data.message);
            toast.error(error.response.data.message);
        } else {
            console.error("Error removing product:", error.message);
            toast.error("Failed to remove product. " + error.message);
        }
    }
};



  // Fetch list on component mount
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <p className="mb-2 text-xl font-semibold">All Product Lists</p>

      {loading ? (
        <p>Loading products...</p> // Display loading state
      ) : (
        <div className="flex flex-col gap-2">
          <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
            <b>Image</b>
            <b>Name</b>
            <b>Description</b>
            <b>Price</b>
            <b className="text-center">Action</b>
          </div>

          {/* ------Product List ------- */}
          {products.length > 0 ? (
            products.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-50 text-sm"
              >
                <img
                  src={
                    item.images && item.images.length > 0
                      ? item.images[0]
                      : "https://via.placeholder.com/100" // Placeholder image
                  }
                  alt={item.name}
                  className="w-16 h-16 object-cover"
                />
                <p>{item.name}</p>
                <p>{item.description || "N/A"}</p>
                <p>
                  {currency}
                  {item.price}
                </p>
                <button
                  onClick={() => {
                    console.log("Product Item:", item); // Log the product before attempting to remove
                    removeProduct(item.name); // Ensure name is passed instead of _id
                  }}
                  className="text-center text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default List;
