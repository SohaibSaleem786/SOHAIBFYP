import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CompanyLogo from "../../assets/logo.jpg"; // Replace with your company logo
import { useTheme } from "../../ThemeContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setemaill } = useTheme();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://crystalsolutions.com.pk/sohaibfyp/signin.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      console.log("Full response:", { status: response.status, data }); // More detailed logging

      if (response.ok) {
        setemaill(email);
        toast.success("Sign-in successful!");

        if (data.status === "A") {
          navigate("/Dashboard");
        } else if (data.status === "C") {
          navigate("/UserDashboard");
          toast.info("Your account status is C. Please contact support.");
        } else {
          toast.warning("Your account status is pending verification.");
        }
      } else {
        // More detailed error handling
        if (response.status === 401) {
          toast.error(
            data.error ||
              "Invalid credentials. Please check your email and password."
          );
        } else if (response.status === 404) {
          toast.error("Account not found. Please register first.");
        } else {
          toast.error(data.error || "Login failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Network error. Please check your connection.");
    }
  };

  return (
    <div
      style={{
        background: "white",
      }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#F58634] to-[#FFA64D]"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md"
      >
        {/* Company Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={CompanyLogo}
            alt="Company Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* Welcome Message */}
        <h2 className="text-3xl font-bold mb-6 text-center text-[#F58634]">
          Welcome Back!
        </h2>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F58634] focus:border-[#F58634]"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F58634] focus:border-[#F58634]"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-[#F58634] text-white py-2 rounded-md hover:bg-[#e5732a] transition duration-300 flex items-center justify-center"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-[#F58634] hover:underline font-semibold"
          >
            Sign Up
          </a>
        </p>
      </motion.div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default SignIn;
