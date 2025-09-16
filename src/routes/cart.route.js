const express = require('express');
router = express.Router();
const cartController = require('./../controllers/cart.controller');
const authorize = require('./../midllewares/authorize.middleware');
const router = require('./event.route');

router.post("/addToCart",authorize("user") ,cartController.AddToCart);
router.get("/",authorize("user"),cartController.getCartByUserId);
router.delete("/removeFromCart/:eventId",authorize("user"),cartController.removeFromCart);
router.post("/checkout",authorize("user"),cartController.checkout);

module.exports=router;