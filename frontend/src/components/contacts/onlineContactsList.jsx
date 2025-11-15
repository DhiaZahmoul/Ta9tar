'use client';
import React, { useEffect, useState } from 'react';
import OnlineContactCard from './onlineContactCard';
import './contactList.css';

const OnlineContactList = ({ userIds = [], onAddUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userIds || userIds.length === 0) {
      setUsers([]);
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // if your backend requires auth
        const fetchedUsers = await Promise.all(
          userIds.map(async (id) => {
            try {
              const res = await fetch(`http://localhost:5000/api/users/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              if (!res.ok) throw new Error('Failed to fetch user');
              const data = await res.json();
              return data.User; // should have _id, username, status, etc.
            } catch (err) {
              console.error(`Failed to fetch user ${id}:`, err);
              return null;
            }
          })
        );

        setUsers(fetchedUsers.filter(Boolean)); // remove nulls
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userIds]);

  if (loading) return <p className="no-users">Loading contacts...</p>;
  if (users.length === 0) return <p className="no-users">No contacts found.</p>;

  return (
    <div className="contact-list">
      {users.map((user) => (
        <OnlineContactCard
          key={user._id}
          name={user.username}
        />
      ))}
    </div>
  );
};

export default OnlineContactList;



