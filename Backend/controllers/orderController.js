import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing order using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
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
    // Logic for Razorpay payment integration
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
      { new: true } // Return the updated document
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
