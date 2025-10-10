const Review = require('../models/Review'); // your model

// Submit review (create or update)
exports.submitReview = async (req, res) => {
  try {
    const { inv_id, rating, review_text } = req.body;
    const accountId = req.session.user.account_id; // assuming session holds logged-in user

    // Check if user already reviewed this vehicle
    const existingReview = await Review.getUserReview(accountId, inv_id);

    if (existingReview) {
      // update review
      await Review.updateReview(existingReview.review_id, rating, review_text);
    } else {
      // add new review
      await Review.addReview(accountId, inv_id, rating, review_text);
    }

    // Redirect back to vehicle page 
    res.redirect(`/vehicle/${inv_id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error submitting review');
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    await Review.deleteReview(reviewId);
    res.redirect('back'); // go back to previous page
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting review');
  }
};

// Fetch reviews for a vehicle (if needed via AJAX)
exports.getReviewsForVehicle = async (req, res) => {
  try {
    const invId = req.params.invId;
    const reviews = await Review.getReviewsByVehicle(invId);
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching reviews');
  }
};