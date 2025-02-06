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
  const [theme, setTheme] = useState("light"); // Local theme state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Local sidebar state

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

  // Handle categorization
  const handleCategorize = (resumeFile) => {
    const url =
      "https://sohaibsaleem89-resume-categorization-3.hf.space/run/predict";
    const payload = {
      data: [resumeFile],
    };

    console.log("Calling URL:", url);
    console.log("Sending payload:", payload);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        const result = data.data[0];
        console.log("Prediction Result:", result);
      })
      .catch((error) => {
        console.error("Error during prediction:", error);
      });
  };
  // const handleCategorize = async (resumeFile, id) => {
  //   const url =
  //     "https://sohaibsaleem89-resume-categorization-3.hf.space/run/predict";

  //   const formData = new FormData();
  //   formData.append("file", resumeFile);

  //   try {
  //     console.log("Calling URL:", url);
  //     console.log("Sending file:", resumeFile);

  //     const response = await axios.post(url, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     console.log("API Response:", response);

  //     if (response.status === 200) {
  //       const result = response.data.data[0];
  //       console.log("Prediction Result:", result);

  //       // Update the category in the local state
  //       const updatedApplications = applications.map((app) =>
  //         app.id === id ? { ...app, category: result } : app
  //       );
  //       setApplications(updatedApplications);

  //       alert(`Categorization successful! Result: ${result}`);
  //     } else {
  //       console.error("Failed to fetch prediction:", response.status);
  //       alert("Failed to fetch prediction. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error during prediction:",
  //       error.response || error.message
  //     );
  //     alert("Error during prediction. Please check the console for details.");
  //   }
  // };

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
    const category = app.category || "None"; // Default to "None" if category is not set
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Prepare bar chart data
  const barChartData = {
    labels: Object.keys(categoryCounts), // Categories
    datasets: [
      {
        label: "Number of Applications",
        data: Object.values(categoryCounts), // Counts
        backgroundColor: "#F58634", // Customize the bar color
      },
    ],
  };

  // Prepare line chart data (example: trends over time)
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Example timeline
    datasets: [
      {
        label: "Applications Over Time",
        data: [5, 10, 8, 12, 15, 20], // Example data
        borderColor: "#F58634",
        backgroundColor: "rgba(245, 134, 52, 0.2)",
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow charts to resize
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
    return <div>Loading applications...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
      />
      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } sm:ml-64 p-8`}
      >
        <Header theme={theme} toggleTheme={toggleTheme} />

        {/* Applications Table */}
        <div
          className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
            theme === "light" ? "bg-white" : "bg-gray-700"
          } mb-4`}
        >
          <h2 className="text-gray-500 mb-2 text-sm">Applications</h2>
          <div className="max-h-[400px] overflow-auto">
            {" "}
            {/* Fixed height with scrollbar */}
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-1">ID</th>
                  <th className="py-1">Name</th>
                  <th className="py-1">Email</th>
                  <th className="py-1">Category</th>
                  <th className="py-1">Resume</th>
                  <th className="py-1">Categorize</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.id} className="border-b">
                    <td className="py-1">{application.id}</td>
                    <td className="py-1">{application.name}</td>
                    <td className="py-1">{application.email}</td>
                    <td className="py-1">{application.category || "N/A"}</td>
                    <td className="py-1">
                      <a
                        href={`https://crystalsolutions.com.pk/sohaibfyp/upload/${application.resume_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center px-2 py-1 rounded-md text-xs ${
                          theme === "light"
                            ? "bg-[#F58634] text-white hover:bg-[#e5732a]"
                            : "bg-gray-600 text-gray-100 hover:bg-gray-500"
                        } transition-all duration-300`}
                      >
                        <FaFilePdf className="mr-1" /> View
                      </a>
                    </td>
                    <td className="py-1">
                      <button
                        onClick={() =>
                          handleCategorize(
                            `https://crystalsolutions.com.pk/sohaibfyp/upload/${application.resume_path}`,
                            application.id
                          )
                        }
                        className={`inline-flex items-center justify-center px-2 py-1 rounded-md text-xs ${
                          theme === "light"
                            ? "bg-[#F58634] text-white hover:bg-[#e5732a]"
                            : "bg-gray-600 text-gray-100 hover:bg-gray-500"
                        } transition-all duration-300`}
                      >
                        Categorize
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Bar Chart */}
          <div
            className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
              theme === "light" ? "bg-white" : "bg-gray-700"
            }`}
          >
            <h2 className="text-gray-500 mb-2 text-sm">
              Category Distribution
            </h2>
            <div className="h-40">
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div>

          {/* Line Chart */}
          <div
            className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
              theme === "light" ? "bg-white" : "bg-gray-700"
            }`}
          >
            <h2 className="text-gray-500 mb-2 text-sm">
              Applications Over Time
            </h2>
            <div className="h-40">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCategorization;
