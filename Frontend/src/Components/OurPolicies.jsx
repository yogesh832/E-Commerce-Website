import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const OurPolicies = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-center items-center gap-10 py-20 text-xs sm:text-md md:text-base text-gray-700'>
        
<div className="   ">
    <img className='w-12 m-auto mb-5 ' src={assets.exchange_icon} alt="" />
<p className='font-semibold text-center'>Easy Exchange Policy</p>
<p className='text-gray-700 text-center'>We Offer hassle free exchange policy.</p>
</div>
<div className="   ">
    <img className='w-12 m-auto mb-5 ' src={assets.quality_icon} alt="" />
 <p className='font-semibold text-center'>7 Days </p>
<p className='text-gray-700 text-center'>We Offer 7 Days free return policy.</p>
</div>
<div className="   ">
    <img className='w-12 m-auto mb-5 ' src={assets.support_img} alt="" />
<p className='font-semibold text-center'>Best costumer support</p>
<p className='text-gray-700 text-center'>We provide 24/7 costumer support.</p>
</div>

    </div>
  )
}

export default OurPolicies