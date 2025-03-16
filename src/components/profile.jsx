import React from 'react';
import './styles/profile.css';
import { FaArrowLeft, FaInstagram, FaLinkedin } from 'react-icons/fa';

const ProfilePage = () => {
  const profileData = {
    photoUrl: 'https://via.placeholder.com/150',
    name: 'John Doe',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    bio: 'Creative professional with a passion for technology and design. Always eager to learn and take on new challenges.',
    interests: ['UI Design', 'Web Development', 'Photography', 'Machine Learning'],
    socialMedia: {
      instagram: 'https://instagram.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe'
    }
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="profile-page-wrapper">
      <div className="profile-page-container">
        {/* Back Button */}
        <button className="back-button" onClick={handleBackClick}>
          <FaArrowLeft /> 
        </button>

        {/* Profile Card */}
        <div className="profile-card">
          {/* Profile Photo */}
          <div className="profile-photo-section">
            <img 
              src={profileData.photoUrl} 
              alt={`${profileData.name}'s profile`} 
              className="profile-photo"
            />
          </div>

          {/* Personal Info */}
          <div className="personal-info">
            <h2>{profileData.name}</h2>
            <p>{profileData.phone}</p>
            <p><a href={`mailto:${profileData.email}`}>{profileData.email}</a></p>
          </div>

          {/* Bio */}
          <div className="bio-section">
            <h3>About Me</h3>
            <p>{profileData.bio}</p>
          </div>

          {/* Interests */}
          <div className="interests-section">
            <h3>Interests</h3>
            <div className="interests-list">
              {profileData.interests.map((interest, index) => (
                <span key={index} className="interest-tag">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="social-media-section">
            <h3>Socials</h3>
            <div className="social-links">
              <a href={profileData.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon" />
              </a>
              <a href={profileData.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="social-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;