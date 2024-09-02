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
//Upvote a solution 
router.post('/api/solutions/:id/upvote', async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id);
    solution.upvotes += 1;
    await solution.save();
    res.json(solution);
  } catch (err) {
    res.status(500).json({ error: 'Failed to upvote' });
  }
});
// Downvote a solution
router.post('/api/solutions/:id/downvote', async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id);
    solution.downvotes += 1;
    await solution.save();
    res.json(solution);
  } catch (err) {
    res.status(500).json({ error: 'Failed to downvote' });
  }
});

// Search for problems by title or description
router.get('/api/problems/search', async (req, res) => {
  const { query } = req.query;
  
  try {
    const problems = await Problem.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }).populate('solutions');
    res.status(200).json(problems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search problems' });
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
