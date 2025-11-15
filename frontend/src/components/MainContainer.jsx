'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import ChatContainer from './chats/chatContainer';
import ChatsList from './chats/chatsList'; // example component
import CreateChat from './forms/addContactForm';
import CircularText from './animated/welcome';
const MainContainer = () => {
  // Read the currently active component and selected chat from Redux
  const activeComponent = useSelector((state) => state.ui.activeComponent); 
  const selectedChat = useSelector((state) => state.chat.selectedChat);

  // Render based on state
  switch (activeComponent) {
    case 'chat':
      if (!selectedChat) {
        return (
          <div className="select-chat-placeholder">
            Select a chat first
          </div>
        );
      }
      return <ChatContainer chat={selectedChat} />;

    case 'contacts':
      return <ChatsList />;

    case 'createChat':
      return <CreateChat />;

    default:
      return (
        <div className="select-chat-placeholder">
          <CircularText
            text="Welcome*To*Ta9tar!*"
            onHover="speedUp"
            spinDuration={20}
            className="custom-class"
          />
        </div>
      );
  }
};

export default MainContainer;
