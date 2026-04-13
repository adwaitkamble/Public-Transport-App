const express = require("express");
const Ticket = require("../models/Ticket");
const auth = require("../middleware/auth");

const router = express.Router();

// POST /api/tickets/book (protected) - Book a ticket
router.post("/book", auth, async (req, res) => {
  try {
    const { ticketType, price, paymentMethod } = req.body;

    // Calculate validity
    let validUntil;
    if (ticketType === "daily_pass") {
      validUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    } else {
      validUntil = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours for single ticket
    }

    const ticket = await Ticket.create({
      userId: req.user._id,
      ticketType: ticketType || "daily_pass",
      price: price || 50,
      validUntil,
      paymentMethod: paymentMethod || "upi",
      status: "active",
    });

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    res.status(201).json({
      success: true,
      message: "Payment successful! Ticket booked.",
      ticket,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/tickets/my (protected) - Get user's tickets
router.get("/my", auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    // Update expired tickets
    const now = new Date();
    for (const ticket of tickets) {
      if (ticket.status === "active" && ticket.validUntil < now) {
        ticket.status = "expired";
        await ticket.save();
      }
    }

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
