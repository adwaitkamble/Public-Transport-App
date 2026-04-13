const express = require("express");
const Favorite = require("../models/Favorite");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/favorites (protected) - Get user's favorites
router.get("/", auth, async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/favorites (protected) - Add a favorite
router.post("/", auth, async (req, res) => {
  try {
    const { routeTitle, subtitle, busNumber, iconType, eta } = req.body;

    // Check if already favorited
    const existing = await Favorite.findOne({
      userId: req.user._id,
      routeTitle,
    });
    if (existing) {
      return res.status(400).json({ message: "Already in favorites" });
    }

    const favorite = await Favorite.create({
      userId: req.user._id,
      routeTitle,
      subtitle,
      busNumber,
      iconType: iconType || "bus",
      eta: eta || "-- min",
    });

    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/favorites/:id (protected) - Remove a favorite
router.delete("/:id", auth, async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.json({ message: "Favorite removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
