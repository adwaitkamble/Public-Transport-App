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
    const { fullName, email, phone, gender, dob, location, isProfileComplete } = req.body;
    const user = await User.findById(req.user._id);

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (gender) user.gender = gender;
    if (dob) user.dob = dob;
    if (location) user.location = location;
    
    // Automatically set isProfileComplete to true if required fields are provided
    if (isProfileComplete !== undefined) {
        user.isProfileComplete = isProfileComplete;
    } else if (user.fullName !== "Phone User" && user.email && user.gender && user.location) {
        user.isProfileComplete = true;
    }

    await user.save();

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      dob: user.dob,
      location: user.location,
      isProfileComplete: user.isProfileComplete,
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

// ─── Phone OTP Authentication via Twilio Verify ──────────────────────────
const twilio = require("twilio");
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const VERIFY_SID = process.env.TWILIO_VERIFY_SID;

// POST /api/auth/phone/send-otp
router.post("/phone/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone || phone.length < 10) {
      return res.status(400).json({ message: "Please enter a valid phone number" });
    }

    // Clean phone number and add India country code
    const cleanPhone = phone.replace(/[\s\-\+]/g, "").replace(/^91/, "");
    const fullPhone = `+91${cleanPhone}`;

    console.log(`\n📱 Sending OTP to ${fullPhone}...`);

    // Use Twilio Verify to send OTP
    const verification = await twilioClient.verify.v2
      .services(VERIFY_SID)
      .verifications.create({
        to: fullPhone,
        channel: "sms",
      });

    console.log(`✅ Twilio status: ${verification.status}\n`);

    res.json({
      message: "OTP sent to your phone!",
      sms_sent: true,
    });
  } catch (error) {
    console.error("❌ Twilio send error:", error.message);
    res.status(500).json({ message: "Failed to send OTP: " + error.message });
  }
});

// POST /api/auth/phone/verify-otp
router.post("/phone/verify-otp", async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ message: "Phone number and OTP are required" });
    }

    const cleanPhone = phone.replace(/[\s\-\+]/g, "").replace(/^91/, "");
    const fullPhone = `+91${cleanPhone}`;

    console.log(`🔍 Verifying OTP for ${fullPhone}...`);

    // Use Twilio Verify to check OTP
    const verificationCheck = await twilioClient.verify.v2
      .services(VERIFY_SID)
      .verificationChecks.create({
        to: fullPhone,
        code: otp,
      });

    if (verificationCheck.status !== "approved") {
      return res.status(400).json({ message: "Invalid OTP. Please try again." });
    }

    console.log(`✅ OTP verified for ${fullPhone}\n`);

    // Find or create user by phone number
    let user = await User.findOne({ phone: cleanPhone });

    if (!user) {
      user = await User.create({
        fullName: "Phone User",
        email: `${cleanPhone}@phone.smartbus.app`,
        phone: cleanPhone,
      });
    }

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      dob: user.dob,
      location: user.location,
      isProfileComplete: !!user.isProfileComplete,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("❌ Twilio verify error:", error.message);
    if (error.code === 20404) {
      return res.status(400).json({ message: "OTP expired. Please request a new one." });
    }
    res.status(500).json({ message: "Verification failed: " + error.message });
  }
});

module.exports = router;

