const asyncHandler = require("../utils/asyncHandler");
const cartModel = require("../models/cart.model");

exports.AddToCart = asyncHandler(async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.id;

  const cart = await cartModel.findOne({ user_id: userId });

  if (cart) {
    cart.eventsIDs.push(eventId);
    await cart.save();
  } else {
    await cartModel.create({ user_id: userId, eventsIDs: [eventId] });
  }

  res.status(200).json({ message: "Event added to cart" });
});

exports.getCartByUserId = asyncHandler(async (req, res) => {

  const userId = req.user.id;

  const cart = await cartModel.findOne({ user_id: userId }).populate("events","_id imageUrl title price date time location");

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  return res.status(200).json(cart);

});

exports.removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const eventId = req.params.eventId;

  const cart = await cartModel.findOne({ user_id: userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

cart.events = cart.events.filter((eventIdInCart) => eventIdInCart.toString() !== eventId.toString());

  await cart.save();

  return res.status(200).json({ message: "Event removed from cart",cart});
});

