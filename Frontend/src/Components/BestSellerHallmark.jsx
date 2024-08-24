import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const BestSellerLoHallmark = () => {
  return (
    <div className='relative'>
      <p className=" z-50 absolute right-[6px] top-[6px] w-7 h-7 text-white bg-red-500 rounded-full flex items-center justify-center  " title='Recommended Product'>
        <FontAwesomeIcon icon={faStar} />
      </p>
    </div>
  );
}

export default BestSellerLoHallmark;
