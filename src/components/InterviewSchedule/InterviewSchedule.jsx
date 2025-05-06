import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUserTie,
  FaVideo,
  FaPhone,
  FaBuilding,
  FaClipboardList,
  FaCheck,
  FaBars,
  FaChevronRight,
  FaInfoCircle,
  FaBriefcase,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Sidebar from "../Sidebar/Sidebar";
import UserHeader from "../UserHeader/UserHeader";
import { useTheme } from "../../ThemeContext";
import axios from "axios";
import { EmailAccount } from "../../Auth";

const InterviewSchedule = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const { getemail } = useTheme();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const emailaccount = EmailAccount();
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.post(
          "https://crystalsolutions.com.pk/sohaibfyp/get_interview.php",
          new URLSearchParams({ email: getemail || emailaccount }), // send as x-www-form-urlencoded
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const data = response.data;
        console.log("Fetched interviews:", data);

        if (data.status === "success" && data.interviews) {
          const formattedInterviews = data.interviews.map((interview) => ({
            id: interview.id,
            position: interview.position,
            date: interview.date,
            time: interview.time,
            duration: interview.duration,
            type: interview.type,
            interviewer: interview.interviewer,
            interviewer_position: interview.interviewer_position,
            location: interview.location,
            meeting_link: interview.meeting_link,
            instructions: interview.instructions,
            status: interview.status,
            address:
              interview.location && interview.type.toLowerCase() === "in-person"
                ? interview.location
                : null,
          }));

          setInterviews(formattedInterviews);
        } else {
          setInterviews([]);
        }
      } catch (error) {
        console.error("Error fetching interviews:", error);
        setInterviews([]);
      } finally {
        setLoading(false);
      }
    };

    // if (getemail) {
    fetchInterviews();
    // }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Date not specified";
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Check if interview is upcoming
  const isUpcoming = (dateString) => {
    if (!dateString) return false;
    const interviewDate = new Date(dateString);
    const today = new Date();
    return interviewDate >= today;
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Get interview type icon
  const getInterviewTypeIcon = (type) => {
    if (!type) return <FaUserTie />;
    switch (type.toLowerCase()) {
      case "video call":
        return <FaVideo />;
      case "phone":
        return <FaPhone />;
      case "in-person":
        return <FaBuilding />;
      default:
        return <FaUserTie />;
    }
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

        {/* Header Card */}
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
                <FaCalendarAlt size={28} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Your Interview Schedule
                </h1>
                <p className="opacity-90">
                  {interviews.length > 0
                    ? `You have ${interviews.length} interview${
                        interviews.length > 1 ? "s" : ""
                      } scheduled.`
                    : "No interviews are currently scheduled."}
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
              <span>Interview Tips</span>
              <FaChevronRight />
            </button>
          </div>
        </motion.div>

        {/* Upcoming Interviews Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`p-6 rounded-xl shadow-md mb-8 ${
            theme === "light" ? "bg-white" : "bg-gray-700"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center">
              <FaCalendarAlt className="mr-2 text-[#F58634]" />
              Upcoming Interviews
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-xs ${
                theme === "light"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-blue-800 text-blue-100"
              }`}
            >
              {
                interviews.filter((interview) => isUpcoming(interview.date))
                  .length
              }{" "}
              Scheduled
            </span>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div
                className={`animate-spin inline-block w-8 h-8 border-4 rounded-full ${
                  theme === "light"
                    ? "border-gray-300 border-t-[#F58634]"
                    : "border-gray-600 border-t-[#F58634]"
                }`}
              ></div>
              <p className="mt-4">Loading your interviews...</p>
            </div>
          ) : interviews.length > 0 ? (
            <div className="space-y-6">
              {interviews.map((interview, index) => (
                <motion.div
                  key={interview.id}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className={`p-6 rounded-lg border ${
                    isUpcoming(interview.date)
                      ? theme === "light"
                        ? "border-l-4 border-l-[#F58634] border-t-gray-200 border-r-gray-200 border-b-gray-200"
                        : "border-l-4 border-l-[#F58634] border-t-gray-600 border-r-gray-600 border-b-gray-600"
                      : theme === "light"
                      ? "border-gray-200"
                      : "border-gray-600"
                  } ${
                    theme === "light"
                      ? "bg-white hover:shadow-md"
                      : "bg-gray-700 hover:shadow-lg"
                  } transition-all duration-300`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Date and Time Section */}
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-3 mb-3">
                        <div
                          className={`p-3 rounded-full ${
                            theme === "light" ? "bg-orange-100" : "bg-gray-600"
                          } text-[#F58634]`}
                        >
                          <FaCalendarAlt size={16} />
                        </div>
                        <div>
                          <h3 className="font-medium">Date</h3>
                          <p
                            className={
                              theme === "light"
                                ? "text-gray-600"
                                : "text-gray-300"
                            }
                          >
                            {formatDate(interview.date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-3 rounded-full ${
                            theme === "light" ? "bg-blue-100" : "bg-gray-600"
                          } text-blue-500`}
                        >
                          <FaClock size={16} />
                        </div>
                        <div>
                          <h3 className="font-medium">Time</h3>
                          <p
                            className={
                              theme === "light"
                                ? "text-gray-600"
                                : "text-gray-300"
                            }
                          >
                            {interview.time || "Time not specified"}
                            {interview.duration && ` (${interview.duration})`}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Position and Type Section */}
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-3 mb-3">
                        <div
                          className={`p-3 rounded-full ${
                            theme === "light" ? "bg-purple-100" : "bg-gray-600"
                          } text-purple-500`}
                        >
                          <FaBriefcase size={16} />
                        </div>
                        <div>
                          <h3 className="font-medium">Position</h3>
                          <p
                            className={
                              theme === "light"
                                ? "text-gray-600"
                                : "text-gray-300"
                            }
                          >
                            {interview.position || "Position not specified"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-3 rounded-full ${
                            theme === "light" ? "bg-green-100" : "bg-gray-600"
                          } text-green-500`}
                        >
                          {getInterviewTypeIcon(interview.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">Interview Type</h3>
                          <p
                            className={
                              theme === "light"
                                ? "text-gray-600"
                                : "text-gray-300"
                            }
                          >
                            {interview.type || "Type not specified"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Location and Interviewer */}
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-3 mb-3">
                        <div
                          className={`p-3 rounded-full ${
                            theme === "light" ? "bg-red-100" : "bg-gray-600"
                          } text-red-500`}
                        >
                          <FaMapMarkerAlt size={16} />
                        </div>
                        <div>
                          <h3 className="font-medium">Location</h3>
                          <p
                            className={
                              theme === "light"
                                ? "text-gray-600"
                                : "text-gray-300"
                            }
                          >
                            {interview.location || "Location not specified"}
                            {interview.address && (
                              <span className="block text-xs mt-1">
                                {interview.address}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-3 rounded-full ${
                            theme === "light" ? "bg-indigo-100" : "bg-gray-600"
                          } text-indigo-500`}
                        >
                          <FaUserTie size={16} />
                        </div>
                        <div>
                          <h3 className="font-medium">Interviewer</h3>
                          <p
                            className={
                              theme === "light"
                                ? "text-gray-600"
                                : "text-gray-300"
                            }
                          >
                            {interview.interviewer ||
                              "Interviewer not specified"}
                            {interview.interviewer_position && (
                              <span className="block text-xs mt-1">
                                {interview.interviewer_position}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Meeting Info and Actions */}
                    <div>
                      {interview.type &&
                        interview.type.toLowerCase() === "video call" && (
                          <div
                            className={`p-4 rounded-lg mb-3 ${
                              theme === "light" ? "bg-gray-50" : "bg-gray-600"
                            }`}
                          >
                            <h3 className="font-medium mb-2">
                              Meeting Details
                            </h3>
                            {interview.meeting_link && (
                              <a
                                href={interview.meeting_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`block mb-2 ${
                                  theme === "light"
                                    ? "text-blue-600 hover:text-blue-800"
                                    : "text-blue-400 hover:text-blue-300"
                                }`}
                              >
                                Join Meeting
                              </a>
                            )}
                          </div>
                        )}
                      <div className="flex space-x-2 mt-2">
                        <button
                          className={`flex-1 px-4 py-2 rounded ${
                            theme === "light"
                              ? "bg-[#F58634] text-white hover:bg-[#E47624]"
                              : "bg-[#F58634] text-white hover:bg-[#E47624]"
                          } transition-all duration-300 text-sm flex items-center justify-center`}
                        >
                          <FaCheck className="mr-1" /> Confirm
                        </button>
                        <button
                          className={`flex-1 px-4 py-2 rounded ${
                            theme === "light"
                              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              : "bg-gray-600 text-gray-200 hover:bg-gray-500"
                          } transition-all duration-300 text-sm flex items-center justify-center`}
                        >
                          <FaClipboardList className="mr-1" /> Notes
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Interview Instructions */}
                  {interview.instructions && (
                    <div
                      className={`mt-4 pt-4 border-t ${
                        theme === "light"
                          ? "border-gray-200"
                          : "border-gray-600"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <FaInfoCircle
                          className={`mt-1 ${
                            theme === "light"
                              ? "text-blue-500"
                              : "text-blue-400"
                          }`}
                        />
                        <div>
                          <h3 className="font-medium mb-1">Instructions</h3>
                          <p
                            className={`text-sm ${
                              theme === "light"
                                ? "text-gray-600"
                                : "text-gray-300"
                            }`}
                          >
                            {interview.instructions}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div
              className={`p-8 text-center rounded-lg ${
                theme === "light" ? "bg-gray-50" : "bg-gray-600"
              }`}
            >
              <p className="text-gray-500 mb-4">
                You don't have any interviews scheduled at the moment.
              </p>
              <button
                className={`px-6 py-2 rounded-lg font-medium ${
                  theme === "light"
                    ? "bg-[#F58634] text-white hover:bg-[#e5732a]"
                    : "bg-gray-500 text-white hover:bg-gray-400"
                } transition-all duration-300`}
              >
                View Applications
              </button>
            </div>
          )}
        </motion.div>

        {/* Interview Preparation Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`p-6 rounded-xl shadow-md ${
            theme === "light" ? "bg-white" : "bg-gray-700"
          }`}
        >
          <h2 className="text-lg font-semibold mb-4">Interview Preparation</h2>
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
                Research the Company
              </h3>
              <p className="text-sm text-gray-500">
                Learn about the company's mission, values, products, and recent
                news.
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
                Practice Common Questions
              </h3>
              <p className="text-sm text-gray-500">
                Prepare answers to common interview questions specific to your
                field.
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
                Prepare Questions
              </h3>
              <p className="text-sm text-gray-500">
                Have thoughtful questions ready to ask your interviewers about
                the role and company.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InterviewSchedule;
