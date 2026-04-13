const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    buses: [
      {
        type: String, // bus numbers involved
      },
    ],
    transfers: {
      type: Number,
      default: 0,
    },
    departureTime: {
      type: String,
    },
    arrivalTime: {
      type: String,
    },
    estimatedTime: {
      type: String,
    },
    crowdLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    isRecommended: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Route", routeSchema);
