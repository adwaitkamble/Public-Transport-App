const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// POST /api/payment/create-payment-intent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency = "inr", ticketType } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    // Convert amount to smallest currency unit (e.g., paise for INR)
    // Stripe expects amounts in smallest unit, so 50 INR = 5000 paise
    const amountInSmallestUnit = Math.round(amount * 100);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInSmallestUnit,
      currency: currency,
      description: `Smart Bus Ticket - ${ticketType}`,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        ticketType: ticketType || "unknown",
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ message: error.message || "Failed to create payment intent" });
  }
});

module.exports = router;
