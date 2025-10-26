const bcrypt = require('bcrypt');
require('dotenv').config();

// Middleware to validate user data and hash password
async function createUserMiddleware(req, res, next) {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'username, email, and password are required' });
    }

    // Type checks
    if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'username, email, and password must be strings' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Password strength check (optional)
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Hash password
    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Replace plaintext password with hashed password
    req.body.password = hashedPassword;

    next();
  } catch (err) {
    console.error('Error in createUserMiddleware:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = createUserMiddleware;
