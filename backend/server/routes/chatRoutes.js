// backend/server/routes/chatRoutes.js
// Chat routes
//Some Routes might be rendered obsolete later due to Socket.IO integration
const express = require('express');
const router = express.Router();

const { 
  createChat, 
  getChatById, 
  deleteChat, 
  getUserChats,
  getChatByChatName
} = require('../controllers/chatController');

const authMiddleware  = require('../middlewares/authMiddleware');
const createChatMiddleware = require('../middlewares/createChatMiddleware');
const adminMiddleware = require('../middlewares/isAdminMiddleware');

// Create a new chat (authenticated users only)
router.post('/createchat', authMiddleware, createChatMiddleware, createChat);

// Get chat by name (admin only)
router.get('/search', authMiddleware, adminMiddleware,  getChatByChatName);


// Get chat by ID (authenticated users only)
router.get('/:chatId', authMiddleware, getChatById);


// Delete chat by ID (admin only for now)
router.delete('/:chatId', authMiddleware, adminMiddleware, deleteChat);

// Get all chats for the authenticated user
router.get('/', authMiddleware, getUserChats);


// Get all chats for a specific user by userId
//This route might get deleted later if not needed
router.get('/user/:userId', authMiddleware, getUserChats);


module.exports = router;
