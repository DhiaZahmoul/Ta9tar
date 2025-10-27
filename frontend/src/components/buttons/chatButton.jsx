// frontend/src/components/buttons/chatButton.jsx
// ChatButton component
//Allows users to create new chats
//Opens a form to add contacts when clicked
//Simple and functional for now
//Might enhance UI/UX later with better design
//css entirely created by CHATGPT
"use client";
import React, { useState } from 'react';
import AddContactForm from '../forms/addContactForm';
import './ChatButton.css';

const ChatButton = () => {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(prev => !prev);
  };

  return (
    <div className="chat-button-container">
      <button className="chat-btn" onClick={handleToggleForm}>
        {showForm ? "Close" : "Create Chat"}
      </button>

      {showForm && <AddContactForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default ChatButton;
