'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './MessageInput.css';

const MessageInput = ({ chatId, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const currentUserId = useSelector((state) => state.auth.userId);

  const handleSend = async () => {
  if (!message.trim() || !chatId) return;

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const response = await fetch(`http://localhost:5000/api/messages/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        sender: currentUserId,
        content: message.trim(),
        chat: chatId,
      }),
    });

    if (!response.ok) throw new Error('Failed to send message');

    const data = await response.json();
    onSendMessage(data.messageData); // pass the actual message object
    setMessage('');
  } catch (err) {
    console.error('Error sending message:', err);
  }
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
