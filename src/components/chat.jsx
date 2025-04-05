import React, { useState, useEffect, useRef } from 'react';
import './styles/chat.css';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from 'axios';
import io from 'socket.io-client';

const ChatPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const location = useLocation();
  const [otherUser, setOtherUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const token = location.state?.token; // Get token from navigation state
  const socketRef = useRef(null);

  useEffect(() => {
    if (!token) {
      navigate('/lancerapp/login');
      return;
    }

    socketRef.current = io('http://localhost:5000', {
      withCredentials: true,
      auth: { token },
    });

    const socket = socketRef.current;

    if (jobId) {
      socket.emit('joinRoom', jobId);
      socket.on('newMessage', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
      socket.on('auth_error', (data) => {
        console.error('Socket auth error:', data.message);
        navigate('/lancerapp/login');
      });
      socket.on('room_error', (data) => {
        console.error('Room error:', data.message);
        alert(data.message);
        navigate('/home', { state: { token } });
      });
      socket.on('room_joined', (data) => {
        console.log(data.message);
      });
    }

    return () => {
      socket.disconnect();
      socket.off('newMessage');
      socket.off('auth_error');
      socket.off('room_error');
      socket.off('room_joined');
    };
  }, [jobId, token, navigate]);

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
          navigate('/home', { state: { token } });
        }
      } catch (error) {
        console.error('Error fetching other user:', error.response ? error.response.data : error.message);
        if (error.response) {
          if (error.response.status === 404) {
            alert(`Error: ${error.response.data.message || 'Job not found.'}`);
          } else if (error.response.status === 401) {
            navigate('/lancerapp/login');
          } else if (error.response.status === 403) {
            alert(`Error: ${error.response.data.message || 'Unauthorized.'}`);
            navigate('/home', { state: { token } });
          } else {
            alert(`An error occurred: ${error.response.data?.message || error.message}`);
          }
        } else {
          alert(`Network error: ${error.message}`);
        }
        navigate('/home', { state: { token } });
      }
    };

    if (token && jobId) {
      fetchOtherUser();
    } else {
      navigate('/lancerapp/login');
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
            navigate('/lancerapp/login');
          } else if (error.response.status === 403) {
            alert(`Error: ${error.response.data.message || 'Unauthorized.'}`);
            navigate('/home', { state: { token } });
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
          navigate('/lancerapp/login');
        } else if (error.response.status === 403) {
          alert(`Error: ${error.response.data.message || 'Unauthorized.'}`);
          navigate('/home', { state: { token } });
        } else {
          alert(`Failed to send message: ${error.response.data?.message || error.message}`);
        }
      }
    }
  };

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <div className="back-arrow" onClick={() => navigate('/home', { state: { token } })}>← Home</div>
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