import React, { useEffect, useState } from "react";
import "./styles/profile.css";
import { FaArrowLeft, FaInstagram, FaLinkedin } from "react-icons/fa";
import axios from "axios";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        // Fetch profile data
        const profileResponse = await axios.get("http://localhost:5000/get-userprofile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(profileResponse.data);

        // Fetch accepted jobs
        const jobsResponse = await axios.get("http://localhost:5000/accepted-jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAcceptedJobs(jobsResponse.data.acceptedJobs);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to fetch data. Please try again."
        );
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
              className="profile-image"
              src={profileData.photo || "https://via.placeholder.com/150"}
              alt={profileData.username}
            />
          </div>

          <div className="personal-info">
            <h2>{profileData.username}</h2>
            <p>{profileData.mobile || "Not provided"}</p>
            <p>
              <a href={`mailto:${profileData.email}`}>{profileData.email}</a>
            </p>
          </div>

          <div className="bio-section">
            <h3>About Me</h3>
            <p>{profileData.bio || "No bio available"}</p>
          </div>

          <div className="interests-section">
            <h3>Interests</h3>
            <div className="interests-list">
              {profileData.industry_interest && Array.isArray(profileData.industry_interest) ? (
                profileData.industry_interest.map((interest, index) => (
                  <span key={index} className="interest-tag">
                    {interest}
                  </span>
                ))
              ) : (
                <p>No interests listed</p>
              )}
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

          {/* Accepted Jobs Section */}
          <div className="accepted-jobs-section">
            <h3>Accepted Jobs</h3>
            {acceptedJobs.length === 0 ? (
              <p>No jobs accepted yet.</p>
            ) : (
              <div className="card-list">
                {acceptedJobs.map((job) => (
                  <div key={job.id} className="job-card">
                    <h4>{job.title}</h4>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;