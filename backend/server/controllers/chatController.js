// backend/server/controllers/chatController.js
// Chat controller
//Handles chat creation, retrieval, deletion
//Might be extended later with more functionalities like adding/removing users, renaming group chats, etc.


//Uses chatModel and userModel
const chat = require('../dataBase/models/chatModel');
const user = require('../dataBase/models/userModel');
require('dotenv').config(); 
async function createChat(req, res) {
  try {
    const { chatName, users } = req.body;
    const creatorId = req.user?._id; // assuming you have user info from auth middleware

    if (!chatName || !users || !Array.isArray(users)) {
      return res.status(400).json({ message: "All fields are required and users must be an array" });
    }

    // Determine if this is a group chat
    let isGroupChat = false;
    let groupAdmin = null;

    if (users.length > 2) {
      isGroupChat = true;
      groupAdmin = creatorId;
    }

    // Include the creator in the users array if not already included
    //This was added to fix issue where creator was not part of created chat
    const chatUsers = users.includes(creatorId) ? users : [...users, creatorId];

    // Create new chat
    //Might add more fields later like chat image, description, etc.
    const newChat = await chat.create({
      chatName,
      users: chatUsers,
      isGroupChat,
      groupAdmin
    });

    return res.status(201).json({ message: "Chat created successfully", chat: newChat });

  } catch (error) {
    console.error("Error creating chat:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getChatByChatName(req, res) {
    try{
        const { chatName } = req.query;
    if( !chatName){
        return res.status(400).json({ message: "Chat name is required" });
    }

    const foundChats = await chat.find({ chatName: { $regex: chatName, $options: 'i' } }).populate('users', '-password');
    return res.status(200).json(foundChats);
} catch (error) {
    console.error("Error searching chats:", error);
    return res.status(500).json({ message: "Internal server error" });
}
} 
// Get chat by ID
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

// Delete chat by ID
//Might restrict this to admins or chat creators later
//For now, any user can delete a chat they are part of(not ideal for production)
//Might be removed later to just leave chat instead of deleting it for everyone(especially for group chats)
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
// Get all chats for a user
//Might be paginated later if user has many chats
//Might add search/filter functionality later
//Might get affected by Socket.IO integration later
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



module.exports = { createChat, getChatById, deleteChat, getUserChats, getChatByChatName };
