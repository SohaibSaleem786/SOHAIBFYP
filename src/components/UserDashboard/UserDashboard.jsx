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
  const [applications, setApplications] = useState([]);
  const [theme, setTheme] = useState("light");
  const { getemail } = useTheme();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [candidateEmail, setCandidateEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch applications for the specific candidate
  useEffect(() => {
    const loggedInEmail = getemail;

    const fetchApplications = async () => {
      try {
        const response = await fetch(
          "https://crystalsolutions.com.pk/sohaibfyp/userdashboard.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: loggedInEmail }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data", data);

        if (data.applications) {
          setApplications(data.applications);
          setCandidateEmail(loggedInEmail);
        } else {
          console.error(data.error || "Failed to fetch applications.");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        // You might want to set some error state here to show to the user
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

  // Group applications by status
  const statusGroups = {
    Pending: filteredApplications.filter((app) => app.status === "Pending"),
    Processing: filteredApplications.filter(
      (app) => app.status === "Processing"
    ),
    Accepted: filteredApplications.filter((app) => app.status === "Accepted"),
    Rejected: filteredApplications.filter((app) => app.status === "Rejected"),
    "Interview Scheduled": filteredApplications.filter(
      (app) => app.status === "Interview Scheduled"
    ),
    "Interview Completed": filteredApplications.filter(
      (app) => app.status === "Interview Completed"
    ),
  };

  // Status distribution for chart
  const statusDistributionData = {
    labels: Object.keys(statusGroups),
    datasets: [
      {
        data: Object.values(statusGroups).map((group) => group.length),
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

  // Application timeline data
  const applicationTimelineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Applications",
        data: [1, 3, 2, 5, 4, 7],
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
                  {applications.length > 0
                    ? `You have ${applications.length} active applications. Keep it up!`
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

        {/* Search Bar */}
        <div className="mb-8 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full p-4 pl-12 rounded-xl shadow-sm ${
                theme === "light"
                  ? "bg-white border border-gray-200"
                  : "bg-gray-700 border border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-[#F58634] transition-all duration-300`}
            />
            <FaSearch
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                theme === "light" ? "text-gray-400" : "text-gray-300"
              }`}
            />
          </div>
        </div>

        {/* Application Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Applications",
              value: filteredApplications.length,
              icon: <FaBriefcase size={20} />,
              color: "text-[#F58634]",
              bg: "bg-orange-50",
              darkBg: "bg-gray-700",
            },
            {
              title: "Pending Review",
              value: statusGroups.Pending.length,
              icon: <FaClock size={20} />,
              color: "text-yellow-500",
              bg: "bg-yellow-50",
              darkBg: "bg-gray-700",
            },
            {
              title: "In Progress",
              value:
                statusGroups.Accepted.length +
                statusGroups["Interview Scheduled"].length +
                statusGroups["Interview Completed"].length,
              icon: <FaCheck size={20} />,
              color: "text-green-500",
              bg: "bg-green-50",
              darkBg: "bg-gray-700",
            },
            {
              title: "Not Selected",
              value: statusGroups.Rejected.length,
              icon: <FaTimes size={20} />,
              color: "text-red-500",
              bg: "bg-red-50",
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
                  <p className="text-3xl font-bold mt-2">{card.value}</p>
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
            Your Application Pipeline
          </h2>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      applications.some(
                        (app) => getCurrentLevel(app.status) >= step
                      )
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
                  width: `${Math.min(
                    (applications.filter(
                      (app) => getCurrentLevel(app.status) > 0
                    ).length /
                      Math.max(applications.length, 1)) *
                      100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <motion.div
                  key={app.id}
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
                        {getStatusIcon(app.status)}
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {app.jobcode} - {app.category}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                              app.status
                            )}`}
                          >
                            {app.status}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              theme === "light"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-gray-600 text-gray-100"
                            }`}
                          >
                            Level {getCurrentLevel(app.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex space-x-3">
                      <a
                        href={`https://crystalsolutions.com.pk/sohaibfyp/upload/${app.resume_path}`}
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
                      {app.status === "Interview Scheduled" && (
                        <button
                          className={`inline-flex items-center px-4 py-2 rounded-lg text-sm ${
                            theme === "light"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                              : "bg-blue-900 text-blue-100 hover:bg-blue-800"
                          } transition-all duration-300`}
                        >
                          <FaCalendarAlt className="mr-2" />
                          View Details
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Interview details if scheduled */}
                  {app.status === "Interview Scheduled" &&
                    app.interview_date && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-medium mb-2">
                          Interview Scheduled
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="flex items-center">
                            <FaCalendarAlt
                              className={`mr-3 ${
                                theme === "light"
                                  ? "text-gray-500"
                                  : "text-gray-300"
                              }`}
                            />
                            <div>
                              <p className="text-xs text-gray-500">Date</p>
                              <p>
                                {new Date(
                                  app.interview_date
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FaClock
                              className={`mr-3 ${
                                theme === "light"
                                  ? "text-gray-500"
                                  : "text-gray-300"
                              }`}
                            />
                            <div>
                              <p className="text-xs text-gray-500">Time</p>
                              <p>{app.interview_time}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FaMapMarkerAlt
                              className={`mr-3 ${
                                theme === "light"
                                  ? "text-gray-500"
                                  : "text-gray-300"
                              }`}
                            />
                            <div>
                              <p className="text-xs text-gray-500">Location</p>
                              <p>{app.interview_location || "Online"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </motion.div>
              ))
            ) : (
              <div
                className={`p-8 text-center rounded-lg ${
                  theme === "light" ? "bg-gray-50" : "bg-gray-600"
                }`}
              >
                <p className="text-gray-500">
                  {searchTerm
                    ? "No applications match your search."
                    : "You haven't submitted any applications yet."}
                </p>
                {!searchTerm && (
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
          </div>
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
