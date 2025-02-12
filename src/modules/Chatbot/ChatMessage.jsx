import React from 'react';
import { RiRobot2Fill } from "react-icons/ri";

const ChatMessage = ({chat}) => {
  return (
    <div className={`message ${chat.role === "model" ? "bot-message" : "user-message"}`}>
        {chat.role === "model" &&  <RiRobot2Fill/>}
        <p className='message-text'>{chat.text}</p>
    </div>
  );
}

export default ChatMessage;
