// models/Problem.js
const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  solutions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Solution' }]
});

module.exports = mongoose.model('Problem', ProblemSchema);
