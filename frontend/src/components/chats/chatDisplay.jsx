// frontend/src/components/chats/chatDisplay.jsx
// ChatDisplay component
//Displays individual chat details in ChatsList
//Shows chat name, participants, creation date
//Simple and functional for now
//Might enhance UI/UX later with better design
//css entirely created by CHATGPT
//Might be adjusted later for more features(avatar, last message, etc)
"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import './ChatDisplay.css'; // import the CSS

const ChatDisplay = ({ chat }) => {
  const currentUserId = useSelector((state) => state.auth.userId);

  // Exclude current user from participant list
  const otherUsers = chat.users
    .filter(user => user._id !== currentUserId) // exclude logged-in user
    .map(user => user.username)
    .join(', ');

  return (
    <div className="chat-card">
      <h3 className="chat-name">{chat.chatName}</h3>
      {otherUsers.length > 0 && <p className="chat-users">With: {otherUsers}</p>}
      <p className="chat-date">Created: {new Date(chat.createdAt).toLocaleString()}</p>
      {chat.isGroupChat && <span className="group-tag">Group Chat</span>}
    </div>
  );
};

export default ChatDisplay;
