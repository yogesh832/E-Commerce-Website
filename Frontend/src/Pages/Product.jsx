import React, { useContext, useEffect, useState } from "react";
import { ShopContext  } from "../Contaxt/ShopContext";
import { useParams } from "react-router-dom";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../Components/RelatedProducts";
const Product = () => {
  const { productId } = useParams();
  // console.log(productId) it gives the url from the page
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        // console.log(item); to get all data of the product
        setImage(item.image[0]);
        return null;
      }
    });
  };
  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in-out duration-500 opacity-100">
      {/* product images */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex-col-reverse flex  gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-hidden overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%]">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer "
                onClick={() => setImage(item)}
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[122.3%]">
            <img src={image} alt={productData.name} className="w-full h-auto" />
          </div>
        </div>

        {/* product details */}
        <div className="flex-1 ">
          <h1 className="text-2xl font-semibold">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="text-gray-800 font-semibold">
              {productData.rating}{" "}
              <span className="text-gray-600">({productData.reviews} 122)</span>
            </p>
          </div>
          <p className="text-gray-800 mt-3 font-medium text-3xl">
            {currency} {productData.price}
          </p>
          <p className="text-gray-600">{productData.description}</p>

          <div className="flex  flex-col gap-2 my-4">
            <p className="">Select Size</p>
            <p className="flex gap-2"></p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  } `}
                  key={index}
                >
                  {item}{" "}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => addToCart(productData._id, size)} className="bg-orange-500 text-white px-8 py-3 text-sm active:bg-orange-700lack text-white px-8 py-3 text-sm active:bg-gray-700 ">ADD TO CART </button>
        <hr className="mt-4 sm:w-4/5" />
        <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1 ">
          <p className="">100% Original Product.</p>
          <p className="">Cash on delivery is available in this product.</p>
          <p className="">Easy return and exchange Policy within 7 Days.</p>
        </div>
        </div>
      </div>

{/* ------Description and Review section  */}
 
 <div className="mt-20">

<div className="flex">
<b className="border px-5 py-3 text-sm">Description</b>
</div>
<div className="flex flex-col gap-4 border px-5 py-6 text-sm text-gray-500">
  <p>Discover the latest in fashion at our online clothing store, where style meets quality. Whether you're looking for casual wear, chic office attire, or statement pieces for special occasions, we offer a wide range of options to suit every taste. Our collection is carefully curated to bring you the newest trends, crafted with the finest materials to ensure you look and feel your best. Explore our easy-to-navigate website and enjoy a seamless shopping experience, with detailed product descriptions and size guides to help you find the perfect fit.</p>
  <p>At our e-commerce store, customer satisfaction is our top priority. We provide a diverse selection of clothing for men, women, and children, ensuring that there's something for everyone. With fast and reliable shipping, secure payment options, and excellent customer service, we make it easy to update your wardrobe from the comfort of your home. Join our fashion community today and stay ahead of the trends with our exclusive collections and limited-time offers.</p>
</div>

 </div>
{/* related products */}
<RelatedProducts category={productData.category } subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
