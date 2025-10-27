// frontend/src/components/contacts/contactList.jsx
// ContactList component
//Displays list of contacts
//Uses ContactCard for individual contact display
//Simple and functional for now
//Might enhance UI/UX later with better design
//css entirely created by CHATGPT
//Might get a major update later to be able to be used in two different contexts
//depends on UI/UX decisions


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
