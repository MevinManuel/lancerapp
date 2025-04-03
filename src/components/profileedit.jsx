import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './styles/profileedit.css';
import { FaTwitter, FaInstagram, FaLinkedin, FaFilePdf } from 'react-icons/fa';

export default function ProfileEdit() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    username: "",
    city: "",
    mobile: "",
    role: "",
    bio: "",
    industryInterests: [],
    tools: [],
    socialLinks: {
      linkedin: ""
    },
    profilePhoto: null,
    resume: null,
    resumeName: ""
  });

  const [errors, setErrors] = useState({
    mobile: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "mobile") {
      // Only allow numbers and limit to 10 digits
      const numbersOnly = value.replace(/[^0-9]/g, '');
      const truncatedValue = numbersOnly.slice(0, 10);
      
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: truncatedValue
      }));
      
      // Clear error when user types
      if (errors.mobile) {
        setErrors(prev => ({...prev, mobile: ""}));
      }
    } else {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value
      }));
    }
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

  const handleInterestClick = (interest) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      industryInterests: prevProfile.industryInterests.includes(interest)
        ? prevProfile.industryInterests.filter((i) => i !== interest)
        : [...prevProfile.industryInterests, interest]
    }));
  };

  const handleToolClick = (tool) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      tools: prevProfile.tools.includes(tool)
        ? prevProfile.tools.filter((t) => t !== tool)
        : [...prevProfile.tools, tool]
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePhoto: file,
      }));
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setProfile((prevProfile) => ({
        ...prevProfile,
        resume: file,
        resumeName: file.name
      }));
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleContinue = async () => {
    // Validate mobile number before submission
    if (profile.mobile.length !== 10) {
      setErrors({ mobile: "Please enter a valid 10-digit mobile number" });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      formData.append("mobile", profile.mobile || "");
      formData.append("role", profile.role || "");
      formData.append("bio", profile.bio || "");
      formData.append("city", profile.city || "");
      formData.append("industry_interest", JSON.stringify(profile.industryInterests || []));
      formData.append("tools", JSON.stringify(profile.tools || []));
      formData.append("social_links", JSON.stringify(profile.socialLinks || {}));

      if (profile.profilePhoto) {
        formData.append("photo", profile.profilePhoto);
      }

      if (profile.resume) {
        formData.append("resume", profile.resume);
      }

      const response = await fetch('http://localhost:5000/update-profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Profile updated successfully:", data);
        navigate('/home');
      } else {
        console.error("Error updating profile:", data?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
    }
  };

  return (
    <div className="profile-page">
      <div className="bg-animations"></div>
      <div className="bg-noises"></div>
      <div className="profile-container">
        <div className="profile-photos">
          <div className="photo-boxs">
            {profile.profilePhoto ? (
              <img src={URL.createObjectURL(profile.profilePhoto)} alt="Profile" className="profile-preview" />
            ) : (
              "+"
            )}
          </div>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="upload-input" />
          <button className="upload-btn" onClick={() => document.querySelector('.upload-input').click()}>
            Upload Photo
          </button>
        </div>

        <div className="card">
          <h3>Personal Information</h3>
          <input type="text" name="city" placeholder="City" value={profile.city} onChange={handleInputChange} />
          <input 
            type="tel" 
            name="mobile" 
            placeholder="Mobile Number" 
            value={profile.mobile} 
            onChange={handleInputChange}
            maxLength="10"
            pattern="[0-9]{10}"
            title="Please enter exactly 10 digits"
          />
          {errors.mobile && <p className="error-message">{errors.mobile}</p>}
        </div>

        {/* Rest of your JSX remains the same */}
        <div className="card">
          <h3>Bio</h3>
          <textarea name="bio" placeholder="Write your bio..." value={profile.bio} onChange={handleInputChange}></textarea>
        </div>

        <div className="card">
          <h3>Interests</h3>
          <div className="interests">
            {["Design", "Coding", "Marketing", "Gaming", "Music",
              "Creative Design", "Frontend", "Backend", "Digital Marketing",
              "Gaming and Esports", "Business and Entrepreneurship",
              "Writing and Content Creation", "Video", "Photography",
              "Sports"].map((interest) => (
              <span
                key={interest}
                className={`interest ${profile.industryInterests.includes(interest) ? "selected" : ""}`}
                onClick={() => handleInterestClick(interest)}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Tools</h3>
          <div className="interests">
            {["GitHub", "Visual Studio Code", "IntelliJ IDEA", "Google Analytics",
              "HubSpot", "Hootsuite", "Photoshop", "Illustrator", "Canva",
              "Microsoft Office", "Trello", "Salesforce", "Grammarly",
              "WordPress", "Google Docs"].map((tool) => (
              <span
                key={tool}
                className={`interest ${profile.tools.includes(tool) ? "selected" : ""}`}
                onClick={() => handleToolClick(tool)}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Social Media</h3>
          <div className="social-input">
            <FaLinkedin className="icon" />
            <input type="text" name="linkedin" placeholder="LinkedIn Profile" value={profile.socialLinks.linkedin} onChange={handleSocialLinkChange} />
          </div>
        </div>

        <div className="card">
          <h3>Resume (PDF)</h3>
          <div className="resume-upload">
            <input type="file" accept="application/pdf" onChange={handleResumeUpload} className="upload-input" />
            <button className="upload-btn" onClick={() => document.querySelector('.resume-upload input').click()}>
              <FaFilePdf /> Upload Resume
            </button>
            {profile.resumeName && <p className="resume-name">Uploaded: {profile.resumeName}</p>}
          </div>
        </div>

        <button className="continue-btn" onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
}