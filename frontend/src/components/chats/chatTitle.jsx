import React, { useState } from 'react'

const ChatTitle = () => {
    const [title, setTitle] = useState("");
  return (
    <div>
      <h2>{title}</h2>
    </div>
  )
}

export default ChatTitle