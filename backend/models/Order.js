const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    trackingId: { type: String, unique: true },
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending' }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
