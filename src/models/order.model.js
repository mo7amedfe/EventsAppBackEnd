const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    events: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Event",
        required: true,
      },
    ],
    paidAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
