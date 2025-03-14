const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const {
      fullName,
      grade,
      birthDate,
      gender,
      schoolName,
      address,
      parentMobile,
      email,
      password,
    } = req.body;

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create new user without manually hashing the password
    const newUser = new User({
      fullName,
      grade,
      birthDate,
      gender,
      schoolName,
      address,
      parentMobile,
      email,
      password, // Password will be hashed by the pre-save hook
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Changed to 1 hour for better usability
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Sign In Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Create JWT token
      const token = jwt.sign(
        { 
          userId: user._id, 
          role: user.role, 
          fullName: user.fullName, 
          email: user.email 
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.json({
        token,
        user: {
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;