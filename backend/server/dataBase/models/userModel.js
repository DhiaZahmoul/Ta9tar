// backend/server/dataBase/models/userModel.js
// User model definition
//Stores user information
//Might be extended later with profile info, status, etc.
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    lastSeen: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User ;
