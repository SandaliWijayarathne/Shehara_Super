const Product = require("../models/Product");

const addProduct = async (req, res) => {
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
    res.json({ success: true, name: req.body.name });
};

const removeProduct = async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, name: req.body.name });
};

const getAllProducts = async (req, res) => {
    try {
        let products = await Product.find({});
        res.json(products);
    } catch (error) {
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
        res.json({ success: true, product });
    } catch (error) {
        res.status(500).json({ error: "Failed to update prices" });
    }
};

const getNewCollections = async (req, res) => {
    try {
        let products = await Product.find({});
        let newcollections = products.slice(1).slice(-8);
        res.json(newcollections);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch new collections" });
    }
};

module.exports = { addProduct, removeProduct, getAllProducts, updatePrice, getNewCollections };
