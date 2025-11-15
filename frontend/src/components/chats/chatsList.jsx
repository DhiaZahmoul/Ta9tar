'use client';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatDisplay from './chatDisplay';
import { setSelectedChat } from '../../redux/slices/chatSlice';

const ChatsList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.auth.userId);
  const selectedChat = useSelector((state) => state.chat.selectedChat);

  useEffect(() => {
    const fetchUserChats = async () => {
      if (!currentUserId) {
        setError('No user found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/chats/user/${currentUserId}`, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error('Failed to fetch chats');
        const data = await res.json();
        setChats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserChats();
  }, [currentUserId]);

  if (loading) return <div className="text-gray-400">Loading chats...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="w-full h-full overflow-y-auto space-y-2 p-2">
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => dispatch(setSelectedChat(chat))} // dispatch redux action
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
  );
};

export default ChatsList;
