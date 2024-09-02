const Banner = require("../models/Banner");

const uploadBanner = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }

    const imageUrl = `http://localhost:4000/banners/${req.file.filename}`;
    const banner = new Banner({ url: imageUrl });

    try {
        await banner.save();
        res.json({ success: 1, image_url: imageUrl, banner });
    } catch (error) {
        res.status(500).json({ error: "Failed to save banner" });
    }
};

const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find({});
        res.json(banners);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch banners" });
    }
};

const removeBanner = async (req, res) => {
    try {
        await Banner.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: `Banner with ID ${req.params.id} removed` });
    } catch (error) {
        res.status(500).json({ error: "Failed to remove banner" });
    }
};

module.exports = { uploadBanner, getAllBanners, removeBanner };
