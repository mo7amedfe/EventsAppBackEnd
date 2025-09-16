const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    required: true,
    type: String,
    enum: ["pending", "paid", "cancelled"],
    default: "pending",
  },
  totalPrice: {
    required: true,
    type: Number,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  ],
  paidAt: {
    type: Date.now,
  }
} ,
{ timestamps: true });

module.export=mongoose.model("Order",orderSchema)