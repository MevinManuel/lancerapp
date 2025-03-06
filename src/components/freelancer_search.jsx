import React, { useState } from 'react';
import './styles/freelancer_search.css';

<div className="bg-noise"></div>


const profiles = [
  { id: 1, name: 'John Doe', age: 25, bio: 'Loves hiking and photography', phone: '123-456-7890', email: 'john@example.com', resume: 'resume.pdf', skills: ['React', 'CSS', 'JavaScript'], about: 'Passionate UI designer with a knack for aesthetics.', rating: 4.5, location: 'New York', designation: 'UI Designer', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Jane Smith', age: 28, bio: 'Avid traveler and foodie', phone: '987-654-3210', email: 'jane@example.com', resume: 'resume.pdf', skills: ['Python', 'Django', 'Machine Learning'], about: 'Software engineer with a love for AI and automation.', rating: 4.7, location: 'Los Angeles', designation: 'Software Engineer', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Michael Brown', age: 30, bio: 'Tech enthusiast and gamer', phone: '555-666-7777', email: 'michael@example.com', resume: 'resume.pdf', skills: ['Product Management', 'Agile', 'Scrum'], about: 'Experienced product manager specializing in user experience.', rating: 4.6, location: 'Chicago', designation: 'Product Manager', image: 'https://via.placeholder.com/150' }
];

const FreelancerSearch = () => {
  const [index, setIndex] = useState(0);

  const handleGoBack = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleGoForward = () => {
    if (index < profiles.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <div className="container">
      <div className="card-container">
        <div className="card">
          <img className="profile-image" src={profiles[index].image} alt={profiles[index].name} />
          <h2>{profiles[index].name}, {profiles[index].age}</h2>
          <div className="info-container">
            <div className="info-box">⭐ {profiles[index].rating}</div>
            <div className="info-box">📍 {profiles[index].location}</div>
          </div>
          <h3 className="designation">{profiles[index].designation}</h3>
          <button className="chat-button">Chat</button>
        </div>
        <div className="button-container">
          <button onClick={handleGoBack}>Back</button>
          <button onClick={handleGoForward}>Forward</button>
        </div>
      </div>
      <div className="bio-container">
        <h2>{profiles[index].name}</h2>
        <hr />
        <p><strong>Phone:</strong> {profiles[index].phone}</p>
        <p><strong>Email:</strong> {profiles[index].email}</p>
        <p><strong>Resume:</strong> <a href={profiles[index].resume}>Download</a></p>
        <h3>Skills</h3>
        <div className="skill-container">
          {profiles[index].skills.map(skill => (
            <div className="skill-box" key={skill}>{skill}</div>
          ))}
        </div>
        <h3>About Me</h3>
        <p>{profiles[index].about}</p>
      </div>
    </div>
  );
};

export default FreelancerSearch;
