import React from 'react';
import 'D:/demoapp/lancerappl/lance/lan/lancerapp/src/style.css'; // Link to the CSS file
import Continue from 'D:/demoapp/lancerappl/lance/lan/lancerapp/src/special/continue.jsx';
import Input from 'D:/demoapp/lancerappl/lance/lan/lancerapp/src/special/input.jsx';
import Inputpass from 'D:/demoapp/lancerappl/lance/lan/lancerapp/src/special/inputpass.jsx';
import Inputname from 'D:/demoapp/lancerappl/lance/lan/lancerapp/src/special/inputname.jsx';



function SignUp() {
  return (
    <div className="signup-page">
              <br></br>

      {/* Left Section */}
      <div className="login-left">
        <h1>Welcome!</h1>
        <p className="textSS">
          Reconnect, Restart, Recharge with <strong>LANCER</strong>. Get started for free.
        </p>
        <form className="login-form">
          <Inputname type="text" placeholder="UserName" className="login-input" />
          <Input type="text" placeholder="Email" className="login-input" />
          <Inputpass type="password" placeholder="Password" className="login-input" />
          <a href="#" className="forgot-password">Forgot Password?</a>
          <Continue type="submit" >Login</Continue>
        </form>
        <p className="continue-text">or continue with</p>
        <div className="social-icons">
          <button className="social-btn">Google</button>
          <button className="social-btn">Apple</button>
          <button className="social-btn">Facebook</button>
        </div>
        <br></br>
      </div>

      {/* Right Section */}
      <div className="login-right">
        <p className="info-text">
        Amplify Your Expertise, Accelerate Your Growth with <strong>LANCER</strong>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
