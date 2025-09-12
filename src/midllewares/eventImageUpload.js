const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../config/cloudnary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {

    folder: 'events', // الفولدر اللي هيتخزن فيه الصور

    allowed_formats: ['jpg', 'png', 'jpeg'],
    
  },
});

const upload = multer({ storage: storage });

module.exports = upload;