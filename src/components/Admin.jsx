import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./styles/Admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.token; // Use navigation state token
  const [selectedTab, setSelectedTab] = useState("users");
  const [jobPosts, setJobPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState(null);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const [error, setError] = useState(null);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    withCredentials: true,
  });

  useEffect(() => {
    if (!token) {
      navigate("/lancerapp/admin-login"); // Redirect if no token
      return;
    }

    const fetchUserCount = async () => {
      try {
        const response = await axiosInstance.get("/admin/user-count");
        setUserCount(response.data.userCount);
      } catch (error) {
        console.error("Error fetching user count:", error);
        setError(error.response?.data?.message || "Failed to fetch user count.");
      }
    };

    const fetchUsers = async () => {
      try {
        console.log("Fetching users with token:", token);
        const response = await axiosInstance.get("/admin/get-profile");
        console.log("Fetched users:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user profiles:", error);
        setError(error.response?.data?.message || "Failed to fetch user profiles.");
      }
    };

    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get("/jobs");
        console.log("Fetched jobs:", response.data.jobs);
        setJobPosts(response.data.jobs);
      } catch (error) {
        console.error("Error fetching job posts:", error);
        setError(error.response?.data?.message || "Failed to fetch job posts.");
      }
    };

    fetchUserCount();
    fetchUsers();
    fetchJobs();
  }, [token, navigate]);

  const handleDeleteJob = (id) => {
    setDeleteJobId(id);
    setShowDeletePopup(true);
  };

  const confirmDeleteJob = async () => {
    try {
      const response = await axiosInstance.delete(`/admin/delete-job/${deleteJobId}`);
      if (response.status === 200) {
        setJobPosts(jobPosts.filter((job) => job.id !== deleteJobId));
        setShowDeletePopup(false);
        setDeleteJobId(null);
        alert("Job deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert(error.response?.data?.message || "Failed to delete job.");
      if (error.response?.status === 401) {
        navigate("/lancerapp/admin-login");
      }
    }
  };

  const handlePostAnnouncement = async () => {
    if (!announcementTitle.trim() || !announcementContent.trim()) {
      alert("Please enter both a title and content for the announcement.");
      return;
    }

    try {
      const response = await axiosInstance.post("/admin/post-news", {
        title: announcementTitle,
        content: announcementContent,
      });
      console.log("Announcement posted:", response.data);
      alert(response.data.message);
      setAnnouncementTitle("");
      setAnnouncementContent("");
    } catch (error) {
      console.error("Error posting announcement:", error);
      alert(error.response?.data?.message || "Failed to post announcement.");
    }
  };

  const renderContent = () => {
    if (error) return <div className="content-box">{error}</div>;

    switch (selectedTab) {
      case "users":
        return (
          <div className="content-box">
            <div className="user-count-box">
              <h2>Total Users: {userCount !== null ? userCount : "Loading..."}</h2>
            </div>
            <br />
            <div className="list-container">
              {users.length > 0 ? (
                users.map((user) => (
                  <div key={user.id} className="list-card">
                    <img src={user.photo} alt={user.username} className="user-photo" />
                    <div className="list-info">
                      <h3>{user.username}</h3>
                      <p>📞 {user.mobile || "N/A"}</p>
                      {user.social_links?.linkedin && (
                        <a href={user.social_links.linkedin} target="_blank" rel="noopener noreferrer">
                          🔗 LinkedIn
                        </a>
                      )}
                      {user.resume && (
                        <a href={`http://localhost:5000/${user.resume}`} download>
                          📄 Download Resume
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No users found or loading...</p>
              )}
            </div>
          </div>
        );

      case "jobposts":
        return (
          <div className="content-box">
            <h2>Job Posts</h2>
            <div className="list-container">
              {jobPosts.length > 0 ? (
                jobPosts.map((job) => (
                  <div key={job.id} className="list-card">
                    <button className="delete-btn" onClick={() => handleDeleteJob(job.id)}>❌</button>
                    <div className="list-info">
                      <h3>{job.title}</h3>
                      <p>📍 {job.location || "N/A"}</p>
                      <p>{job.description}</p>
                      <br />
                      {job.skills && (
                        <p>🛠️ Skills: {Array.isArray(job.skills) ? job.skills.join(", ") : job.skills}</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No job posts found or loading...</p>
              )}
            </div>
          </div>
        );

      case "announcements":
        return (
          <div className="content-box">
            <h2>Post Updates/News</h2>
            <div className="announcement-container">
              <input
                type="text"
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
                placeholder="Announcement Title"
                className="announcement-input"
              />
              <textarea
                value={announcementContent}
                onChange={(e) => setAnnouncementContent(e.target.value)}
                placeholder="Write your announcement here..."
                className="announcement-input"
              />
              <button className="post-btn" onClick={handlePostAnnouncement}>
                Post
              </button>
            </div>
          </div>
        );

      default:
        return <div className="content-box">Select a section to manage.</div>;
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h2 className="logo"></h2>
        <ul className="nav-links">
          <li className={selectedTab === "users" ? "active" : ""} onClick={() => setSelectedTab("users")}>
            Users
          </li>
          <li className={selectedTab === "jobposts" ? "active" : ""} onClick={() => setSelectedTab("jobposts")}>
            Job Posts
          </li>
          <li className={selectedTab === "announcements" ? "active" : ""} onClick={() => setSelectedTab("announcements")}>
            Announcements
          </li>
        </ul>
      </div>

      <div className="main-content">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        {renderContent()}
      </div>

      {showDeletePopup && (
        <div className="delete-popup">
          <p>Do you want to remove this listing?</p>
          <button className="confirm-btn" onClick={confirmDeleteJob}>Yes</button>
          <button className="cancel-btn" onClick={() => setShowDeletePopup(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default Admin;