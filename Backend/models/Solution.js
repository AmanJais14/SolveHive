// models/Solution.js
const mongoose = require('mongoose');

const SolutionSchema = new mongoose.Schema({
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  content: { type: String, required: true },
  author: {
    type: String, // You can later change this to reference a User model if you implement user authentication
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Solution', SolutionSchema);
