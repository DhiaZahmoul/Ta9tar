'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import HeaderForm from './headerForm';
import SelectedContacts from '../contacts/selectedContacts';
import './createChat.css';

const CreateChat = () => {
  const authState = useSelector((state) => state.auth);
  const currentUserId = authState?.userId;

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [chatName, setChatName] = useState('');

  const handleAddUser = (user) => {
    if (!user || !user._id) return; // ❌ safety check

    setSelectedUsers(prev => {
      if (!prev.find(u => u._id === user._id)) {
        return [...prev, user];
      }
      return prev;
    });
  };

  useEffect(() => {
    if (selectedUsers.length === 1) {
      setChatName(selectedUsers[0].username);
    } else if (selectedUsers.length > 1) {
      setChatName('');
    }
  }, [selectedUsers]);

  const handleCreateChat = async () => {
    if (!chatName || selectedUsers.length === 0) {
      alert("Please select users and provide a chat name.");
      return;
    }

    if (!currentUserId) {
      alert("Current user ID is not available. Cannot create chat.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      // Filter invalid users and include current user
      const validSelectedUsers = selectedUsers
        .map(u => u?._id)
        .filter(Boolean);

      const usersToSend = [currentUserId, ...validSelectedUsers];

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
        alert(errorData.message || "Failed to create chat.");
        return;
      }

      const data = await response.json();
      console.log("Chat created:", data.chat);
      alert(`Chat "${data.chat.chatName}" created successfully!`);

      setSelectedUsers([]);
      setChatName('');
    } catch (err) {
      console.error("Error creating chat:", err);
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
