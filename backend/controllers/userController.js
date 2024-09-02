const Users = require("../models/User");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Existing user found with same email address" });
        }

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });

        await user.save();

        const data = { user: { id: user.id } };
        const token = jwt.sign(data, 'secret_cake');
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ error: "Failed to register user" });
    }
};

const login = async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.json({ success: false, errors: "Wrong Email Id" });
        }

        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = { user: { id: user.id } };
            const token = jwt.sign(data, 'secret_cake');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to login user" });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const updatedUser = await Users.findByIdAndUpdate(
            userId,
            {
                name: req.body.name,
                address: req.body.address,
                contactNumber: req.body.contactNumber,
                cardNumber: req.body.cardNumber,
                profileImage: req.body.profileImage,
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Failed to update profile" });
    }
};

const getUserAddress = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id);
        if (user && user.address) {
            res.json({ success: true, address: user.address });
        } else {
            res.json({ success: false, message: 'No saved address found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch address' });
    }
};

const addToCart = async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] += 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Added");
    } catch (error) {
        res.status(500).json({ error: "Failed to add to cart" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        if (userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
        }
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Removed");
    } catch (error) {
        res.status(500).json({ error: "Failed to remove from cart" });
    }
};

const getCart = async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        res.json(userData.cartData);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch cart data" });
    }
};

module.exports = {
    signup,
    login,
    updateUserProfile,
    getUserAddress,
    addToCart,
    removeFromCart,
    getCart
};
