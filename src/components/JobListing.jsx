import React from "react";
import "./styles/JobListing.css";

const JobListing = () => {
  return (
    
    <div className="container">
          <div className="bg-animation"></div>
          <div className="bg-noise"></div>
      <h1 className="header">Explore Opportunities</h1>
      <button className="post-job-button">POST A JOB +</button>


      <div className="content">
        
        <div className="card-list">
          <div className="job-card">
            <h2 className="card-title">Landing Page Design</h2>
            <p className="card-location">Kochi, Kerala, India</p>
            <p className="card-time">Full-time</p>
            <div className="skill-tags">
              <span className="skill-tag">UI Design</span>
              <span className="skill-tag">Research</span>
              <span className="skill-tag">Branding</span>
            </div>
            <div className="description-box">
              We're seeking a skilled UI designer to create a captivating landing page for our [project/initiative name]. If you have a keen eye for design and expertise in crafting user-centered experiences, we'd love to hear from you!
              <br /><br />
              Responsibilities:
              <br />
              • Design visually appealing and intuitive landing pages.
              <br />
              • Collaborate with our team to understand project goals and requirements...
            </div>
          </div>
          {/* Add more job cards here */}
          <div className="job-card">
            <h2 className="card-title">Mobile App Design</h2>
            <p className="card-location">Remote</p>
            <p className="card-time">Part-time</p>
            <div className="skill-tags">
              <span className="skill-tag">UX Design</span>
              <span className="skill-tag">Prototyping</span>
              <span className="skill-tag">Usability Testing</span>
            </div>
            <div className="description-box">
              We are looking for a talented UX designer to create intuitive and engaging mobile app experiences. You will be responsible for conducting user research, creating wireframes and prototypes, and ensuring the usability of our app.
              <br /><br />
              Responsibilities:
              <br />
              • Conduct user research and analysis.
              <br />
              • Create wireframes and prototypes.
              <br />
              • Conduct usability testing and iterate on designs.
            </div>
          </div>
          {/* ... more cards */}
        </div>
      </div>
    </div>
  );
};

export default JobListing;