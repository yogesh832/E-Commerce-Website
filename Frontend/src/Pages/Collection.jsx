import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Contaxt/ShopContext";
import ProductItem from "../Components/ProductItem";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../Components/Title";

const Collections = () => {
  const { products, showSearch, search } = useContext(ShopContext);
  const [filters, setFilters] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    const currentItem = e.target.value;
    setCategory((prev) =>
      prev.includes(currentItem)
        ? prev.filter((item) => item !== currentItem)
        : [...prev, currentItem]
    );
  };

  const toggleSubCategory = (e) => {
    const currentItem = e.target.value;
    setSubCategory((prev) =>
      prev.includes(currentItem)
        ? prev.filter((item) => item !== currentItem)
        : [...prev, currentItem]
    );
  };

  useEffect(() => {
    let filtered = products;

    // Filter by categories
    if (category.length > 0) {
      filtered = filtered.filter((product) =>
        category.includes(product.category)
      );
    }

    // **Filter by subcategories**
    if (subCategory.length > 0) {
      filtered = filtered.filter((product) => {
        console.log("Product subCategory:", product.subCategory); // Debug line
        return subCategory.includes(product.subCategory);
      });
    }

    // Apply search filter
    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sorting
    switch (sortType) {
      case "High-Low":
        filtered = filtered.sort((a, b) => b.price - a.price); // High to Low
        break;
      case "Low-High":
        filtered = filtered.sort((a, b) => a.price - b.price); // Low to High
        break;
      default:
        break;
    }

    setFilterProduct(filtered);
  }, [products, category, subCategory, sortType, search, showSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setFilters(!filters)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${filters ? "rotate-90" : ""}`}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${
            filters ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Men", "Women", "Kids"].map((category) => (
              <label key={category} className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={category}
                  onChange={toggleCategory}
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Subcategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 sm:block ${
            filters ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((subCategory) => (
              <label key={subCategory} className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={subCategory}
                  onChange={toggleSubCategory}
                />
                {subCategory}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Collections */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          {/* Sort Items */}
          <select
            className="border-2 h-10 border-gray-300 text-sm px-2"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="Low-High">Sort by: Low to High</option>
            <option value="High-Low">Sort by: High to Low</option>
          </select>
        </div>

        {filterProduct.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProduct.map((item) => {
              // Determine the image source
              const imageSrc = Array.isArray(item.images) && item.images.length > 0
                ? item.images[0] // Use the first image if available
                : 'https://via.placeholder.com/150'; // Fallback image

              return (
                <ProductItem
                  key={item._id} // Use product._id as the key
                  id={item._id}
                  image={imageSrc}
                  name={item.name}
                  price={item.price.toFixed(2)} // Ensure price has two decimal places
                  bestseller={item.bestseller}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Collections;
