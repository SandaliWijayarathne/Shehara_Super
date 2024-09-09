const Order = require("../models/Order");

const submitOrder = async (req, res) => {
    const { address, paymentMethod } = req.body;
    const trackingId = `TRK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    try {
        const newOrder = new Order({
            userId: req.user.id, // Ensure req.user is populated correctly
            address: address,
            paymentMethod: paymentMethod,
            trackingId: trackingId
        });

        await newOrder.save();
        console.log("Order placed successfully with tracking ID:", trackingId); // Added log for successful order submission
        res.json({ success: true, message: 'Order placed successfully', trackingId: trackingId });
    } catch (error) {
        console.error('Error submitting order:', error); // Improved error logging
        res.status(500).json({ success: false, message: 'Failed to submit order' });
    }
};

const removeOrder = async (req, res) => {
    try {
        const orderId = req.body.id;
        await Order.findByIdAndDelete(orderId);
        console.log(`Order with ID ${orderId} removed`); // Added log for successful order removal
        res.json({ success: true, message: `Order with ID ${orderId} removed` });
    } catch (error) {
        console.error('Error removing order:', error); // Improved error logging
        res.status(500).json({ error: "Failed to remove order" });
    }
};

module.exports = { submitOrder, removeOrder };
