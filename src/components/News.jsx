import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/news.css";

const News = () => {
  const navigate = useNavigate();
  const [newsUpdates, setNewsUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Axios instance (no token needed if /view-news is public)
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axiosInstance.get("/view-news");
        console.log("Fetched news:", response.data); // Debug log
        setNewsUpdates(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          if (error.response.status === 500) {
            alert("Server error while fetching news. Please try again later.");
          }
        } else {
          alert("Failed to fetch news. Check your connection or server status.");
        }
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate("/home")}>
        ← Back
      </button>

      {/* News Section */}
      <div className="news-content">
        <h1 className="news-title">News / Updates</h1>

        {loading ? (
          <p className="loading-text">Loading news...</p>
        ) : newsUpdates.length === 0 ? (
          <p className="no-news">No news available.</p>
        ) : (
          <div className="news-list">
            {newsUpdates.map((news) => (
              <div className="news-card" key={news.id}>
                <h2>{news.title}</h2>
                <p>{news.content}</p>
                <span className="news-date">
                  {new Date(news.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;