import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Careers = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("resume_path", formData.resume);

    axios
      .post(
        "https://crystalsolutions.com.pk/sohaibfyp/submit_application.php",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response, "response");
        if (response.data.message) {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else if (response.data.error) {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again.");
      });
  };

  return (
    <section className="bg-white py-14 md:py-24">
      <Navbar />

      <div className="container">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="text-3xl font-bold text-center mb-8"
        >
          Join Our Team
        </motion.h1>

        {/* Resume Upload Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="bg-[#f4f4f4] rounded-lg p-8 max-w-[600px] mx-auto"
        >
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 p-2 w-full rounded-md border border-gray-300"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full rounded-md border border-gray-300"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="resume"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Resume (PDF/DOC/DOCX)
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  className="mt-1 p-2 w-full rounded-md border border-gray-300"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#F58634] text-white py-2 rounded-md hover:bg-[#e5732a] transition duration-300"
              >
                Submit Application
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right" // Position of the toast
        autoClose={5000} // Auto-close after 5 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={false} // New toasts appear below older ones
        closeOnClick // Close toast on click
        rtl={false} // Left-to-right layout
        pauseOnFocusLoss // Pause toast when window loses focus
        draggable // Allow dragging to dismiss
        pauseOnHover // Pause toast on hover
      />
    </section>
  );
};

export default Careers;
