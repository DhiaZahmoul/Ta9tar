"use client";
import React, { useState } from 'react';
import AddContactForm from '../forms/addContactForm'; // adjust path if needed
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
