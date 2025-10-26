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

// Route to get all users (accessible by admin only)
router.get('/', authMiddleware, isAdminMiddleware, getAllUsers);

// Route to get user by ID (authenticated)
router.get('/:userId', authMiddleware, getUserById);

// Route to update user by ID (authenticated)
router.put('/:userId', authMiddleware, updateUser);

// Route to delete a user (admin only)
router.delete('/:userId', authMiddleware, isAdminMiddleware, deleteUser);

module.exports = router;
