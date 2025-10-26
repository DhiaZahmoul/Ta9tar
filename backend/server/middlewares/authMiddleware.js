const token = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const tokenFromHeader = authHeader && authHeader.split(' ')[1];

    if (!tokenFromHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    token.verify(tokenFromHeader, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();
    });
};

module.exports = authMiddleware;