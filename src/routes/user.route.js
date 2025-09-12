const express = require("express");
const router = express.Router();
const userController = require('./../controllers/user.controller');
const passwordIncryptMiddleware = require("../midllewares/passwordIncrypt.middleware");
const registerValidatorMiddleware = require("../midllewares/registerValidator.middleware");
const loginValidatorMiddleware = require("../midllewares/loginValidator.middleware");
 

router.post("/login",loginValidatorMiddleware , userController.login);
router.post("/register",registerValidatorMiddleware , passwordIncryptMiddleware , userController.register);


module.exports = router;
