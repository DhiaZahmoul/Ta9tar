'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import './ChatHeader.css';

const ChatHeader = ({ chat, currentUserId, isActive }) => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/dashboard');
  };

  const users = chat?.users || [];

  // Remove current user from the list
  const otherUsers = users.filter((u) => u._id !== currentUserId);

  // Get initials of a user (e.g., "John Doe" → "JD")
  const getInitials = (name = '') =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  let chatName = chat?.chatName;

  if (!chatName) {
    if (users.length > 2) {
      chatName = otherUsers.map((u) => u.username).join(', ');
    } else {
      chatName = otherUsers[0]?.username || 'Chat';
    }
  }

  // Determine if it's a group chat (3+ users)
  const isGroupChat = users.length > 2;

  return (
    <div className="chat-header">
      <button className="back-btn" onClick={handleBack}>
        &#8592;
      </button>

      {/* Avatar Section */}
      <div className={`chat-avatar ${isGroupChat ? 'group' : ''}`}>
        {isGroupChat ? (
          otherUsers.slice(0, 3).map((user, index) => (
            <div key={user._id || index} className="avatar-initial">
              {getInitials(user.username)}
            </div>
          ))
        ) : (
          <div className="avatar-initial">
            {getInitials(otherUsers[0]?.username)}
          </div>
        )}
      </div>

      {/* Chat Info */}
      <div className="chat-info">
        <h2 className="chat-name">{chatName}</h2>
        {isActive !== undefined && (
          <span className={`chat-status ${isActive ? 'online' : 'offline'}`}>
            {isActive ? 'Active' : 'Offline'}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
