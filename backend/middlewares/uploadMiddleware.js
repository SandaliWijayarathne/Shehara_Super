const jwt = require("jsonwebtoken");

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token'); // Ensure you're passing the token in the headers
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using valid token" });
    }
    try {
        const data = jwt.verify(token, 'secret_cake'); // Verify the token with the same secret key
        req.user = data.user; // Store user data in req.user
        next(); // Proceed to the next middleware
    } catch (error) {
        res.status(401).send({ errors: "Invalid token. Please authenticate again." });
    }
};

module.exports = fetchUser;
