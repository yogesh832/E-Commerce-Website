import userModel from "../models/userModel.js";

// Add product to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        // Check if the item and size exist in the cart
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size]++;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = { [size]: 1 };
        }

        // Update user's cart data in the database
        await userModel.findByIdAndUpdate(userId, { $set: { cartData } });

        res.json({ success: true, message: "Product added to cart" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update product in user cart
const updateCart = async (req, res) => {
    try {
        
        const {userId, itemId , size , quantity} =req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        
        cartData[itemId][size]= quantity;

        await userModel.findByIdAndUpdate(userId, { $set: { cartData } });

        res.json({ success: true, message: "cart upadated" });
    } catch (error) {
        console.log(err.message);
        res.status(500).json({ success: false, message: err.message });   
    }
};



// Get user cart data
const getUserCart = async (req, res) => {

    try {
        
const {userId } = req.body;
 
const userData = await userModel.findById(userId);
let cartData = await userData.cartData;

res.json({ success: true, cartData });


    } catch (error) {
        console.log(err.message);
        res.status(500).json({ success: false, message: err.message });   
   
    }


};

export { addToCart, updateCart, getUserCart };
