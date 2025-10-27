// backend/server/middlewares/authMiddleware.js
// Authentication middleware
//Verifies JWT token and attaches user info to request object
//Other middlewares depend on req.user being set correctly
//Very important FILE - do not delete or modify carelessly
//Last working copy saved locally in case of accidental changes

const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = { _id: decoded.id }; 
    next();
  });
};

module.exports = authMiddleware;
