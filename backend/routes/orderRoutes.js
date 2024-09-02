const express = require("express");
const router = express.Router();
const { submitOrder, removeOrder } = require("../controllers/orderController");
const fetchUser = require("../middlewares/uploadMiddleware");

router.post("/submitOrder", fetchUser, submitOrder);
router.post("/removeorder", removeOrder);

module.exports = router;
