const User = require('../dataBase/models/userModel');
require('dotenv').config();
const adminEmail = process.env.ADMIN_EMAIL;



async function createUser(req, res) {
    try{
        const { username, email, password} = req.body;
   

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }
    const createdAt = new Date();
    const lastSeen = new Date();
    const isAdmin = email === adminEmail;
    const newUser = await User.create({ username, email, password, createdAt, lastSeen, isAdmin });
    return res.status(201).json({ message: "User created successfully", user: newUser });
} catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
}
}


async function getUserById(req, res) {
    try{
        const { userId } = req.params;
    if( !userId){
        return res.status(400).json({ message: "User ID is required" });
    }

    const foundUser = await User.findById(userId);
    if(!foundUser){
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ User: foundUser });
} catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
}
}

async function updateUser(req, res) {
    try{
        const { userId } = req.params;
    const { username, email, password, lastSeen } = req.body;
    if( !userId){
        return res.status(400).json({ message: "User ID is required" });
    }

    const updatedData = {};
    if (username) updatedData.username = username;
    if (email) updatedData.email = email;
    if (password) updatedData.password = password;
    if (lastSeen) updatedData.lastSeen = lastSeen;

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if(!updatedUser){
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User updated successfully", user: updatedUser });
} catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
}
}

async function deleteUser(req, res) {
    try{
        const { userId } = req.params;
    if( !userId){
        return res.status(400).json({ message: "User ID is required" });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if(!deletedUser){
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully", user: deletedUser });
} catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
}
}

async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        return res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}   

async function searchUsersByUsername(req, res) {
  try {
    const { username } = req.query;

    if (!username || username.trim() === '') {
      return res.status(400).json({ message: 'Username query is required' });
    }

    // Find users with case-insensitive partial match
    const users = await User.find({
      username: { $regex: username, $options: 'i' },
    }).select('username _id lastSeen'); // include lastSeen

    const now = new Date();
    const result = users.map(user => {
      const lastSeenDate = user.lastSeen ? new Date(user.lastSeen) : null;
      const status =
        lastSeenDate && now - lastSeenDate <= 10 * 60 * 1000 // 10 minutes in ms
          ? 'online'
          : 'offline';

      return {
        _id: user._id,
        username: user.username,
        lastSeen: user.lastSeen,
        status,
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while searching users' });
  }
}


module.exports = { createUser, getUserById, updateUser, deleteUser, getAllUsers, searchUsersByUsername };
