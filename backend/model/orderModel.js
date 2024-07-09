const mongoose =require("mongoose");

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

module.exports = mongoose.model("orders", orderSchema);