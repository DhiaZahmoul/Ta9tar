'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ChatDisplay from './chatDisplay';
import ChatContainer from './chatContainer';

const ChatsList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedChat, setSelectedChat] = useState(null); // currently selected chat

  const authState = useSelector((state) => state.auth);
  const currentUserId = authState?.userId;

  // Fetch all chats
  useEffect(() => {
    const fetchUserChats = async () => {
      if (!currentUserId) {
        setError('No user found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:5000/api/chats/user/${currentUserId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch your chats');

        const data = await response.json();
        setChats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserChats();
  }, [currentUserId]);

  // Select chat
  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  if (loading) return <div className="text-gray-400">Loading chats...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex h-full">
      {/* Chats list */}
      <div className="w-1/3 border-r border-gray-300 overflow-y-auto p-2 space-y-2">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => handleSelectChat(chat)}
              className={`cursor-pointer p-2 rounded ${
                selectedChat?._id === chat._id ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
            >
              <ChatDisplay chat={chat} currentUserId={currentUserId} />
            </div>
          ))
        ) : (
          <div className="text-gray-500">No chats found.</div>
        )}
      </div>

      {/* Chat container */}
      <div className="w-2/3 flex flex-col">
        {selectedChat ? (
          <ChatContainer chat={selectedChat} />
        ) : (
          <div className="text-gray-400 p-4">Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
};

export default ChatsList;
