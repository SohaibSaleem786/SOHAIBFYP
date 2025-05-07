import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUserTie,
  FaVideo,
  FaPhone,
  FaBuilding,
  FaCheck,
  FaBars,
  FaInfoCircle,
  FaBriefcase,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaChartBar,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Sidebar from "../Sidebar/Sidebar";
import UserHeader from "../UserHeader/UserHeader";
import { useTheme } from "../../ThemeContext";
import { FaClipboardList } from "react-icons/fa";

const InterviewEvaluation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showEvaluationForm, setShowEvaluationForm] = useState(false);
  const [currentInterview, setCurrentInterview] = useState(null);
  const [evaluationData, setEvaluationData] = useState({
    technical_skills: 3,
    communication: 3,
    problem_solving: 3,
    cultural_fit: 3,
    overall_rating: 3,
    notes: "",
  });
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    averageRating: 0,
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://crystalsolutions.com.pk/sohaibfyp/getallinterviewschedules.php"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.interviews) {
          setInterviews(data.interviews);
          calculateStats(data.interviews);
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

    fetchInterviews();
  }, []);

  const calculateStats = (interviews) => {
    const total = interviews.length;
    const completed = interviews.filter((i) => i.status === "Evaluated").length;
    const pending = total - completed;

    // Calculate average rating for evaluated interviews
    const evaluated = interviews.filter((i) => i.status === "Evaluated");
    const avgRating =
      evaluated.length > 0
        ? evaluated.reduce((sum, i) => sum + (i.overall_rating || 0), 0) /
          evaluated.length
        : 0;

    setStats({
      total,
      completed,
      pending,
      averageRating: avgRating.toFixed(1),
    });
  };

  const filteredInterviews = interviews.filter((interview) => {
    // Search filter
    const matchesSearch =
      interview.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.candidate_email
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "confirmed" && interview.status === "Confirmed") ||
      (filterStatus === "evaluated" && interview.status === "Evaluated");

    return matchesSearch && matchesStatus;
  });

  const handleEvaluate = (interview) => {
    setCurrentInterview(interview);
    setShowEvaluationForm(true);
  };

  const handleRatingChange = (field, value) => {
    setEvaluationData((prev) => ({
      ...prev,
      [field]: value,
      overall_rating: calculateOverallRating({ ...prev, [field]: value }),
    }));
  };

  const calculateOverallRating = (data) => {
    return Math.round(
      (data.technical_skills +
        data.communication +
        data.problem_solving +
        data.cultural_fit) /
        4
    );
  };

  const handleSubmitEvaluation = async () => {
    try {
      const formData = new FormData();
      formData.append("interview_id", currentInterview.id);
      formData.append("application_id", currentInterview.application_id);
      formData.append("technical_skills", evaluationData.technical_skills);
      formData.append("communication", evaluationData.communication);
      formData.append("problem_solving", evaluationData.problem_solving);
      formData.append("cultural_fit", evaluationData.cultural_fit);
      formData.append("overall_rating", evaluationData.overall_rating);
      formData.append("notes", evaluationData.notes);

      const response = await fetch(
        "https://crystalsolutions.com.pk/sohaibfyp/save_evaluation.php",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Update local state
        const updatedInterviews = interviews.map((i) =>
          i.id === currentInterview.id ? { ...i, status: "Evaluated" } : i
        );
        setInterviews(updatedInterviews);
        calculateStats(updatedInterviews);
        setShowEvaluationForm(false);
      }
    } catch (error) {
      console.error("Error submitting evaluation:", error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }

    return stars;
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
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed top-4 left-4 z-50 p-2 rounded-full ${
          theme === "light" ? "bg-white" : "bg-gray-700"
        } shadow-lg sm:hidden transition-all duration-300 hover:scale-110`}
      >
        <FaBars
          className={`${theme === "light" ? "text-gray-800" : "text-gray-100"}`}
        />
      </button>

      {/* Sidebar */}
      {/* <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      /> */}
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

        {/* Dashboard Header */}
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
                <FaClipboardList size={28} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Interview Evaluations
                </h1>
                <p className="opacity-90">
                  {interviews.length > 0
                    ? `You have ${filteredInterviews.length} interview${
                        filteredInterviews.length > 1 ? "s" : ""
                      } to evaluate`
                    : "No interviews available for evaluation"}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 rounded-lg font-medium flex items-center space-x-2 ${
                  theme === "light"
                    ? "bg-white text-[#F58634] hover:bg-F58634-100"
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
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by position or candidate..."
                    className={`pl-10 pr-4 py-2 w-full rounded-lg border ${
                      theme === "light"
                        ? "bg-white border-gray-300"
                        : "bg-gray-700 border-gray-600"
                    }`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

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
                    <option value="confirmed">Confirmed</option>
                    <option value="evaluated">Evaluated</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div
            className={`p-6 rounded-xl shadow ${
              theme === "light" ? "bg-white" : "bg-gray-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400">
                  Total Interviews
                </p>
                <h3 className="text-2xl font-bold">{stats.total}</h3>
              </div>
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                <FaCalendarAlt size={20} />
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-xl shadow ${
              theme === "light" ? "bg-white" : "bg-gray-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Completed</p>
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.completed}
                </h3>
              </div>
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
                <FaCheck size={20} />
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-xl shadow ${
              theme === "light" ? "bg-white" : "bg-gray-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Pending</p>
                <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {stats.pending}
                </h3>
              </div>
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300">
                <FaClock size={20} />
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-xl shadow ${
              theme === "light" ? "bg-white" : "bg-gray-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Avg. Rating</p>
                <h3 className="text-2xl font-bold flex items-center">
                  {stats.averageRating}
                  <span className="ml-2 flex">
                    {renderStars(parseFloat(stats.averageRating))}
                  </span>
                </h3>
              </div>
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
                <FaStar size={20} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interviews List */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`p-6 rounded-xl shadow-md ${
            theme === "light" ? "bg-white" : "bg-gray-700"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center">
              <FaClipboardList className="mr-2 text-[#F58634]" />
              Interview Evaluations
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
              <p className="mt-4">Loading interviews...</p>
            </div>
          ) : filteredInterviews.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead
                  className={`${
                    theme === "light" ? "bg-gray-50" : "bg-gray-700"
                  }`}
                >
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y divide-gray-200 dark:divide-gray-700 ${
                    theme === "light" ? "bg-white" : "bg-gray-800"
                  }`}
                >
                  {filteredInterviews.map((interview, index) => (
                    <motion.tr
                      key={interview.id}
                      initial="hidden"
                      animate="visible"
                      variants={cardVariants}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                      // className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <FaUserTie className="text-blue-600 dark:text-blue-300" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">
                              {interview.candidate_email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{interview.position}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div>{interview.date_formatted}</div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {interview.time_formatted}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {interview.type === "Video Call" ? (
                            <FaVideo className="text-blue-500 mr-2" />
                          ) : interview.type === "Phone" ? (
                            <FaPhone className="text-green-500 mr-2" />
                          ) : (
                            <FaBuilding className="text-purple-500 mr-2" />
                          )}
                          <span>{interview.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            interview.status === "Confirmed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : interview.status === "Evaluated"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                        >
                          {interview.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {interview.status === "Confirmed" ? (
                          <button
                            onClick={() => handleEvaluate(interview)}
                            className={`px-4 py-2 rounded ${
                              theme === "light"
                                ? "bg-[#F58634] text-white hover:bg-[#E47624]"
                                : "bg-[#F58634] text-white hover:bg-[#E47624]"
                            } transition-all duration-300 text-sm flex items-center justify-center`}
                          >
                            Evaluate
                          </button>
                        ) : interview.status === "Evaluated" ? (
                          <span className="text-green-600 dark:text-green-400">
                            Completed
                          </span>
                        ) : null}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div
              className={`p-8 text-center rounded-lg ${
                theme === "light" ? "bg-gray-50" : "bg-gray-600"
              }`}
            >
              <p className="text-gray-500 mb-4">
                No {filterStatus === "all" ? "" : filterStatus} interviews
                found.
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Evaluation Modal */}
      {showEvaluationForm && currentInterview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full max-w-2xl rounded-xl shadow-lg p-6 ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">Evaluate Interview</h2>
            <p className="mb-6">
              Candidate:{" "}
              <span className="font-semibold">
                {currentInterview.candidate_email}
              </span>
            </p>

            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">
                  Technical Skills
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() =>
                        handleRatingChange("technical_skills", star)
                      }
                      className="text-2xl focus:outline-none"
                    >
                      {star <= evaluationData.technical_skills ? (
                        <FaStar className="text-yellow-500" />
                      ) : (
                        <FaRegStar className="text-yellow-500" />
                      )}
                    </button>
                  ))}
                  <span className="ml-2 text-gray-600 dark:text-gray-300">
                    {evaluationData.technical_skills}/5
                  </span>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">Communication</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingChange("communication", star)}
                      className="text-2xl focus:outline-none"
                    >
                      {star <= evaluationData.communication ? (
                        <FaStar className="text-yellow-500" />
                      ) : (
                        <FaRegStar className="text-yellow-500" />
                      )}
                    </button>
                  ))}
                  <span className="ml-2 text-gray-600 dark:text-gray-300">
                    {evaluationData.communication}/5
                  </span>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Problem Solving
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() =>
                        handleRatingChange("problem_solving", star)
                      }
                      className="text-2xl focus:outline-none"
                    >
                      {star <= evaluationData.problem_solving ? (
                        <FaStar className="text-yellow-500" />
                      ) : (
                        <FaRegStar className="text-yellow-500" />
                      )}
                    </button>
                  ))}
                  <span className="ml-2 text-gray-600 dark:text-gray-300">
                    {evaluationData.problem_solving}/5
                  </span>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">Cultural Fit</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingChange("cultural_fit", star)}
                      className="text-2xl focus:outline-none"
                    >
                      {star <= evaluationData.cultural_fit ? (
                        <FaStar className="text-yellow-500" />
                      ) : (
                        <FaRegStar className="text-yellow-500" />
                      )}
                    </button>
                  ))}
                  <span className="ml-2 text-gray-600 dark:text-gray-300">
                    {evaluationData.cultural_fit}/5
                  </span>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">Overall Rating</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-2xl">
                      {star <= evaluationData.overall_rating ? (
                        <FaStar className="text-yellow-500" />
                      ) : (
                        <FaRegStar className="text-yellow-500" />
                      )}
                    </span>
                  ))}
                  <span className="ml-2 font-semibold">
                    {evaluationData.overall_rating}/5
                  </span>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">Notes</label>
                <textarea
                  className={`w-full p-3 rounded-lg border ${
                    theme === "light"
                      ? "bg-white border-gray-300"
                      : "bg-gray-700 border-gray-600"
                  }`}
                  rows="4"
                  value={evaluationData.notes}
                  onChange={(e) =>
                    setEvaluationData({
                      ...evaluationData,
                      notes: e.target.value,
                    })
                  }
                  placeholder="Add your evaluation notes here..."
                ></textarea>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  onClick={() => setShowEvaluationForm(false)}
                  className={`px-4 py-2 rounded-lg ${
                    theme === "light"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-gray-600 text-white"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitEvaluation}
                  className="px-4 py-2 rounded-lg bg-[#F58634] text-white hover:bg-[#E47624]"
                >
                  Submit Evaluation
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default InterviewEvaluation;
