// backend/server/routes/chatRoutes.js
// Chat routes
//Some Routes might be rendered obsolete later due to Socket.IO integration
const express = require('express');
const router = express.Router();

const { 
  createChat, 
  getChatById, 
  deleteChat, 
  getUserChats
} = require('../controllers/chatController');

const authMiddleware  = require('../middlewares/authMiddleware');
const createChatMiddleware = require('../middlewares/createChatMiddleware');

// Create a new chat (authenticated users only)
router.post('/createchat', authMiddleware, createChatMiddleware, createChat);

// Get chat by ID (authenticated users only)
router.get('/:chatId', authMiddleware, getChatById);


// Delete a chat (authenticated users only)
//This route might get moved to adminRoutes.js later if only admins can delete chats
//Users might only be able to leave chats instead of deleting them
router.delete('/:chatId', authMiddleware, deleteChat);

// Get all chats for the authenticated user
router.get('/', authMiddleware, getUserChats);


// Get all chats for a specific user by userId
//This route might get deleted later if not needed
router.get('/user/:userId', authMiddleware, getUserChats);


module.exports = router;
