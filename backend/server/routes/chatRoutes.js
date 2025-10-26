const express = require('express');
const router = express.Router();

const { 
  createChat, 
  getChatById, 
  deleteChat, 
  getUserChats
} = require('../controllers/chatController');

const authMiddleware  = require('../middlewares/authMiddleware');

// Create a new chat (authenticated users only)
router.post('/createchat', authMiddleware, createChat);

// Get chat by ID (authenticated users only)
router.get('/:chatId', authMiddleware, getChatById);


// Delete a chat (authenticated users only)
router.delete('/:chatId', authMiddleware, deleteChat);

// Get all chats for the authenticated user
router.get('/', authMiddleware, getUserChats);


// Get all chats for a specific user by userId
router.get('/user/:userId', authMiddleware, getUserChats);


module.exports = router;
