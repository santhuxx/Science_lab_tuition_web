// routes/userRoutes.js
const express = require("express");
const User = require("../models/User"); // Ensure you have a User model defined
const router = express.Router();

// Get all users (admin route)
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.json(users); // Send the user data as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

module.exports = router;


