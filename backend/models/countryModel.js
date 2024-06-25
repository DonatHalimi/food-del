import mongoose from 'mongoose'

const countrySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, },
});

const countryModel = mongoose.models.country || mongoose.model("country", countrySchema)

export default countryModel;