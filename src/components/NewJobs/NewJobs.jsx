import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import axios from "axios";
import {
  FaBars,
  FaPlus,
  FaBriefcase,
  FaMapMarker,
  FaMoneyBill,
  FaBuilding,
  FaClock,
  FaTrash,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";
import { TbSettingsUp } from "react-icons/tb";

// Define the base API URL
const API_BASE_URL = "https://crystalsolutions.com.pk/sohaibfyp";

const NewJobs = () => {
  const [theme, setTheme] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    department: "",
    location: "",
    salary: "",
    posted_by: "Admin",
  });
  const [jobId, setJobId] = useState(null); // To store the selected job ID
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
  });

  // Fetch jobs from the backend
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    fetch(`${API_BASE_URL}/getjobs.php`)
      .then((response) => response.json())
      .then((data) => {
        if (data.jobs && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        } else {
          console.error("Expected an array of jobs, but got:", data);
        }
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setFormData({ ...formData, [name]: value.toUpperCase() });
    } else if (name === "email") {
      setFormData({ ...formData, [name]: value.toLowerCase() });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  // Submit application with job code and other data
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!jobId) {
      toast.error("Please select a job to apply.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("resume_path", formData.resume);
    data.append("category", jobId);

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

          // Call Signup Function
          SIGNUP();

          setTimeout(() => {
            setIsModalOpen(false);
            setFormData({
              name: "",
              email: "",
              resume: null,
            });
            setJobId(null);
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

  const SIGNUP = () => {
    const signupData = {
      name: formData.name,
      email: formData.email,
      password: `12${formData.name.replace(" ", "")}34`,
      status: "Candidate",
    };

    axios
      .post(
        "https://crystalsolutions.com.pk/sohaibfyp/signup.php",
        signupData, // Send JSON data
        {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
        }
      )
      .then((response) => {
        console.log(response, "response");
        if (response.data.message) {
          toast.success(response.data.message);
        } else if (response.data.error) {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again.");
      });
  };

  function passthejobid(title) {
    setJobId(title);
    setIsModalOpen(true); // Open the modal to apply for the job
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`min-h-screen flex ${
        theme === "light"
          ? "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800"
          : "bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100"
      }`}
    >
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "light" ? "light" : "dark"}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 py-20">
        {jobs.map((job) => (
          <div
            key={job.id}
            className={`p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            }`}
          >
            <h3 className="text-2xl font-semibold text-[#F58634]">
              {job.title}
            </h3>
            <p className="text-gray-400 mt-2">{job.description}</p>
            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <FaBuilding className="text-[#F58634]" />
                <span className="text-gray-500">{job.department}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarker className="text-[#F58634]" />
                <span className="text-gray-500">{job.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMoneyBill className="text-[#F58634]" />
                <span className="text-gray-500">{job.salary}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaClock className="text-[#F58634]" />
                <span className="text-gray-500">
                  {new Date(job.posted_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => passthejobid(job.title)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-lg ${
                    theme === "light"
                      ? "bg-[#F58634] text-white hover:bg-[#e5732a]"
                      : "bg-gray-700 text-gray-100 hover:bg-gray-600"
                  } transition-all duration-300 transform hover:scale-105`}
                >
                  <FaPlus className="inline-block" /> <span>Apply</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div
            className={`p-8 rounded-lg shadow-xl w-96 ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6 text-[#F58634]">
              Apply Now
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
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
                    className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:ring-[#F58634] focus:border-[#F58634]"
                    required
                    onChange={handleInputChange}
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
                    className="mt-2 p-3 w-full rounded-lg border border-gray-300 focus:ring-[#F58634] focus:border-[#F58634]"
                    required
                    onChange={handleInputChange}
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
                    className="mt-2 p-3 w-full rounded-lg border border-gray-300"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={handleFileChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#F58634] text-white py-3 rounded-lg hover:bg-[#e5732a] transition duration-300 transform hover:scale-105"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewJobs;
