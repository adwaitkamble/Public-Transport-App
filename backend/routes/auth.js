const express = require("express");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Create user
    const user = await User.create({ fullName, email, phone, password });

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/auth/profile (protected)
router.get("/profile", auth, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/auth/profile (protected)
router.put("/profile", auth, async (req, res) => {
  try {
    const { fullName, email, phone } = req.body;
    const user = await User.findById(req.user._id);

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    await user.save();

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/google
router.post("/google", async (req, res) => {
  try {
    const { idToken } = req.body;
    
    // Verify the Google token cryptographically
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    // Extract user logic cleanly out of Google payload
    const { sub: googleId, email, name, picture } = ticket.getPayload();

    // Check if the user already exists matching Native Email OR GoogleId
    let user = await User.findOne({ $or: [{ email }, { googleId }] });

    if (!user) {
      // First time user logging in with Google. Autocreate their account securely!
      user = await User.create({
        fullName: name,
        email: email,
        googleId: googleId,
        // Optional parameters not provided by Google are safely omitted
      });
    } else if (!user.googleId) {
      // If user exists natively under email but logging in with google, link their account!
      user.googleId = googleId;
      await user.save();
    }

    // Return the native app standard JWT
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone || "",
      token: generateToken(user._id),
      isNewUser: !user.phone // Help the frontend determine if they should ask for phone number!
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(401).json({ message: "Invalid Google token" });
  }
});

module.exports = router;
