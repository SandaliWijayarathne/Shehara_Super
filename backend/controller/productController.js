import Product from '../model/productModel.js'

//add product
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    await product.save();
    console.log("Saved");

    res.json({
        success: true,
        name: req.body.name,
    });
});

// Creating API for deleting products
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");

    res.json({
        success: true,
        name: req.body.name
    });
});


// Creating API for getting all products
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

// Creating API for updating product price
app.put('/updateprice/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Set old_price to the current new_price before updating new_price
        product.old_price = product.new_price;
        product.new_price = req.body.new_price;

        await product.save();
        console.log("Prices updated");

        res.json({
            success: true,
            product
        });
    } catch (error) {
        console.error("Error updating prices:", error);
        res.status(500).json({ error: "Failed to update prices" });
    }
});



