const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  answer: { type: String, required: true },
  helpfulVotes: { type: [String], default: [] },
}, { timestamps: true });

const questionSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  question: { type: String, required: true },
  answers: [answerSchema],
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
