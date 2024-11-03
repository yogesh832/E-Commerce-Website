import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// Function to add products
const addProduct = async (req, res) => {
    try {
        console.log('Received request:', req.body);
        console.log('Files:', req.files);  // Log the files received

        const { name, description, price, category, subcategory, sizes, bestseller } = req.body;

        // Handling image uploads
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        console.log('Image 1:', image1);  // Log each image received

        const images = [image1, image2, image3, image4].filter(item => item !== undefined);
        console.log('images', images, sizes)
        // Upload images to Cloudinary
        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                try {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                    return result.secure_url;
                } catch (uploadError) {
                    console.error('Error uploading image:', uploadError.message);
                    throw new Error('Image upload failed');
                }
            })
        );

        // Prepare product data
        const productData = {
            name,
            description,
            price: Number(price),
            images: imagesUrl,
            category,
            subcategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === 'true', // Converts bestseller to boolean
            date: Date.now(),
        };

        console.log('product data', productData)

        // Save product to the database
        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: 'Product added successfully' });
    } catch (error) {
        console.error('Error adding product:', error.message, error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to list products with optional pagination
const listProduct = async (req, res) => {
    try {
        // Retrieve all products without pagination
        const products = await productModel.find({});

        res.json({
            success: true,
            products,
            totalProducts: products.length  // Total number of products in the list
        });
    } catch (error) {
        console.error('Error listing products:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};


const removeProduct = async (req, res) => {
    try {
        const { name } = req.body;  // Expecting 'name' in the request body
        const result = await productModel.deleteOne({ name });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, message: 'Product removed successfully' });
    } catch (error) {
        console.error('Error removing product:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
    

// Function to fetch a single product by ID
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, product });
    } catch (error) {
        console.error('Error fetching product:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addProduct, listProduct, removeProduct, singleProduct };
