import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaBars,
  FaPlus,
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBuilding,
  FaClock,
  FaSearch,
  FaFilter,
  FaChevronRight,
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";

const API_BASE_URL = "https://crystalsolutions.com.pk/sohaibfyp";

const NewJobs = () => {
  const [theme, setTheme] = useState("light");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
  });

  // Fetch jobs from the backend
  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm, locationFilter, departmentFilter]);

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

  const filterJobs = () => {
    let result = jobs;

    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.requirements.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter !== "All") {
      result = result.filter((job) => job.location === locationFilter);
    }

    if (departmentFilter !== "All") {
      result = result.filter((job) => job.department === departmentFilter);
    }

    setFilteredJobs(result);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedJob) {
      toast.error("Please select a job to apply.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("resume_path", formData.resume);
    data.append("category", selectedJob.title);

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
        if (response.data.message) {
          toast.success(response.data.message);
          SIGNUP();
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
      password: `12${formData.name.replace(/\s+/g, "")}34`,
      status: "C",
    };

    axios
      .post(
        "https://crystalsolutions.com.pk/sohaibfyp/signup.php",
        signupData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.message) {
          setTimeout(() => {
            setIsModalOpen(false);
            setFormData({
              name: "",
              email: "",
              resume: null,
            });
            setSelectedJob(null);
          }, 2000);
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

  const openJobModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const getUniqueLocations = () => {
    const locations = jobs.map((job) => job.location);
    return ["All", ...new Set(locations)];
  };

  const getUniqueDepartments = () => {
    const departments = jobs.map((job) => job.department);
    return ["All", ...new Set(departments)];
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-gray-50" : "bg-gray-900"
      }`}
    >
      <>
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

        {/* Hero Section */}
        <div
          className={`relative py-20 ${
            theme === "light"
              ? "bg-gradient-to-r from-orange-600 to-indigo-700"
              : "bg-gradient-to-r from-gray-800 to-gray-900"
          }`}
        >
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Find Your Dream Job
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Browse through our latest job openings and take the next step in
              your career
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-2 flex items-center">
              <div className="flex-grow flex items-center">
                <FaSearch className="ml-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for jobs, keywords, or companies"
                  className="py-3 px-4 w-full focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg transition duration-300">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="md:w-1/4">
              <div
                className={`p-6 rounded-xl shadow-md ${
                  theme === "light" ? "bg-white" : "bg-gray-800"
                }`}
              >
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <FaFilter className="mr-2" /> Filters
                </h3>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Location
                  </label>
                  <select
                    className={`w-full p-3 rounded-lg border ${
                      theme === "light"
                        ? "border-gray-300"
                        : "bg-gray-700 border-gray-600 text-white"
                    }`}
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  >
                    {getUniqueLocations().map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Department
                  </label>
                  <select
                    className={`w-full p-3 rounded-lg border ${
                      theme === "light"
                        ? "border-gray-300"
                        : "bg-gray-700 border-gray-600 text-white"
                    }`}
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                  >
                    {getUniqueDepartments().map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => {
                    setSearchTerm("");
                    setLocationFilter("All");
                    setDepartmentFilter("All");
                  }}
                  className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                >
                  Clear all filters
                </button>
              </div>

              <div
                className={`mt-6 p-6 rounded-xl shadow-md ${
                  theme === "light" ? "bg-white" : "bg-gray-800"
                }`}
              >
                <h3 className="text-xl font-semibold mb-4">Job Alert</h3>
                <p className="text-sm mb-4">
                  Get notified when new jobs are posted
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className={`flex-grow p-3 rounded-l-lg border ${
                      theme === "light"
                        ? "border-gray-300"
                        : "bg-gray-700 border-gray-600 text-white"
                    }`}
                  />
                  <button className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-r-lg transition duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Jobs List */}
            <div className="md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {filteredJobs.length}{" "}
                  {filteredJobs.length === 1 ? "Job" : "Jobs"} Available
                </h2>
                <div className="text-sm">
                  Sorted by: <span className="font-medium">Most Recent</span>
                </div>
              </div>

              {filteredJobs.length === 0 ? (
                <div
                  className={`p-8 rounded-xl text-center ${
                    theme === "light" ? "bg-white" : "bg-gray-800"
                  }`}
                >
                  <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className={`p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg ${
                        theme === "light"
                          ? "bg-white hover:border-orange-500 border border-transparent"
                          : "bg-gray-800 hover:border-orange-400 border border-transparent"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-lg bg-orange-100 flex items-center justify-center">
                            <FaBriefcase className="text-orange-600 text-2xl" />
                          </div>
                        </div>

                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-orange-600 mb-1">
                                {job.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-3 text-sm mb-3">
                                <span className="flex items-center">
                                  <FaBuilding className="mr-1 text-gray-500" />{" "}
                                  {job.department}
                                </span>
                                <span className="flex items-center">
                                  <FaMapMarkerAlt className="mr-1 text-gray-500" />{" "}
                                  {job.location}
                                </span>
                                <span className="flex items-center">
                                  <FaMoneyBillWave className="mr-1 text-gray-500" />{" "}
                                  {job.salary}
                                </span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-500 mb-3 md:mb-0">
                              Posted{" "}
                              {new Date(job.posted_at).toLocaleDateString()}
                            </div>
                          </div>

                          <p className="text-gray-600 mb-4">
                            {job.description}
                          </p>

                          <div className="mb-4">
                            <h4 className="font-medium mb-2">Requirements:</h4>
                            <p className="text-gray-600 text-sm">
                              {job.requirements}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() => openJobModal(job)}
                              className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-lg transition duration-300 flex items-center"
                            >
                              Apply Now <FaChevronRight className="ml-2" />
                            </button>
                            <button className="border border-orange-600 text-orange-600 hover:bg-orange-50 py-2 px-6 rounded-lg transition duration-300 flex items-center">
                              View Details <FiExternalLink className="ml-2" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Application Modal */}
        {isModalOpen && selectedJob && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div
              className={`rounded-xl shadow-2xl w-full max-w-md ${
                theme === "light" ? "bg-white" : "bg-gray-800"
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-orange-600">
                    Apply for {selectedJob.title}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </div>

                <div className="mb-6 p-4 rounded-lg bg-orange-50 border border-orange-100">
                  <h3 className="font-medium text-orange-800 mb-2">
                    Job Details
                  </h3>
                  <div className="text-sm text-orange-700">
                    <div className="flex mb-1">
                      <span className="w-24 font-medium">Location:</span>
                      <span>{selectedJob.location}</span>
                    </div>
                    <div className="flex mb-1">
                      <span className="w-24 font-medium">Salary:</span>
                      <span>{selectedJob.salary}</span>
                    </div>
                    <div className="flex">
                      <span className="w-24 font-medium">Department:</span>
                      <span>{selectedJob.department}</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        className={`w-full p-3 rounded-lg border ${
                          theme === "light"
                            ? "border-gray-300"
                            : "bg-gray-700 border-gray-600 text-white"
                        }`}
                        required
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        className={`w-full p-3 rounded-lg border ${
                          theme === "light"
                            ? "border-gray-300"
                            : "bg-gray-700 border-gray-600 text-white"
                        }`}
                        required
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Resume (PDF/DOC/DOCX) *
                      </label>
                      <div
                        className={`border-2 border-dashed rounded-lg p-4 text-center ${
                          theme === "light"
                            ? "border-gray-300"
                            : "border-gray-600"
                        }`}
                      >
                        <input
                          type="file"
                          name="resume"
                          className="hidden"
                          id="resume-upload"
                          accept=".pdf,.doc,.docx"
                          required
                          onChange={handleFileChange}
                        />
                        <label
                          htmlFor="resume-upload"
                          className="cursor-pointer"
                        >
                          <div className="flex flex-col items-center">
                            <FaBriefcase className="text-3xl text-gray-400 mb-2" />
                            <p className="text-sm">
                              {formData.resume
                                ? formData.resume.name
                                : "Click to upload or drag and drop"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              PDF, DOC, DOCX (Max. 5MB)
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg transition duration-300"
                      >
                        Submit Application
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default NewJobs;
