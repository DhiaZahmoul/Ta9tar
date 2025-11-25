import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import './chatResult.css';
const ChatResult = ({ chat}) => {

  const initial = chat.chatName
    ? chat.chatName.charAt(0).toUpperCase()
    : "?";

  return (
    <Card className="chat-result-card shadow-lg">
      <Card.Body>

        <div className="chat-avatar">{initial}</div>

        <Card.Title className="chat-name">
          {chat.chatName}
        </Card.Title>

        <Card.Text className="chat-users-count">
          {chat.users.length} users
        </Card.Text>

        <div className="chat-users-preview">
          {chat.users.slice(0, 3).map((u) => (
            <span key={u._id} className="chat-user-tag">
              {u.username}
            </span>
          ))}
          {chat.users.length > 3 && (
            <span className="chat-user-tag more">+{chat.users.length - 3}</span>
          )}
        </div>

      </Card.Body>
    </Card>
  );
};

export default ChatResult;
