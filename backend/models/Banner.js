const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    url: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;


