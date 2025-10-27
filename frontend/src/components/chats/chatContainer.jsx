// frontend/src/components/chats/chatContainer.jsx
// ChatContainer component
//Displays chat header, messages, and input for a selected chat
//Integrates with Socket.IO for real-time messaging
//Simple and functional for now
//Might enhance UI/UX later with better design
//css entirely created by CHATGPT
//View child components for better understanding of structure

'use client';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChatHeader from './chatHeader';
import MessagesContainer from '../messages/messagesContainer';
import MessageInput from '../messages/messageInput';
import './ChatContainer.css';
import { socket } from '../../socket/socket';

const ChatContainer = ({ chat }) => {
  const currentUserId = useSelector((state) => state.auth.userId);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chat?._id) return;

    setLoading(true);

    // Join chat room
    socket.emit('joinChat', chat._id);

    // Request initial messages from server
    socket.emit('getMessages', chat._id, (initialMessages) => {
      setMessages(Array.isArray(initialMessages) ? initialMessages : []);
      setLoading(false);
    });

    // Listen for new messages
    const handleReceiveMessage = (newMessage) => {
      if (newMessage.chat === chat._id) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.emit('leaveChat', chat._id);
      socket.off('receiveMessage', handleReceiveMessage);
      setMessages([]);
    };
  }, [chat]);

  const handleSendMessage = (message) => {
    // Message will be added when server emits 'receiveMessage'
  };

  return (
    <div className="chat-container flex flex-col h-full">
      <ChatHeader chat={chat} currentUserId={currentUserId} />

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="text-gray-400 p-4">Loading messages...</div>
        ) : (
          <MessagesContainer messages={messages} />
        )}
      </div>

      <MessageInput chatId={chat?._id} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;
