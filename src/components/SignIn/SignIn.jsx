import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CompanyLogo from "../../assets/logo.jpg";
import { useTheme } from "../../ThemeContext";
import axios from "axios";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { setemaill } = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setIsProcessing(true);

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

      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", parseError);
        data = {
          error: 500,
          message: "Server returned invalid response format. Please try again.",
        };
      }

      if (data.error === 200) {
        toast.success(data.message || "Login successful.");
        setemaill(email);
        localStorage.setItem("isLoggedIn", "true");

        localStorage.setItem("emailaccount", JSON.stringify(email));
        const userStatus = data.user?.status;
        if (userStatus === "A") {
          navigate("/Dashboard");
        } else if (userStatus === "C") {
          toast.info(
            "Your account is currently closed. Please contact support."
          );
          navigate("/UserDashboard");
        } else {
          toast.warning("Your account is pending verification.");
        }
      } else {
        toast.error(
          data.message || `Login failed (${data.error}). Please try again.`
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };
  async function handleForgotPassword(e) {
    e.preventDefault();

    const data = {
      email: email,
      new_password: "12345678",
    };
    console.log(data, "data");
    try {
      // Send as JSON instead of form data
      const response = await axios.post(
        "https://crystalsolutions.com.pk/sohaibfyp/forgetpassword.php",
        data, // Send the data object directly (will be JSON-stringified by axios)
        {
          headers: {
            "Content-Type": "application/json", // Change content type to JSON
          },
        }
      );

      console.log(response, "response");
      const { status, message } = response.data;

      if (status === "success") {
        toast.success(message, { autoClose: 3000 });
        // Add any navigation or state updates here
      } else {
        toast.error(message, { autoClose: 3000 });
      }
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred. Please try again.", {
        autoClose: 3000,
      });
      console.error("Forgot password error:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-white">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <img
            src={CompanyLogo}
            alt="Company Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center text-[#F58634]">
          {isForgotPassword ? "Reset Password" : "Welcome Back!"}
        </h2>

        <form
          onSubmit={isForgotPassword ? handleForgotPassword : handleLogin}
          className="space-y-6"
        >
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

          {!isForgotPassword && (
            <>
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
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-sm text-[#F58634] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-[#F58634] text-white py-2 rounded-md hover:bg-[#e5732a] transition duration-300 flex items-center justify-center disabled:opacity-70"
          >
            {isProcessing
              ? "Processing..."
              : isForgotPassword
              ? "Reset Password"
              : "Sign In"}
          </button>

          {isForgotPassword ? (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="text-sm text-[#F58634] hover:underline"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-[#F58634] hover:underline font-semibold"
              >
                Sign Up
              </a>
            </p>
          )}
        </form>
      </motion.div>

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
