const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const busRoutes = require("./routes/buses");
const routeRoutes = require("./routes/routes");
const ticketRoutes = require("./routes/tickets");
const favoriteRoutes = require("./routes/favorites");
const paymentRoutes = require("./routes/payment");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/payment", paymentRoutes);

// Root route for quick browser checks
app.get("/", (req, res) => {
  res.send("Smart Bus API is running. Use /api/health for status.");
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Smart Bus API is running" });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Smart Bus API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
