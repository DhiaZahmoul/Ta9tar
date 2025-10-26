"use client";
import React, { useState } from 'react';
import ChatsList from '../chats/chatsList'; // adjust path if needed
import './contactsButton.css';

const ContactsButton = () => {
  const [showChats, setShowChats] = useState(false);

  const handleToggleChats = () => {
    setShowChats(prev => !prev);
  };

  return (
    <div className="contacts-button-container">
      <button className="contacts-btn" onClick={handleToggleChats}>
        {showChats ? "Close Chats" : "Contacts"}
      </button>

      {showChats && <div className="chats-list-wrapper"><ChatsList /></div>}
    </div>
  );
};

export default ContactsButton;
