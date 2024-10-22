const express = require("express");
const router = express.Router();
const { signup, login, updateUserProfile, getUserAddress, addToCart, removeFromCart, getCart } = require("../controllers/userController");
const fetchUser = require("../middlewares/uploadMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.put("/updateprofile", fetchUser, updateUserProfile);
router.get("/getUserAddress", fetchUser, getUserAddress);
router.post("/addtocart", fetchUser, addToCart);
router.post("/removefromcart", fetchUser, removeFromCart);
router.post("/getcart", fetchUser, getCart);

module.exports = router;
