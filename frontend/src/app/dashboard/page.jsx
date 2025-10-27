// frontend/src/app/dashboard/page.jsx
// Dashboard page component
//Major UI fixes are needed here later
//Recently added Socket.IO integration
//URGENT: must figure out final dashboard layout and structure later
'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ContactsButton from "../../components/buttons/contactsButton";
import ChatButton from "../../components/buttons/chatButton";
import ChatsList from "../../components/chats/chatsList";
import {socket} from "../../socket/socket";

const DashboardPage = () => {
  const userId = useSelector((state) => state.auth.userId);
  const [onlineUsers, setOnlineUsers] = useState([]);
  // Manage Socket.IO connection and events
  //Recently added 
  //Might get modified later as Socket.IO integration improves
  useEffect(() => {
    if (!userId) return;

    // Connect socket
    socket.connect();

    // Tell backend who this user is
    socket.emit('registerUser', userId);

    // Receive initial list of online users
    socket.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });

    // Update when users go online
    socket.on('userOnline', ({ userId: onlineId }) => {
      setOnlineUsers((prev) => [...new Set([...prev, onlineId])]);
    });

    // Update when users go offline
    socket.on('userOffline', ({ userId: offlineId }) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== offlineId));
    });

    // Cleanup on page unload
    return () => {
      socket.disconnect();
      setOnlineUsers([]);
    };
  }, [userId]);

  // Render the dashboard UI
  //Very basic for now, needs major improvements later
  return (
    <div className="d-flex">
      <div className="p-3 border-end">
        <ContactsButton />
        <ChatButton />
       
        <p className="mt-3 text-warning">
          Online: {onlineUsers.length} 
        </p>
      </div>

      <div className="flex-grow-1">
        <ChatsList onlineUsers={onlineUsers} />
      </div>
    </div>
  );
};

export default DashboardPage;
