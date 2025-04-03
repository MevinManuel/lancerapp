import React, { useState, useEffect } from 'react';
import './styles/chat.css';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000', {
  withCredentials: true,
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

const ChatPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [otherUser, setOtherUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (jobId) {
      socket.emit('joinRoom', jobId);

      socket.on('newMessage', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.off('newMessage');
      };
    }
  }, [jobId]);

  useEffect(() => {
    const fetchOtherUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/chat-users/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.length > 0) {
          setOtherUser(response.data[0]);
        } else {
          setOtherUser(null);
          alert("No chat partner available for this job.");
          navigate("/home");
        }
      } catch (error) {
        console.error('Error fetching other user:', error.response ? error.response.data : error.message);
        if (error.response) {
          if (error.response.status === 404) {
            alert(`Error: ${error.response.data.message || 'Job not found.'} Details: ${error.response.data.details || 'Unknown'}`);
          } else if (error.response.status === 401) {
            navigate('/login');
          } else if (error.response.status === 403) {
            alert(`Error: ${error.response.data.message || 'Unauthorized.'} Details: ${error.response.data.details || 'Unknown'}`);
            navigate("/home");
          } else {
            alert(`An error occurred: ${error.response.data?.message || error.message}`);
          }
        } else {
          alert(`Network error: ${error.message}`);
        }
        navigate("/home");
      }
    };

    if (token && jobId) {
      fetchOtherUser();
    } else {
      navigate('/login');
    }
  }, [token, navigate, jobId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/chat/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error.response ? error.response.data : error.message);
        if (error.response) {
          if (error.response.status === 404) {
            alert(`Error: ${error.response.data.message || 'Job not found.'}`);
          } else if (error.response.status === 401) {
            navigate('/login');
          } else if (error.response.status === 403) {
            alert(`Error: ${error.response.data.message || 'Unauthorized.'}`);
            navigate("/home");
          }
        }
      }
    };

    if (token && jobId && otherUser) {
      fetchMessages();
    }
  }, [jobId, otherUser, token, navigate]);

  const sendMessage = async () => {
    if (!inputText.trim() || !jobId || !otherUser) return;

    try {
      await axios.post(
        'http://localhost:5000/send-message',
        { jobId, message: inputText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInputText("");
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error.message);
      if (error.response) {
        if (error.response.status === 401) {
          navigate('/login');
        } else if (error.response.status === 403) {
          alert(`Error: ${error.response.data.message || 'Unauthorized.'}`);
          navigate("/home");
        } else {
          alert(`Failed to send message: ${error.response.data?.message || error.message}`);
        }
      }
    }
  };

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <div className="back-arrow" onClick={() => navigate("/home")}>← Home</div>
        <h2>Chat Room</h2>
        <div className="direct-messages">
          <h3>Chat With</h3>
          {otherUser ? (
            <div className="chat-user active">{otherUser.username}</div>
          ) : (
            <div className="chat-user">No user available</div>
          )}
        </div>
      </aside>

      <main className="chat-window">
        <header className="chat-header">
          <h2>{otherUser ? `Chat with ${otherUser.username}` : "No Chat Available"}</h2>
        </header>
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender_id === otherUser?.id ? "received" : "sent"}`}
            >
              <strong>{msg.sender_username || "Unknown"}</strong>{" "}
              <span>{new Date(msg.created_at).toLocaleTimeString()}</span>
              <p>{msg.message}</p>
            </div>
          ))}
        </div>

        {otherUser && (
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
        )}
      </main>
    </div>
  );
};

export default ChatPage;