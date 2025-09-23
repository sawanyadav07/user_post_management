const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/userModel.js');

dotenv.config();

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ message: 'No token provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded>>>", decoded);

        const user = await User.findById(decoded.id);
        console.log("user>>", user);

        if (!user || user.isDeleted) return res.status(401).json({ message: "Invalid user" });
        req.user = user;
        next();
    } catch (error) {
         if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        }
        res.status(500).json({ message: "Server error", error: error.message });

    }
}