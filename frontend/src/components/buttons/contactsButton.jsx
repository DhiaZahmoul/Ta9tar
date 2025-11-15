// frontend/src/components/buttons/contactsButton.jsx
'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveComponent } from '@/redux/slices/UiSlice';
import './contactsButton.css';

const ContactsButton = () => {
  const dispatch = useDispatch();
  const activeComponent = useSelector((state) => state.ui.activeComponent);

  const handleClick = () => {
    if (activeComponent === 'contacts') {
      dispatch(setActiveComponent(null)); // toggle off if already active
    } else {
      dispatch(setActiveComponent('contacts'));
    }
  };

  return (
    <div className="contacts-button-container">
      <button className="contacts-btn" onClick={handleClick}>
        {activeComponent === 'contacts' ? 'Close Contacts' : 'Contacts'}
      </button>
    </div>
  );
};

export default ContactsButton;
