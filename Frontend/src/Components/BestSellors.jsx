import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Contaxt/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSellers = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 4));
  }, [products]);

  return (
    <div className='my-10'>
      <div className="text-center text-3xl py-8">
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm ms:text-base text-gray-600'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque dicta eveniet, harum explicabo tenetur repellat at id eum..
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            bestseller={item.bestseller}  // Pass the bestseller property here
          />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
