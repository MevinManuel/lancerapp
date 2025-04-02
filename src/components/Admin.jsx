import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/Admin.css";

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState("users");
  const [jobPosts, setJobPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState(null);
  const [announcementTitle, setAnnouncementTitle] = useState(""); // New state for title
  const [announcementContent, setAnnouncementContent] = useState(""); // New state for content

  const token = localStorage.getItem("adminToken");

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    withCredentials: true,
  });

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axiosInstance.get("/admin/user-count");
        setUserCount(response.data.userCount);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };
    fetchUserCount();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Fetching users with token:", token);
        const response = await axiosInstance.get("/get-profile");
        console.log("Fetched users:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user profiles:", error);
        
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get("/jobs");
        console.log("Fetched jobs:", response.data.jobs);
        setJobPosts(response.data.jobs);
      } catch (error) {
        console.error("Error fetching job posts:", error);
      }
    };
    fetchJobs();
  }, []);

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
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      if (error.response?.status === 404) {
        alert("Job not found in the database.");
      } else {
        alert("Failed to delete job. Please try again.");
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
      alert("Announcement posted successfully!");
      setAnnouncementTitle(""); // Clear title
      setAnnouncementContent(""); // Clear content
    } catch (error) {
      console.error("Error posting announcement:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        alert(error.response.data.message || "Failed to post announcement.");
      } else {
        alert("Failed to post announcement. Please try again.");
      }
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "users":
  return (
    <div className="content-box">
      <div className="user-count-box">
        <h2>Total Users: {userCount !== null ? userCount : "Loading..."}</h2>
      </div>
      <div className="list-container">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="list-card">
              <img src={user.photo} alt={user.username} className="user-photo" />
              <div className="list-info">
                <h3>{user.username}</h3>
                <p>📞 {user.mobile}</p>
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
          <p></p>
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
                      <p>📍 {job.location}</p>
                      <p>{job.description}</p>
                      <br />
                      {job.skills && <p>🛠️ Skills: {job.skills}</p>}
                    </div>
                  </div>
                ))
              ) : (
                <p>Loading job posts...</p>
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