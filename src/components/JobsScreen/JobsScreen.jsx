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
  FaEdit,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamation,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "https://crystalsolutions.com.pk/sohaibfyp";

const JobScreen = () => {
  const [theme, setTheme] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    department: "",
    location: "",
    salary: "",
    requirements: "",
    posted_by: "Admin",
    status: "active",
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
    if (isEditMode) {
      setCurrentJob({ ...currentJob, [name]: value });
    } else {
      setNewJob({ ...newJob, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = isEditMode
      ? `${API_BASE_URL}/updatejob.php`
      : `${API_BASE_URL}/savejobs.php`;
    const data = isEditMode ? currentJob : newJob;

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error("Error: " + data.error);
        } else {
          toast.success(
            isEditMode
              ? "Job updated successfully!"
              : "Job posted successfully!"
          );
          resetForm();
          fetchJobs();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Operation failed. Please try again.");
      });
  };

  const handleEdit = (job) => {
    setCurrentJob(job);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    const data = { id: jobToDelete.id };
    const formData = new URLSearchParams(data).toString();

    axios
      .post(`${API_BASE_URL}/deletejob.php`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        const { error, message } = response.data;
        if (error === 200) {
          toast.success(message);
          fetchJobs();
        } else {
          toast.error(message);
        }
      })
      .catch((error) => {
        toast.error("An error occurred during deletion. Please try again.");
      })
      .finally(() => {
        setShowDeleteConfirmation(false);
        setJobToDelete(null);
      });
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setJobToDelete(null);
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentJob(null);
    setNewJob({
      title: "",
      description: "",
      department: "",
      location: "",
      salary: "",
      requirements: "",
      posted_by: "Admin",
      status: "active",
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FaCheckCircle className="mr-1" /> Active
          </span>
        );
      case "inactive":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <FaTimesCircle className="mr-1" /> Inactive
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <FaInfoCircle className="mr-1" /> {status}
          </span>
        );
    }
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
              className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-[1.02] ${
                theme === "light"
                  ? "bg-white border border-gray-100"
                  : "bg-gray-800 border border-gray-700"
              }`}
            >
              {/* Status Ribbon */}
              <div
                className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-lg ${
                  job.status === "active"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {job.status === "active" ? "HIRING" : "CLOSED"}
              </div>

              {/* Job Header */}
              <div className="p-6 pb-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#F58634] mb-1">
                      {job.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <FaBuilding className="mr-1" />
                      <span>{job.department}</span>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-[#F58634]">
                    {job.salary}
                  </span>
                </div>

                {/* Job Description */}
                <p className="text-gray-500 line-clamp-3 mb-4">
                  {job.description}
                </p>
              </div>

              {/* Requirements */}
              {job.requirements && (
                <div className="px-6 mb-4">
                  <div className="bg-[#fcbb8b] dark:bg-[#fcbb8b] rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-1">
                      Requirements:
                    </h4>
                    <ul className="text-xs text-black-600 dark:text-black-300 space-y-1">
                      {job.requirements.split(",").map((req, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-black mr-1">•</span>
                          {req.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Job Footer */}
              <div
                className={`px-6 py-4 border-t ${
                  theme === "light" ? "border-gray-100" : "border-gray-700"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaMapMarker className="mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaClock className="mr-1" />
                      <span>
                        {new Date(job.posted_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(job)}
                      className="p-2 rounded-full hover:bg-[#F58634] hover:bg-opacity-20 text-[#F58634] hover:text-[#e5732a] transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(job)}
                      className="p-2 rounded-full hover:bg-red-500 hover:bg-opacity-20 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  Posted by:{" "}
                  <span className="font-medium">{job.posted_by}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Job Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
              className={`p-6 rounded-lg shadow-lg w-full max-w-md ${
                theme === "light" ? "bg-white" : "bg-gray-800"
              }`}
            >
              <h2 className="text-xl font-bold mb-4 text-[#F58634]">
                {isEditMode ? "Edit Job" : "Post New Job"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={isEditMode ? currentJob.title : newJob.title}
                  onChange={handleInputChange}
                  placeholder="Job Title"
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  name="description"
                  value={
                    isEditMode ? currentJob.description : newJob.description
                  }
                  onChange={handleInputChange}
                  placeholder="Job Description"
                  className="w-full p-2 border rounded"
                  rows="3"
                  required
                />
                <textarea
                  name="requirements"
                  value={
                    isEditMode ? currentJob.requirements : newJob.requirements
                  }
                  onChange={handleInputChange}
                  placeholder="Requirements (separate with commas)"
                  className="w-full p-2 border rounded"
                  rows="3"
                />
                <input
                  type="text"
                  name="department"
                  value={isEditMode ? currentJob.department : newJob.department}
                  onChange={handleInputChange}
                  placeholder="Department"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="location"
                  value={isEditMode ? currentJob.location : newJob.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="salary"
                  value={isEditMode ? currentJob.salary : newJob.salary}
                  onChange={handleInputChange}
                  placeholder="Salary"
                  className="w-full p-2 border rounded"
                  required
                />
                {isEditMode && (
                  <select
                    name="status"
                    value={currentJob.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                )}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-[#F58634] text-white hover:bg-[#e5732a]"
                  >
                    {isEditMode ? "Update" : "Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
              className={`p-6 rounded-lg shadow-lg w-full max-w-md ${
                theme === "light" ? "bg-white" : "bg-gray-800"
              }`}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-3 rounded-full bg-red-100 text-red-600">
                  <FaExclamation size={24} />
                </div>
                <h2 className="text-xl font-bold text-center">
                  Confirm Deletion
                </h2>
                <p className="text-center">
                  Are you sure you want to delete the job{" "}
                  <span className="font-semibold">"{jobToDelete?.title}"</span>?
                  This action cannot be undone.
                </p>
                <div className="flex justify-center space-x-4 w-full mt-4">
                  <button
                    onClick={cancelDelete}
                    className={`px-4 py-2 rounded-md ${
                      theme === "light"
                        ? "bg-gray-300 hover:bg-gray-400"
                        : "bg-gray-600 hover:bg-gray-500"
                    } transition-colors duration-300`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobScreen;
