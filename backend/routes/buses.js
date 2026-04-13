const express = require("express");
const Bus = require("../models/Bus");

const router = express.Router();

// GET /api/buses - List all buses
router.get("/", async (req, res) => {
  try {
    const buses = await Bus.find().select("-stops");
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/buses/search?q=query - Search buses
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const buses = await Bus.find({
      $or: [
        { busNumber: { $regex: q, $options: "i" } },
        { routeName: { $regex: q, $options: "i" } },
        { "stops.name": { $regex: q, $options: "i" } },
      ],
    });
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/buses/:id - Get bus details with stops
router.get("/:id", async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
