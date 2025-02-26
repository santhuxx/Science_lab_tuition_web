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

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullName,
      grade,
      birthDate,
      gender,
      schoolName,
      address,
      parentMobile,
      email,
      password: hashedPassword, // Store hashed password
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1min",
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
        return res.status(400).json({ message: "User not found" });
      }
  
      // Check if the entered password matches the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Create a JWT token with user details (user ID and role)
      const token = jwt.sign(
        { userId: user._id, role: user.role, fullName: user.fullName, email: user.email },
        process.env.JWT_SECRET, // Secret key stored in environment variables
        { expiresIn: "1min" } // Token expires in 1 hour
      );
  
      // Respond with token and user details
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
