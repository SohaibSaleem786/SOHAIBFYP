import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaTimes,
  FaChartLine,
  FaUsers,
  FaBell,
  FaUser,
  FaMoon,
  FaSun,
  FaBars,
  FaFilePdf,
} from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import axios from "axios";
// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ApplicationsScreen = () => {
  const [applicants, setApplicants] = useState([]);
  const [theme, setTheme] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch applicants from the API
  const fetchApplicants = async () => {
    console.log("skldfjkslfkf");
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://crystalsolutions.com.pk/sohaibfyp/get_applications.php"
      );
      const data = await response.json();
      if (data.applicants) {
        setApplicants(data.applicants);
      } else {
        console.error(data.error || "Failed to fetch applicants.");
      }
    } catch (error) {
      console.error("Error fetching applicants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  // Update application status
  const updateStatus = async (id, status) => {
    try {
      const response = await axios.post(
        "https://crystalsolutions.com.pk/sohaibfyp/update_status.php",
        { id, status }
      );
      const data = response.data;
      fetchApplicants();

      if (data.message) {
        // Update the local state immediately for a responsive UI
        setApplicants((prevApplicants) =>
          prevApplicants.map((applicant) =>
            applicant.id === id ? { ...applicant, status } : applicant
          )
        );

        // Optional: Refetch data from server to ensure consistency
        // fetchApplicants();
      } else {
        console.error(data.error || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Separate accepted, rejected, and pending applicants
  const acceptedApplicants = applicants.filter(
    (applicant) => applicant.status === "Accepted"
  );
  const rejectedApplicants = applicants.filter(
    (applicant) => applicant.status === "Rejected"
  );
  const pendingApplicants = applicants.filter(
    (applicant) => applicant.status === "Pending"
  );

  // Data for the bar chart
  const barChartData = {
    labels: ["Accepted", "Rejected", "Pending"],
    datasets: [
      {
        label: "Applications",
        data: [
          acceptedApplicants.length,
          rejectedApplicants.length,
          pendingApplicants.length,
        ],
        backgroundColor: ["#10B981", "#EF4444", "#3B82F6"],
      },
    ],
  };

  // Data for the pie chart
  const pieChartData = {
    labels: ["Accepted", "Rejected", "Pending"],
    datasets: [
      {
        data: [
          acceptedApplicants.length,
          rejectedApplicants.length,
          pendingApplicants.length,
        ],
        backgroundColor: ["#10B981", "#EF4444", "#3B82F6"],
      },
    ],
  };

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
        className={`fixed top-4 left-4 z-50 p-3 rounded-full ${
          theme === "light" ? "bg-white" : "bg-gray-700"
        } shadow-lg sm:hidden transition-all duration-300 transform hover:scale-105`}
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
        } sm:ml-64 p-8`}
      >
        <Header theme={theme} toggleTheme={toggleTheme} />
        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Applicants", value: applicants.length },
            {
              label: "Accepted Applicants",
              value: acceptedApplicants.length,
              color: "text-green-500",
            },
            {
              label: "Rejected Applicants",
              value: rejectedApplicants.length,
              color: "text-red-500",
            },
            {
              label: "Pending Applicants",
              value: pendingApplicants.length,
              color: "text-blue-500",
            },
          ].map((card, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
                theme === "light"
                  ? "bg-gradient-to-r from-white to-gray-50"
                  : "bg-gradient-to-r from-gray-700 to-gray-800"
              }`}
            >
              <h2 className="text-sm text-gray-500 mb-2">{card.label}</h2>
              <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* All Applicants Table */}
        <div
          className={`p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ${
            theme === "light" ? "bg-white" : "bg-gray-700"
          }`}
        >
          <h2 className="text-sm text-gray-500 mb-4">All Applicants</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="overflow-y-auto" style={{ maxHeight: "60vh" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    {["ID", "Name", "Email", "Resume", "Status", "Actions"].map(
                      (header, idx) => (
                        <th
                          key={idx}
                          className="py-2 text-center text-gray-600"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((applicant) => (
                    <tr
                      key={applicant.id}
                      className={`border-b transition-all duration-300 ${
                        theme === "light"
                          ? "hover:bg-gray-100"
                          : "hover:bg-gray-600"
                      }`}
                    >
                      <td className="py-2">{applicant.id}</td>
                      <td className="py-2">{applicant.name}</td>
                      <td className="py-2">{applicant.email}</td>
                      <td className="py-2 text-center">
                        <a
                          href={`https://crystalsolutions.com.pk/sohaibfyp/upload/${applicant.resume_path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-xs ${
                            theme === "light"
                              ? "bg-[#F58634] text-white hover:bg-[#e5732a]"
                              : "bg-gray-600 text-gray-100 hover:bg-gray-500"
                          } transition-all duration-300`}
                        >
                          <FaFilePdf className="mr-1" /> Resume
                        </a>
                      </td>
                      <td className="py-2 text-center">
                        <span
                          className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-xs ${
                            applicant.status === "Accepted"
                              ? "bg-green-500 text-white"
                              : applicant.status === "Rejected"
                              ? "bg-red-500 text-white"
                              : applicant.status === "Pending"
                              ? "bg-blue-500 text-white"
                              : "bg-orange-500 text-white"
                          }`}
                        >
                          {applicant.status}
                        </span>
                      </td>
                      <td className="py-2 text-center">
                        <div className="flex space-x-2">
                          {["Accepted", "Rejected", "Pending"].map((status) => (
                            <button
                              key={status}
                              onClick={() => updateStatus(applicant.id, status)}
                              className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-xs ${
                                status === "Accepted"
                                  ? "bg-green-500 text-white hover:bg-green-600"
                                  : status === "Rejected"
                                  ? "bg-red-500 text-white hover:bg-red-600"
                                  : "bg-orange-500 text-white hover:bg-orange-600"
                              } transition-all duration-300`}
                            >
                              {status === "Accepted" ? (
                                <FaCheck className="mr-1" />
                              ) : status === "Rejected" ? (
                                <FaTimes className="mr-1" />
                              ) : (
                                <FaChartLine className="mr-1" />
                              )}{" "}
                              {status}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-10 mt-10">
          {/* Bar Chart Card */}
          <div
            className={`p-4 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 h-[300px] overflow-hidden ${
              theme === "light"
                ? "bg-gradient-to-r from-white to-gray-100"
                : "bg-gradient-to-r from-gray-800 to-gray-700"
            }`}
          >
            <h2
              className={`text-md font-semibold mb-2 ${
                theme === "light" ? "text-gray-700" : "text-gray-300"
              }`}
            >
              📊 Applications Overview
            </h2>
            <div className="h-[220px]">
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        font: { size: 12 },
                        color: theme === "light" ? "#333" : "#ccc",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Pie Chart Card */}
          <div
            className={`p-4 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 h-[300px] overflow-hidden ${
              theme === "light"
                ? "bg-gradient-to-r from-white to-gray-100"
                : "bg-gradient-to-r from-gray-800 to-gray-700"
            }`}
          >
            <h2
              className={`text-md font-semibold mb-2 ${
                theme === "light" ? "text-gray-700" : "text-gray-300"
              }`}
            >
              🧩 Applications Distribution
            </h2>
            <div className="h-[220px]">
              <Pie
                data={pieChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        font: { size: 12 },
                        color: theme === "light" ? "#333" : "#ccc",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsScreen;
