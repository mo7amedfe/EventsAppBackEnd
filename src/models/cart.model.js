const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    events: [
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Event",
      },
    ],
      totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);



module.exports = mongoose.model("Cart", cartSchema);
