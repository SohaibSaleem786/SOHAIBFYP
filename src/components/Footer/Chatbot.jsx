import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
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
          aria-label="Open chatbot"
        >
          <FaRobot size={24} />
        </button>
      </motion.div>

      {/* Chat window with embedded Hugging Face space */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 w-[360px] h-[500px] bg-white rounded-lg shadow-xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div
              className="bg-primary text-white p-4 flex justify-between items-center"
              style={{ backgroundColor: "#f58634" }}
            >
              <h3 className="font-bold">Crystal Chatbot</h3>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Embed Hugging Face Chatbot */}
            <iframe
              src="https://sohaibsaleem89-chatbot2-2.hf.space"
              frameBorder="0"
              width="100%"
              height="100%"
              style={{ border: "none" }}
              title="Crystal Chatbot"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
