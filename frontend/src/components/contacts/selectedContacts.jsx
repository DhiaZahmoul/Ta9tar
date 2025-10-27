// frontend/src/components/contacts/selectedContacts.jsx
// SelectedContacts component
//Displays selected contacts in chat creation
//Shows avatar and name of each selected contact
//Simple and functional for now
//Might enhance UI/UX later with better design
//css entirely created by CHATGPT
//Might need to integrate with global state later


import React from 'react';
import './selectedContact.css';

const SelectedContacts = ({ users }) => {
  return (
    <div className="selected-contacts">
      {users.map(user => {
        const isOnline = user.status?.toLowerCase() === 'online';
        return (
          <div key={user._id} className="selected-contact-card">
            <div className="avatar-container">
              <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>
              <span className={`status-dot ${isOnline ? 'online' : 'offline'}`}></span>
            </div>
            <p className="contact-name">{user.username}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SelectedContacts;
