// frontend/src/components/contacts/contactCard.jsx
// ContactCard component
//Displays individual contact details
//Shows name, status, and add button
//Simple and functional for now
//Might enhance UI/UX later with better design
//css entirely created by CHATGPT
//Uses status to show online/offline indicator
//Status is not yet integrated with real-time updates
//Assumes status is passed as a prop
//Might need to integrate with global state later
"use client";
import React from 'react';
import './contactCard.css';

const ContactCard = ({ name, status, onAdd }) => {
  const isOnline = status?.toLowerCase() === 'online';

  return (
    <div className="contact-card">
      <div className="contact-left">
        <div className="avatar-container">
          <div className="avatar">{name.charAt(0).toUpperCase()}</div>
          <span className={`status-dot ${isOnline ? 'online' : 'offline'}`}></span>
        </div>
        <div className="contact-info">
          <p className="contact-name">{name}</p>
          <p className={`contact-status ${isOnline ? 'online-text' : 'offline-text'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>
      {/* Add button */}
      <button className="add-btn" onClick={onAdd}>Add</button>
    </div>
  );
};

export default ContactCard;
