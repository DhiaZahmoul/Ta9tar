const chat = require('../dataBase/models/chatModel');
const user = require('../dataBase/models/userModel');
require('dotenv').config(); 
async function createChat(req,res){
    try{
        const { chatName, users } = req.body;
    if( !chatName || !users){
        return res.status(400).json({ message: "All fields are required" });
    }

    const newChat = await chat.create({ chatName, users });
    return res.status(201).json({ message: "Chat created successfully", chat: newChat });
} catch (error) {
    console.error("Error creating chat:", error);
    return res.status(500).json({ message: "Internal server error" });
}
}

async function getChatById(req, res) {
    try{
        const { chatId } = req.params;
    if( !chatId){
        return res.status(400).json({ message: "Chat ID is required" });
    }

    const foundChat = await chat.findById(chatId).populate('users', '-password');
    if(!foundChat){
        return res.status(404).json({ message: "Chat not found" });
    }
    return res.status(200).json({ chat: foundChat });
} catch (error) {
    console.error("Error fetching chat:", error);
    return res.status(500).json({ message: "Internal server error" });
}
}


async function deleteChat(req,res){
    try{
        const { chatId } = req.params;
    if( !chatId){
        return res.status(400).json({ message: "Chat ID is required" });
    }

    const deletedChat = await chat.findByIdAndDelete(chatId);
    if(!deletedChat){
        return res.status(404).json({ message: "Chat not found" });
    }
    return res.status(200).json({ message: "Chat deleted successfully", chat: deletedChat });
} catch (error) {
    console.error("Error deleting chat:", error);
    return res.status(500).json({ message: "Internal server error" });
}
}

async function getUserChats(req, res) {
  try {
    const { userId } = req.params; // get from URL

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userChats = await chat.find({ users: userId }).populate('users', '-password');

    return res.status(200).json(userChats);
  } catch (error) {
    console.error("Error fetching user chats:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { createChat, getChatById, deleteChat, getUserChats };
