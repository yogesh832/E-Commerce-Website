import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData:{
type:Object,
default:{}
  }  ,

}, {minimize:false});
// because mongodb can remove the empty fields from the document, we need to set minimize to false to keep the empty fields

const userModel = mongoose.model.user || mongoose.model('user',userSchema );
export default userModel;
