import React, { useEffect, useState } from 'react';
import './styles/profile.css';
import { FaArrowLeft, FaInstagram, FaLinkedin } from 'react-icons/fa';
import axios from 'axios';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please login again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/lancerapp/get-userprofile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfileData(response.data);
      } catch (error) {
        setError('Failed to fetch profile data');
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleBackClick = () => {
    window.history.back();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-page-wrapper">
      <div className="bg-animationss"></div>
      <div className="bg-noisess"></div>
      <div className="profile-page-container">
        <button className="back-button" onClick={handleBackClick}>
          <FaArrowLeft />
        </button>

        <div className="profile-card">
          <div className="profile-photo-section">
            <img
              src={profileData.photo || 'https://via.placeholder.com/150'}
              alt={`${profileData.full_name || profileData.username}'s profile`}
              className="profile-photo"
            />
          </div>

          <div className="personal-info">
            <h2>{profileData.full_name || profileData.username}</h2>
            <p>{profileData.mobile || 'Not provided'}</p>
            <p>
              <a href={`mailto:${profileData.email}`}>{profileData.email}</a>
            </p>
          </div>

          <div className="bio-section">
            <h3>About Me</h3>
            <p>{profileData.bio || 'No bio available'}</p>
          </div>

          <div className="interests-section">
            <h3>Interests</h3>
            <div className="interests-list">
              {profileData.industry_interest &&
                profileData.industry_interest.map((interest, index) => (
                  <span key={index} className="interest-tag">
                    {interest}
                  </span>
                ))}
            </div>
          </div>

          <div className="social-media-section">
            <h3>Socials</h3>
            <div className="social-links">
              {profileData.social_links?.instagram && (
                <a href={profileData.social_links.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="social-icon" />
                </a>
              )}
              {profileData.social_links?.linkedin && (
                <a href={profileData.social_links.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="social-icon" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
