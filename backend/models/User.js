const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ },
    password: { type: String, minlength: 6 },  // Optional for Google login
    googleId: { type: String }, // Added for Google OAuth
    cartData: { type: Object },
    address: { type: String },
    contactNumber: { type: String },
    cardNumber: { type: String },
    profileImage: { type: String },
    date: { type: Date, default: Date.now },
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
