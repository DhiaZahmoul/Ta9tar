// backend/server/routes/userRoutes.js
// User routes
//Some routes might be restricted to admin users only
//User registration handled here instead of authRoutes.js

const express = require('express');
const router = express.Router();

const { 
  createUser, 
  deleteUser, 
  getUserById, 
  updateUser, 
  getAllUsers,
  searchUsersByUsername
} = require('../controllers/userController');

const  authMiddleware = require('../middlewares/authMiddleware');
const  isAdminMiddleware = require('../middlewares/isAdminMiddleware')
const createUserMiddleware = require('../middlewares/createUserMiddleware');

// Route to create a new user (accessible by anyone)
router.post('/', createUserMiddleware, createUser);

// Route to search users by username (authenticated)
router.get('/search', authMiddleware, searchUsersByUsername);

// Route to get user by ID (authenticated)
router.get('/:userId', authMiddleware, getUserById);

// Route to get all users (accessible by admin only)
router.get('/', authMiddleware, isAdminMiddleware, getAllUsers);

// Route to update user by ID (authenticated)
//Users can update their own info, admins can update any user
//Might need additional middleware to check if user is updating their own info or is admin
//Frontend functionality to be added to allow users to update their info
router.put('/:userId', authMiddleware, updateUser);

// Route to delete a user (admin only)
//Users might only be able to deactivate their own accounts instead of deleting them
router.delete('/:userId', authMiddleware, isAdminMiddleware, deleteUser);

module.exports = router;
