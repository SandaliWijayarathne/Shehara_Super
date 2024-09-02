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

router.post("/uploadproductimage", uploadProductImage.single('product'));
router.post("/addproduct", addProduct);
router.post("/removeproduct", removeProduct);
router.get("/allproducts", getAllProducts);
router.put("/updateprice/:id", updatePrice);
router.get("/newcollections", getNewCollections);

module.exports = router;
