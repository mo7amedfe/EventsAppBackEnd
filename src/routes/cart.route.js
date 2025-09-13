const express = require('express');
router = express.Router();
const cartController = require('./../controllers/cart.controller');
const authorize = require('./../midllewares/authorize.middleware');

router.post("/addToCart",authorize("user") ,cartController.AddToCart);
router.get("/",authorize("user"),cartController.getCartByUserId);
router.delete("/removeFromCart/:eventId",authorize("user"),cartController.removeFromCart);

module.exports=router;