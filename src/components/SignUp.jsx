import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style.css";

function SignUp() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);  // Tracks form submission state
  const navigate = useNavigate();

  // Validates the form before submission
  const validateForm = (username, email, password) => {
    return (
      username.length >= 3 &&
      /\S+@\S+\.\S+/.test(email) &&
      password.length >= 6
    );
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const username = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
  
    if (!validateForm(username, email, password)) {
      setMessage("Please fill in all fields correctly.");
      return;
    }

    setIsLoading(true);  // Disable button & show loading state
    setMessage("");  // Clear previous messages

    const formData = { username, email, password };

    try {
      console.log("Sending request with:", formData);
      const response = await axios.post("http://localhost:5000/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response received:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);

        // Clear form fields
        usernameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";

        setMessage("Signup successful! Redirecting...");

        // Navigate to Home page after a short delay
        setTimeout(() => {
          navigate("/home");
        }, 1000); 
      } else {
        setMessage("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage(error.response?.data?.error || "Error signing up. Please try again.");
    } finally {
      setIsLoading(false); // Re-enable button
    }
  };

  return (
    <div className="signup-page">
      <br />
      <div className="login-left">
        <h1>Welcome!</h1>
        <p className="textSS">
          Reconnect, Restart, Recharge with <strong>LANCER</strong>. Get started for free.
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="input-container">
            <input type="text" ref={usernameRef} placeholder="UserName" className="input-field" required />
          </div>

          {/* Email Input */}
          <div className="input-container">
            <input type="email" ref={emailRef} placeholder="Email" className="input-field" required />
          </div>

          {/* Password Input */}
          <div className="input-container">
            <input type="password" ref={passwordRef} placeholder="Password" className="input-field" required />
          </div>

          {/* Sign Up Button */}
          <button type="submit" className="continue-btn" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Error/Success Message */}
        {message && <p className="message">{message}</p>}

        <p className="continue-text">or continue with</p>
        <div className="social-icons">
          <button className="social-btn">Google</button>
          <button className="social-btn">Apple</button>
          <button className="social-btn">Facebook</button>
        </div>
        <br />
      </div>
      <div className="login-right">
        <p className="info-text">
          Amplify Your Expertise, Accelerate Your Growth with <strong>LANCER</strong>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
