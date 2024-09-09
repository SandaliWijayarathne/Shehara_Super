const express = require("express");
const passport = require("passport");
const { signup, login, updateUserProfile, getUserAddress, addToCart, removeFromCart, getCart } = require("../controllers/userController");
const fetchUser = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/updateprofile", fetchUser, updateUserProfile);
router.get("/getUserAddress", fetchUser, getUserAddress);
router.post("/addtocart", fetchUser, addToCart);
router.post("/removefromcart", fetchUser, removeFromCart);
router.post("/getcart", fetchUser, getCart);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  session: false,
}), (req, res) => {
  const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.redirect(`http://localhost:3000?token=${token}`);
});

module.exports = router;
