'use client';
import React, { useState, useEffect } from 'react';
import ChatHeader from './chatHeader';
import MessagesContainer from '../messages/messagesContainer';
import MessageInput from '../messages/messageInput';
import './ChatContainer.css';
import { useSelector } from 'react-redux';

const ChatContainer = ({ chat }) => {
  const currentUserId = useSelector((state) => state.auth.userId);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch messages for the selected chat
  // Fetch messages
useEffect(() => {
  const fetchMessages = async () => {
    if (!chat?._id) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Missing authentication token');
        setLoading(false);
        return;
      }

      const response = await fetch(`http://localhost:5000/api/messages/${chat._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();

      // ✅ extract messages array
      setMessages(Array.isArray(data.messages) ? data.messages : []);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchMessages();
}, [chat]);


// Add new message safely
const handleSendMessage = (newMessage) => {
  setMessages((prev) => [...(Array.isArray(prev) ? prev : []), newMessage]);
};


  return (
    <div className="chat-container flex flex-col h-full">
      {/* Header */}
      <ChatHeader chat={chat} currentUserId={currentUserId} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="text-gray-400 p-4">Loading messages...</div>
        ) : error ? (
          <div className="text-red-500 p-4">{error}</div>
        ) : (
          <MessagesContainer messages={messages} />
        )}
      </div>

      {/* Input */}
      <MessageInput
        chatId={chat?._id}
        currentUserId={currentUserId}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatContainer;
