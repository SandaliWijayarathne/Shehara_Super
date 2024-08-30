// Server Setup and Middleware
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect(
    "mongodb+srv://sanda:TVRS1234%23@cluster0.r6puny8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Root Endpoint
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Middleware to Fetch User
const fetchUser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, "secret_cake");
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ errors: "Invalid token. Please authenticate again." });
    }
};

// Middleware to Fetch Admin
const fetchAdmin = (req, res, next) => {
    const token = req.header("admin-auth-token");
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using a valid admin token" });
    }
    try {
        const data = jwt.verify(token, "admin_secret");
        req.admin = data.admin;
        next();
    } catch (error) {
        res.status(401).send({ errors: "Invalid admin token. Please authenticate again." });
    }
};

// Image Storage Engine for Products
const productStorage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

// Image Storage Engine for Banners
const bannerStorage = multer.diskStorage({
    destination: "./upload/banners",
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const uploadProductImage = multer({ storage: productStorage });
const uploadBannerImage = multer({ storage: bannerStorage });

app.use("/images", express.static("upload/images"));
app.use("/banners", express.static("upload/banners"));

// Upload Banner Endpoint
app.post("/bannerupload", fetchAdmin, uploadBannerImage.single("banner"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "No file uploaded" });
    }

    const imageUrl = `http://localhost:${port}/banners/${req.file.filename}`;

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

// Upload Product Image Endpoint
app.post("/uploadproductimage", fetchAdmin, uploadProductImage.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: 0, message: "No file uploaded" });
        }

        const imageUrl = `http://localhost:${port}/images/${req.file.filename}`;
        res.json({ success: 1, image_url: imageUrl });
    } catch (error) {
        console.error("Error in /uploadproductimage:", error);
        res.status(500).json({ error: "Failed to upload image" });
    }
});


// Get All Banners
app.get("/allbanners", async (req, res) => {
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
app.delete("/removebanner/:id", fetchAdmin, async (req, res) => {
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
app.post("/addproduct", fetchAdmin, async (req, res) => {
    try {
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
        console.log("Product Saved");
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, error: "Failed to add product" });
    }
});

// Remove Product
app.post("/removeproduct", fetchAdmin, async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Product Removed");
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, error: "Failed to remove product" });
    }
});

// Get All Products
app.get("/allproducts", async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("All products fetched");
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

// Update Product Price
app.put("/updateprice/:id", fetchAdmin, async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        product.price = req.body.price;

        await product.save();
        console.log("Product Price Updated");
        res.json({ success: true, product });
    } catch (error) {
        console.error("Error updating price:", error);
        res.status(500).json({ error: "Failed to update price" });
    }
});

// Order Schema
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    trackingId: { type: String, unique: true },
    date: { type: Date, default: Date.now },
    status: { type: String, default: "Pending" },
});

const Order = mongoose.model("Order", orderSchema);

// Payment Schema
const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    cardNumber: { type: String, required: true },
    expiryMonth: { type: String, required: true },
    expiryYear: { type: String, required: true },
    cardholderName: { type: String, required: true },
    securityCode: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);

// POST /submitOrder
app.post("/submitOrder", fetchUser, async (req, res) => {
    const { address, paymentMethod } = req.body;
    const trackingId = `TRK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    try {
        const newOrder = new Order({
            userId: req.user.id,
            address: address,
            paymentMethod: paymentMethod,
            trackingId: trackingId,
        });

        await newOrder.save();
        res.json({ success: true, message: "Order placed successfully", trackingId: trackingId });
    } catch (error) {
        console.error("Error submitting order:", error);
        res.status(500).json({ success: false, message: "Failed to submit order" });
    }
});

// POST /processPayment
app.post("/processPayment", fetchUser, async (req, res) => {
    const { cardNumber, expiryMonth, expiryYear, cardholderName, securityCode } = req.body;

    try {
        const newPayment = new Payment({
            userId: req.user.id,
            cardNumber: cardNumber,
            expiryMonth: expiryMonth,
            expiryYear: expiryYear,
            cardholderName: cardholderName,
            securityCode: securityCode,
        });

        await newPayment.save();
        res.json({ success: true, message: "Payment processed successfully" });
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ success: false, message: "Failed to process payment" });
    }
});

// GET /getUserAddress
app.get("/getUserAddress", fetchUser, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id);
        if (user && user.address) {
            res.json({ success: true, address: user.address });
        } else {
            res.json({ success: false, message: "No saved address found" });
        }
    } catch (error) {
        console.error("Error fetching address:", error);
        res.status(500).json({ success: false, message: "Failed to fetch address" });
    }
});

// User Schema
const Users = mongoose.model("Users", {
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

// Register User
app.post("/signup", async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Existing user found with same email address" });
        }

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            cartData: cart,
            address: "",
            contactNumber: "",
            cardNumber: "",
            profileImage: "",
        });

        await user.save();

        const data = { user: { id: user.id } };
        const token = jwt.sign(data, "secret_cake");
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Failed to register user" });
    }
});

// Login User
app.post("/login", async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.json({ success: false, errors: "Wrong Email Id" });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.json({ success: false, errors: "Wrong Password" });
        }

        const data = { user: { id: user.id } };
        const token = jwt.sign(data, "secret_cake");
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Failed to login user" });
    }
});

// Admin Schema
const Admin = mongoose.model("Admin", {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

// Register Admin (for initial setup)
app.post("/admin/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        let admin = await Admin.findOne({ username });
        if (admin) {
            return res.status(400).json({ msg: "Admin already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        admin = new Admin({
            username,
            password: hashedPassword,
        });

        await admin.save();

        res.send("Admin registered successfully");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

// Admin Login
app.post("/admin/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        let admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const payload = {
            admin: {
                id: admin.id,
            },
        };

        jwt.sign(
            payload,
            "admin_secret",
            { expiresIn: "1h" },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
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
