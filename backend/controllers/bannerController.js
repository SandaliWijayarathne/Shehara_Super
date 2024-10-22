const Banner = require("../models/Banner");

const uploadBanner = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }

    const imageUrl = `http://localhost:4000/banners/${req.file.filename}`; // Kept the hardcoded port as in the first code
    const banner = new Banner({ url: imageUrl });

    try {
        await banner.save();
        console.log("Banner uploaded and saved"); // Added log for better monitoring
        res.json({ success: 1, image_url: imageUrl, banner });
    } catch (error) {
        console.error("Error saving banner:", error); // Improved error logging
        res.status(500).json({ error: "Failed to save banner" });
    }
};

const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find({});
        console.log("All banners fetched"); // Added log for successful fetch
        res.json(banners);
    } catch (error) {
        console.error("Error fetching banners:", error); // Improved error logging
        res.status(500).json({ error: "Failed to fetch banners" });
    }
};

const removeBanner = async (req, res) => {
    try {
        const bannerId = req.params.id;
        await Banner.findByIdAndDelete(bannerId);
        console.log(`Banner removed with ID: ${bannerId}`); // Added log for successful removal
        res.json({ success: true, message: `Banner with ID ${bannerId} removed` });
    } catch (error) {
        console.error("Error removing banner:", error); // Improved error logging
        res.status(500).json({ error: "Failed to remove banner" });
    }
};

module.exports = { uploadBanner, getAllBanners, removeBanner };
