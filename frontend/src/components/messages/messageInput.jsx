'use client';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './MessageInput.css';
import { socket } from '../../socket/socket'; // We'll create a shared socket instance

const MessageInput = ({ chatId, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const currentUserId = useSelector((state) => state.auth.userId);

  const handleSend = () => {
    if (!message.trim() || !chatId || !currentUserId) return;

    const newMessage = {
      sender: currentUserId,
      content: message.trim(),
      chat: chatId,
    };

    // Send message to server
    socket.emit('sendMessage', newMessage);

    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input-container">
      <textarea
        className="message-input"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
      />
      <button className="send-button" onClick={handleSend}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
        </svg>
      </button>
    </div>
  );
};

export default MessageInput;
