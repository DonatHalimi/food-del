import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    food: { type: mongoose.Schema.Types.ObjectId, ref: 'food', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
}, { timestamps: true });

const reviewModel = mongoose.models.review || mongoose.model("review", reviewSchema)

export default reviewModel;