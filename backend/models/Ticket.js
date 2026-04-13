const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketType: {
      type: String,
      enum: ["daily_pass", "single"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["upi", "netbanking", "card"],
      default: "upi",
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
