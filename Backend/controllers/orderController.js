import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay  from "razorpay";
import dotenv from "dotenv";
dotenv.config();

//global variables
const curruncy = 'inr'
const deliveryCharge = 10

console.log("Razorpay Key ID:", process.env.RAZORPAY_Key_ID);
console.log("Razorpay Key Secret:", process.env.RAZORPAY_Key_SECRET);

// Verify Razorpay credentials
if (!process.env.RAZORPAY_Key_ID || !process.env.RAZORPAY_Key_SECRET) {
  throw new Error("Razorpay key_id and key_secret must be set in the environment variables");
}


// Gateway initialization
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_Key_ID,
  key_secret: process.env.RAZORPAY_Key_SECRET
});


console.log(razorpayInstance);
// Placing order using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address , firstName, lastName, phone, pincode} = req.body;

    const orderData = {
      userId,
      firstName,
      lastName,
      phone,
      items,
      address,
      pincode,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Updating user's order data (use push for multiple orders)
    await userModel.findByIdAndUpdate(userId, {
      $push: { orders: newOrder._id },
    });

    res.json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ success: false, message: "Order not created" });
  }
};

// Placeholder functions for payment methods (Stripe, Razorpay)
const placeOrderStripe = async (req, res) => {
  try {
    // Logic for Stripe payment integration
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, address, amount } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100, // amount in the smallest currency unit (e.g., cents)
      currency: "INR", // Change this to the desired currency
      receipt: newOrder._id.toString(),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin route to get all orders
const allOrders = async (req, res) => {
  try {
    console.log("Headers:", req.headers);
    console.log("Request received for all orders");

    const orders = await orderModel.find().populate("userId"); // Populate user details in orders
    console.log("Fetched orders:", orders);

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch orders for the authenticated user
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body; // Assume userId is sent in the request body

    const orders = await orderModel.find({ userId }); // Fetch orders by userId
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin function to update order status (e.g., from "pending" to "shipped")
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body; // Assume status and orderId are sent in the body

    // Update the order status
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status }, // Updating the status of the order
    
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};