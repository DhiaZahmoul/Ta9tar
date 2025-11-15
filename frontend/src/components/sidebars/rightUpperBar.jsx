'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './RightUpperBar.css';

const RightUpperBar = () => {
  const currentUserId = useSelector((state) => state.auth.userId);
  const [username, setUsername] = useState('Guest');

  useEffect(() => {
    if (!currentUserId) return;

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // if your backend requires auth
        const res = await fetch(`http://localhost:5000/api/users/${currentUserId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch user');

        const data = await res.json();
        if (data.User?.username) setUsername(data.User.username);
      } catch (err) {
        console.error('Error fetching user:', err);
        setUsername('Guest');
      }
    };

    fetchUser();
  }, [currentUserId]);

  return <div className="rightUpperBar">{username}</div>;
};

export default RightUpperBar;
