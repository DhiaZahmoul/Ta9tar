import React from 'react';
import ContactCard from './contactCard';
import './contactList.css';

const ContactList = ({ users, onAddUser }) => {
  return (
    <div className="contact-list">
      {users.length > 0 ? (
        users
          .filter(user => user && user._id) // ❌ remove any null/undefined
          .map(user => (
            <ContactCard
              key={user._id}
              name={user.username}
              status={user.status}
              onAdd={() => onAddUser(user)}
            />
          ))
      ) : (
        <p className="no-users">No contacts found.</p>
      )}
    </div>
  );
};

export default ContactList;
