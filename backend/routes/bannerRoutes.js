const express = require("express");
const router = express.Router();
const { uploadBanner, getAllBanners, removeBanner } = require("../controllers/bannerController");
const multer = require("multer");
const path = require("path");

// Define storage location and naming convention for uploaded banners
const bannerStorage = multer.diskStorage({
    destination: './upload/banners',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const uploadBannerImage = multer({ storage: bannerStorage });

// Define routes
router.post("/bannerupload", uploadBannerImage.single('banner'), uploadBanner);
router.get("/allbanners", getAllBanners);
router.delete("/removebanner/:id", removeBanner);

module.exports = router;
