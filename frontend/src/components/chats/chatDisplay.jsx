"use client";

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedChat } from '../../redux/slices/chatSlice';
import { setActiveComponent } from '../../redux/slices/UiSlice';
import './ChatDisplay.css';

const ChatDisplay = ({ chat }) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.auth.userId);

  // Exclude current user from participant list
  const otherUsers = chat.users
    .filter(user => user._id !== currentUserId)
    .map(user => user.username)
    .join(', ');

  // Handle click to open chat in main container
  const handleClick = () => {
    dispatch(setSelectedChat(chat));
    dispatch(setActiveComponent('chat'));
  };

  return (
    <div className="chat-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h3 className="chat-name">{chat.chatName}</h3>
      {otherUsers.length > 0 && <p className="chat-users">With: {otherUsers}</p>}
      <p className="chat-date">Created: {new Date(chat.createdAt).toLocaleString()}</p>
      {chat.isGroupChat && <span className="group-tag">Group Chat</span>}
    </div>
  );
};

export default ChatDisplay;
