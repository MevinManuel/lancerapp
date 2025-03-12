// ChatPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import './styles/chat.css';
import { useNavigate } from "react-router-dom"; // For navigation


const users = [
  { name: "Ahmad Baptista", messages: [{ sender: "Ahmad Baptista", text: "Hey! How's it going?", timestamp: "3:31pm" }] },
  { name: "Mira Philips", messages: [{ sender: "Mira Philips", text: "Don't forget our meeting tomorrow!", timestamp: "3:32pm" }] },
];

const ChatPage = () => {
  const navigate = useNavigate(); // Hook to handle navigation
  const [activeChat, setActiveChat] = useState(users[0]);
  const [messages, setMessages] = useState(activeChat.messages);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = { sender: "You", text: inputText, timestamp: "Now" };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  return (
    <div className="chat-container">
      
      {/* Sidebar with Back Arrow */}
      <aside className="sidebar">
        <div className="back-arrow" onClick={() => navigate("/home")}>← Home</div>
        <h2>Chat Room</h2>
        
        <div className="channels">
          <h3>Channels</h3>
          <div className="chat-user">Coffee Nerds</div>
          <div className="chat-user">Hackers Inc</div>
        </div>

        <div className="direct-messages">
          <h3>Direct Messages</h3>
          {users.map((user) => (
            <div
              key={user.name}
              className={`chat-user ${activeChat.name === user.name ? "active" : ""}`}
              onClick={() => { setActiveChat(user); setMessages(user.messages); }}
            >
              {user.name}
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Window */}
      <main className="chat-window">
        <header className="chat-header">
          <h2>{activeChat.name}</h2>
        </header>
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === "You" ? "sent" : "received"}`}>
              <strong>{msg.sender}</strong> <span>{msg.timestamp}</span>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        
        {/* Chat Input */}
        <footer className="chat-input small-input">
          <input 
            type="text" 
            value={inputText} 
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Write a reply..." 
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </footer>
      </main>
    </div>
  );
};

export default ChatPage;
