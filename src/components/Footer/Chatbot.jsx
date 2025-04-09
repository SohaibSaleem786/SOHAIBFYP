import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Load saved messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Scroll to the bottom of the chat when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setMessages([
        { text: "Hello! How can I assist you today?", isBot: true },
      ]);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to the chat
    setMessages((prev) => [...prev, { text: input, isBot: false }]);
    setInput("");
    setIsLoading(true);

    try {
      // Fetch bot response from Hugging Face Space API
      const botMessage = await getBotResponse(input);
      setMessages((prev) => [...prev, { text: botMessage, isBot: true }]);
    } catch (error) {
      console.error("Error:", error.message);
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm sorry, I encountered an error. Please try again later.",
          isBot: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch bot response from Hugging Face Space API
  const getBotResponse = async (userInput) => {
    const url = "https://sohaibsaleem89-chatbot-crystal.hf.space/api/predict";
    const payload = {
      data: [userInput],
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(
          `API Error: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      return data?.data?.[0] || "I couldn't understand that.";
    } catch (error) {
      console.error("Error in getBotResponse:", error.message);
      return "I'm sorry, the chatbot is currently unavailable.";
    }
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <button
          onClick={toggleChat}
          className="bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary-dark transition-colors duration-300"
          style={{ backgroundColor: "#f58634" }}
        >
          <FaRobot size={24} />
        </button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
          >
            {/* Chat header */}
            <div
              className="bg-primary text-white p-4 flex justify-between items-center"
              style={{ backgroundColor: "#f58634" }}
            >
              <h3 className="font-bold">Crystal Solutions</h3>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Chat messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-2 rounded-lg ${
                      message.isBot ? "bg-gray-200" : "bg-primary text-white"
                    }`}
                    style={message.isBot ? {} : { backgroundColor: "#f58634" }}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[70%] p-2 rounded-lg bg-gray-200">
                    Typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input form */}
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="bg-primary text-white p-2 rounded-r-lg hover:bg-primary-dark transition-colors duration-300"
                  style={{ backgroundColor: "#f58634" }}
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
