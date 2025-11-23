'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LeftSideBar from '@/components/sidebars/LeftSideBar';
import RightSideBar from '@/components/sidebars/RightSideBar';
import LeftUpperBar from '@/components/sidebars/leftUpperBar';
import RightUpperBar from '@/components/sidebars/rightUpperBar';
import MainContainer from '@/components/MainContainer';
import './dashboard.css';
import Aurora from '@/components/animated/Aurora';
import { socket } from "../../socket/socket";

const DashboardPage = () => {
  const userId = useSelector((state) => state.auth.userId);
  const selectedChat = useSelector((state) => state.chat.selectedChat); // Redux
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
      const registered = localStorage.getItem("token");
      if (!registered) {
        window.location.href = '/login'; // or '/dashboard'
      }
    }, []);

  useEffect(() => {
    if (!userId) return;

    socket.connect();
    socket.emit('registerUser', userId);

    socket.on('onlineUsers', (users) => setOnlineUsers(users));
    socket.on('userOnline', ({ userId: onlineId }) => {
      setOnlineUsers(prev => [...new Set([...prev, onlineId])]);
    });
    socket.on('userOffline', ({ userId: offlineId }) => {
      setOnlineUsers(prev => prev.filter(id => id !== offlineId));
    });

    return () => {
      socket.disconnect();
      setOnlineUsers([]);
    };
  }, [userId]);

  return (
    <div className="dashboard-container">
      <div className="background-image">
                  <Aurora
                      colorStops={["#000000", "#FFD700", "#DAA520"]}
                      blend={0.5}
                      amplitude={1.0}
                      speed={0.5}
                  />
                  </div>
      {/* Upper Bars */}
      <div className="left-upper-bar">
        <LeftUpperBar />
      </div>

      <div className="right-upper-bar">
        <RightUpperBar />
      </div>

      {/* Left Sidebar */}
      <div className="left-sidebar">
        <LeftSideBar />
      </div>

      {/* Main Container */}
      <div className="chat-container">
        <MainContainer onlineUsers={onlineUsers} selectedChat={selectedChat} />
        
      </div>

      {/* Right Sidebar */}
      <div className="right-sidebar">
        <RightSideBar onlineUsers={onlineUsers} />
      </div>
    </div>
  );
};

export default DashboardPage;
