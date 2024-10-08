import React from 'react';
import newHero from '../assets/newHero.png'
const Hero = () => {
  return (
<>
<div className="flex  flex-col sm:flex-row border  border-gray-400">
      {/* Hero left */}
      <div className="w-full sm:w-1/2  flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141] text-center sm:text-left">
          <div className="flex items-center gap-2 ">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">Our Best Sellers</p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">Latest Arrivals</h1>
          <div className="flex items-center gap-2 ">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      {/* Hero right */}
      <div className="w-full z-1  ">
        <img src={newHero} alt="Latest Arrivals" className="  sm:w-full" />
      </div>
    </div>
  
    </>
  );
};

export default Hero;
