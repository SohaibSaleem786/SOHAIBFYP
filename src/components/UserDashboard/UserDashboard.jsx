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
  FaBriefcase,
  FaUserTie,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaClipboardCheck,
  FaSearch,
  FaArrowRight,
  FaRegSmile,
  FaRegFrown,
  FaRegMeh,
} from "react-icons/fa";
import { Line, Bar, Doughnut } from "react-chartjs-2";
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
  ArcElement,
} from "chart.js";
import Sidebar from "../Sidebar/Sidebar";
import UserHeader from "../UserHeader/UserHeader";
import { motion } from "framer-motion";
import { useTheme } from "../../ThemeContext";
import { EmailAccount } from "../../Auth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const UserDashboard = () => {
  const [application, setApplication] = useState(null);
  const [theme, setTheme] = useState("light");
  const { getemail } = useTheme();
  const emailaccount = EmailAccount();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [candidateEmail, setCandidateEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInEmail = getemail || emailaccount;

    const fetchApplication = async () => {
      try {
        const response = await fetch(
          "https://crystalsolutions.com.pk/sohaibfyp/userdashboard.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `email=${encodeURIComponent(emailaccount || getemail)}`,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched application:", data);

        if (data.application) {
          setApplication(data.application);
        } else if (data.error) {
          console.error(data.error);
        }
        setCandidateEmail(loggedInEmail);
      } catch (error) {
        console.error("Error fetching application:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, []);

  // Status distribution for chart (simplified since we only have one application)
  const statusDistributionData = {
    labels: [
      "Pending",
      "Processing",
      "Accepted",
      "Rejected",
      "Interview Scheduled",
      "Interview Completed",
    ],
    datasets: [
      {
        data: [
          application?.status === "Pending" ? 1 : 0,
          application?.status === "Processing" ? 1 : 0,
          application?.status === "Accepted" ? 1 : 0,
          application?.status === "Rejected" ? 1 : 0,
          application?.status === "Interview Scheduled" ? 1 : 0,
          application?.status === "Interview Completed" ? 1 : 0,
        ],
        backgroundColor: [
          "#FFCE56", // Pending - yellow
          "#36A2EB", // Processing - blue
          "#4BC0C0", // Accepted - teal
          "#FF6384", // Rejected - red
          "#9966FF", // Interview Scheduled - purple
          "#FF9F40", // Interview Completed - orange
        ],
        borderColor: theme === "light" ? "#fff" : "#1F2937",
        borderWidth: 2,
      },
    ],
  };

  // Application timeline data (mock data)
  const applicationTimelineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Applications",
        data: [0, 0, 0, 1, 0, 0], // Assuming one application in April
        borderColor: "#F58634",
        backgroundColor: "rgba(245, 134, 52, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: theme === "light" ? "#374151" : "#F3F4F6",
          font: {
            size: 12,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Get current level based on status
  const getCurrentLevel = (status) => {
    // If you're using the level from API, this function might not be needed
    // But keeping it for backward compatibility
    switch (status) {
      case "Pending":
        return 1;
      case "Processing":
        return 1;
      case "Accepted":
        return 2;
      case "Interview Scheduled":
        return 3;
      case "Interview Completed":
        return 4;
      case "Rejected":
        return 0;
      default:
        return 1;
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Interview Scheduled":
        return "bg-purple-100 text-purple-800";
      case "Interview Completed":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted":
        return <FaRegSmile className="text-green-500" />;
      case "Rejected":
        return <FaRegFrown className="text-red-500" />;
      case "Pending":
      case "Processing":
        return <FaRegMeh className="text-yellow-500" />;
      default:
        return <FaRegSmile className="text-blue-500" />;
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className={`min-h-screen flex ${
        theme === "light"
          ? "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800"
          : "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
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
        role="candidate"
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } sm:ml-64 p-4 md:p-8`}
      >
        <UserHeader theme={theme} toggleTheme={toggleTheme} />

        {/* Welcome Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.5 }}
          className={`p-6 rounded-xl shadow-lg mb-8 bg-gradient-to-r ${
            theme === "light"
              ? "from-[#F58634] to-[#FFA726] text-white"
              : "from-gray-800 to-gray-700"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="p-4 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                <FaUserTie size={28} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Welcome Back, Candidate!
                </h1>
                <p className="opacity-90">
                  {application
                    ? `You have an active application for ${application.category}.`
                    : "Start your job search by applying to exciting opportunities."}
                </p>
              </div>
            </div>
            <button
              className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 ${
                theme === "light"
                  ? "bg-white text-[#F58634] hover:bg-gray-100"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              } transition-all duration-300`}
            >
              <span>View Job Openings</span>
              <FaArrowRight />
            </button>
          </div>
        </motion.div>

        {/* Application Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Applications",
              value: application ? 1 : 0,
              icon: <FaBriefcase size={20} />,
              color: "text-[#F58634]",
              bg: "bg-orange-50",
              darkBg: "bg-gray-700",
            },
            {
              title: "Application Status",
              value: application ? application.status : "None",
              icon: <FaClipboardCheck size={20} />,
              color: "text-blue-500",
              bg: "bg-blue-50",
              darkBg: "bg-gray-700",
            },
            {
              title: "Current Level",
              value: application
                ? `Level ${getCurrentLevel(application.status)}`
                : "Level 0",
              icon: <FaChartLine size={20} />,
              color: "text-green-500",
              bg: "bg-green-50",
              darkBg: "bg-gray-700",
            },
            {
              title: "Position Applied",
              value: application ? application.category : "None",
              icon: <FaUserTie size={20} />,
              color: "text-purple-500",
              bg: "bg-purple-50",
              darkBg: "bg-gray-700",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${
                theme === "light" ? card.bg : card.darkBg
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2
                    className={`text-sm font-medium ${
                      theme === "light" ? "text-gray-500" : "text-gray-300"
                    }`}
                  >
                    {card.title}
                  </h2>
                  <p className="text-2xl font-bold mt-2">{card.value}</p>
                </div>
                <div
                  className={`p-3 rounded-full ${
                    theme === "light" ? "bg-white" : "bg-gray-600"
                  } ${card.color}`}
                >
                  {card.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Application Status Distribution */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${
              theme === "light" ? "bg-white" : "bg-gray-700"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Application Status</h2>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  theme === "light" ? "bg-gray-100" : "bg-gray-600"
                }`}
              >
                Overview
              </span>
            </div>
            <div className="h-64">
              <Doughnut data={statusDistributionData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Application Timeline */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${
              theme === "light" ? "bg-white" : "bg-gray-700"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your Activity</h2>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  theme === "light" ? "bg-gray-100" : "bg-gray-600"
                }`}
              >
                Last 6 Months
              </span>
            </div>
            <div className="h-64">
              <Line data={applicationTimelineData} options={chartOptions} />
            </div>
          </motion.div>
        </div>

        {/* Application Progress Pipeline */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.5 }}
          className={`p-6 rounded-xl shadow-md mb-8 ${
            theme === "light" ? "bg-white" : "bg-gray-700"
          }`}
        >
          <h2 className="text-lg font-semibold mb-6">
            Your Application Progress
          </h2>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      application && parseInt(application.level) >= step
                        ? "bg-[#F58634] text-white"
                        : theme === "light"
                        ? "bg-gray-200 text-gray-400"
                        : "bg-gray-600 text-gray-300"
                    }`}
                  >
                    {step}
                  </div>
                  <span
                    className={`text-xs mt-2 ${
                      theme === "light" ? "text-gray-500" : "text-gray-300"
                    }`}
                  >
                    {step === 1
                      ? "Applied"
                      : step === 2
                      ? "Under Review"
                      : step === 3
                      ? "Interview"
                      : "Decision"}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative h-2 w-full">
              <div
                className={`absolute top-0 left-0 h-full rounded-full ${
                  theme === "light" ? "bg-gray-200" : "bg-gray-600"
                }`}
                style={{ width: "100%" }}
              ></div>
              <div
                className={`absolute top-0 left-0 h-full rounded-full bg-[#F58634] transition-all duration-1000`}
                style={{
                  width: `${
                    application ? (parseInt(application.level) / 4) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Application Details */}
          {application ? (
            <motion.div
              whileHover={{ y: -5 }}
              className={`p-5 rounded-lg border transition-all duration-300 ${
                theme === "light"
                  ? "bg-white border-gray-200 hover:shadow-md"
                  : "bg-gray-700 border-gray-600 hover:shadow-lg"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-full ${
                      theme === "light" ? "bg-gray-100" : "bg-gray-600"
                    }`}
                  >
                    {getStatusIcon(application.status)}
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {application.jobcode ? `${application.jobcode} - ` : ""}
                      {application.category}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          theme === "light"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-gray-600 text-gray-100"
                        }`}
                      >
                        Level {getCurrentLevel(application.status)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <a
                    href={`https://crystalsolutions.com.pk/sohaibfyp/upload/${application.resume_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm ${
                      theme === "light"
                        ? "bg-[#F58634] text-white hover:bg-[#e5732a]"
                        : "bg-gray-600 text-gray-100 hover:bg-gray-500"
                    } transition-all duration-300`}
                  >
                    <FaFilePdf className="mr-2" />
                    View Resume
                  </a>
                </div>
              </div>

              {/* Additional details */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Applied On</p>
                    <p>April 2023</p>{" "}
                    {/* You might want to add application date to your API */}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Position</p>
                    <p>{application.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Status</p>
                    <p className="font-medium">{application.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Progress Level</p>
                    <p>Level {getCurrentLevel(application.status)} of 4</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div
              className={`p-8 text-center rounded-lg ${
                theme === "light" ? "bg-gray-50" : "bg-gray-600"
              }`}
            >
              <p className="text-gray-500">
                {loading
                  ? "Loading your application..."
                  : "You haven't submitted any applications yet."}
              </p>
              {!loading && (
                <button
                  className={`mt-4 px-6 py-2 rounded-lg font-medium ${
                    theme === "light"
                      ? "bg-[#F58634] text-white hover:bg-[#e5732a]"
                      : "bg-gray-500 text-white hover:bg-gray-400"
                  } transition-all duration-300`}
                >
                  Browse Jobs
                </button>
              )}
            </div>
          )}
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`p-6 rounded-xl shadow-md ${
            theme === "light" ? "bg-white" : "bg-gray-700"
          }`}
        >
          <h2 className="text-lg font-semibold mb-4">Job Search Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={`p-4 rounded-lg ${
                theme === "light" ? "bg-blue-50" : "bg-gray-600"
              }`}
            >
              <h3 className="font-medium mb-2 flex items-center">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-2">
                  1
                </span>
                Tailor Your Resume
              </h3>
              <p className="text-sm text-gray-500">
                Customize your resume for each job application to highlight
                relevant skills.
              </p>
            </div>
            <div
              className={`p-4 rounded-lg ${
                theme === "light" ? "bg-purple-50" : "bg-gray-600"
              }`}
            >
              <h3 className="font-medium mb-2 flex items-center">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center mr-2">
                  2
                </span>
                Follow Up
              </h3>
              <p className="text-sm text-gray-500">
                Send a thank-you email after interviews and follow up if you
                haven't heard back.
              </p>
            </div>
            <div
              className={`p-4 rounded-lg ${
                theme === "light" ? "bg-green-50" : "bg-gray-600"
              }`}
            >
              <h3 className="font-medium mb-2 flex items-center">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center mr-2">
                  3
                </span>
                Build Network
              </h3>
              <p className="text-sm text-gray-500">
                Connect with professionals in your field to discover new
                opportunities.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
