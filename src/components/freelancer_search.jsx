import React, { useState, useEffect } from 'react';
import './styles/freelancer_search.css';

const FreelancerSearch = () => {
  const [profiles, setProfiles] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found. Please log in.');
        }

        const response = await fetch('http://localhost:5000/get-profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch profiles: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setProfiles(Array.isArray(data) ? data : [data]);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleGoBack = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleGoForward = () => {
    if (index < profiles.length - 1) {
      setIndex(index + 1);
    }
  };

  if (loading) return <p>Loading profiles...</p>;
  if (error) return <p>Error: {error}</p>;
  if (profiles.length === 0) return <p>No profiles found.</p>;

  const currentProfile = profiles[index];

  return (
    <div className="main-container">
      <div className="container">
        <div className="card-container">
          <div className="card">
            <img className="profile-image" src={currentProfile.photo} alt={currentProfile.username} />
            <h2>{currentProfile.username}</h2>
            <div className="info-container">
              <div className="info-box">📍 {currentProfile.city || 'Unknown'}</div>
            </div>
            <h3 className="designation">{currentProfile.role || 'Freelancer'}</h3>
            {currentProfile.social_links?.linkedin && (
              <a 
                href={currentProfile.social_links.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="linkedin-link"
              >
                🔗 View LinkedIn
              </a>
            )}
          </div>
          <div className="button-container">
            <button onClick={handleGoBack} disabled={index === 0}>Back</button>
            <button onClick={handleGoForward} disabled={index === profiles.length - 1}>Forward</button>
          </div>
        </div>
      </div>

      <div className="bio-container">
        <h2>{currentProfile.username}</h2>
        <hr />
        <p><strong>Mobile:</strong> {currentProfile.mobile || 'N/A'}</p>
        <p><strong>Email:</strong> {currentProfile.email}</p>
        {currentProfile.resume && (
          <p><strong>Resume:</strong> <a href={`http://localhost:5000/${currentProfile.resume}`} target="_blank" rel="noopener noreferrer">Download</a></p>
        )}
        
        <h3>Interests</h3>
        <div className="skill-container">
          {currentProfile.industry_interest && currentProfile.industry_interest.length > 0 ? (
            currentProfile.industry_interest.map((skill, idx) => <div className="skill-box" key={idx}>{skill}</div>)
          ) : (
            <p>No interests listed.</p>
          )}
        </div>

        <h3>Tools</h3>
        <div className="skill-container">
          {currentProfile.tools && currentProfile.tools.length > 0 ? (
            currentProfile.tools.map((tool, idx) => <div className="skill-box" key={idx}>{tool}</div>)
          ) : (
            <p>No tools listed.</p>
          )}
        </div>

        <h3>About Me</h3>
        <p>{currentProfile.bio || 'No bio available'}</p>
      </div>
    </div>
  );
};

export default FreelancerSearch;