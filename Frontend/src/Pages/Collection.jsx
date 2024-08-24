import React, { useContext } from 'react';
import { ShopContext } from '../Contaxt/ShopContext';
import ProductItem from '../Components/ProductItem';
import { Link } from 'react-router-dom';

const Collections = () => {
  const { products } = useContext(ShopContext);

  return (
    <Link to='/collection' className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
      {products.map((item, index) => (
        <ProductItem
          key={index}
          id={item._id}
          image={item.image}
          name={item.name}
          price={item.price}
          bestseller={item.bestseller} // Pass the bestseller property here
        />
      ))}
    </Link>
  );
};

export default Collections;
