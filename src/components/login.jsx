import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style.css";
import { Link } from "react-router-dom";

function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = (email, password) => {
    return /\S+@\S+\.\S+/.test(email) && password.length >= 6;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!validateForm(email, password)) {
      setMessage("Please enter a valid email and password.");
      return;
    }

    const formData = { email, password };
    const isAdmin = email === "lancermini1@gmail.com";
    const loginUrl = isAdmin
      ? "http://localhost:5000/admin/admin-login"
      : "http://localhost:5000/login";

    try {
      console.log(`🔍 Sending login request to: ${loginUrl}`);
      const response = await axios.post(loginUrl, formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("✅ Login response:", response.data);

      if (response.data.token) {
        emailRef.current.value = "";
        passwordRef.current.value = "";

        // Pass token via navigation state
        if (isAdmin) {
          console.log("🔄 Navigating to /admin with token in state");
          navigate("/admin", { state: { token: response.data.token } });
        } else {
          console.log("🔄 Navigating to /home with token in state");
          navigate("/home", { state: { token: response.data.token } });
        }
      } else {
        setMessage(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      setMessage(error.response?.data?.message || "Error logging in. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h1>Welcome back!</h1>
        <p className="textSS">
          Reconnect, Restart, Recharge with <strong>LANCER</strong>. Get started for free.
        </p>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-container">
            <input type="email" ref={emailRef} placeholder="Email" className="input-field" />
          </div>
          <div className="input-container">
            <input type="password" ref={passwordRef} placeholder="Password" className="input-field" />
          </div>
          <button type="submit" className="login-but">
            Continue
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <br />
        <p className="footer-text">
          Not a member? <Link to="/SignUp">Register now</Link>
        </p>
      </div>
      <div className="login-right">
        <p className="info-text">
          Amplify Your Expertise, Accelerate Your Growth with <strong>LANCER</strong>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;