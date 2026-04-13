const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    routeTitle: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    busNumber: {
      type: String,
    },
    iconType: {
      type: String,
      enum: ["home", "work", "bus"],
      default: "bus",
    },
    eta: {
      type: String,
      default: "-- min",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", favoriteSchema);
