// backend/server/middlewares/isAdminMiddleware.js
// Authentication middleware
// Verifies JWT token and checks if user is admin
// Used to restrict access to admin-only routes

const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAdminMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const tokenFromHeader = authHeader && authHeader.split(' ')[1];

    if (!tokenFromHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(tokenFromHeader, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        if (!user.isAdmin) {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }

        req.user = user;
        next();
    });
};

module.exports = isAdminMiddleware;
