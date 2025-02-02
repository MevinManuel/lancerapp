import { useState } from "react"
import "../search.css"

const freelancers = [
  {
    id: 1,
    name: "Sarah Johnson",
    occupation: "UI/UX Designer",
    rating: 4.8,
    experience: "5+ years",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    description:
      "Experienced UI/UX designer with a passion for creating intuitive and engaging user experiences. Specialized in mobile app design and design systems. Worked with multiple startups and established companies.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    name: "Michael Chen",
    occupation: "Full Stack Developer",
    rating: 4.9,
    experience: "7+ years",
    skills: ["React", "Node.js", "Python", "AWS"],
    description:
      "Full stack developer with extensive experience in building scalable web applications. Strong background in both frontend and backend development. Passionate about clean code and best practices.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    name: "Emma Wilson",
    occupation: "Content Writer",
    rating: 4.7,
    experience: "4+ years",
    skills: ["SEO", "Blog Writing", "Copywriting", "Technical Writing"],
    description:
      "Professional content writer specializing in technology and business topics. Experienced in creating engaging content that drives traffic and conversions. Strong understanding of SEO principles.",
    image: "/placeholder.svg?height=400&width=400",
  },
]

function FreelancerSearch() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const currentFreelancer = freelancers[currentIndex]

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % freelancers.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + freelancers.length) % freelancers.length)
  }

  return (
    <div className="freelancer-search">
      <div className="container">
        {/* Search Section */}
        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search freelancers..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select className="role-filter" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
              <option value="">Filter by role</option>
              <option value="designer">UI/UX Designer</option>
              <option value="developer">Developer</option>
              <option value="writer">Content Writer</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <div className="filter-buttons">
            <button className="filter-btn">Experience Level</button>
            <button className="filter-btn">Hourly Rate</button>
            <button className="filter-btn">Skills</button>
            <button className="filter-btn">Location</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Left Side - Freelancer Cards */}
          <div className="freelancer-card">
            <button className="nav-btn prev-btn" onClick={handlePrevious}>
              &lt;
            </button>

            <div className="card-content">
              <div className="freelancer-header">
                <img
                  src={currentFreelancer.image || "/placeholder.svg"}
                  alt={currentFreelancer.name}
                  className="freelancer-image"
                />
                <div className="freelancer-info">
                  <div className="freelancer-name-rating">
                    <h2>{currentFreelancer.name}</h2>
                    <div className="rating">
                      <span className="star">★</span>
                      <span>{currentFreelancer.rating}</span>
                    </div>
                  </div>
                  <p className="occupation">{currentFreelancer.occupation}</p>
                  <p className="experience">{currentFreelancer.experience}</p>
                </div>
              </div>

              <div className="skills-container">
                {currentFreelancer.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
              <button className="view-profile-btn">View Profile</button>
            </div>

            <button className="nav-btn next-btn" onClick={handleNext}>
              &gt;
            </button>
          </div>

          {/* Right Side - Detailed Description */}
          <div className="freelancer-details">
            <h3>About {currentFreelancer.name}</h3>
            <p>{currentFreelancer.description}</p>

            <div className="portfolio-section">
              <h4>Portfolio Highlights</h4>
              <div className="portfolio-images">
                <img src="/placeholder.svg?height=200&width=200" alt="Portfolio 1" />
                <img src="/placeholder.svg?height=200&width=200" alt="Portfolio 2" />
              </div>
            </div>

            <div className="reviews-section">
              <h4>Client Reviews</h4>
              <div className="review">
                <div className="review-stars">★★★★★</div>
                <p>"Excellent work! Very professional and delivered on time. Would definitely work with again."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreelancerSearch

