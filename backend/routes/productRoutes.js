const express = require("express");
const router = express.Router();
const { addProduct, removeProduct, getAllProducts, updatePrice, getNewCollections } = require("../controllers/productController");
const multer = require("multer");
const path = require("path");

const productStorage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const uploadProductImage = multer({ storage: productStorage });

router.post("/uploadproductimage", uploadProductImage.single('product'));// Ensure this calls a function for handling the image
router.post("/addproduct", addProduct); // Ensure addProduct is a valid function
router.post("/removeproduct", removeProduct); // Ensure removeProduct is a valid function
router.get("/allproducts", getAllProducts); // Ensure getAllProducts is a valid function
router.put("/updateprice/:id", updatePrice); // Ensure updatePrice is a valid function
router.get("/newcollections", getNewCollections); // Ensure getNewCollections is a valid function

module.exports = router;
