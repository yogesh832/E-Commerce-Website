import React, { createContext, useState, useMemo } from 'react';
import { products } from '../assets/frontend_assets/assets'; // Adjust path as needed
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "₹";
    const delivery_fee = 10;

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
const navigate = useNavigate();
    const addToCart = async (itemId, size) => {
        let cartData = structuredClone(cartItems);

        if (!size) {
            toast.error("Please Select Size");
            return;
        }

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                totalCount += cartItems[itemId][size];
            }
        }
        return totalCount;
    };


    const updateQuantity= async (itemId, size, quantity) => {
   let cartData  = structuredClone(cartItems);

   cartData[itemId][size] = quantity;
   setCartItems(cartData);
    }


    const getCartAmount = () => {
        let totalAmount = 0;
      
        // Iterate through the items in the cart
        for (const itemId in cartItems) {
          // Iterate through the sizes within each item
          for (const size in cartItems[itemId]) {
            // Find the corresponding product
            const product = products.find(product => product._id === itemId);
            
            if (product) {
              // Add the total cost for this size and quantity to the total amount
              totalAmount += product.price * cartItems[itemId][size];
            }
          }
        }
      
        return totalAmount;
      };


    const value = useMemo(() => ({
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateQuantity,getCartAmount
        , navigate
    }), [products, currency, delivery_fee, search, showSearch, cartItems]);

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
