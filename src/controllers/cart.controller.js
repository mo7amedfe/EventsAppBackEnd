const asyncHandler = require("../utils/asyncHandler");
const cartModel = require("../models/cart.model");
const orderModel = require("../models/order.model");


exports.AddToCart = asyncHandler(async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.id;

  const cart = await cartModel.findOne({ user_id: userId });

  if (cart) {
    cart.events.push(eventId);
    await cart.save();
  } else {
    await cartModel.create({ user_id: userId, events: [eventId] });
  }

  res.status(200).json({ message: "Event added to cart" });
});

exports.getCartByUserId = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const cart = await cartModel
    .findOne({ user_id: userId })
    .populate("events", "_id imageUrl title price date time location");

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

  cart.events = cart.events.filter(
    (eventIdInCart) => eventIdInCart.toString() !== eventId.toString()
  );

  await cart.save();

  return res.status(200).json({ message: "Event removed from cart", cart });
});

exports.checkout = asyncHandler(async (req, res) => {
  const userId = req.user.id;

 const cart = await cartModel.findOne({ user_id: userId }).populate("events", "_id price");
 let events = cart?.events || [];
  if (!events || events.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  let totalPrice = 0;
  let eventIDs = [];

  for (let i = 0; i < events.length; i++) {

    totalPrice += events[i].price;
    eventIDs.push(events[i]._id);

  }

  const order = await orderModel.create({
    events: eventIDs,
    user_id: userId,
    status: "paid",
    totalPrice: totalPrice,
  });
  if (!order) {
    return res.status(500).json({ message: "Order creation failed" });
  }
  await cartModel.findOneAndDelete({ user_id: userId });
  return res.status(200).json({ message: "Order placed", order });
});
