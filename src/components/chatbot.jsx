import React, { useState } from "react";
import axios from "axios";
import "./styles/Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  const GROK_API_KEY = import.meta.env.VITE_GROK_API_KEY;
  // Remove DEEPSEEK_API_KEY since we’ll use OpenRouter for both

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    let botResponse = "Sorry, I didn't understand that.";
    try {
      if (input.toLowerCase().includes("trending") || input.toLowerCase().includes("news")) {
        botResponse = await fetchIndustryNews();
      } else {
        botResponse = await fetchAIResponse(input);
      }
    } catch (error) {
      botResponse = "Error: Unable to fetch response. Check API keys or limits.";
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
            Authorization: `Bearer ${HUGGINGFACE_API_KEY}`, // Fixed template literal
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
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "deepseek/deepseek-chat:free", // OpenRouter’s free DeepSeek model
          messages: [
            {
              role: "user",
              content: "Summarize the latest industry and market trends in technology.",
            },
          ],
          max_tokens: 500,
        },
        {
          headers: {
            Authorization: `Bearer ${GROK_API_KEY}`, // Reuse GrokChat key
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.choices[0].message.content || "No trends available.";
    } catch (error) {
      console.error("❌ Error fetching DeepSeek trends:", error.response?.status, error.message);
      throw error;
    }
  };

  return (
    <div className="chatbot-container">
      <h3>LANCER AI</h3>
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="message bot">Typing...</div>}
      </div>

      <form className="chat-form" onSubmit={handleSend}>
        <div className="chat-input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about trends, skills, news..."
            className="chat-input"
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend(e);
            }}
          />
        </div>
        <button type="submit" className="send-button" disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;