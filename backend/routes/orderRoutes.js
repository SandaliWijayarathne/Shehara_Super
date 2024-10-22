const express = require("express");
const router = express.Router();
const { submitOrder, removeOrder } = require("../controllers/orderController");
const fetchUser = require("../middlewares/uploadMiddleware");

// Ensure that submitOrder and removeOrder are valid functions
router.post("/submitOrder", fetchUser, submitOrder);
router.post("/removeorder", removeOrder);

module.exports = router;
