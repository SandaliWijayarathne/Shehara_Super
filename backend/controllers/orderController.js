const Order = require("../models/Order");

const submitOrder = async (req, res) => {
    const { address, paymentMethod } = req.body;
    const trackingId = `TRK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    try {
        const newOrder = new Order({
            userId: req.user.id,
            address: address,
            paymentMethod: paymentMethod,
            trackingId: trackingId
        });

        await newOrder.save();
        res.json({ success: true, message: 'Order placed successfully', trackingId: trackingId });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to submit order' });
    }
};

const removeOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: `Order with ID ${req.body.id} removed` });
    } catch (error) {
        res.status(500).json({ error: "Failed to remove order" });
    }
};

module.exports = { submitOrder, removeOrder };
