// server.js
const express = require('express')
//Copied from chatGPT to fix dotenv path issue
//Must figure out why this was not working in the first place
require('dotenv').config({ path: require('path').resolve(__dirname, './.env') });
const http = require('http');
//Newly added for socket.io
//Might get removed later if other ways are found to get real-time features working
const { Server } = require('socket.io');
const cors = require('cors');
//might not need this here
const { connectDB } = require('./dataBase/dbConnector');
const User = require('./dataBase/models/userModel');

// Import routes
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS for frontend
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // frontend URL
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);

// Connect to MongoDB
//imported from dbConnector.js
//Might get rid of this later if not needed here
connectDB();

// ---  Track online users in memory ---
// --- This function is still a work in progress, users are not yet tracked ---
const onlineUsers = new Map(); // userId -> socketId

// Socket.IO events
io.on('connection', async (socket) => {
  console.log('🟢 New client connected:', socket.id);

  // client should send userId immediately on connect
  
  socket.on('registerUser', async (userId) => {
    if (!userId) return;

    // Store userId -> socketId mapping
    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} is now online`);

    // Update DB status
    await User.findByIdAndUpdate(userId, {
      isOnline: true,
      lastSeen: new Date(),
    });

    // Notify everyone except the user themselves
    socket.broadcast.emit('userOnline', { userId });

    // Send the current online users to the newly connected user
    //Must fix this to only send relevant users
    //Relevant users being those who are in same chats
    socket.emit('onlineUsers', Array.from(onlineUsers.keys()));
  });

  // --- Join a chat room ---
  //This event might get fixed later to auto-join based on user's chats
  //For now, client must emit this event after connecting
  //Must figure out how to store last read message per chat per user
  socket.on('joinChat', (chatId) => {
    socket.join(chatId);
    console.log(`Socket ${socket.id} joined chat ${chatId}`);
  });

  // --- Leave a chat room ---
  //This event might get removed later
  //Users can just disconnect to leave all chats
  socket.on('leaveChat', (chatId) => {
    socket.leave(chatId);
    console.log(`Socket ${socket.id} left chat ${chatId}`);
  });

  // --- Fetch messages ---
  //Used to be an HTTP route, now moved to socket.io for real-time
  //Might need partitioning/pagination later for large chats
  //Most likely will be fetching 50 messages at a time(maxed at 150)
  //Later messages can be found using a "search message" feature
  
  socket.on('getMessages', async (chatId, callback) => {
    try {
      const Message = require('./dataBase/models/messageModel');
      const messages = await Message.find({ chat: chatId })
        .sort({ createdAt: 1 })
        .lean();
      callback(messages);
    } catch (err) {
      console.error('Error fetching messages:', err);
      callback([]);
    }
  });

  // --- Send new message ---
  //Used to be an HTTP route, now moved to socket.io for real-time
  socket.on('sendMessage', async (messageData, callback) => {
    try {
      const Message = require('./dataBase/models/messageModel');
      const savedMessage = await Message.create(messageData);
      io.to(messageData.chat).emit('receiveMessage', savedMessage);
      if (callback) callback(savedMessage);
    } catch (err) {
      console.error('Error saving message:', err);
      if (callback) callback({ error: 'Message not saved' });
    }
  });

  // --- Handle disconnection ---
  // This event is still a work in progress
  //must figure out how to define disconnecting user
  socket.on('disconnect', async () => {
    console.log('Client disconnected:', socket.id);

    // Find which user had this socket
    const userId = [...onlineUsers.entries()]
      .find(([_, sId]) => sId === socket.id)?.[0];

    if (userId) {
      onlineUsers.delete(userId);
      await User.findByIdAndUpdate(userId, {
        isOnline: false,
        lastSeen: new Date(),
      });

      // Notify others that this user went offline
      socket.broadcast.emit('userOffline', { userId });
      console.log(`User ${userId} is now offline`);
    }
  });
});

// Start server
const PORT = process.env.PORT; //port from .env(5000 usually)
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = { app, io };
