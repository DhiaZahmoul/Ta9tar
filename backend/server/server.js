// server.js
const express = require('express');
require('dotenv').config({ path: require('path').resolve(__dirname, './.env') });
const {connectDB, client} = require('./dataBase/dbConnector'); // if you have a db connection utility
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const adminRoutes = require('./routes/adminRoutes'); // since you mentioned admin monitoring
const loginRoutes = require ('./routes/authRoutes');
const cors = require('cors');



// Connect to the database
connectDB(); // connect to MongoDB (if you use it)

const app = express();

// Middleware to handle CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/auth',loginRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
module.exports = app;