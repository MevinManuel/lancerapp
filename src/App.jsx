import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/splashscreen.jsx';
import OnboardScreen from './components/onboard';
import LoginPage from './components/login.jsx'; 
import SignUp from './components/SignUp.jsx';
import Home from './components/home.jsx';
import Pplsearch from './components/freelancer_search.jsx';
import Jobsearch from './components/JobListing.jsx';
import Chat from './components/chat.jsx';
import ProfileEdit from './components/profileedit.jsx'; // Ensure the import is correct
import Profile from './components/profile.jsx'; // Ensure the import is correct
import Chatbot from './components/chatbot.jsx';
import Jobform from './components/jobform.jsx';
import Admin from './components/Admin.jsx';
import News from './components/News.jsx';



function App() {
  return (
    <Router basename="/lancerapp">
      <Routes>
      <Route path="/" element={<SplashScreen />} /> {/* Splash Screen */}
      <Route path="/Onboard" element={<OnboardScreen />} /> {/* Onboard Screen */}
        <Route path="/login" element={<LoginPage />} /> {/* Login Page */}
        <Route path="/SignUp" element={<SignUp />} /> {/* Login Page */}
        <Route path="/home" element={<Home />} /> {/* Login Page */}
        <Route path="/freelancer_search" element={<Pplsearch />} /> {/* Login Page */}
        <Route path="/JobListing" element={<Jobsearch />} /> {/* Login Page */}
        <Route path="/profileedit" element={<ProfileEdit />} /> {/* Profile Page */}
        <Route path="/chat" element={<Chat />} /> {/* Profile Page */}
        <Route path="/Profile" element={<Profile />} /> {/* Profile Page */}
        <Route path="/Chatbot" element={<Chatbot />} /> {/* Profile Page */}
        <Route path="/jobform" element={<Jobform />} /> {/* Profile Page */}
        <Route path="/Admin" element={<Admin />} /> {/* Profile Page */}
        <Route path="/News" element={<News />} /> {/* Profile Page */}



      </Routes>
    </Router>
  );    
}

export default App;