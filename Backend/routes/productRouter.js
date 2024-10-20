import express from "express";
import { addProduct, removeProduct, listProduct, singleProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

// Route for adding products (with image upload)
productRouter.post('/add', adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
]), addProduct);
32
// Route for removing products
productRouter.post('/remove', adminAuth, removeProduct);

// Route for listing products
productRouter.get('/list', listProduct);

// Route for fetching a single product
productRouter.post('/single', singleProduct);

export default productRouter;
