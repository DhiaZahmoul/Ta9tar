'use client';
import React, { useEffect, useRef } from 'react';
import MessageBubble from '../messages/messageBubble';
import { useSelector } from 'react-redux';
import './MessageContainer.css';

const MessagesContainer = ({ messages }) => {
  const containerRef = useRef(null);
  const currentUserId = useSelector((state) => state.auth.userId);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className="messages-container" ref={containerRef}>
      {messages && messages.length > 0 ? (
        messages.map((msg, index) => (
  <MessageBubble
    key={msg._id || index}  // fallback to index if _id missing
    message={msg}
    currentUserId={currentUserId}
  />
))

      ) : (
        <div className="no-messages">
          <p>No messages yet.</p>
          <span>Start the conversation ✨</span>
        </div>
      )}
    </div>
  );
};

export default MessagesContainer;
