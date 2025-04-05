import './styles/home.css';
import { useNavigate, useLocation } from "react-router-dom";
import { FaUsers, FaSearch, FaCommentDots, FaChevronDown } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.token; // Get token from navigation state

  const handleNavigation = (path) => {
    if (!token) {
      navigate('/lancerapp/login');
      return;
    }
    navigate(path, { state: { token } });
  };

  const handleChatNavigation = () => {
    if (!token) {
      navigate('/lancerapp/login');
      return;
    }
    navigate('/chat-list', { state: { token } });
  };

  const scrollToFeatures = () => {
    const featuresSection = document.querySelector(".features");
    if (featuresSection) {
      const offset = 50;
      window.scrollTo({
        top: featuresSection.offsetTop - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="homepage">
      <div className="bg-animation"></div>
      <div className="bg-noise"></div>

      <nav className="navbar">
        <div className="logo"></div>
        <div className="nav-right">
          <button className="news-btn" onClick={() => handleNavigation("/news")}>News</button>
          <button className="profile-btn" onClick={() => handleNavigation("/profile")}>Profile</button>
        </div>
      </nav>

      <main>
        <section className="hero">
          <h1>
            Amplify Your <span className="highlight">Experience</span>
            <br />
            Accelerate Your <span className="highlight">Growth</span>
          </h1>
          <p>Unleash your full potential and bring your vision to life</p>
          <button className="scroll-down-btn" onClick={scrollToFeatures}>
            <FaChevronDown />
          </button>
        </section>

        <section className="features">
          <div className="feature-card" onClick={() => handleNavigation("/freelancer_search")}>
            <div className="icon-container">
              <FaUsers className="icon" />
            </div>
            <h3>
              Browse
              <br />
              Freelancers
            </h3>
            <p>Connect with skilled freelancers who share your passion and interest</p>
          </div>

          <div className="feature-card" onClick={() => handleNavigation("/JobListing")}>
            <div className="icon-container">
              <FaSearch className="icon" />
            </div>
            <h3>
              Explore
              <br />
              Opportunities
            </h3>
            <p>Browse job offers by some of the best companies</p>
          </div>

          <div className="feature-card" onClick={handleChatNavigation}>
            <div className="icon-container">
              <FaCommentDots className="icon" />
            </div>
            <h3>Your Chat</h3>
            <p>Direct access to freelancers who share your vision</p>
          </div>
        </section>

        <section className="workflow">
          <h2>
            Let's <span className="highlight">Amplify Your</span>
            <br />
            Workflow!
          </h2>
        </section>

        <section className="newsletter">
          <div className="newsletter-content">
            <h3>
              Stay Updated with <span className="highlight">Lancer AI</span> – Your Chat Assistant for Market Trends & Insights
            </h3>
            <p>
              Get the latest freelancer trends, industry updates, and valuable insights on skills in demand.
              Lancer AI keeps you informed so you can stay ahead in the freelance world.
              Chat now and explore what's trending!
            </p>
            <button className="subscribe-btn" onClick={() => handleNavigation("/chatbot")}>
              Chat with Lancer AI
            </button>
          </div>
        </section>

        <footer>
          <div className="footer-section">
            <h4>Links</h4>
            <a href="#">About Us</a>
            <a href="#">Jobs</a>
            <a href="#">Freelancers</a>
          </div>
          <div className="footer-section">
            <h4>Developed By</h4>
            <p>Mevin Manuel</p>
            <p>Alphonsa Maria</p>
            <p>R Balagopal</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HomePage;