const express = require('express');
const router = express.Router();

const { 
  createMessage, 
  deleteMessage, 
  getMessagesByChat, 
  updateMessage 
} = require('../controllers/messageController');

const authMiddleware  = require('../middlewares/authMiddleware');

// Create a new message (authenticated users only)
router.post('/', authMiddleware, createMessage);

// Get last 50 messages of a chat (authenticated users only)
router.get('/:chatId', authMiddleware, getMessagesByChat);

// Update a message by ID (authenticated users only, ideally only sender)
router.put('/:messageId', authMiddleware, updateMessage);

// Delete a message by ID (authenticated users only, ideally only sender or admin)
router.delete('/:messageId', authMiddleware, deleteMessage);

module.exports = router;
