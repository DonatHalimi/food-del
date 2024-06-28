import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'country'
    },
    zipcode: { type: String, required: true }
});

const cityModel = mongoose.models.city || mongoose.model("city", citySchema);

export default cityModel;
