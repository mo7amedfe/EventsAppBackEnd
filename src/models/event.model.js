const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    organizer_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date, 
      default: null,
    },
    time: {
      type: String,
      default: "soon",
    },
    location: {
      type: String,
      default: "No Location Yet",
    },
    imageUrl: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Declined"],
      default: "Pending",
    },
    decision: {
      decisionedById: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      reason: {
        type: String,
        trim: true,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
