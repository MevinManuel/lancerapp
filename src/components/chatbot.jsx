import React, { useState } from "react";
import axios from "axios";
import "./styles/Chatbot.css"; // Import external CSS

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const handleSend = async (e) => {
    e.preventDefault(); // Prevents page refresh on Enter
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    let botResponse = "Sorry, I didn't understand that.";

    if (input.toLowerCase().includes("trending") || input.toLowerCase().includes("news")) {
      botResponse = await fetchIndustryNews();
    } else {
      botResponse = await fetchAIResponse(input);
    }

    setMessages([...newMessages, { sender: "bot", text: botResponse }]);
    setLoading(false);
  };

  const fetchAIResponse = async (query) => {
    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
        { inputs: query },
        {
          headers: {
            Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data[0]?.generated_text || "I'm not sure how to respond to that.";
    } catch (error) {
      console.error("❌ Error fetching AI response:", error);
      return "I'm having trouble fetching data. Please try again later.";
    }
  };

  const fetchIndustryNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?sources=techcrunch,wired,bbc-news&language=en&pageSize=5&apiKey=${NEWS_API_KEY}`
      );

      const articles = response.data.articles.slice(0, 3);
      if (articles.length === 0) return "No trending news available at the moment.";

      return articles.map((article) => `${article.title} - [Read More](${article.url})`).join("\n");
    } catch (error) {
      console.error("❌ Error fetching news:", error);
      return "Unable to fetch industry news right now.";
    }
  };

  return (
    <div className="chatbot-container">
      <h3>AI Chatbot</h3>
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="message bot">Typing...</div>}
      </div>
      
{/* Prevents default form submission & ensures side-by-side layout */}
<form className="chat-form" onSubmit={handleSend}>
  <div className="chat-input-container">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Ask about trends, skills, news..."
      className="chat-input"
      disabled={loading}
      onKeyDown={(e) => { if (e.key === "Enter") handleSend(e); }}
    />
  </div>
  
  {/* Send button is now outside the input container */}
  <button type="submit" className="send-button" disabled={loading}>
    {loading ? "..." : "Send"}
  </button>
</form>



    </div>
  );
};

export default Chatbot;
