import React from "react";
import ChatButton from "../buttons/chatButton";
import ContactsButton from "../buttons/contactsButton";
import './LeftSideBar.css';

const LeftSideBar = ({ setSelectedChat }) => {
  return (
    <div className="leftSideBar">
      <ContactsButton />
      <ChatButton />
    </div>
  );
};

export default LeftSideBar;
