// routes/problemRoutes.js
const express = require('express');
const { protect } = require('./authRoutes')
const router = express.Router();
const Problem = require('../models/Problem');

// Create a new problem
router.post('/', async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const newProblem = new Problem({ title, description, category });
    await newProblem.save();
    res.status(201).json(newProblem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create problem' });
  }
});

// Get all problems
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find().populate('solutions');
    res.status(200).json(problems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch problems' });
  }
});

module.exports = router;
