import './styles/home.css';

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    
    <div className="homepage">
      <div className="bg-animation"></div>
      <div className="bg-noise"></div>

      <nav className="navbar">
        <div className="logo"></div>
        <div className="nav-right">
          <button className="try-free-btn"> Profile </button>
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

          <div className="search-container">
            <input type="text" placeholder="Search for Jobs & Freelancers" className="search-input" />
            <div className="search-icon">🔍</div>
          </div>
        </section>

        <section className="features">
        <div className="feature-card" onClick={() => handleNavigation("/freelancer_search")}> 
        <div className="icon-container">
              <i className="icon">👥</i>
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
              <i className="icon">🔍</i>
            </div>
            <h3>
              Explore
              <br />
              Opportunities
            </h3>
            <p>Browse job offers by some of the best companies</p>
          </div>

          <div className="feature-card">
            <div className="icon-container">
              <i className="icon">💬</i>
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
              Get valuable <span className="highlight">strategy, culture and brand</span> insights straight to your
              inbox
            </h3>
            <p>
              By signing up to receive emails from Matrix, you agree to our Privacy Policy. We treat your info
              responsibly.
            </p>
            <div className="email-signup">
              <input type="email" placeholder="Your email address here" />
              <button className="subscribe-btn">Subscribe Now</button>
            </div>
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
            <p>R RBalagopal</p>

          </div>
        </footer>
      </main>
      </div>
   
  )
}

export default HomePage

