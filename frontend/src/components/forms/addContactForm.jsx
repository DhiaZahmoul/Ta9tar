'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import HeaderForm from './headerForm';
import SelectedContacts from '../contacts/selectedContacts';
import './createChat.css';

console.log("CreateChat component loaded");

const CreateChat = () => {
  // ✅ Grab the entire auth state for debugging
  const authState = useSelector((state) => state.auth);
  console.log("Auth state:", authState);

  // ✅ Get the current user ID safely
  const currentUserId = authState?.userId;
  console.log("Current user ID:", currentUserId);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [chatName, setChatName] = useState('');

  // Function to add a user from HeaderForm
  const handleAddUser = (user) => {
    setSelectedUsers(prev => {
      if (!prev.find(u => u._id === user._id)) {
        console.log("Adding user:", user);
        return [...prev, user];
      }
      return prev;
    });
  };

  // Automatically update chatName when selectedUsers change
  useEffect(() => {
    if (selectedUsers.length === 1) {
      setChatName(selectedUsers[0].username);
    } else if (selectedUsers.length > 1) {
      setChatName(''); // reset for group chat
    }
  }, [selectedUsers]);

  const handleCreateChat = async () => {
    if (!chatName || selectedUsers.length === 0) {
      alert("Please select users and provide a chat name.");
      return;
    }

    if (!currentUserId) {
      alert("Current user ID is not available. Cannot create chat.");
      console.error("Cannot create chat: currentUserId is missing.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // ✅ Include current user ID along with selected users
      const usersToSend = [currentUserId, ...selectedUsers.map(u => u._id)];
      console.log("Users to send:", usersToSend);

      const response = await fetch("http://localhost:5000/api/chats/createchat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          chatName,
          users: usersToSend
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Failed to create chat.");
        return;
      }

      const data = await response.json();
      console.log("Chat created:", data.chat);
      alert(`Chat "${data.chat.chatName}" created successfully!`);

      // Reset selected users and chat name
      setSelectedUsers([]);
      setChatName('');
    } catch (error) {
      console.error("Error creating chat:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="create-chat-container">
      <HeaderForm onAddUser={handleAddUser} />

      {selectedUsers.length > 0 && <SelectedContacts users={selectedUsers} />}

      {selectedUsers.length > 0 && (
        <input
          type="text"
          className="chat-name-input"
          placeholder={selectedUsers.length > 1 ? "Enter group chat name..." : ""}
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
        />
      )}

      {selectedUsers.length > 0 && (
        <button className="create-chat-btn" onClick={handleCreateChat}>
          Create Chat
        </button>
      )}
    </div>
  );
};

export default CreateChat;
