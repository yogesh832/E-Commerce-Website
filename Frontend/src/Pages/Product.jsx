import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Contaxt/ShopContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../Components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch the product data based on the ID
  const fetchProductData = () => {
    console.log("Fetching product for ID:", productId); // Debug log
    const item = products.find((item) => item._id === productId);

    if (item) {
      console.log("Full Product Data:", item); // Debug log for full product object
      setProductData(item);

      // Check if the images field exists and is an array
      if (item.images && Array.isArray(item.images)) {
        console.log("Product Images:", item.images); // Log images array
        setImage(item.images[0] || "https://via.placeholder.com/150"); // Fallback image if none
      } else {
        console.error("No images found or images is not an array for product:", item);
      }

      setLoading(false);
    } else {
      console.error("Product not found for ID:", productId); // Debug log
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (loading) return <div>Loading...</div>;

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in-out duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex-col-reverse flex gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-hidden overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%]">
            {productData.images.map((item, index) => (
              <img
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setImage(item)}
                alt="Product thumbnail"
                onError={(e) => {
                  e.target.onerror = null; // Prevent looping
                  e.target.src = "https://via.placeholder.com/150"; // Fallback image
                }}
              />
            ))}
          </div>
          <div className="w-full sm:w-[122.3%]">
            <img
              src={image}
              alt={productData.name}
              className="w-full h-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150"; // Fallback image
              }}
            />
          </div>
        </div>

        {/* Product details */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }, (_, index) => (
              <img
                key={index}
                src={index < productData.rating ? assets.star_icon : assets.star_dull_icon}
                alt="Rating star"
                className="w-3"
              />
            ))}
            <p className="text-gray-800 font-semibold">
              {productData.rating}{" "}
              <span className="text-gray-600">({productData.reviews} reviews)</span>
            </p>
          </div>
          <p className="text-gray-800 mt-3 font-medium text-3xl">
            {currency} {productData.price}
          </p>
          <p className="text-gray-600">{productData.description}</p>

          <div className="flex flex-col gap-2 my-4">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-orange-500 text-white px-8 py-3 text-sm active:bg-orange-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-4 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on delivery is available for this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
        </div>
        <div className="flex flex-col gap-4 border px-5 py-6 text-sm text-gray-500">
          <p>{productData.description || "Default description here..."}</p>
        </div>
      </div>

      {/* Related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div>Product not found</div>
  );
};

export default Product;
