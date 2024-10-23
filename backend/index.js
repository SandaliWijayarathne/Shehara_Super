// Server Setup and Middleware
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require('bcryptjs');
const validator = require('validator');

app.use(express.static('public'))

app.use(express.json());
app.use(cors({ origin: '*' }));

const URL ="localhost";

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

// Image Storage Engine for Products
const productStorage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Image Storage Engine for Banners
const bannerStorage = multer.diskStorage({
    destination: './upload/banners',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploadProductImage = multer({ storage: productStorage });
const uploadBannerImage = multer({ storage: bannerStorage });

app.use('/images', express.static('upload/images'));
app.use('/banners', express.static('upload/banners'));

// Upload Banner Endpoint
app.post("/bannerupload", uploadBannerImage.single('banner'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }

    const imageUrl = `/banners/${req.file.filename}`;

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
app.post("/uploadproductimage", uploadProductImage.single('product'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }

    const imageUrl = `/images/${req.file.filename}`;

    res.json({ success: 1, image_url: imageUrl });
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


//payment


const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// Assuming you have a function to get cart items from the database
async function getCartItemsFromDB(cartItems) {
  try {
    // Fetch product details from the database for each cart item
    const storeItems = await Product.find({
      id: { $in: cartItems.map(item => item.id) }
    });

    // Map the cart items to include necessary Stripe fields
    return cartItems.map(cartItem => {
      const product = storeItems.find(item => item.id === cartItem.id);
      if (!product) {
        throw new Error(`Product with ID ${cartItem.id} not found`);
      }

      return {
        priceInCents: product.price * 100,  // Ensure price is in cents
        name: product.name,
        quantity: cartItem.quantity,
      };
    });
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}

app.post('/create-checkout-session', async (req, res) => {
  try {
    // Get cart data from the request body (coming from frontend)
    const cartItems = req.body.items;

    // Fetch product details for each cart item
    const storeItems = await getCartItemsFromDB(cartItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: storeItems.map(item => {
        return {
          price_data: {
            currency: 'lkr',  // Change currency to your preferred one
            product_data: {
              name: item.name,
            },
            unit_amount: item.priceInCents,  // Amount in cents
          },
          quantity: item.quantity,
        };
      }),
      success_url: `http://${URL}:3000/success`,  // Ensure this points to your frontend
      cancel_url: `http://${URL}:3000/fail`,  // Ensure this points to your frontend
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
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
    discount:{type: Number,default: 0}
});

// Update Product Discount
app.put('/updatediscount/:id', async (req, res) => {
    try {
        // Find the product by id
        const product = await Product.findOne({ id: req.params.id });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Update the discount if provided in the request body
        const { discount } = req.body;
        if (discount !== undefined && discount >= 0 && discount <= 100) {
            product.discount = discount;
        } else {
            return res.status(400).json({ success: false, message: "Valid discount is required (0-100)" });
        }

        // Save the updated product
        await product.save();
        console.log("Discount updated");

        res.json({ success: true, product });
    } catch (error) {
        console.error("Error updating discount:", error);
        res.status(500).json({ error: "Failed to update discount" });
    }
});

//add product

app.post('/addproduct', async (req, res) => {
    try {
        let products = await Product.find({});
        let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            price: req.body.price,
            discount: req.body.discount || 0, // Ensure discount is included
            description:req.body.description || "Quality Product"
        });

        await product.save();
        console.log("Product saved");

        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ error: "Failed to save product" });
    }
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
        // Find the product by id
        const product = await Product.findOne({ id: req.params.id });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Update the product price if provided in the request body
        const { price } = req.body;
        if (price !== undefined) {
            product.price = price;
        } else {
            return res.status(400).json({ success: false, message: "Price is required" });
        }

        // Save the updated product
        await product.save();
        console.log("Price updated");

        res.json({ success: true, product });
    } catch (error) {
        console.error("Error updating price:", error);
        res.status(500).json({ error: "Failed to update price" });
    }
});


// Order Schema
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    trackingId: { type: String, unique: true },
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending' }
});

