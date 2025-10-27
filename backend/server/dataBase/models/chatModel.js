// backend/server/dataBase/models/chatModel.js
// Chat model definition
//Might be extended later with additional fields 

const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chatName: { type: String, required: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, 
{ timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat ;