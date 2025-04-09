import React from "react";
import { FaBell, FaUser, FaSun, FaMoon } from "react-icons/fa";

const UserHeader = ({ theme, toggleTheme }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <FaBell
          className={`${
            theme === "light" ? "text-gray-600" : "text-gray-400"
          } cursor-pointer hover:text-[#F58634] transition-all duration-300`}
        />
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${
            theme === "light" ? "bg-gray-200" : "bg-gray-700"
          } hover:bg-[#F58634] transition-all duration-300`}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
        <div className="flex items-center space-x-2">
          <div
            className={`p-2 rounded-full ${
              theme === "light" ? "bg-gray-200" : "bg-gray-700"
            } hover:bg-[#F58634] transition-all duration-300`}
          >
            <FaUser
              className={`${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            />
          </div>
          <span>Candidate</span>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
