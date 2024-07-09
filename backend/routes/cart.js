const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchUser = require("../middleware/auth");

// Add to Cart Endpoint
router.post('/addtocart', fetchUser, async (req, res) => {
    try {
        console.log("Added", req.body.itemId);
        let userData = await User.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] += 1;
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Added");
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ error: "Failed to add to cart" });
    }
});

// Remove from Cart Endpoint
router.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        console.log("Removed", req.body.itemId);
        let userData = await User.findOne({ _id: req.user.id });
        if (userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
        }
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Removed");
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ error: "Failed to remove from cart" });
    }
});

// Get Cart Data Endpoint
router.post('/getcart', fetchUser, async (req, res) => {
    try {
        console.log("GetCart");
        let userData = await User.findOne({ _id: req.user.id });
        res.json(userData.cartData);
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ error: "Failed to fetch cart data" });
    }
});

module.exports = router;
