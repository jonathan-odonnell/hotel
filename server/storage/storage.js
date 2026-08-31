const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path')

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        public_id: path.parse(req.file.originalname).name,
        folder: 'beach-resort',
        allowedFormats: ['jpeg', 'png', 'jpg'],
        use_filename: true,
        unique_filename: true,
    }                                                              
}); 

module.exports = storage