import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const OurPolicies = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-10 py-20 text-xs sm:text-md md:text-base text-gray-700">
      {/* Easy Exchange */}
      <div>
        <img
          className="w-12 m-auto mb-5"
          src={assets.exchange_icon}
          alt="Exchange Policy"
        />
        <p className="font-semibold text-center">Easy Exchange Policy</p>
        <p className="text-gray-700 text-center">
          Enjoy a smooth and hassle-free exchange process for your orders.
        </p>
      </div>

      {/* Free Returns */}
      <div>
        <img
          className="w-12 m-auto mb-5"
          src={assets.quality_icon}
          alt="Return Policy"
        />
        <p className="font-semibold text-center">7-Day Free Return</p>
        <p className="text-gray-700 text-center">
          Not satisfied? You can return your product within 7 days at no extra
          cost.
        </p>
      </div>

      {/* Customer Support */}
      <div>
        <img
          className="w-12 m-auto mb-5"
          src={assets.support_img}
          alt="Customer Support"
        />
        <p className="font-semibold text-center">24/7 Customer Support</p>
        <p className="text-gray-700 text-center">
          Our friendly support team is here around the clock to assist you
          anytime.
        </p>
      </div>
    </div>
  );
};

export default OurPolicies;
