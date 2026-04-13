const express = require("express");
const Route = require("../models/Route");

const router = express.Router();

// GET /api/routes/search?from=X&to=Y - Search routes
router.get("/search", async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ message: "Both 'from' and 'to' are required" });
    }

    const routes = await Route.find({
      from: { $regex: from, $options: "i" },
      to: { $regex: to, $options: "i" },
    });

    // Sort: recommended first
    routes.sort((a, b) => (b.isRecommended ? 1 : 0) - (a.isRecommended ? 1 : 0));

    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/routes - List all routes
router.get("/", async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
