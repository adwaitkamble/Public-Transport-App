const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: { type: String, required: true },
  isActive: { type: Boolean, default: false },
});

const busSchema = new mongoose.Schema(
  {
    busNumber: {
      type: String,
      required: true,
      unique: true,
    },
    routeName: {
      type: String,
      required: true,
    },
    stops: [stopSchema],
    crowdLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    eta: {
      type: String,
      default: "5 min",
    },
    isOnTime: {
      type: Boolean,
      default: true,
    },
    distance: {
      type: String,
      default: "0 KM",
    },
    duration: {
      type: String,
      default: "0 min",
    },
    totalStops: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bus", busSchema);
