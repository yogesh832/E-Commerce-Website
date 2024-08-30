import React, { useContext, useState } from 'react';
import Title from '../Components/Title';
import CartTotal from '../Components/CartTotal';
import { assets } from '../assets/frontend_assets/assets';
import { ShopContext } from '../Contaxt/ShopContext';

const PlaceOrder = () => {

  const [method , setMethod]= useState('cod onclick')
const {navigate}= useContext(ShopContext);

  return (
    <div className="bg-white   rounded-md p-4 shadow-md">
      <div className="text-xl  sm:text-2xl mb-4">
        <Title text1="DELIVERY" text2="INFORMATION" />
      </div>


      <div className="flex flex-row gap-20">
      {/* left section */}
      <div className="flex max-w-[520px] flex-col gap-3">
      <div className="flex gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="border border-gray-300 px-3 py-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>
        <input
          type="text"
          placeholder="Street/Milestone"
          className="border border-gray-300 px-3 py-2 rounded-md"
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City/Village"
            className="border border-gray-300 px-3 py-2 rounded-md"
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Pin Code"
            className="border border-gray-300 px-3 py-2 rounded-md"
          />
          <input
            type="number"
            placeholder="Mobile No."
            className="border border-gray-300 px-3 py-2 rounded-md"
          />
</div>
<textarea name="" rows={5} placeholder="Additional Information" className="border border-gray-300 px-3 py-2 rounded-md"></textarea>
      </div>

      {/* right side */}

<div className="mt-0">

  <div className="  min-w-80 ">

<CartTotal showButton={false} />
  
  </div>

  <div className="mt-5">
    <Title text1={'PAYMENT'} text2={'METHOD'} />
    <div  className="flex gap-3 flex-col lg:flex-row">
      <div onClick={()=>setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer ">
        <p className={`min-w-3.5 h-3.5 border rounded-full ${method ==='stripe' ? 'bg-green-400' : ''}`}></p>
        <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
      </div>

      <div onClick={()=>setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer ">
        <p className={`min-w-3.5 h-3.5 border rounded-full ${method ==='razorpay' ? 'bg-green-400' : ''}`}></p>
        <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
      </div>

      <div onClick={()=>setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer ">
        <p className={`min-w-3.5 h-3.5 border rounded-full ${method ==='cod' ? 'bg-green-400' : ''}`}></p>
     <p className='tex-gray-500 text-sm font-medium mx-4 '>CASH ON DELIVERY</p>
      </div>
    </div>

<div className="w-full text-end mt-8">
  <button onClick={()=>navigate('/orders')} type="button"className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
</div>

  </div>
    


</div>




</div>

    </div>
  );
};

export default PlaceOrder;
