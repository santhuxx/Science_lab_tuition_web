const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Admin Route - Only accessible by users with the 'teacher' role
router.get('/admin', protect, (req, res) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  res.json({ message: 'Welcome to the Admin Panel' });
});

module.exports = router;
