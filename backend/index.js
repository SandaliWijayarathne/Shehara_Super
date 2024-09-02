const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/db");

const bannerRoutes = require("./routes/bannerRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.use('/images', express.static('upload/images'));
app.use('/banners', express.static('upload/banners'));

app.use(bannerRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(userRoutes);

app.get("/", (req, res) => {
    res.send("Express App is Running");
});

app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on Port " + port);
    } else {
        console.log("Error: " + error);
    }
});
