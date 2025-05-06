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
  FaCalendarPlus,
  FaFilter,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Sidebar from "../Sidebar/Sidebar";
import UserHeader from "../UserHeader/UserHeader";
import { useTheme } from "../../ThemeContext";

const AdminInterviewSchedule = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const { getemail } = useTheme();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reschedulingId, setReschedulingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [interviewLevel, setInterviewLevel] = useState(1); // Default to level 1
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'pending', 'confirmed'
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);

        // Create form data
        const formData = new FormData();
        formData.append("level", interviewLevel);

        const response = await fetch(
          "https://crystalsolutions.com.pk/sohaibfyp/applicationfilterbylevel.php",
          {
            method: "POST",
            body: formData, // Send as form-data
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched applications:", data);

        if (data.applicants) {
          const formattedInterviews = data.applicants.map((app) => ({
            id: app.id,
            name: app.name,
            position: app.category,
            date: generateInterviewDate(1),
            time: "10:00 AM",
            duration: "45 minutes",
            type: "Video Call",
            interviewer: "HR Manager",
            interviewer_position: "Human Resources",
            location: "Zoom Meeting",
            meeting_link: "https://zoom.us/j/123456789",
            instructions:
              "Please prepare a brief introduction about yourself and be ready to discuss your experience.",
            status: "Pending",
            application_id: app.id,
            candidate_email: app.email,
            application_status: app.status,
            jobcode: app.jobcode,
            level: app.level,
          }));
          setInterviews(formattedInterviews);
        } else {
          setInterviews([]);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        setInterviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [interviewLevel]);

  // Generate interview date (n days from today)
  const generateInterviewDate = (daysFromNow) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split("T")[0];
  };

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
    const interviewDate = new Date(dateString);
    const today = new Date();
    return interviewDate >= today;
  };

  // Handle reschedule interview
  const handleReschedule = (interviewId) => {
    setInterviews((prevInterviews) =>
      prevInterviews.map((interview) => {
        if (interview.id === interviewId) {
          // Reschedule to 2 days later
          const newDate = generateInterviewDate(2);
          return {
            ...interview,
            date: newDate,
            status: "Rescheduled",
          };
        }
        return interview;
      })
    );

    setReschedulingId(null);
    setSuccessMessage("Interview rescheduled for 2 days later.");

    // Clear success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  // Handle confirm interview
  const handleConfirm = async (interview) => {
    try {
      // Step 1: Save interview details using FormData
      const interviewFormData = new FormData();
      interviewFormData.append("application_id", interview.application_id);
      interviewFormData.append("candidate_email", interview.candidate_email);
      interviewFormData.append("position", interview.position);
      interviewFormData.append("date", interview.date);
      interviewFormData.append("time", interview.time);
      interviewFormData.append("duration", interview.duration);
      interviewFormData.append("type", interview.type);
      interviewFormData.append("interviewer", interview.interviewer);
      interviewFormData.append(
        "interviewer_position",
        interview.interviewer_position
      );
      interviewFormData.append("location", interview.location);
      interviewFormData.append("meeting_link", interview.meeting_link);
      interviewFormData.append("instructions", interview.instructions);
      interviewFormData.append("status", "Confirmed");

      const saveInterviewResponse = await fetch(
        "https://crystalsolutions.com.pk/sohaibfyp/save_interview.php",
        {
          method: "POST",
          body: interviewFormData, // form-data
        }
      );

      if (!saveInterviewResponse.ok) {
        throw new Error(`HTTP error! status: ${saveInterviewResponse.status}`);
      }

      // Step 2: Update application level using FormData
      const newLevel = interviewLevel + 1;
      const updateLevelFormData = new FormData();
      updateLevelFormData.append("application_id", interview.application_id);
      updateLevelFormData.append("level", newLevel);

      const updateLevelResponse = await fetch(
        "https://crystalsolutions.com.pk/sohaibfyp/update_application_level.php",
        {
          method: "POST",
          body: updateLevelFormData,
        }
      );

      if (!updateLevelResponse.ok) {
        throw new Error(`HTTP error! status: ${updateLevelResponse.status}`);
      }

      // Step 3: Update local state
      setInterviews((prevInterviews) =>
        prevInterviews.map((item) =>
          item.id === interview.id
            ? { ...item, status: "Confirmed", level: newLevel }
            : item
        )
      );

      setSuccessMessage(
        `Interview confirmed and application moved to level ${newLevel}!`
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      console.error("Error confirming interview:", error);
      setSuccessMessage("Failed to confirm interview. Please try again.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    }
  };

  // Toggle between level 1 and level 2 applications
  const toggleInterviewLevel = () => {
    setInterviewLevel(interviewLevel === 1 ? 2 : 1);
  };

  // Filter interviews by status
  const filteredInterviews = interviews.filter((interview) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "pending") return interview.status === "Pending";
    if (filterStatus === "confirmed") return interview.status === "Confirmed";
    return true;
  });

  // Get interview type icon
  const getInterviewTypeIcon = (type) => {
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
        role="Admin"
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } sm:ml-64 p-4 md:p-8`}
      >
        <UserHeader theme={theme} toggleTheme={toggleTheme} />

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              theme === "light"
                ? "bg-green-100 text-green-800"
                : "bg-green-700 text-green-100"
            } flex items-center justify-between`}
          >
            <div className="flex items-center">
              <FaCheck className="mr-3" />
              <span>{successMessage}</span>
            </div>
            <button
              onClick={() => setSuccessMessage("")}
              className="text-sm opacity-70 hover:opacity-100"
            >
              Dismiss
            </button>
          </motion.div>
        )}

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
                  Interview Schedule
                </h1>
                <p className="opacity-90">
                  {interviews.length > 0
                    ? `You have ${filteredInterviews.length} interview${
                        filteredInterviews.length > 1 ? "s" : ""
                      } to schedule (Level ${interviewLevel}).`
                    : "No applications available for scheduling."}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={toggleInterviewLevel}
                className={`px-4 py-3 rounded-lg font-medium flex items-center space-x-2 ${
                  theme === "light"
                    ? "bg-white text-[#F58634] hover:bg-gray-100"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                } transition-all duration-300`}
              >
                <span>Level {interviewLevel === 1 ? 2 : 1} Interviews</span>
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 rounded-lg font-medium flex items-center space-x-2 ${
                  theme === "light"
                    ? "bg-white text-[#F58634] hover:bg-gray-100"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                } transition-all duration-300`}
              >
                <FaFilter />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Filter Dropdown */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-lg ${
                theme === "light" ? "bg-white" : "bg-gray-700"
              } shadow-md`}
            >
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={`p-2 rounded border ${
                      theme === "light"
                        ? "bg-white border-gray-300"
                        : "bg-gray-600 border-gray-500"
                    }`}
                  >
                    <option value="all">All Interviews</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
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
              {interviewLevel === 1 ? "Initial Interviews" : "Final Interviews"}
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-xs ${
                theme === "light"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-blue-800 text-blue-100"
              }`}
            >
              {filteredInterviews.length}{" "}
              {filterStatus === "all" ? "Total" : filterStatus}
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
              <p className="mt-4">Loading applications...</p>
            </div>
          ) : filteredInterviews.length > 0 ? (
            <div className="space-y-6">
              {filteredInterviews.map((interview, index) => (
                <motion.div
                  key={interview.id}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className={`p-6 rounded-lg border ${
                    interview.status === "Confirmed"
                      ? theme === "light"
                        ? "border-l-4 border-l-green-500 border-t-gray-200 border-r-gray-200 border-b-gray-200"
                        : "border-l-4 border-l-green-500 border-t-gray-600 border-r-gray-600 border-b-gray-600"
                      : interview.status === "Rescheduled"
                      ? theme === "light"
                        ? "border-l-4 border-l-blue-500 border-t-gray-200 border-r-gray-200 border-b-gray-200"
                        : "border-l-4 border-l-blue-500 border-t-gray-600 border-r-gray-600 border-b-gray-600"
                      : theme === "light"
                      ? "border-l-4 border-l-[#F58634] border-t-gray-200 border-r-gray-200 border-b-gray-200"
                      : "border-l-4 border-l-[#F58634] border-t-gray-600 border-r-gray-600 border-b-gray-600"
                  } ${
                    theme === "light"
                      ? "bg-white hover:shadow-md"
                      : "bg-gray-700 hover:shadow-lg"
                  } transition-all duration-300`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Candidate Info Section */}
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-3 mb-3">
                        <div
                          className={`p-3 rounded-full ${
                            theme === "light" ? "bg-gray-100" : "bg-gray-600"
                          } text-gray-600`}
                        >
                          <FaUserTie size={16} />
                        </div>
                        <div>
                          <h3 className="font-medium">Candidate</h3>
                          <p
                            className={
                              theme === "light"
                                ? "text-gray-600"
                                : "text-gray-300"
                            }
                          >
                            {interview.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {interview.candidate_email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
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
                            {interview.position}
                          </p>
                          {interview.jobcode && (
                            <p className="text-xs text-gray-500 mt-1">
                              Job Code: {interview.jobcode}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

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
                          {interview.status === "Rescheduled" && (
                            <span className="text-xs text-blue-500 font-medium mt-1 block">
                              Rescheduled
                            </span>
                          )}
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
                            {interview.time} ({interview.duration})
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Interview Details Section */}
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-3 mb-3">
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
                            {interview.type}
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
                            {interview.interviewer}
                            <span className="block text-xs mt-1">
                              {interview.interviewer_position}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Meeting Info and Actions */}
                    <div>
                      {interview.type.toLowerCase() === "video call" && (
                        <div
                          className={`p-4 rounded-lg mb-3 ${
                            theme === "light" ? "bg-gray-50" : "bg-gray-600"
                          }`}
                        >
                          <h3 className="font-medium mb-2">Meeting Details</h3>
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
                          {interview.location && (
                            <p className="text-sm">{interview.location}</p>
                          )}
                        </div>
                      )}
                      <div className="flex space-x-2 mt-2">
                        {interview.status === "Pending" ? (
                          <>
                            <button
                              onClick={() => handleConfirm(interview)}
                              className={`flex-1 px-4 py-2 rounded ${
                                theme === "light"
                                  ? "bg-[#F58634] text-white hover:bg-[#E47624]"
                                  : "bg-[#F58634] text-white hover:bg-[#E47624]"
                              } transition-all duration-300 text-sm flex items-center justify-center`}
                            >
                              <FaCheck className="mr-1" /> Confirm
                            </button>
                            <button
                              onClick={() => handleReschedule(interview.id)}
                              className={`flex-1 px-4 py-2 rounded ${
                                theme === "light"
                                  ? "bg-blue-500 text-white hover:bg-blue-600"
                                  : "bg-blue-600 text-white hover:bg-blue-700"
                              } transition-all duration-300 text-sm flex items-center justify-center`}
                            >
                              <FaCalendarPlus className="mr-1" /> Reschedule
                            </button>
                          </>
                        ) : interview.status === "Confirmed" ? (
                          <button
                            className={`flex-1 px-4 py-2 rounded ${
                              theme === "light"
                                ? "bg-green-500 text-white"
                                : "bg-green-600 text-white"
                            } text-sm flex items-center justify-center cursor-default`}
                          >
                            <FaCheck className="mr-1" /> Confirmed
                          </button>
                        ) : (
                          <button
                            onClick={() => handleConfirm(interview)}
                            className={`flex-1 px-4 py-2 rounded ${
                              theme === "light"
                                ? "bg-[#F58634] text-white hover:bg-[#E47624]"
                                : "bg-[#F58634] text-white hover:bg-[#E47624]"
                            } transition-all duration-300 text-sm flex items-center justify-center`}
                          >
                            <FaCheck className="mr-1" /> Confirm Rescheduled
                          </button>
                        )}
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
                No {filterStatus === "all" ? "" : filterStatus} interviews found
                for level {interviewLevel}.
              </p>
              <button
                onClick={() => {
                  setFilterStatus("all");
                  setInterviewLevel(interviewLevel === 1 ? 2 : 1);
                }}
                className={`px-6 py-2 rounded-lg font-medium ${
                  theme === "light"
                    ? "bg-[#F58634] text-white hover:bg-[#e5732a]"
                    : "bg-gray-500 text-white hover:bg-gray-400"
                } transition-all duration-300`}
              >
                View {interviewLevel === 1 ? "Level 2" : "Level 1"} Interviews
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

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default AdminInterviewSchedule;
