// frontend/src/components/buttons/contactsButton.jsx
// ContactsButton component
//Toggles display of ChatsList when clicked
//Simple and functional for now
//Might enhance UI/UX later with better design
//css entirely created by CHATGPT
"use client";
import React, { useState } from 'react';
import ChatsList from '../chats/chatsList'; 
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
