import React from "react";
import Hero from "../Components/Hero";
import LatestCollection from "../Components/LatestCollection";
import BestSellers from "../Components/BestSellors";
import OurPolicies from "../Components/OurPolicies";
import NewsLetterBox from "../Components/NewsLetterBox";

const Home = () => {
  return (
    <>
      <div>
        <Hero />
        <LatestCollection />
        <BestSellers />
        <OurPolicies />
        <NewsLetterBox />
      </div>
    </>
  );
};

export default Home;
