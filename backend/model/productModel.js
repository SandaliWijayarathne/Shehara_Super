const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: { // Corrected typo from "categoty" to "category"
        type: String,
        default: "electronic" // Corrected typo from "electornic" to "electronic"
    },
    new_price: {
        type: Number,
        default: 300
    },
    old_price: {
        type: Number,
        default: 500
    },
    description: {
        type: String,
        default: "Quality"
    },
    availability: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("products", productSchema);
