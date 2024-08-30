// routes/solutionRoutes.js
const express = require('express');
const router = express.Router();
const Solution = require('../models/Solution');
const Problem = require('../models/Problem');

// Submit a solution to a problem
router.post('/api/problems/:problemId/solutions', async (req, res) => {
  const { problemId } = req.params;
  const { content, author } = req.body;

  try {
    const newSolution = new Solution({ problemId, content, author });
    await newSolution.save();

    const problem = await Problem.findById(problemId);
    problem.solutions.push(newSolution._id);
    await problem.save();

    res.status(201).json(newSolution);
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit solution' });
  }
});

// Get all solutions for a problem
router.get('/:problemId', async (req, res) => {
  const { problemId } = req.params;
  try {
    const solutions = await Solution.find({ problemId });
    res.status(200).json(solutions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch solutions' });
  }
});

module.exports = router;
