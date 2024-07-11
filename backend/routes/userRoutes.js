const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Endpoint để lấy danh sách users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('ticket');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;
