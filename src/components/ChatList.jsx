import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import './styles/chatlist.css';

const ChatList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.token;
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [postedJobs, setPostedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/lancerapp/login');
      return;
    }

    const fetchJobs = async () => {
      try {
        const acceptedResponse = await axios.get('http://localhost:5000/accepted-jobs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAcceptedJobs(acceptedResponse.data.acceptedJobs || []);

        const postedResponse = await axios.get('http://localhost:5000/posted-jobs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPostedJobs(postedResponse.data.postedJobs || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load chat list. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token, navigate]);

  const handleChatClick = async (jobId) => {
    console.log('Attempting to start chat for jobId:', jobId);
    console.log('Token:', token);
    try {
      const response = await axios.get(`http://localhost:5000/chat-users/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Chat users response:', response.data);
      if (response.data.length > 0) {
        navigate(`/chat/${jobId}`, { state: { token } });
      } else {
        alert('No chat partner available for this job.');
      }
    } catch (error) {
      console.error('Error checking chat user:', error.response ? error.response.data : error.message);
      console.error('Status:', error.response?.status);
      console.error('Headers:', error.response?.headers);
      alert(`Failed to start chat: ${error.response?.data?.message || 'Please try again.'}`);
    }
  };

  if (loading) return <div className="chat-list-container">Loading...</div>;
  if (error) return <div className="chat-list-container">{error}</div>;

  return (
    <div className="chat-list-container">
      <h1>Your Chats</h1>
      <div className="chat-sections">
        <div className="chat-section posted-jobs">
          <h2>Posted Jobs</h2>
          {postedJobs.length === 0 ? (
            <p>No jobs posted yet.</p>
          ) : (
            <ul className="chat-list">
              {postedJobs.map((job) => (
                <li
                  key={job.id}
                  className="chat-list-item"
                  onClick={() => handleChatClick(job.id)}
                >
                  <span className="job-title">{job.title}</span>
                  <span className="chat-user-name">
                    {job.accepted_by ? `Accepted by: ${job.accepted_by_username || 'Unknown'}` : 'Not accepted yet'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="chat-section accepted-jobs">
          <h2>Accepted Jobs</h2>
          {acceptedJobs.length === 0 ? (
            <p>No accepted jobs yet.</p>
          ) : (
            <ul className="chat-list">
              {acceptedJobs.map((job) => (
                <li
                  key={job.id}
                  className="chat-list-item"
                  onClick={() => handleChatClick(job.id)}
                >
                  <span className="job-title">{job.title}</span>
                  <span className="chat-user-name">
                    {job.posted_by_username || 'Unknown User'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button
        className="back-button"
        onClick={() => navigate('/home', { state: { token } })}
      >
        Back to Home
      </button>
    </div>
  );
};

export default ChatList;