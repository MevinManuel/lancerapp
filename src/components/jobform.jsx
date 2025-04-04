import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./styles/jobform.css"; // Importing the dark-themed CSS

const JobForm = () => {
  const navigate = useNavigate(); // Initialize navigation

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    availability: "",
    profession: [],
    description: "",
  });

  const professionOptions = [
    "UI Designer",
    "Web Developer",
    "Branding Expert",
    "Mobile App Designer",
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfessionSelect = (profession) => {
    setFormData((prev) => {
      const isSelected = prev.profession.includes(profession);
      return {
        ...prev,
        profession: isSelected
          ? prev.profession.filter((p) => p !== profession)
          : [...prev.profession, profession],
      };
    });
  };

  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      console.error("Invalid token format:", error);
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token"); // Get JWT token from localStorage
    if (!token) {
      alert("Please log in to post a job.");
      return;
    }

    if (isTokenExpired(token)) {
      alert("Your session has expired. Please log in again.");
      localStorage.removeItem("token"); // Remove expired token
      return;
    }

    console.log("Token being sent:", token); // Debugging log

    try {
      const response = await fetch("http://localhost:5000/create-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          location: formData.location,
          skills: formData.profession,
        }),
      });

      const data = await response.json();

      console.log("Response status:", response.status); // Debugging log
      console.log("Response data:", data); // Debugging log

      if (response.ok) {
        alert("Job posted successfully!");
        setFormData({ title: "", location: "", availability: "", profession: [], description: "" });
      } else {
        alert(data.message || "Failed to post job.");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="form-container">
      {/* Back Button */}
      <button className="buttt" onClick={() => navigate("/JobListing")}>
        ←
      </button>

      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Job Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter job title"
          required
        />

        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter location"
          required
        />

        <label>Profession / Skill</label>
        <div className="profession-container">
          {professionOptions.map((profession) => (
            <span
              key={profession}
              className={`profession-bubble ${
                formData.profession.includes(profession) ? "selected" : ""
              }`}
              onClick={() => handleProfessionSelect(profession)}
            >
              {profession}
            </span>
          ))}
        </div>

        <label>Job Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter job description"
          required
        />

        <button className="but" type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default JobForm;
