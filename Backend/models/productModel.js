import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    images: {
        type: [String], // Store image URLs
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subcategory: {
        type: String,
        required: true,
    },
    sizes: {
        type: [String], // Use an array of strings for sizes
        required: true,
    },
    bestseller: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const productModel = mongoose.models.Product || mongoose.model('Product', productSchema);

export default productModel;
