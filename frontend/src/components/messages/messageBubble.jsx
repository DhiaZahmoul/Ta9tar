'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import './MessageBubble.css';

const MessageBubble = ({ message }) => {
  const currentUserId = useSelector((state) => state.auth.userId);
  const isOwnMessage = message.sender?._id === currentUserId;

  // Generate initials if no avatar
  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0][0].toUpperCase();
  };

  return (
    <div className={`message-bubble ${isOwnMessage ? 'own' : 'other'}`}>
      {!isOwnMessage && (
        <div className="bubble-avatar">
          {getInitials(message.sender?.username)}
        </div>
      )}

      <div className="message-content">
        {!isOwnMessage && (
          <span className="message-sender">{message.sender?.username}</span>
        )}
        <p className="message-text">{message.content}</p>
        <span className="message-time">
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
