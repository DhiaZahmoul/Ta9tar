import React from 'react';
import ContactCard from './contactCard';
import './contactList.css';

const ContactList = ({ users, onAddUser }) => {
  return (
    <div className="contact-list">
      {users.length > 0 ? (
        users.map(user => (
          <ContactCard
            key={user._id}
            name={user.username}
            status={user.status}
            onAdd={() => onAddUser(user)} // call parent handler
          />
        ))
      ) : (
        <p className="no-users">No contacts found.</p>
      )}
    </div>
  );
};

export default ContactList;
