// backend/server/routes/authRoutes.js
// Authentication route
//only login for now, registration handled in userRoutes.js
const express = require('express');
const router = express.Router();
const login  = require('../controllers/authController');

router.post('/login', login);

module.exports = router;
