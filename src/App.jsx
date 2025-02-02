import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/splashscreen.jsx';
import OnboardScreen from './components/onboard';
import LoginPage from './components/login.jsx'; 
import SignUp from './components/SignUp.jsx';
import Search from './components/search.jsx';
import Home from './components/home.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} /> {/* Splash Screen */}
        <Route path="/Onboard" element={<OnboardScreen />} /> {/* Onboard Screen */}
        <Route path="/login" element={<LoginPage />} /> {/* Login Page */}
        <Route path="/SignUp" element={<SignUp />} /> {/* Login Page */}
        <Route path="/home" element={<Home />} /> {/* Login Page */}

      </Routes>
    </Router>
  );    
}

export default App;
