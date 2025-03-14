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

// Delete a user by ID
// Delete a user by ID
// Delete a user by ID
router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error("Error deleting user:", error); // Log error
    res.status(500).json({ message: 'Error deleting user' });
  }
});
// Update a user's details by ID
router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body; // The updated user data will be in the request body
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }); // Update the user
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser); // Send the updated user data back
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
});

module.exports = router;

