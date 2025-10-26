"use client";
import React from 'react'

const CreateChatButton = () => {
    const [title, setTitle] = React.useState("");
    const [users, setUsers] = React.useState([]);


    const handleCreateChat = () => {
        // Logic to create a new chat
    }
  return (
    <div>
        <form onSubmit={handleCreateChat}>
            <input
            typee="radio" value="group"
            name="chatType"
            >Group Chat
            
            </input>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter chat title"
          />
          <input
            type="text"
            value={users}
            onChange={(e) => setUsers(e.target.value.split(","))}
            placeholder="Enter user IDs (comma separated)"
          />
          <button type="submit">Create Chat</button>
        </form>
      </div>
  )
}

export default CreateChatButton