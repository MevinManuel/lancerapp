import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css'; // Link to the CSS file
import Input from 'D:/demoapp/lancerappl/lance/lan/lancerapp/src/special/input.jsx';
import Inputpass from 'D:/demoapp/lancerappl/lance/lan/lancerapp/src/special/inputpass.jsx';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    navigate('/home'); // Navigate to the Home page
  };

  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="login-left">
        <h1>Welcome back!</h1>
        <p className="textSS">
          Reconnect, Restart, Recharge with <strong>LANCER</strong>. Get started for free.
        </p>
        <form className="login-form" onSubmit={handleLogin}>
          <Input type="text" placeholder="Email" className="login-input" />
          <Inputpass type="password" placeholder="Password" className="login-input" />
          <a href="#" className="forgot-password">Forgot Password?</a>
          <button type="submit" className="login-but">Continue</button>
        </form>
        <p className="continue-text">or continue with</p>
        <div className="social-icons">
          <button className="social-btn">Google</button>
          <button className="social-btn">Apple</button>
          <button className="social-btn">Facebook</button>
        </div>
        <p className="footer-text">
          Not a member? <a href="#">Register now</a>
        </p>
      </div>

      {/* Right Section */}
      <div className="login-right">
        
      </div>
    </div>
  );
}

export default LoginPage;