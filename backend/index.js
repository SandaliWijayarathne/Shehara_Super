// Server Setup and Middleware
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect("mongodb+srv://sanda:TVRS1234%23@cluster0.r6puny8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

// Root Endpoint
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Middleware to Fetch User
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using valid token" });
    }
    try {
        const data = jwt.verify(token, 'secret_cake');
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ errors: "Invalid token. Please authenticate again." });
    }
};

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });
app.use('/images', express.static('upload/images'));

// Upload Banner Endpoint
app.post("/bannerupload", upload.single('banner'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }

    const imageUrl = `http://localhost:${port}/images/${req.file.filename}`;

    const banner = new Banner({ url: imageUrl });

    try {
        await banner.save();
        console.log("Banner uploaded and saved");
        res.json({ success: 1, image_url: imageUrl, banner });
    } catch (error) {
        console.error("Error saving banner:", error);
        res.status(500).json({ error: "Failed to save banner" });
    }
});

// Banner Schema
const Banner = mongoose.model("Banner", {
    url: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

// Get All Banners
app.get('/allbanners', async (req, res) => {
    try {
        const banners = await Banner.find({});
        console.log("All banners fetched");
        res.json(banners);
    } catch (error) {
        console.error("Error fetching banners:", error);
        res.status(500).json({ error: "Failed to fetch banners" });
    }
});

// Remove Banner
app.delete('/removebanner/:id', async (req, res) => {
    try {
        const bannerId = req.params.id;
        await Banner.findByIdAndDelete(bannerId);
        console.log(`Banner removed with ID: ${bannerId}`);
        res.json({ success: true, message: `Banner with ID ${bannerId} removed` });
    } catch (error) {
        console.error("Error removing banner:", error);
        res.status(500).json({ error: "Failed to remove banner" });
    }
});

// Product Schema
const Product = mongoose.model("Product", {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
});

// Add Product
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        price: req.body.price,
    });

    await product.save();
    console.log("Saved");

    res.json({ success: true, name: req.body.name });
});

// Remove Product
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");

    res.json({ success: true, name: req.body.name });
});

// Get All Products
app.get('/allproducts', async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("All products Fetched");
        res.json(products);
    } catch (error) {
        console.error("Error fetching all products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

// Update Product Price
app.put('/updateprice/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        await product.save();
        console.log("Prices updated");

        res.json({ success: true, product });
    } catch (error) {
        console.error("Error updating prices:", error);
        res.status(500).json({ error: "Failed to update prices" });
    }
});

// Order Schema
const orderSchema = new mongoose.Schema({
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    items: { type: Array, required: true },
    totalAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

// Create Order
app.post('/api/order', async (req, res) => {
    const { address, contactNumber, items, totalAmount } = req.body;

    console.log('Received order data:', req.body);

    const newOrder = new Order({
        address,
        contactNumber,
        items,
        totalAmount,
    });

    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error('Error saving order:', err);
        res.status(400).json({ message: err.message });
    }
});

// Get Orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: err.message });
    }
});

// User Schema
const Users = mongoose.model('Users', {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Object },
    address: { type: String }, // New field for address
    contactNumber: { type: String }, // New field for contact number
    cardNumber: { type: String }, // New field for card number
    profileImage: { type: String }, // New field for profile image
    date: { type: Date, default: Date.now },
});

// Register User
app.post('/signup', async (req, res) => {
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
            address: '', // Initialize with empty value
            contactNumber: '', // Initialize with empty value
            cardNumber: '', // Initialize with empty value
            profileImage: '', // Initialize with empty value
        });

        await user.save();

        const data = { user: { id: user.id } };
        const token = jwt.sign(data, 'secret_cake');
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Failed to register user" });
    }
});

// Login User
app.post('/login', async (req, res) => {
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
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Failed to login user" });
    }
});

// Update User Profile
app.put('/updateprofile', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;

        // Update the user with the new profile details
        const updatedUser = await Users.findByIdAndUpdate(
            userId,
            {
                name: req.body.name,
                address: req.body.address,
                contactNumber: req.body.contactNumber,
                cardNumber: req.body.cardNumber,
                profileImage: req.body.profileImage,
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        console.log("User profile updated:", updatedUser);
        res.json({ success: true, updatedUser });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Failed to update profile" });
    }
});

// Fetch New Collections
app.get('/newcollections', async (req, res) => {
    try {
        let products = await Product.find({});
        let newcollections = products.slice(1).slice(-8);
        console.log("New Collection Fetched");
        res.json(newcollections);
    } catch (error) {
        console.error("Error fetching new collections:", error);
        res.status(500).json({ error: "Failed to fetch new collections" });
    }
});

// Add to Cart
app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        console.log("Added", req.body.itemId);
        let userData = await Users.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] += 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Added");
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ error: "Failed to add to cart" });
    }
});

// Remove from Cart
app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        console.log("Removed", req.body.itemId);
        let userData = await Users.findOne({ _id: req.user.id });
        if (userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
        }
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Removed");
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ error: "Failed to remove from cart" });
    }
});

// Get Cart Data
app.post('/getcart', fetchUser, async (req, res) => {
    try {
        console.log("GetCart");
        let userData = await Users.findOne({ _id: req.user.id });
        res.json(userData.cartData);
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ error: "Failed to fetch cart data" });
    }
});

// Remove Order
app.post('/api/removeorder', async (req, res) => {
    try {
        const orderId = req.body.id;
        await Order.findByIdAndDelete(orderId);
        console.log(`Removed order with ID: ${orderId}`);
        res.json({ success: true, message: `Order with ID ${orderId} removed` });
    } catch (error) {
        console.error('Error removing order:', error);
        res.status(500).json({ error: "Failed to remove order" });
    }
});

// Start the Server
app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on Port " + port);
    } else {
        console.log("Error: " + error);
    }
});
