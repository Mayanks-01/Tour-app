const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Tour = require('../models/Tour');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to check token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.userId = verified.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Create Tour
router.post('/create', verifyToken, async (req, res) => {
  try {
    const { image, steps, isPublic } = req.body;
    const tour = new Tour({ userId: req.userId, image, steps, isPublic });
    await tour.save();
    res.status(201).json({ message: 'Tour saved', tourId: tour._id });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save tour', error: err.message });
  }
});

// Get all tours created by the logged-in user
router.get('/my-tours', verifyToken, async (req, res) => {
  try {
    const tours = await Tour.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tours' });
  }
});

// Get tour by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const tour = await Tour.findOne({ _id: req.params.id, userId: req.userId });
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tour' });
  }
});


// Delete tour by ID
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const tour = await Tour.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!tour) return res.status(404).json({ message: 'Tour not found or unauthorized' });

    res.json({ message: 'Tour deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete tour' });
  }
});


// Update a tour by ID
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { image, steps, isPublic } = req.body;

    const updatedTour = await Tour.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { image, steps, isPublic },
      { new: true }
    );

    if (!updatedTour) {
      return res.status(404).json({ message: 'Tour not found or unauthorized' });
    }

    res.json({ message: 'Tour updated successfully', updatedTour });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update tour' });
  }
});


// Get public tour by ID (no auth)
router.get('/public/:id', async (req, res) => {
  try {
    const tour = await Tour.findOne({ _id: req.params.id, isPublic: true });
    if (!tour) return res.status(404).json({ message: 'Tour not found or private' });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: 'Error loading tour' });
  }
});


module.exports = router;
