import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles/JobListing.css";

const JobListing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.token; // Get token from navigation state
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setJobs(data.jobs.reverse());
      } else {
        console.error("Failed to fetch jobs:", data.message);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/lancerapp/login"); // Adjust path to match your login route
      return;
    }

    fetchJobs();
    const interval = setInterval(fetchJobs, 10000);
    return () => clearInterval(interval);
  }, [token, navigate]);

  const handlePostJobClick = () => {
    navigate("/jobform", { state: { token } }); // Pass token to jobform
  };

  const handleAcceptJob = async (jobId) => {
    if (!token) {
      alert("Please log in to accept a job.");
      navigate("/lancerapp/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/accept-job/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert("Job accepted successfully!");
        fetchJobs();
      } else {
        console.error("Failed to accept job:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error accepting job:", error);
      alert("An error occurred while accepting the job.");
    }
  };

  const handleContactClick = (jobId) => {
    if (!token) {
      alert("Please log in to contact.");
      navigate("/lancerapp/login");
      return;
    }
    navigate(`/chat/${jobId}`, { state: { token } }); // Pass token to chat page
  };

  return (
    <div className="container">
      <div className="bg-animation"></div>
      <div className="bg-noise"></div>
      <h1 className="header">Explore Opportunities</h1>

      <button className="post-job-button" onClick={handlePostJobClick}>
        POST A JOB +
      </button>

      <div className="content">
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No job listings available.</p>
        ) : (
          <div className="card-list">
            {jobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="card-header">
                  <h2 className="card-title">{job.title}</h2>
                  <button
                    className="contact-button"
                    onClick={() => handleContactClick(job.id)}
                  >
                    Contact →
                  </button>
                </div>

                <p className="card-location">{job.location}</p>
                <div className="skill-tags">
                  {job.skills &&
                    JSON.parse(job.skills).map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                </div>
                <div className="description-box">{job.description}</div>

                <button
                  className="accept-button"
                  onClick={() => handleAcceptJob(job.id)}
                >
                  Accept
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListing;