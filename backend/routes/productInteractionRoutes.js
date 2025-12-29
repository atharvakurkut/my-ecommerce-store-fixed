const express = require('express');
const Review = require('../models/Review');
const Question = require('../models/Question');
const router = express.Router();

// POST a review
router.post('/reviews/:productId', async (req, res) => {
  try {
    const { userName, userEmail, rating, title, comment } = req.body;
    const review = new Review({
      productId: req.params.productId,
      userName,
      userEmail,
      rating,
      title,
      comment
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error('reviews POST error', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET reviews for a product
router.get('/reviews/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('reviews GET error', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a question
router.post('/questions/:productId', async (req, res) => {
  try {
    const { userName, userEmail, question } = req.body;
    const q = new Question({
      productId: req.params.productId,
      userName,
      userEmail,
      question
    });
    await q.save();
    res.status(201).json(q);
  } catch (error) {
    console.error('questions POST error', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET questions for a product
router.get('/questions/:productId', async (req, res) => {
  try {
    const questions = await Question.find({ productId: req.params.productId }).sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    console.error('questions GET error', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST an answer to question
router.post('/questions/:questionId/answer', async (req, res) => {
  try {
    const { userName, userEmail, answer } = req.body;
    const q = await Question.findById(req.params.questionId);
    if (!q) return res.status(404).json({ message: 'Question not found' });
    q.answers.push({ userName, userEmail, answer });
    await q.save();
    res.json(q);
  } catch (error) {
    console.error('answer POST error', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
