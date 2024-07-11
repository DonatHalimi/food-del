import reviewModel from '../models/reviewModel.js';

const addReview = async (req, res) => {
    const { foodId, rating, comment } = req.body;
    console.log('Add review called', { foodId, rating, comment });

    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        console.log('Authenticated user:', req.user);

        const review = new reviewModel({
            user: req.user._id,
            food: foodId,
            rating,
            comment
        });

        await review.save();
        console.log('Review saved:', review);

        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).json({ success: false, message: 'Food not found' });
        }

        // Recalculate the average rating and number of reviews
        const reviews = await reviewModel.find({ food: foodId });
        const numberOfReviews = reviews.length;
        const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / numberOfReviews;

        food.numberOfReviews = numberOfReviews;
        food.averageRating = averageRating;

        await food.save();
        console.log('Food updated:', food);

        res.json({ success: true, message: 'Review added successfully' });
    } catch (error) {
        console.error('Error adding review:', error);
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