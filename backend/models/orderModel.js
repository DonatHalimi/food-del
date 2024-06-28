import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        city: { type: mongoose.Schema.Types.ObjectId, ref: 'city', required: true },
        country: { type: mongoose.Schema.Types.ObjectId, ref: 'country', required: true },
        street: { type: String, required: true },
        zipcode: { type: String, required: true },
        phone: { type: String, required: true }
    },
    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: Date.now() },
    payment: { type: Boolean, default: false }
});

const orderModel = mongoose.models.order || mongoose.model("Order", orderSchema);

export default orderModel;