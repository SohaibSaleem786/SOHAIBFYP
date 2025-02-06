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

// Define the base API URL
const API_BASE_URL = "https://crystalsolutions.com.pk/sohaibfyp";

const JobScreen = () => {
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
    setNewJob({ ...newJob, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/savejobs.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          console.error("Server error:", data.error);
          toast.error("Error: " + data.error);
        } else {
          toast.success("Job saved successfully!");
          setIsModalOpen(false);
          setNewJob({
            title: "",
            description: "",
            department: "",
            location: "",
            salary: "",
            posted_by: "Admin",
          });
          fetchJobs();
        }
      })
      .catch((error) => {
        console.error("Error posting job:", error);
        toast.error("Failed to save the job. Please try again.");
      });
  };

  // Delete job by ID
  function handleDeleteJob(id) {
    const data = {
      id: id,
    };
    console.log(id);
    const formData = new URLSearchParams(data).toString();

    axios
      .post(`${API_BASE_URL}/deletejob.php`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log(response, "response");

        const { error, message } = response.data;

        if (error === 200) {
          toast.success(message);
          fetchJobs(); // Refresh the job list
        } else {
          toast.dismiss(); // Dismiss any existing toasts
          toast.error(`${message}`, {
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        toast.dismiss(); // Dismiss any existing toasts
        toast.error("An error occurred during deletion. Please try again.", {
          autoClose: 3000,
        });
      });
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
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 p-2 rounded-full ${
          theme === "light" ? "bg-white" : "bg-gray-700"
        } shadow-lg sm:hidden`}
      >
        <FaBars
          className={`${theme === "light" ? "text-gray-800" : "text-gray-100"}`}
        />
      </button>

      <Sidebar
        theme={theme}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } sm:ml-64 p-8`}
      >
        <Header theme={theme} toggleTheme={toggleTheme} />

        <div className="mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              theme === "light"
                ? "bg-[#F58634] text-white hover:bg-[#e5732a]"
                : "bg-gray-700 text-gray-100 hover:bg-gray-600"
            } transition-all duration-300`}
          >
            <FaPlus className="inline-block" /> <span>New Job</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
                theme === "light" ? "bg-white" : "bg-gray-700"
              }`}
            >
              <h3 className="text-xl font-bold text-[#F58634]">{job.title}</h3>
              <p className="text-gray-500 mt-2">{job.description}</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <FaBuilding className="text-gray-500" />
                  <span>{job.department}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaMapMarker className="text-gray-500" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaMoneyBill className="text-gray-500" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClock className="text-gray-500" />
                  <span>{new Date(job.posted_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div
              className={`p-6 rounded-lg shadow-lg w-96 ${
                theme === "light" ? "bg-white" : "bg-gray-800"
              }`}
            >
              <h2 className="text-xl font-bold mb-4 text-[#F58634]">New Job</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={newJob.title}
                  onChange={handleInputChange}
                  placeholder="Job Title"
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  name="description"
                  value={newJob.description}
                  onChange={handleInputChange}
                  placeholder="Job Description"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="department"
                  value={newJob.department}
                  onChange={handleInputChange}
                  placeholder="Department"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="location"
                  value={newJob.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="salary"
                  value={newJob.salary}
                  onChange={handleInputChange}
                  placeholder="Salary"
                  className="w-full p-2 border rounded"
                  required
                />
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-[#F58634] text-white hover:bg-[#e5732a]"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobScreen;
