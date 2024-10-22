const express = require("express");
const router = express.Router();
const { addProduct, removeProduct, getAllProducts, updatePrice, getNewCollections } = require("../controllers/productController");
const multer = require("multer");
const path = require("path");

const productStorage = multer.diskStorage({
    destination: './upload/images', // Ensure this path exists
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploadProductImage = multer({ storage: productStorage });

// Route for uploading the product image
router.post("/uploadproductimage", uploadProductImage.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }
    
    const imageUrl = `http://localhost:4000/images/${req.file.filename}`;
    res.json({ success: 1, image_url: imageUrl });
});

// Route for adding product details
router.post("/addproduct", addProduct);

// Other routes for managing products
router.post("/removeproduct", removeProduct);
router.get("/allproducts", getAllProducts);
router.put("/updateprice/:id", updatePrice);
router.get("/newcollections", getNewCollections);

module.exports = router;
