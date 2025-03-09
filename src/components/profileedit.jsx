import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './styles/profileedit.css';
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Ensure these imports are correct

export default function ProfileEdit() { // Ensure the component name is capitalized
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    mobile: "",
    role: "",
    bio: "",
    industryInterests: [],
    socialLinks: {
      twitter: "",
      instagram: "",
      linkedin: ""
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      socialLinks: {
        ...prevProfile.socialLinks,
        [name]: value
      }
    }));
  };

  const handleContinue = () => {
    navigate('/home'); // Navigate to the Home page
  };

  return (
    <div className="profile-page">
      <div className="bg-animations"></div>
      <div className="bg-noises"></div>
      <div className="profile-container">
        <div className="profile-photo">
          <div className="photo-box">+</div>
          <button className="upload-btn">Upload Photo</button>
        </div>

        <div className="card">
          <h3>Personal Information</h3>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={profile.fullName}
            onChange={handleInputChange}
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleInputChange}
          />
          
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={profile.mobile}
            onChange={handleInputChange}
          />
        </div>

        <div className="card">
          <h3>Bio</h3>
          <textarea
            name="bio"
            placeholder="Write your bio..."
            value={profile.bio}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="card">
          <h3>Interests</h3>
          <div className="interests">
            {["Design", "Coding", "Marketing", "Gaming", "Music"].map((interest) => (
              <span
                key={interest}
                className={`interest ${profile.industryInterests.includes(interest) ? "selected" : ""}`}
                onClick={() => {
                  setProfile((prevProfile) => ({
                    ...prevProfile,
                    industryInterests: prevProfile.industryInterests.includes(interest)
                      ? prevProfile.industryInterests.filter((i) => i !== interest)
                      : [...prevProfile.industryInterests, interest]
                  }));
                }}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Social Media</h3>
          <div className="social-input">
            <FaInstagram className="icon" />
            <input
              type="text"
              name="instagram"
              placeholder="Instagram Username"
              value={profile.socialLinks.instagram}
              onChange={handleSocialLinkChange}
            />
          </div>
          <div className="social-input">
            <FaLinkedin className="icon" />
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn Profile"
              value={profile.socialLinks.linkedin}
              onChange={handleSocialLinkChange}
            />
          </div>
        </div>

        <button className="continue-btn" onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
}