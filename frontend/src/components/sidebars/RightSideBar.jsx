import React from "react";
import OnlineContactList from "../contacts/onlineContactsList";
import './RightSideBar.css';

const RightSideBar = ({ onlineUsers }) => {
  return (
    <div className="rightSideBar">
      <h3>Online Users</h3>
        {onlineUsers.length > 0 ? (
          <OnlineContactList userIds={onlineUsers} />
        ) : (
          <p>No users online</p>
        )}
    </div>
  );
};

export default RightSideBar;
