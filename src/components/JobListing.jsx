import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/JobListing.css";

const JobListing = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]); // State to store job listings
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/jobs"); // Fetch job listings from backend
      const data = await response.json();
      if (response.ok) {
        setJobs(data.jobs.reverse()); // Ensure newest jobs appear at the top
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
    fetchJobs(); // Fetch jobs when component mounts

    // Polling every 10 seconds to check for new jobs
    const interval = setInterval(() => {
      fetchJobs();
    }, 10000); // 10 seconds interval

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const handlePostJobClick = () => {
    navigate("/jobform"); // Navigate to JobForm page
  };

  return (
    <div className="container">
     <div className="bg-animation"></div>
      <div className="bg-noise"></div>
    <h1 className="header">Explore Opportunities</h1>
   
      {/* Button to navigate to JobForm page */}
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
                {/* Title & Contact Button in a Flex Container */}
                <div className="card-header">
                  <h2 className="card-title">{job.title}</h2>
                  <button className="contact-button">Contact &nbsp; →</button>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListing;
