// backend/server/controllers/authController.js
// Authentication controller
//Handles user login, generates JWT tokens
//Updates lastSeen on successful login
const User = require('../dataBase/models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    // Update lastSeen
    user.lastSeen = new Date();
    await user.save();

    // Generate JWT with only user ID
    const token = jwt.sign(
      { id: user._id }, // only sign the user ID, IsAdmin removed
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Respond with token and user info
    // Only return necessary user info
    //Might remove more fields later for security
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = login;
