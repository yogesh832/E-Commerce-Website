import multer from 'multer';
import path from 'path';

// Define storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // Set the folder where files will be stored
        callback(null, 'uploads/'); // You can replace 'uploads/' with any directory path
    },
    filename: function (req, file, callback) {
        // Preserve the original file name
        callback(null, file.originalname);
    }
});

// Initialize the upload middleware
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Set a 5MB file size limit
    },
    fileFilter: (req, file, callback) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extname && mimeType) {
            callback(null, true);
        } else {
            callback(new Error('Only images (jpg, jpeg, png) are allowed!'));
        }
    }
});

export default upload;
