// frontend/src/components/buttons/chatButton.jsx
'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveComponent } from '@/redux/slices/UiSlice';
import './ChatButton.css';

const ChatButton = () => {
  const dispatch = useDispatch();
  const activeComponent = useSelector((state) => state.ui.activeComponent);

  const handleClick = () => {
    if (activeComponent === 'createChat') {
      dispatch(setActiveComponent(null)); // toggle off if already active
    } else {
      dispatch(setActiveComponent('createChat'));
    }
  };

  return (
    <div className="chat-button-container">
      <button className="chat-btn" onClick={handleClick}>
        {activeComponent === 'createChat' ? 'Close' : 'Create Chat'}
      </button>
    </div>
  );
};

export default ChatButton;
