import React from 'react';
import "../style.css"; 
import But from '../special/But.jsx';
import { Link } from 'react-router-dom';


  function onboard() {
  return (
    <div className="onboard-container">
      <div className="content-container">
        
        <div className="logo-container">
        <img
            src="/images/l.png" 
            alt="Logo"
            className="logo"
          />
        </div>
        <h1 className='text'>Welcome to LANCER</h1>
        <p className='textSS'>Unleash Your Full Potential and Bring Your Vision to Life</p>
        <br></br>
        <But className="primary-button"> Sign Up </But>
        <br></br>
        <p className="secondary-text"><Link to="/login">Log in</Link> </p>
      </div>
    </div>
  );
}

export default onboard;