// controllers/reviewController.js
import reviewModel from '../models/reviewModel.js';

// Add a review
const addReview = async (req, res) => {
    try {
        const { userId, food, rating, comment } = req.body;

        const review = new reviewModel({
            user: userId,  // Use the authenticated user's ID
            food,
            rating,
            comment
        });

        await review.save();

        res.json({ success: true, message: "Review added successfully", review });
    } catch (error) {
        console.log('Error in addReview:', error);
        res.status(500).json({ success: false, message: 'Error adding review' });
    }
};

// Get reviews for a food item
const getReviews = async (req, res) => {
    try {
        const { foodId } = req.params;
        const reviews = await reviewModel.find({ food: foodId }).populate('user', 'name');
        res.json({ success: true, data: reviews });
    } catch (error) {
        console.log('Error in getReviews:', error);
        res.status(500).json({ success: false, message: 'Error getting reviews' });
    }
};

export { addReview, getReviews };