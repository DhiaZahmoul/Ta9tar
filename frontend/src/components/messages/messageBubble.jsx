// frontend/src/components/messages/messageBubble.jsx
// MessageBubble component
//Displays individual message bubble
//Shows sender info, message content, and timestamp
//Avatars Not Working properly yet
//Must find a way to integrate avatars properly
//css entirely created by CHATGPT
//styling not bad for now

'use client';
import React from 'react';
import './MessageBubble.css';

const MessageBubble = ({ message, currentUserId }) => {
  const isOwn = message.sender === currentUserId;
  const senderInitial = message.senderUsername?.charAt(0).toUpperCase() || '?';

  return (
    <div className={`message-bubble ${isOwn ? 'own' : 'other'} fade-in`}>
      {!isOwn && <div className="bubble-avatar">{senderInitial}</div>}

      <div className="message-content">
        {!isOwn && <div className="message-sender">{message.senderUsername}</div>}
        <p className="message-text">{message.content}</p>
        <span className="message-time">
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {isOwn && <div className="bubble-avatar own-avatar">{senderInitial}</div>}
    </div>
  );
};

export default MessageBubble;
