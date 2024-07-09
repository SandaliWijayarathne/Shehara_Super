const port = 4000;
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cors());
app.use('/images', express.static('upload/images'));

// Import Routes
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');
const searchRoutes = require('./routes/search');

// Use Routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);
app.use('/search', searchRoutes);

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
