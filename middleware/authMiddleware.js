const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protectedRoute = async (req, res, next) => {
    // if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

    try {
        const token = req.headers.authorization.split(" ")[1];

        const decodedToken = jwt.verify(token, "secret");

        req.user = await User.findById(decodedToken.id);
        next();
    } catch (error) {
        res.status(404).json({ message: "Not authorized" });
    }
    // };
}

module.exports = { protectedRoute };