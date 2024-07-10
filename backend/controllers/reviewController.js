import reviewModel from '../models/reviewModel.js';
import foodModel from '../models/foodModel.js';

const addReview = async (req, res) => {
    const { foodId, rating, comment } = req.body;

    try {
        const review = new reviewModel({
            user: req.user._id,
            food: foodId,
            rating,
            comment
        });

        await review.save();

        const food = await foodModel.findById(foodId);
        food.numberOfReviews++;
        food.averageRating = (food.averageRating * (food.numberOfReviews - 1) + rating) / food.numberOfReviews;

        await food.save();

        res.json({ success: true, message: 'Review added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding review' });
    }
};

const listReviews = async (req, res) => {
    const { foodId } = req.params;

    try {
        const reviews = await reviewModel.find({ food: foodId }).populate('user', 'name');
        res.json({ success: true, data: reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error listing reviews' });
    }
};

export { addReview, listReviews };