const Order = mongoose.model('Order', orderSchema);

// Payment Schema
const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    cardNumber: { type: String, required: true },
    expiryMonth: { type: String, required: true },
    expiryYear: { type: String, required: true },
    cardholderName: { type: String, required: true },
    securityCode: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);

// POST /submitOrder
app.post('/submitOrder', fetchUser, async (req, res) => {
    const { address, paymentMethod } = req.body;
    const trackingId = `TRK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    try {
        const newOrder = new Order({
            userId: req.user.id,
            address: address,
            paymentMethod: paymentMethod,
            trackingId: trackingId
        });

        await newOrder.save();
        res.json({ success: true, message: 'Order placed successfully', trackingId: trackingId });
    } catch (error) {
        console.error('Error submitting order:', error);
        res.status(500).json({ success: false, message: 'Failed to submit order' });
    }
});

// POST /processPayment
app.post('/processPayment', fetchUser, async (req, res) => {
    const { cardNumber, expiryMonth, expiryYear, cardholderName, securityCode } = req.body;

    try {
        const newPayment = new Payment({
            userId: req.user.id,
            cardNumber: cardNumber,
            expiryMonth: expiryMonth,
            expiryYear: expiryYear,
            cardholderName: cardholderName,
            securityCode: securityCode
        });

        await newPayment.save();
        res.json({ success: true, message: 'Payment processed successfully' });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ success: false, message: 'Failed to process payment' });
    }
});

// GET /getUserAddress
app.get('/getUserAddress', fetchUser, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id);
        if (user && user.address) {
            res.json({ success: true, address: user.address });
        } else {
            res.json({ success: false, message: 'No saved address found' });
        }
    } catch (error) {
        console.error('Error fetching address:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch address' });
    }
});

// User Schema
const Users = mongoose.model('Users', {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cartData: { type: Object },
    address: { type: String },
    contactNumber: { type: String },
    cardNumber: { type: String },
    profileImage: { type: String },
    date: { type: Date, default: Date.now },
});

// Helper function to validate email and password
const validateEmailAndPassword = (email, password) => {
    if (!validator.isEmail(email)) {
        return { success: false, errors: "Invalid email format" };
    }
    if (password.length < 6 || password === '123456' || 'asdfgh'||'zxcvbn') {
        return { success: false, errors: "Password must be at least 6 characters" };
    }
    return { success: true };
};

// Register User
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate email and password
    const validation = validateEmailAndPassword(email, password);
    if (!validation.success) {
        return res.status(400).json(validation);
    }

    try {
        // Check if user already exists
        let check = await Users.findOne({ email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Existing user found with the same email address" });
        }

        // Encrypt the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Initialize cart with 0 values for 300 items
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        // Create a new user
        const user = new Users({
            name: username,
            email,
            password: hashedPassword, // Store hashed password
            cartData: cart,
            address: '',
            contactNumber: '',
            cardNumber: '',
            profileImage: '',
        });

        // Save user in the database
        await user.save();

        // Generate JWT token
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
    const { email, password } = req.body;

    try {
        // Check if the user exists
        let user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, errors: "Incorrect email or password" });
        }

        // Compare provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, errors: "Incorrect email or password" });
        }

        // Generate JWT token
        const data = { user: { id: user.id } };
        const token = jwt.sign(data, 'secret_cake');
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Failed to login user" });
    }
});

// Get User Profile (secured route with JWT authentication)
app.get('/profile', async (req, res) => {
    const token = req.header('auth-token');

    // Verify JWT token
    if (!token) {
        return res.status(401).json({ success: false, errors: "Access denied, no token provided" });
    }

    try {
        // Verify token
        const verified = jwt.verify(token, 'secret_cake');
        const user = await Users.findById(verified.user.id).select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({ success: false, errors: "User not found" });
        }

        // Return user profile data
        res.json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Failed to fetch user profile" });
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

