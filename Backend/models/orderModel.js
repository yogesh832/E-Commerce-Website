import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type:String, ref: 'First Name', required: true},
  lastName: { type:String, ref: 'Last Name', required: true},
  items: [{ type: Object, required: true }], // Array to hold multiple items
  amount: { type: Number, required: true },
  pincode: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "order placed" },
  paymentMethod: { type: String, required: true },
  phone: { type: Number, required: true},
  payment: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

const orderModel = mongoose.model('Order', orderSchema);
export default orderModel;
