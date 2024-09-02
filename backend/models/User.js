const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Object },
    address: { type: String },
    contactNumber: { type: String },
    cardNumber: { type: String },
    profileImage: { type: String },
    date: { type: Date, default: Date.now },
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
