import User from "../model/userModel.js"

// Creating Endpoint for registering the user
app.post('/signup', async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Existing user found with same email address" });
        }

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });

        await user.save();

        const data = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(data, 'secret_cake');
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Failed to register user" });
    }
});

// Creating endpoint for user login
app.post('/login', async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.json({ success: false, errors: "Wrong Email Id" });
        }

        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            };

            const token = jwt.sign(data, 'secret_cake');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Failed to login user" });
    }
});


// Middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using valid token" });
    }
    try {
        const data = jwt.verify(token, 'secret_cake');
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ errors: "Invalid token. Please authenticate again." });
    }
};



// Creating endpoint to add products in cart data
app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        console.log("Added", req.body.itemId);
        let userData = await Users.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] += 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Added");
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ error: "Failed to add to cart" });
    }
});

// Creating endpoint to remove product from cart data
app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        console.log("Removed", req.body.itemId);
        let userData = await Users.findOne({ _id: req.user.id });
        if (userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
        }
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Removed");
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ error: "Failed to remove from cart" });
    }
});

// Creating endpoint to get cart data
app.post('/getcart', fetchUser, async (req, res) => {
    try {
        console.log("GetCart");
        let userData = await Users.findOne({ _id: req.user.id });
        res.json(userData.cartData);
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ error: "Failed to fetch cart data" });
    }
});
