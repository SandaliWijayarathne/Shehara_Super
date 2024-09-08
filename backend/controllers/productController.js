const Product = require("../models/Product");

const addProduct = async (req, res) => {
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
        console.log(`Product added: ${req.body.name}`); // Added logging for successful product addition
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error('Error adding product:', error); // Improved error logging
        res.status(500).json({ error: "Failed to add product" });
    }
};

const removeProduct = async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log(`Product removed with ID: ${req.body.id}`); // Added logging for product removal
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error('Error removing product:', error); // Improved error logging
        res.status(500).json({ error: "Failed to remove product" });
    }
};

const getAllProducts = async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("All products fetched"); // Added logging for fetching products
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error); // Improved error logging
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

const updatePrice = async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        product.price = req.body.price;
        await product.save();
        console.log(`Price updated for product ID: ${req.params.id}`); // Added logging for price update
        res.json({ success: true, product });
    } catch (error) {
        console.error('Error updating price:', error); // Improved error logging
        res.status(500).json({ error: "Failed to update price" });
    }
};

const getNewCollections = async (req, res) => {
    try {
        let products = await Product.find({});
        let newcollections = products.slice(1).slice(-8);
        console.log("New collections fetched"); // Added logging for fetching new collections
        res.json(newcollections);
    } catch (error) {
        console.error('Error fetching new collections:', error); // Improved error logging
        res.status(500).json({ error: "Failed to fetch new collections" });
    }
};

module.exports = { addProduct, removeProduct, getAllProducts, updatePrice, getNewCollections };
