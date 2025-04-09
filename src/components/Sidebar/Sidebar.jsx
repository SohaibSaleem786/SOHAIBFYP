import React from "react";
import {
  FaChartLine,
  FaUsers,
  FaProjectDiagram,
  FaUserPlus,
  FaFilePdf,
  FaBriefcase,
  FaUserTie,
  FaCog,
} from "react-icons/fa";

const Sidebar = ({ theme, isSidebarOpen, toggleSidebar, role }) => {
  const isCandidate = role === "candidate";

  return (
    <div
      className={`${
        theme === "light" ? "bg-[#F58634]" : "bg-gray-900"
      } text-white w-64 p-6 shadow-lg fixed h-screen transform transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-64"
      } sm:translate-x-0`}
    >
      <h1 className="text-1xl font-bold mb-8">CRYSTAL SOLUTIONS</h1>
      <nav>
        <ul className="space-y-4">
          {/* Candidate-specific Menu */}
          {isCandidate ? (
            <>
              <li>
                <a
                  href="UserDashboard"
                  className="flex items-center space-x-2 hover:bg-[#e5732a] p-2 rounded transition-all duration-300"
                >
                  <FaChartLine />
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="MyJobs"
                  className="flex items-center space-x-2 hover:bg-[#e5732a] p-2 rounded transition-all duration-300"
                >
                  <FaBriefcase />
                  <span>My Jobs</span>
                </a>
              </li>
              <li>
                <a
                  href="MyResume"
                  className="flex items-center space-x-2 hover:bg-[#e5732a] p-2 rounded transition-all duration-300"
                >
                  <FaFilePdf />
                  <span>My Resume</span>
                </a>
              </li>
              <li>
                <a
                  href="ProfileSettings"
                  className="flex items-center space-x-2 hover:bg-[#e5732a] p-2 rounded transition-all duration-300"
                >
                  <FaUserTie />
                  <span>Profile Settings</span>
                </a>
              </li>
            </>
          ) : (
            <>
              {/* Admin/HR menu */}
              <li>
                <a
                  href="Dashboard"
                  className="flex items-center space-x-2 hover:bg-[#e5732a] p-2 rounded transition-all duration-300"
                >
                  <FaChartLine />
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="applications"
                  className="flex items-center space-x-2 hover:bg-[#e5732a] p-2 rounded transition-all duration-300"
                >
                  <FaUserPlus />
                  <span>Total Application</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-2 hover:bg-[#e5732a] p-2 rounded transition-all duration-300"
                >
                  <FaUsers />
                  <span>Total Employees</span>
                </a>
              </li>
              <li>
                <a
                  href="JobScreen"
                  className="flex items-center space-x-2 hover:bg-[#e5732a] p-2 rounded transition-all duration-300"
                >
                  <FaBriefcase />
                  <span>New Jobs</span>
                </a>
              </li>
              <li>
                <a
                  href="ResumeCategorization"
                  className="flex items-center space-x-2 hover:bg-[#e5732a] p-2 rounded transition-all duration-300"
                >
                  <FaFilePdf />
                  <span>Resume Categorization</span>
                </a>
              </li>
              <li>
                <a
                  href="Candidate"
                  className="flex items-center space-x-2 hover:bg-[#e5732a] p-2 rounded transition-all duration-300"
                >
                  <FaUserTie />
                  <span>Candidate</span>
                </a>
              </li>
              <li>
                <a
                  href="Projects"
                  className="flex items-center space-x-2 hover:bg-[#e5732a] p-2 rounded transition-all duration-300"
                >
                  <FaProjectDiagram />
                  <span>Projects</span>
                </a>
              </li>
              <li>
                <a
                  href="Settings"
                  className="flex items-center space-x-2 hover:bg-[#e5732a] p-2 rounded transition-all duration-300"
                >
                  <FaCog />
                  <span>Settings</span>
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
