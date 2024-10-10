const express = require('express');
const User = require('../models/userSchema');
const router = express.Router();

// Add a new user
router.post('/users', async (req, res) => {
  const { name } = req.body;
  const newUser = new User({ name });
  await newUser.save();
  res.status(201).json(newUser);
});

// Get all users, sorted by points
router.get('/users', async (req, res) => {
  const users = await User.find().sort({ points: -1 });
  res.json(users);
});

// Assign random points and save the history
router.post('/users/:id/claim', async (req, res) => {
  const user = await User.findById(req.params.id);
  const points = Math.floor(Math.random() * 10) + 1;
  
  user.points += points;
  user.pointHistory.push({ points });
  
  await user.save();
  res.json(user);
});

module.exports = router;
