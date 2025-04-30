import React, { useEffect, useState } from "react";
import {
  FaBell,
  FaUser,
  FaSun,
  FaMoon,
  FaTimes,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useTheme } from "../../ThemeContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ theme, toggleTheme, userEmail }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { getemail } = useTheme();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!getemail) return;

      try {
        const response = await fetch(
          `https://crystalsolutions.com.pk/sohaibfyp/getuser.php`
        );
        const data = await response.json();

        if (data.user) {
          const matchedUser = data.user.find((user) => user.email === getemail);

          if (matchedUser) {
            setCurrentUser({
              name: matchedUser.name || matchedUser.email,
              email: matchedUser.email,
              status: matchedUser.status
                ? matchedUser.status === "A"
                  ? "Admin"
                  : matchedUser.status === "C"
                  ? "Customer"
                  : "User"
                : "User",
              password: matchedUser.password,
              avatar:
                matchedUser.avatar ||
                `https://ui-avatars.com/api/?name=${
                  matchedUser.name || matchedUser.email
                }&background=random`,
            });
          } else {
            setCurrentUser({
              name: getemail,
              status: "User",
              email: getemail,
              avatar: `https://ui-avatars.com/api/?name=${getemail}&background=random`,
            });
          }
        } else {
          setCurrentUser({
            name: getemail,
            status: "User",
            email: getemail,
            avatar: `https://ui-avatars.com/api/?name=${getemail}&background=random`,
          });
        }
      } catch (error) {
        setCurrentUser({
          name: getemail,
          status: "User",
          email: getemail,
          avatar: `https://ui-avatars.com/api/?name=${getemail}&background=random`,
        });
      }
    };

    fetchUserData();

    // Mock notifications - replace with real data
    setNotifications([
      {
        id: 1,
        title: "Welcome to the dashboard",
        time: "2 hours ago",
        read: false,
      },
      { id: 2, title: "New update available", time: "1 day ago", read: true },
      {
        id: 3,
        title: "Your profile is incomplete",
        time: "3 days ago",
        read: true,
      },
    ]);
  }, [getemail]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!currentUser?.email) {
      toast.error("User email not found");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsChangingPassword(true);

    try {
      const data = {
        email: currentUser.email,
        new_password: newPassword,
      };

      const response = await axios.post(
        "https://crystalsolutions.com.pk/sohaibfyp/forgetpassword.php",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { status, message } = response.data;

      if (status === "success") {
        toast.success(message);
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(message || "Password update failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <header
      style={{ marginTop: "-20px", marginBottom: "20px" }}
      className={`sticky  ${
        theme === "light" ? "bg-white" : "bg-gray-800"
      } shadow-md transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Dashboard title */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>

          {/* Right side - Icons and user */}
          <div className="flex items-center space-x-4">
            {/* Notification bell with badge */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-full ${
                  theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-700"
                } transition-colors duration-200 relative`}
              >
                <FaBell
                  className={`text-lg ${
                    theme === "light" ? "text-gray-600" : "text-gray-300"
                  }`}
                />
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {/* Notification dropdown */}
              {showNotifications && (
                <div
                  className={`absolute right-0 mt-2 w-72 rounded-md shadow-lg ${
                    theme === "light" ? "bg-white" : "bg-gray-700"
                  } ring-1 ring-black ring-opacity-5 z-50`}
                >
                  <div
                    className={`p-2 border-b ${
                      theme === "light" ? "border-gray-200" : "border-gray-600"
                    }`}
                  >
                    <p className="font-medium">Notifications</p>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 ${
                            !notification.read
                              ? theme === "light"
                                ? "bg-blue-50"
                                : "bg-blue-900"
                              : ""
                          } ${
                            theme === "light"
                              ? "hover:bg-gray-50"
                              : "hover:bg-gray-600"
                          } border-b ${
                            theme === "light"
                              ? "border-gray-100"
                              : "border-gray-600"
                          }`}
                        >
                          <p className="font-medium">{notification.title}</p>
                          <p
                            className={`text-xs ${
                              theme === "light"
                                ? "text-gray-500"
                                : "text-gray-300"
                            }`}
                          >
                            {notification.time}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No notifications
                      </div>
                    )}
                  </div>
                  <div
                    className={`p-2 ${
                      theme === "light" ? "bg-gray-50" : "bg-gray-600"
                    } text-center`}
                  >
                    <button className="text-sm text-blue-500 hover:text-blue-700">
                      View all
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === "light"
                  ? "bg-gray-100 hover:bg-gray-200"
                  : "bg-gray-700 hover:bg-gray-600"
              } transition-colors duration-200`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <FaMoon className="text-gray-600" />
              ) : (
                <FaSun className="text-yellow-300" />
              )}
            </button>

            {/* User profile */}
            <div className="relative">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      theme === "light" ? "bg-gray-200" : "bg-gray-600"
                    }`}
                  >
                    <FaUser
                      className={
                        theme === "light" ? "text-gray-600" : "text-gray-300"
                      }
                    />
                  </div>
                )}
                <div className="text-left hidden md:block">
                  <p
                    className={`font-medium ${
                      theme === "light" ? "text-gray-800" : "text-white"
                    }`}
                  >
                    {currentUser?.name || "Loading..."}
                  </p>
                  <p
                    className={`text-xs ${
                      theme === "light" ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {currentUser?.status || "Loading..."}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Info Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
          <div
            className={`relative p-6 rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ${
              showModal ? "scale-100 opacity-100" : "scale-95 opacity-0"
            } ${theme === "light" ? "bg-white" : "bg-gray-800"}`}
          >
            <button
              onClick={() => setShowModal(false)}
              className={`absolute top-4 right-4 p-1 rounded-full ${
                theme === "light" ? "hover:bg-gray-200" : "hover:bg-gray-700"
              } transition-colors duration-200`}
            >
              <FaTimes
                className={`${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}
              />
            </button>

            <div className="flex items-center space-x-4 mb-6">
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="User avatar"
                  className="w-16 h-16 rounded-full object-cover border-2 border-orange-400"
                />
              ) : (
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    theme === "light" ? "bg-gray-200" : "bg-gray-600"
                  }`}
                >
                  <FaUser
                    className={`text-2xl ${
                      theme === "light" ? "text-gray-600" : "text-gray-300"
                    }`}
                  />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold">
                  {currentUser?.name || "N/A"}
                </h2>
                <p
                  className={`text-sm ${
                    theme === "light" ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {currentUser?.status || "N/A"}
                </p>
              </div>
            </div>

            <div
              className={`space-y-4 mb-6 p-4 rounded-lg ${
                theme === "light" ? "bg-gray-50" : "bg-gray-700"
              }`}
            >
              <div>
                <p
                  className={`text-sm font-medium ${
                    theme === "light" ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Email
                </p>
                <p className="text-lg">{currentUser?.email || "N/A"}</p>
              </div>

              <div>
                <p
                  className={`text-sm font-medium ${
                    theme === "light" ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Current Password
                </p>
                <p className="text-lg font-mono">••••••••</p>
              </div>
            </div>

            <form onSubmit={handlePasswordChange}>
              <h3 className="font-medium mb-3 flex items-center">
                <FaCog className="mr-2" /> Change Password
              </h3>

              <div className="mb-4">
                <label
                  className={`block text-sm font-medium mb-1 ${
                    theme === "light" ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full p-2 rounded border ${
                    theme === "light"
                      ? "border-gray-300 bg-white"
                      : "border-gray-600 bg-gray-700"
                  } focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200`}
                  placeholder="Enter new password"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  className={`block text-sm font-medium mb-1 ${
                    theme === "light" ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full p-2 rounded border ${
                    theme === "light"
                      ? "border-gray-300 bg-white"
                      : "border-gray-600 bg-gray-700"
                  } focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200`}
                  placeholder="Confirm new password"
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className={`flex-1 py-2 px-4 rounded font-medium ${
                    isChangingPassword
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                  } text-white transition-all duration-300 shadow-md hover:shadow-lg`}
                >
                  {isChangingPassword ? "Updating..." : "Update Password"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className={`py-2 px-4 rounded font-medium ${
                    theme === "light"
                      ? "bg-gray-200 hover:bg-gray-300"
                      : "bg-gray-600 hover:bg-gray-500"
                  } transition-colors duration-200`}
                >
                  Cancel
                </button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                className={`flex items-center justify-center w-full py-2 px-4 rounded font-medium ${
                  theme === "light"
                    ? "text-red-500 hover:bg-red-50"
                    : "text-red-400 hover:bg-gray-700"
                } transition-colors duration-200`}
              >
                <FaSignOutAlt className="mr-2" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </header>
  );
};

export default Header;
