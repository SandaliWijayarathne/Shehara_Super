import mongoose from "mongoose";

// Schema for creating orders
const orderSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model("orders",orderSchema);