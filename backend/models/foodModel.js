import mongoose from 'mongoose'

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true },
    image: { type: String, required: true },
    averageRating: { type: Number, default: 0 },
    numberOfReviews: { type: Number, default: 0 }
}, { timestamps: true });

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema)

export default foodModel;