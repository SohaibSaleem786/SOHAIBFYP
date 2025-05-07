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
  const [timelineData, setTimelineData] = useState([]);
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
          // Generate timeline data based on application status
          generateTimelineData(data.application);
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

  const generateTimelineData = (app) => {
    // Create a timeline based on the current status
    const statusTimeline = [];
    const now = new Date();

    // Always has at least "Applied" status
    statusTimeline.push({
      date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      status: "Applied",
      level: 1,
    });

    // Add other statuses based on current level
    if (app.level >= 2) {
      statusTimeline.push({
        date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        status: "Processing",
        level: 2,
      });
    }

    if (app.level >= 3) {
      statusTimeline.push({
        date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        status: "Under Review",
        level: 3,
      });
    }

    if (
      app.status === "Interview Scheduled" ||
      app.status === "Interview Completed"
    ) {
      statusTimeline.push({
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        status: "Interview Scheduled",
        level: 4,
      });
    }

    if (app.status === "Interview Completed") {
      statusTimeline.push({
        date: new Date(),
        status: "Interview Completed",
        level: 4,
      });
    }

    if (app.status === "Accepted" || app.status === "Rejected") {
      statusTimeline.push({
        date: new Date(),
        status: app.status,
        level: 4,
      });
    }

    setTimelineData(statusTimeline);
  };

  // Status distribution for chart (showing current status)
  const statusDistributionData = {
    labels: ["Current Status", "Other Statuses"],
    datasets: [
      {
        data: [1, 5], // Highlighting the current status
        backgroundColor: [
          getStatusColor(application?.status).includes("green")
            ? "#4BC0C0"
            : getStatusColor(application?.status).includes("red")
            ? "#FF6384"
            : getStatusColor(application?.status).includes("yellow")
            ? "#FFCE56"
            : getStatusColor(application?.status).includes("blue")
            ? "#36A2EB"
            : getStatusColor(application?.status).includes("purple")
            ? "#9966FF"
            : "#4BC0C0", // Default to teal
          theme === "light" ? "#E5E7EB" : "#4B5563",
        ],
        borderColor: theme === "light" ? "#fff" : "#1F2937",
        borderWidth: 2,
      },
    ],
  };

  // Application timeline data based on actual status changes
  const applicationTimelineData = {
    labels: timelineData.map((item, index) =>
      index === timelineData.length - 1
        ? "Now"
        : `${Math.abs(
            Math.round((new Date() - item.date) / (1000 * 60 * 60 * 24))
          )}d ago`
    ),
    datasets: [
      {
        label: "Progress Level",
        data: timelineData.map((item) => item.level),
        borderColor: "#F58634",
        backgroundColor: "rgba(245, 134, 52, 0.2)",
        tension: 0.3,
        fill: true,
        pointBackgroundColor: timelineData.map((item) =>
          item.status === "Accepted"
            ? "#4BC0C0"
            : item.status === "Rejected"
            ? "#FF6384"
            : item.status === "Pending"
            ? "#FFCE56"
            : item.status === "Processing"
            ? "#36A2EB"
            : item.status === "Interview Scheduled"
            ? "#9966FF"
            : "#F58634"
        ),
        pointRadius: 6,
        pointHoverRadius: 8,
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
    scales: {
      y: {
        min: 0,
        max: 4,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            if (value === 1) return "Applied";
            if (value === 2) return "Processing";
            if (value === 3) return "Under Review";
            if (value === 4) return "Interview";
            return "";
          },
        },
      },
    },
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
    switch (status) {
      case "Pending":
        return 1;
      case "Processing":
        return 2;
      case "Accepted":
      case "Rejected":
        return 4;
      case "Interview Scheduled":
        return 3;
      case "Interview Completed":
        return 4;
      default:
        return 1;
    }
  };

  // Get status color

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
                    ? `Your application for ${
                        application.category
                      } is currently ${application.status.toLowerCase()}.`
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
              value: application ? `Level ${application.level}` : "Level 0",
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
              <h2 className="text-lg font-semibold">Your Application Status</h2>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  theme === "light" ? "bg-gray-100" : "bg-gray-600"
                }`}
              >
                Current Status
              </span>
            </div>
            <div className="h-64 flex flex-col items-center justify-center">
              <div className="w-40 h-40 mb-4">
                <Doughnut
                  data={statusDistributionData}
                  options={{
                    ...chartOptions,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        callbacks: {
                          label: function (context) {
                            return context.label === "Current Status"
                              ? application?.status
                              : "Other possible statuses";
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
              <div
                className={`text-lg font-semibold px-4 py-2 rounded-full ${getStatusColor(
                  application?.status
                )}`}
              >
                {application?.status || "No Application"}
              </div>
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
              <h2 className="text-lg font-semibold">
                Your Application Journey
              </h2>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  theme === "light" ? "bg-gray-100" : "bg-gray-600"
                }`}
              >
                Progress Timeline
              </span>
            </div>
            <div className="h-64">
              <Line
                data={applicationTimelineData}
                options={{
                  ...chartOptions,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          const dataIndex = context.dataIndex;
                          return timelineData[dataIndex]?.status || "";
                        },
                      },
                    },
                  },
                }}
              />
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
                      ? "Processing"
                      : step === 3
                      ? "Under Review"
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
                    <h3 className="font-semibold">{application.category}</h3>
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
                        Level {application.level}
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
                    <p className="text-sm text-gray-500">Applicant Name</p>
                    <p>{application.name}</p>
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
                    <p>Level {application.level} of 4</p>
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

        {/* Tips Section based on current status */}
        {application && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-6 rounded-xl shadow-md ${
              theme === "light" ? "bg-white" : "bg-gray-700"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">
              {application.status === "Pending" &&
                "What to Expect While Your Application is Pending"}
              {application.status === "Processing" &&
                "Next Steps in the Hiring Process"}
              {application.status === "Interview Scheduled" &&
                "Preparing for Your Interview"}
              {application.status === "Accepted" &&
                "Congratulations on Your Acceptance!"}
              {application.status === "Rejected" &&
                "Feedback on Your Application"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {application.status === "Pending" && (
                <>
                  <div
                    className={`p-4 rounded-lg ${
                      theme === "light" ? "bg-blue-50" : "bg-gray-600"
                    }`}
                  >
                    <h3 className="font-medium mb-2 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-2">
                        1
                      </span>
                      Typical Review Time
                    </h3>
                    <p className="text-sm text-gray-500">
                      Most applications are reviewed within 5-7 business days.
                      We appreciate your patience.
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
                      Status Updates
                    </h3>
                    <p className="text-sm text-gray-500">
                      You'll receive email notifications when your application
                      status changes.
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
                      While You Wait
                    </h3>
                    <p className="text-sm text-gray-500">
                      Consider preparing for potential next steps like
                      interviews or assessments.
                    </p>
                  </div>
                </>
              )}

              {application.status === "Processing" && (
                <>
                  <div
                    className={`p-4 rounded-lg ${
                      theme === "light" ? "bg-blue-50" : "bg-gray-600"
                    }`}
                  >
                    <h3 className="font-medium mb-2 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-2">
                        1
                      </span>
                      Current Stage
                    </h3>
                    <p className="text-sm text-gray-500">
                      Your application is being reviewed by our hiring team for
                      initial screening.
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
                      Possible Next Steps
                    </h3>
                    <p className="text-sm text-gray-500">
                      If selected, you may be contacted for an interview or
                      additional assessments.
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
                      Timeline
                    </h3>
                    <p className="text-sm text-gray-500">
                      This stage typically takes 3-5 business days. You'll be
                      notified of any updates.
                    </p>
                  </div>
                </>
              )}

              {application.status === "Interview Scheduled" && (
                <>
                  <div
                    className={`p-4 rounded-lg ${
                      theme === "light" ? "bg-blue-50" : "bg-gray-600"
                    }`}
                  >
                    <h3 className="font-medium mb-2 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-2">
                        1
                      </span>
                      Interview Preparation
                    </h3>
                    <p className="text-sm text-gray-500">
                      Research the company and review the job description.
                      Prepare examples of your work.
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
                      Technical Preparation
                    </h3>
                    <p className="text-sm text-gray-500">
                      Review technical concepts relevant to the position. Be
                      ready to discuss your experience.
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
                      Day of Interview
                    </h3>
                    <p className="text-sm text-gray-500">
                      Test your technology beforehand, dress professionally, and
                      join the call early.
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
