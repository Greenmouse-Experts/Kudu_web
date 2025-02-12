import React, { useState } from 'react';
import "./chat.css"
import { RiRobot2Fill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';

const Chat = () => {
  const [ chatHistory, setChatHistory ] = useState([]);

  const generateBotResponse = (history) => {
    console.log(history)
  }

  return (
    <div className="chat-container">
        <div className='chatbot-popup'>

            {/* CHAT HEADER */}
            <div className='chat-header'>
                <div className='header-info'>
                    <RiRobot2Fill />
                    <h2 className='logo-text'>Chatbot</h2>
                </div>
                <button>
                    <MdKeyboardArrowDown className='d-arrow' />
                </button>
            </div>

            {/* CHAT BODY */}
            <div className='chat-body'>
                <div className="message bot-message">
                    <RiRobot2Fill />
                    <p className='message-text'>
                        Hey there <br/> How can i help you?
                    </p>
                </div>

                {/* RENDER THE CHAT HISTORY DYNAMICALLY */}
                {chatHistory.map((chat, index) => (
                    <ChatMessage key={index} chat={chat}/>
                ))}
            </div>

            {/* CHAT FOOTER */}
            <div className='chat-footer'>
                <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
            </div>  
        </div>
    </div>
  );
};

export default Chat;
