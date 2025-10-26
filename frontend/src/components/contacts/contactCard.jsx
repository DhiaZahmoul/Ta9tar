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
