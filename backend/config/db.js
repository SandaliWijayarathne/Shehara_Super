const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sanda:TVRS1234%23@cluster0.r6puny8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("Database Connection Failed", err));

module.exports = mongoose;
