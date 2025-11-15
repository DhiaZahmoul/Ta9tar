'use client';
import React from 'react';
import './OnlineContactCard.css';

const OnlineContactCard = ({ name }) => {
  const initial = name?.charAt(0)?.toUpperCase() || '?';

  return (
    <div className="online-contact-card">
      <div className="avatar">
        <span>{initial}</span>
      </div>
      <div className="contact-info">
        <p className="contact-name">{name}</p>
        <span className="status online">Online</span>
      </div>
    </div>
  );
};

export default OnlineContactCard;
