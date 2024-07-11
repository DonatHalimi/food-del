import reviewModel from '../models/reviewModel.js';

// Add a review
const addReview = async (req, res) => {
    try {
        console.log('Received review request:', req.body);

        const { userId, food, rating, comment } = req.body;

        // Check if all required fields are present
        if (!userId) {
            console.log('Missing userId');
            return res.status(400).json({ success: false, message: 'Missing userId' });
        }
        if (!food) {
            console.log('Missing food id');
            return res.status(400).json({ success: false, message: 'Missing food id' });
        }
        if (!rating) {
            console.log('Missing rating');
            return res.status(400).json({ success: false, message: 'Missing rating' });
        }
        if (!comment) {
            console.log('Missing comment');
            return res.status(400).json({ success: false, message: 'Missing comment' });
        }

        console.log('Creating new review model');
        const review = new reviewModel({
            user: userId,
            food,
            rating,
            comment
        });

        console.log('Saving review');
        await review.save();

        console.log('Review saved successfully');
        res.json({ success: true, message: "Review added successfully", review });
    } catch (error) {
        console.log('Error in addReview:', error);
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ success: false, message: 'Validation error', errors: validationErrors });
        }
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid ID format', field: error.path });
        }
        res.status(500).json({ success: false, message: 'Error adding review', error: error.message });
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