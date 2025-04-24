import React, { useEffect, useState } from "react";
import {
  FaFilePdf,
  FaBars,
  FaBell,
  FaUser,
  FaChartLine,
  FaUsers,
  FaProjectDiagram,
  FaCog,
  FaUserPlus,
  FaExternalLinkAlt,
  FaSearch,
} from "react-icons/fa";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ResumeCategorization = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("analyzer"); // 'analyzer' or 'dashboard'

  // Fetch all applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          "https://crystalsolutions.com.pk/sohaibfyp/get_applications.php"
        );
        const data = await response.json();
        if (data.applicants) {
          setApplications(data.applicants);
        } else {
          setError(data.error || "Failed to fetch applications.");
        }
      } catch (error) {
        setError("Error fetching applications: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Filter applications based on search term
  const filteredApplications = applications.filter((app) =>
    Object.values(app).some(
      (val) =>
        typeof val === "string" &&
        val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Handle resume selection for analysis
  const handleSelectResume = (resumeUrl) => {
    setSelectedResume(resumeUrl);
    setActiveTab("analyzer");
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Calculate category counts
  const categoryCounts = applications.reduce((acc, app) => {
    const category = app.category || "None";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Prepare bar chart data
  const barChartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Number of Applications",
        data: Object.values(categoryCounts),
        backgroundColor: "#F58634",
      },
    ],
  };

  // Prepare line chart data
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Applications Over Time",
        data: [5, 10, 8, 12, 15, 20],
        borderColor: "#F58634",
        backgroundColor: "rgba(245, 134, 52, 0.2)",
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Category Distribution",
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F58634]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex ${
        theme === "light"
          ? "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800"
          : "bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100"
      }`}
    >
      {/* Sidebar Toggle Button (Mobile) */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 p-2 rounded-full ${
          theme === "light" ? "bg-white" : "bg-gray-700"
        } shadow-lg sm:hidden transition-all duration-300 hover:scale-110`}
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

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } sm:ml-64 p-4`}
      >
        <Header theme={theme} toggleTheme={toggleTheme} />

        {/* Compact Tab Navigation */}
        <div className="flex mb-4 border-b">
          <button
            onClick={() => setActiveTab("analyzer")}
            className={`px-3 py-1.5 text-xs font-medium rounded-t mr-1 ${
              activeTab === "analyzer"
                ? theme === "light"
                  ? "bg-white border border-b-0 border-gray-200 text-[#F58634]"
                  : "bg-gray-700 border border-b-0 border-gray-600 text-[#F58634]"
                : theme === "light"
                ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Resume Analyzer
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-3 py-1.5 text-xs font-medium rounded-t ${
              activeTab === "dashboard"
                ? theme === "light"
                  ? "bg-white border border-b-0 border-gray-200 text-[#F58634]"
                  : "bg-gray-700 border border-b-0 border-gray-600 text-[#F58634]"
                : theme === "light"
                ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Applications
          </button>
        </div>

        {/* Resume Analyzer Tab */}
        {activeTab === "analyzer" && (
          <div className="space-y-4">
            {/* Compact Analyzer Header */}
            <div
              className={`p-4 rounded-lg shadow ${
                theme === "light"
                  ? "bg-gradient-to-r from-[#F58634] to-[#FFA726] text-white"
                  : "bg-gradient-to-r from-gray-700 to-gray-600"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                  <div className="p-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                    <FaFilePdf size={20} />
                  </div>
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold">
                      Resume Analyzer
                    </h1>
                    <p className="text-xs opacity-90">
                      Upload or select a resume to analyze
                    </p>
                  </div>
                </div>
                {selectedResume && (
                  <a
                    href={selectedResume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-1.5 rounded text-xs font-medium flex items-center space-x-1 ${
                      theme === "light"
                        ? "bg-white text-[#F58634] hover:bg-gray-100"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    } transition-all duration-300`}
                  >
                    <span>View Resume</span>
                    <FaExternalLinkAlt size={12} />
                  </a>
                )}
              </div>
            </div>

            {/* Analyzer Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Compact Resume Selection Panel */}
              <div
                className={`p-4 rounded-lg shadow ${
                  theme === "light" ? "bg-white" : "bg-gray-700"
                }`}
              >
                <h2 className="text-base font-semibold mb-3">Select Resume</h2>
                <div className="mb-3 relative">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search resumes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full p-2 pl-8 rounded shadow-sm text-sm ${
                        theme === "light"
                          ? "bg-white border border-gray-200"
                          : "bg-gray-600 border border-gray-500"
                      } focus:outline-none focus:ring-1 focus:ring-[#F58634]`}
                    />
                    <FaSearch
                      size={14}
                      className={`absolute left-2.5 top-1/2 transform -translate-y-1/2 ${
                        theme === "light" ? "text-gray-400" : "text-gray-300"
                      }`}
                    />
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {filteredApplications.length > 0 ? (
                    <div className="space-y-2">
                      {filteredApplications.map((application) => (
                        <div
                          key={application.id}
                          onClick={() =>
                            handleSelectResume(
                              `https://crystalsolutions.com.pk/sohaibfyp/upload/${application.resume_path}`
                            )
                          }
                          className={`p-2 rounded cursor-pointer transition-all duration-300 text-sm ${
                            selectedResume ===
                            `https://crystalsolutions.com.pk/sohaibfyp/upload/${application.resume_path}`
                              ? theme === "light"
                                ? "bg-[#F58634] text-white"
                                : "bg-gray-600 text-white"
                              : theme === "light"
                              ? "bg-gray-50 hover:bg-gray-100"
                              : "bg-gray-600 hover:bg-gray-500"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <div
                              className={`p-2 rounded-full ${
                                theme === "light"
                                  ? "bg-white text-[#F58634]"
                                  : "bg-gray-700 text-white"
                              }`}
                            >
                              <FaFilePdf size={14} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium truncate text-sm">
                                {application.name}
                              </h3>
                              <p className="text-xs truncate">
                                {application.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className={`p-4 text-center rounded ${
                        theme === "light" ? "bg-gray-50" : "bg-gray-600"
                      }`}
                    >
                      <p className="text-xs text-gray-500">
                        {searchTerm
                          ? "No resumes match your search."
                          : "No resumes found."}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Analyzer Iframe */}
              <div
                className={`lg:col-span-2 rounded-lg shadow overflow-hidden ${
                  theme === "light" ? "bg-white" : "bg-gray-700"
                }`}
              >
                {selectedResume ? (
                  <iframe
                    src={`https://sohaibsaleem89-aipoweredresumeanalyzer.hf.space?resume_url=${encodeURIComponent(
                      selectedResume
                    )}`}
                    frameBorder="0"
                    width="100%"
                    height="500"
                    className="min-h-[500px]"
                    title="AI Resume Analyzer"
                  ></iframe>
                ) : (
                  <div className="flex flex-col items-center justify-center p-4 h-full min-h-[500px]">
                    <div
                      className={`p-4 rounded-full mb-3 ${
                        theme === "light"
                          ? "bg-gray-100 text-[#F58634]"
                          : "bg-gray-600 text-white"
                      }`}
                    >
                      <FaFilePdf size={32} />
                    </div>
                    <h3 className="text-base font-semibold mb-1">
                      Select a Resume
                    </h3>
                    <p
                      className={`text-center mb-4 text-xs ${
                        theme === "light" ? "text-gray-500" : "text-gray-300"
                      }`}
                    >
                      Choose a resume to start analysis
                    </p>
                    <button
                      onClick={() => setActiveTab("dashboard")}
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        theme === "light"
                          ? "bg-[#F58634] text-white hover:bg-[#e5732a]"
                          : "bg-gray-600 text-white hover:bg-gray-500"
                      }`}
                    >
                      View Applications
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Applications Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-4">
            {/* Compact Applications Table with Scrollbar */}
            <div
              className={`p-4 rounded-lg shadow ${
                theme === "light" ? "bg-white" : "bg-gray-700"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <h2 className="text-base font-semibold">Applications</h2>
                <div className="relative mt-1 sm:mt-0">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full sm:w-48 p-2 pl-7 rounded text-sm ${
                      theme === "light"
                        ? "bg-white border border-gray-200"
                        : "bg-gray-600 border border-gray-500"
                    } focus:outline-none focus:ring-1 focus:ring-[#F58634]`}
                  />
                  <FaSearch
                    size={12}
                    className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${
                      theme === "light" ? "text-gray-400" : "text-gray-300"
                    }`}
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <div className="max-h-[500px] overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr
                        className={`sticky top-0 ${
                          theme === "light"
                            ? "bg-white border-b border-gray-200"
                            : "bg-gray-700 border-b border-gray-600"
                        }`}
                      >
                        <th className="text-left py-2 px-3">ID</th>
                        <th className="text-left py-2 px-3">Name</th>
                        <th className="text-left py-2 px-3">Email</th>
                        <th className="text-left py-2 px-3">Category</th>
                        <th className="text-left py-2 px-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplications.length > 0 ? (
                        filteredApplications.map((application) => (
                          <tr
                            key={application.id}
                            className={`${
                              theme === "light"
                                ? "border-b border-gray-100 hover:bg-gray-50"
                                : "border-b border-gray-600 hover:bg-gray-600"
                            }`}
                          >
                            <td className="py-2 px-3">{application.id}</td>
                            <td className="py-2 px-3">{application.name}</td>
                            <td className="py-2 px-3">{application.email}</td>
                            <td className="py-2 px-3">
                              {application.category || "N/A"}
                            </td>
                            <td className="py-2 px-3">
                              <div className="flex space-x-1">
                                <a
                                  href={`https://crystalsolutions.com.pk/sohaibfyp/upload/${application.resume_path}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                                    theme === "light"
                                      ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                      : "bg-gray-600 text-gray-100 hover:bg-gray-500"
                                  }`}
                                >
                                  <FaFilePdf size={10} className="mr-1" /> View
                                </a>
                                <button
                                  onClick={() => {
                                    handleSelectResume(
                                      `https://crystalsolutions.com.pk/sohaibfyp/upload/${application.resume_path}`
                                    );
                                    setActiveTab("analyzer");
                                  }}
                                  className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                                    theme === "light"
                                      ? "bg-[#F58634] text-white hover:bg-[#e5732a]"
                                      : "bg-gray-600 text-white hover:bg-gray-500"
                                  }`}
                                >
                                  Analyze
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="py-4 text-center text-xs text-gray-500"
                          >
                            No applications found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Compact Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Bar Chart */}
              <div
                className={`p-4 rounded-lg shadow ${
                  theme === "light" ? "bg-white" : "bg-gray-700"
                }`}
              >
                <h2 className="text-base font-semibold mb-3">Categories</h2>
                <div className="h-48">
                  <Bar data={barChartData} options={chartOptions} />
                </div>
              </div>

              {/* Line Chart */}
              <div
                className={`p-4 rounded-lg shadow ${
                  theme === "light" ? "bg-white" : "bg-gray-700"
                }`}
              >
                <h2 className="text-base font-semibold mb-3">Timeline</h2>
                <div className="h-48">
                  <Line data={lineChartData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeCategorization;
