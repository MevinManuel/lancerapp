import React from 'react';
import 'D:/demoapp/lancerapp/lance/lan/src/style.css'; // Link to the CSS file
import Continue from 'D:/demoapp/lancerapp/lance/lan/src/special/continue.jsx';
import Input from 'D:/demoapp/lancerapp/lance/lan/src/special/input.jsx';
import Inputpass from 'D:/demoapp/lancerapp/lance/lan/src/special/inputpass.jsx';


function LoginPage() {
  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="login-left">
        <h1>Welcome back!</h1>
        <p className="textSS">
          Reconnect, Restart, Recharge with <strong>LANCER</strong>. Get started for free.
        </p>
        <form className="login-form">
          <Input type="text" placeholder="Email" className="login-input" />
          <Inputpass type="password" placeholder="Password" className="login-input" />
          <a href="#" className="forgot-password">Forgot Password?</a>
          <Continue type="submit" >continue</Continue>
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
