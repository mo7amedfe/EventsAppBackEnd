const express = require("express");
const router = express.Router();
const userController = require("./../controllers/user.controller");
const passwordIncryptMiddleware = require("../midllewares/passwordIncrypt.middleware");
const registerValidatorMiddleware = require("../midllewares/registerValidator.middleware");
const loginValidatorMiddleware = require("../midllewares/loginValidator.middleware");
const imageUpload = require("../midllewares/imageUpload");
const authorize = require("../midllewares/authorize.middleware");

router.post("/login", loginValidatorMiddleware, userController.login);
router.post(
  "/register",
  registerValidatorMiddleware,
  passwordIncryptMiddleware,
  userController.register
);
router.post("/editUser", authorize("admin","moderator","organizer","user") ,imageUpload("users").single("profilePic"),userController.editProfile);

module.exports = router;
