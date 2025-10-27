// backend/server/middlewares/createChatMiddleware.js
//Newly Added File
// Middleware to check for existing one-on-one chat before creating a new chat
//Prevents duplicate one-on-one chats between the same users
//Only applies to one-on-one chats, group chats can be created freely
//Fixed issues with NULL users being added to chats


const Chat = require('../dataBase/models/chatModel');

async function createChatMiddleware(req, res, next) {
  try {
    console.log('Auth user at middleware start:', req.user);

    let { users } = req.body;

    // Ensure users array exists
    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ message: 'Users array is required' });
    }

    // Remove null/undefined/empty entries
    users = users.filter(u => u && typeof u === 'string' && u.trim() !== '');
    if (users.length === 0) {
      return res.status(400).json({ message: 'No valid users provided' });
    }

    const creatorId = req.user?._id;
    if (!creatorId) {
      return res.status(400).json({ message: 'Cannot identify chat creator' });
    }

    // Only check for duplicate one-on-one chats
    if (users.length === 2) {
      // Make sure creator is included
      if (!users.includes(creatorId.toString())) {
        users.push(creatorId.toString());
      }

      // There should be exactly 2 users for a one-on-one chat
      const userIds = users.slice(0, 2).map(id => id.toString());

      const existingChat = await Chat.findOne({
        isGroupChat: false,
        users: { $all: userIds, $size: 2 },
      });

      if (existingChat) {
        return res.status(400).json({
          message: 'A chat between these users already exists',
          chat: existingChat,
        });
      }
    }

    // Replace the original body with cleaned users array
    req.body.users = users;

    next();
  } catch (err) {
    console.error('Error checking existing chat:', err);
    return res.status(500).json({ message: 'Server error checking chat' });
  }
}

module.exports = createChatMiddleware;
