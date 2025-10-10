// Needed Resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities");

const reviewController = require('../controllers/reviewController');

// Submit a review 
router.post('/submit', reviewController.addReview);

// Delete a review
router.post('/delete/:reviewId', reviewController.deleteReview);
router.get('/vehicle/:invId', reviewController.getReviewsForVehicle);

module.exports = router;