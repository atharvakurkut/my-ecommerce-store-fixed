const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId: { type: String, required: true }, // changed to String
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  rating: { type: Number, required: true },
  title: { type: String },
  comment: { type: String },
  helpfulVotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);
