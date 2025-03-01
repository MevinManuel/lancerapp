import React from "react";
import "./styles/JobListing.css";

const jobs = [
  {
    title: "Manager - Business Development",
    salary: "$3000 - 3500 per month",
    location: "Pasadena, Oklahoma",
    type: "Full Time or Remote",
    experience: "5 - 6 years",
    company: "Twitter",
  },
  {
    title: "System Administrator",
    salary: "$2000 - 3500 per month",
    location: "West Palm Beach, Georgia",
    type: "Full Time",
    experience: "5 - 6 years",
    company: "Amazon",
  },
  {
    title: "Product Designer",
    salary: "$15,000 / M",
    location: "Remote",
    type: "Full Time",
    experience: "Not Specified",
    company: "Apple",
  },
];

const JobListing = () => {
  return (
    <div className="job-listing-container">
      <h2>Explore Job Opportunities</h2>
      <div className="job-list">
        {jobs.map((job, index) => (
          <div key={index} className="job-card">
            <div className="job-header">
              <h3>{job.title}</h3>
              <span className="company">{job.company}</span>
            </div>
            <p className="salary">{job.salary}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Job Type:</strong> {job.type}</p>
            <p><strong>Experience:</strong> {job.experience}</p>
            <button className="chat-button">Proceed to Chat</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListing;
