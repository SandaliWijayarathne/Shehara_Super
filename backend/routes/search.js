const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Search Endpoint
router.get('/', async (req, res) => {
    const query = req.query.q;
    try {
        const products = await Product.find({ name: new RegExp(query, 'i') }); // Case-insensitive search
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
