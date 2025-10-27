// backend/server/dataBase/models/messageModel.js
// Message model definition
//Stores individual messages in chats
//References sender (User) and chat (Chat)
//Might be extended later with read receipts, attachments, etc.
const mongoose = require('mongoose');


const MessageSchema = new mongoose.Schema({
    sender : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    content : {type: String, trim: true},
    chat : {type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true},
}, 
{ timestamps: true }
);

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;