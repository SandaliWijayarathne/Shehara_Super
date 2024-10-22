const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ },  // Ensure valid email
    password: { type: String, required: true, minlength: 6 },  // Ensure password is secure
    cartData: { type: Object },
    address: { type: String },
    contactNumber: { type: String },
    cardNumber: { type: String },
    profileImage: { type: String },
    date: { type: Date, default: Date.now },
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
