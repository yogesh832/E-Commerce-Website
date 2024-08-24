import React from "react";

const NewsLetterBox = () => {
    const OnsubmitHandler=(e)=>{
e.preventDefault();
    }
  return (
    <div className=" text-center">
      <p className="text-2xl font-medium text-gray-700">
        Subscribe to our newsletter to get extra 20% discount.
      </p>
      <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci soluta inventore maiores laudantium vitae perspiciatis.</p>
      <form className="w-full sm:w-1/2 flex items-center gap-3  mx-auto my-6 border pl-3 " action="">
        <input type="email" placeholder="Enter your email address" className="w-full sm:flex-1 outline-none" required />
        <button onSubmit={OnsubmitHandler} type="submit" className="bg-black text-white  text-xs  px-10 py-4 rounded-md ml-2">Subscribe</button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
