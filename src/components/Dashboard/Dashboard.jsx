import React, { useEffect, useState } from "react";
import {
  FaChartLine,
  FaUsers,
  FaProjectDiagram,
  FaBell,
  FaCog,
  FaUserPlus,
  FaCheck,
  FaTimes,
  FaUser,
  FaBars,
  FaFilePdf,
  FaBriefcase, // For New Jobs
  FaUserTie, // For Candidate
} from "react-icons/fa";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [applicants, setApplicants] = useState([]);
  const [theme, setTheme] = useState("light"); // Default theme is light
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  // Fetch applicants from the API
  useEffect(() => {
    const fetchApplicants = async () => {
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
      }
    };

    fetchApplicants();
  }, []);

  // Update application status
  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        "https://crystalsolutions.com.pk/sohaibfyp/update_status.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, status }),
        }
      );
      const data = await response.json();
      if (data.message) {
        // Refresh the list of applicants
        const updatedApplicants = applicants.map((applicant) =>
          applicant.id === id ? { ...applicant, status } : applicant
        );
        setApplicants(updatedApplicants);
      } else {
        console.error(data.error || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Separate accepted and rejected applicants
  const acceptedApplicants = applicants.filter(
    (applicant) => applicant.status === "Accepted"
  );
  const rejectedApplicants = applicants.filter(
    (applicant) => applicant.status === "Rejected"
  );

  // Get the last accepted and rejected applicants
  const lastAccepted = acceptedApplicants[acceptedApplicants.length - 1];
  const lastRejected = rejectedApplicants[rejectedApplicants.length - 1];

  // Sample data for charts
  const hiringTrendsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Hires",
        data: [5, 10, 8, 12, 15, 20],
        borderColor: "#F58634",
        backgroundColor: "rgba(245, 134, 52, 0.2)",
      },
    ],
  };

  const employeeDistributionData = {
    labels: ["Developers", "Designers", "QA", "Managers"],
    datasets: [
      {
        label: "Employees",
        data: [40, 15, 10, 5],
        backgroundColor: "#F58634",
      },
    ],
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Toggle sidebar
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
      {/* Sidebar Toggle Button (Mobile) */}
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
        role="admin" // ya "admin" or "hr"
      />
      {/* Sidebar */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } sm:ml-64 p-8`}
      >
        <Header theme={theme} toggleTheme={toggleTheme} />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Employees", value: "70" },
            { title: "Open Positions", value: "8" },
            { title: "Active Projects", value: "15" },
            { title: "Revenue", value: "$500,000" },
          ].map((card, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
                theme === "light" ? "bg-white" : "bg-gray-700"
              }`}
            >
              <h2 className="text-gray-500">{card.title}</h2>
              <p className="text-2xl font-bold text-[#F58634]">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div
            className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
              theme === "light" ? "bg-white" : "bg-gray-700"
            }`}
          >
            <h2 className="text-gray-500 mb-4">Hiring Trends</h2>
            <Line data={hiringTrendsData} />
          </div>
          <div
            className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
              theme === "light" ? "bg-white" : "bg-gray-700"
            }`}
          >
            <h2 className="text-gray-500 mb-4">Employee Distribution</h2>
            <Bar
              data={employeeDistributionData}
              options={{
                indexAxis: "y", // Horizontal bar chart
              }}
            />
          </div>
        </div>

        {/* Last Accepted and Rejected Applicants */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Last Accepted Applicant */}
          {lastAccepted && (
            <div
              className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
                theme === "light" ? "bg-white" : "bg-gray-700"
              }`}
            >
              <h2 className="text-gray-500 mb-4">Last Accepted Applicant</h2>
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <FaCheck className="text-green-500" />
                </div>
                <div>
                  <p className="font-bold">{lastAccepted.name}</p>
                  <p className="text-sm text-gray-500">{lastAccepted.email}</p>
                  <a
                    href={`https://crystalsolutions.com.pk/sohaibfyp/upload/${lastAccepted.resume_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F58634] hover:underline"
                  >
                    View Resume
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Last Rejected Applicant */}
          {lastRejected && (
            <div
              className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
                theme === "light" ? "bg-white" : "bg-gray-700"
              }`}
            >
              <h2 className="text-gray-500 mb-4">Last Rejected Applicant</h2>
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-red-100 rounded-full">
                  <FaTimes className="text-red-500" />
                </div>
                <div>
                  <p className="font-bold">{lastRejected.name}</p>
                  <p className="text-sm text-gray-500">{lastRejected.email}</p>
                  <a
                    href={`https://crystalsolutions.com.pk/sohaibfyp/upload/${lastRejected.resume_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F58634] hover:underline"
                  >
                    View Resume
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Applicants Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Accepted Applicants */}
          <div
            className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
              theme === "light" ? "bg-white" : "bg-gray-700"
            }`}
          >
            <h2 className="text-gray-500 mb-4">Accepted Applicants</h2>
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">ID</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Resume</th>
                </tr>
              </thead>
              <tbody>
                {acceptedApplicants.map((applicant) => (
                  <tr key={applicant.id} className="border-b">
                    <td className="py-2">{applicant.id}</td>
                    <td className="py-2">{applicant.name}</td>
                    <td className="py-2">{applicant.email}</td>
                    <td className="py-2">
                      <a
                        href={`https://crystalsolutions.com.pk/sohaibfyp/upload/${applicant.resume_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center px-4 py-2 rounded-md ${
                          theme === "light"
                            ? "bg-[#F58634] text-white hover:bg-[#e5732a]"
                            : "bg-gray-600 text-gray-100 hover:bg-gray-500"
                        } transition-all duration-300`}
                      >
                        <FaFilePdf className="mr-2" /> {/* PDF Icon */}
                        Resume
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rejected Applicants */}
          <div
            className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
              theme === "light" ? "bg-white" : "bg-gray-700"
            }`}
          >
            <h2 className="text-gray-500 mb-4">Rejected Applicants</h2>
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">ID</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Resume</th>
                </tr>
              </thead>
              <tbody>
                {rejectedApplicants.map((applicant) => (
                  <tr key={applicant.id} className="border-b">
                    <td className="py-2">{applicant.id}</td>
                    <td className="py-2">{applicant.name}</td>
                    <td className="py-2">{applicant.email}</td>
                    <td className="py-2">
                      <a
                        href={`https://crystalsolutions.com.pk/sohaibfyp/upload/${applicant.resume_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center px-4 py-2 rounded-md ${
                          theme === "light"
                            ? "bg-[#F58634] text-white hover:bg-[#e5732a]"
                            : "bg-gray-600 text-gray-100 hover:bg-gray-500"
                        } transition-all duration-300`}
                      >
                        <FaFilePdf className="mr-2" /> {/* PDF Icon */}
                        Resume
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
