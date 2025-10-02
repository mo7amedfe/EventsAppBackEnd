const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../config/cloudnary");

  const storage = (folderName) =>
  new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      return {
        folder: `${folderName}/${req.user ? req.user._id : "general"}`,
        allowed_formats: ["jpg", "png", "jpeg"],
      };
    },
  });


const upload = (folderName) => multer({ storage: storage(folderName) });

module.exports = upload;
