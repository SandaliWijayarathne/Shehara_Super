const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Create Order Endpoint
router.post('/api/order', async (req, res) => {
    const { address, contactNumber, items, totalAmount } = req.body;

    console.log('Received order data:', req.body); // Log the received data

    const newOrder = new Order({
        address,
        contactNumber,
        items,
        totalAmount,
    });

    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error('Error saving order:', err);
        res.status(400).json({ message: err.message });
    }
});

// Get Orders Endpoint
router.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: err.message });
    }
});

// Delete Order Endpoint
router.post('/api/removeorder', async (req, res) => {
    try {
        const orderId = req.body.id;
        await Order.findByIdAndDelete(orderId);
        console.log(`Removed order with ID: ${orderId}`);
        res.json({ success: true, message: `Order with ID ${orderId} removed` });
    } catch (error) {
        console.error('Error removing order:', error);
        res.status(500).json({ error: "Failed to remove order" });
    }
});

module.exports = router;
