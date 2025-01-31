import React from 'react';
import { useNavigate } from 'react-router-dom';
import "D:/demoapp/lancerappl/lance/lan/lancerapp/src/style.css"; 
import Spline from '@splinetool/react-spline';

const SplashScreen = () => {
  const navigate = useNavigate(); 

  const handleButtonClick = () => {
    navigate('/onboard'); 
  };

  return (
    <div className="splash-container">
      <div className="splash-box">
        <div className="spline-container">
          <Spline scene="https://prod.spline.design/xBfMWS2TNpPbLZBU/scene.splinecode" />
          <div className="overlay-text">
            <h1 className="title">Where Skill Meets Opportunity.</h1>
            <button className="splash-button" onClick={handleButtonClick}> 
              Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;