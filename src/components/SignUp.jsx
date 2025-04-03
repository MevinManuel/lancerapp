import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style.css";

function SignUp() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track form submission state
  const navigate = useNavigate();

  // Validate the form before submission
  const validateForm = (username, email, password) => {
    if (username.length < 3) {
      setMessage("Username must be at least 3 characters long.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const username = usernameRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";
    const password = passwordRef.current?.value.trim() || "";
  
    if (!validateForm(username, email, password)) {
      return;
    }
  
    setIsLoading(true);
    setMessage("");
  
    const formData = { username, email, password };
  
    try {
      console.log("🚀 Sending request with:", formData);
  
      const response = await axios.post(
        "http://localhost:5000/register",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log("✅ Response received:", response);
  
      // Debugging: Log the entire response
      console.log("Response data:", response.data);
  
      // Check if the response contains the token
      if (response.data && response.data.token) {
        console.log("✅ Token received:", response.data.token);
  
        // Store token in localStorage
        try {
          localStorage.setItem("token", response.data.token);
        } catch (error) {
          console.error("❌ LocalStorage error:", error);
        }
  
        // Clear input fields
        if (usernameRef.current) usernameRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
        if (passwordRef.current) passwordRef.current.value = "";
  
        setMessage("🎉 Signup successful! Redirecting to profile edit...");
  
        // Navigate to profile edit page
        navigate("/profileedit", { replace: true });
      } else {
        console.log("❌ No token in response. Signup failed.");
        setMessage("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Signup error:", error);
  
      // Log full error response
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
  
      setMessage(
        error.response?.data?.error || "Error signing up. Please try again."
      );
    } finally {
      setIsLoading(false);
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
