const Message = require('../dataBase/models/messageModel');
require('dotenv').config();
const mongoose = require('mongoose');

async function createMessage(req, res) {
    try {
        const { sender, content, chat } = req.body;
        if (!sender || !content || !chat) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const newMessage = await Message.create({ sender, content, chat });
        return res.status(201).json({ message: "Message created successfully", messageData: newMessage });
    } catch (error) {
        console.error("Error creating message:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function deleteMessage(req,res){
    try{
        const { messageId } = req.params;
    if( !messageId){
        return res.status(400).json({ message: "Message ID is required" });
    }

    const deletedMessage = await Message.findByIdAndDelete(messageId);
    if(!deletedMessage){
        return res.status(404).json({ message: "Message not found" });
    }
    return res.status(200).json({ message: "Message deleted successfully", messageData: deletedMessage });
} catch (error) {
    console.error("Error deleting message:", error);
    return res.status(500).json({ message: "Internal server error" });
}
}

async function getMessagesByChat(req, res) {
  try {
    const { chatId } = req.params;

    if (!chatId) {
      return res.status(400).json({ message: "Chat ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({ message: "Invalid Chat ID" });
    }

    // Fetch the last 50 messages for this chat, newest first
    const messages = await Message.find({ chat: chatId })
      .sort({ createdAt: -1 })  // newest first
      .limit(50);

    // Optional: reverse to send oldest → newest
    messages.reverse();

    return res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateMessage(req, res) {
    try{
        const { messageId } = req.params;
    const { content } = req.body;
    if( !messageId){
        return res.status(400).json({ message: "Message ID is required" });
    }

    const updatedData = {};
    if (content) updatedData.content = content;

    const updatedMessage = await Message.findByIdAndUpdate(messageId, updatedData, { new: true });
    if(!updatedMessage){
        return res.status(404).json({ message: "Message not found" });
    }
    return res.status(200).json({ message: "Message updated successfully", messageData: updatedMessage });
} catch (error) {
    console.error("Error updating message:", error);
    return res.status(500).json({ message: "Internal server error" });
}
}

module.exports = { createMessage, deleteMessage, getMessagesByChat, updateMessage };