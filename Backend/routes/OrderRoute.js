import express from 'express';
import {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateStatus,
  userOrders,
} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin features
orderRouter.get("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment and order placement features for authenticated users
orderRouter.post("/place", authUser, placeOrder);          // Placing order with COD
orderRouter.post("/stripe", authUser, placeOrderStripe);    // Placing order with Stripe
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);// Placing order with Razorpay

// User feature to view their orders
orderRouter.post("/userOrders", authUser, userOrders);
  
export default orderRouter;
