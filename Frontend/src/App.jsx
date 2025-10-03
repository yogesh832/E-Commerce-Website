import "./App.css";
import React from "react";
import Navbar from "./Components/Navbar.jsx";

import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Contact from "./Pages/Contact.jsx";
import Collection from "./Pages/Collection.jsx";
import Cart from "./Pages/Cart.jsx";
import Login from "./Pages/Login.jsx";
import Orders from "./Pages/Orders.jsx";
import PlaceOrder from "./Pages/PlaceOrder.jsx";
import Product from "./Pages/Product.jsx";
import About from "./Pages/About.jsx";
import Footer from "./Components/Footer.jsx";
import SearchBar from "./Components/SearchBar.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  // npm install react-toastify for toast notifications
  return (
    <>
      <div
        className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]
      py-1 f"
      >
        <ToastContainer />

        <Navbar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
