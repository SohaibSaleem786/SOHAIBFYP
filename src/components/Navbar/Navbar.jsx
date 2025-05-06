import React, { useState, useEffect } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import Logo from "../../assets/logo.jpg";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [jobCount, setJobCount] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to handle direct URL navigation
  const handleDirectNavigation = (path) => {
    // Close mobile menu first
    setIsMobileMenuOpen(false);

    // Handle in-page section navigation
    if (path.startsWith("#")) {
      const sectionId = path.replace("#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // For direct URL navigation, we use window.location
      // This completely bypasses React Router which might be causing freezes
      const baseUrl = window.location.origin + "/SRA";
      window.location.href = baseUrl + path;
    }
  };

  const fetchJobs = () => {
    const API_BASE_URL = "https://crystalsolutions.com.pk/sohaibfyp";

    // Add timeout to prevent hanging on API calls
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    fetch(`${API_BASE_URL}/getjobs.php`, {
      signal: controller.signal,
    })
      .then((response) => {
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.jobs && Array.isArray(data.jobs)) {
          setJobCount(data.jobs.length);
        } else {
          console.error("Expected an array of jobs, but got:", data);
          setJobCount(0);
        }
      })
      .catch((error) => {
        // Don't log abort errors (they're expected)
        if (error.name !== "AbortError") {
          console.error("Error fetching jobs:", error);
        }
        setJobCount(0);
      });
  };

  useEffect(() => {
    // Safely fetch jobs with error handling
    try {
      fetchJobs();
    } catch (error) {
      console.error("Error in jobs fetch:", error);
    }

    // Clean up any pending requests
    return () => {
      // Any cleanup logic
    };
  }, []);

  const navItems = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "Services", path: "#services" },
    { id: 3, title: "Our Team", path: "#team" },
    { id: 4, title: "Contact Us", path: "#contact" },
    { id: 5, title: "About Us", path: "/about-us" },
    { id: 6, title: "Join Us", path: "/careers" },
    { id: 7, title: "New Jobs", path: "/new-jobs", showBadge: true },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#f7f7f7] bg-opacity-90">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container py-1 flex justify-between items-center"
      >
        {/* Logo section */}
        <div className="flex items-center">
          {/* Direct link for logo */}
          <a href="/SRA/" className="flex items-center cursor-pointer">
            <img src={Logo} className="w-16 ml-4" alt="Logo" />
            <h1 className="font-bold text-xl ml-2.5 text-[#F58634]">
              SMART RECRUITER ASSISTANT
            </h1>
          </a>
        </div>

        {/* Desktop Menu section */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-3">
            {navItems.map((item) => (
              <li key={item.id} className="relative">
                {/* Handle section links differently than page links */}
                {item.path.startsWith("#") ? (
                  <button
                    onClick={() => handleDirectNavigation(item.path)}
                    className="inline-block px-1 hover:text-[#F58634] transition-colors duration-200"
                  >
                    {item.title}
                    {item.showBadge && jobCount > 0 && (
                      <span className="absolute -top-1 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full py-1 px-2 animate-pulse">
                        {jobCount}
                      </span>
                    )}
                  </button>
                ) : (
                  <a
                    href={`/SRA${item.path}`}
                    className="inline-block px-1 hover:text-[#F58634] transition-colors duration-200"
                  >
                    {item.title}
                    {item.showBadge && jobCount > 0 && (
                      <span className="absolute -top-1 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full py-1 px-2 animate-pulse">
                        {jobCount}
                      </span>
                    )}
                  </a>
                )}
              </li>
            ))}
            <li>
              {/* Direct link for Sign In button */}
              <a
                href="/SRA/signin"
                className="primary-btn ml-2 inline-block text-center"
                style={{ backgroundColor: "#F58634", color: "white" }}
              >
                Sign In
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile Hamburger menu section */}
        <div className="lg:hidden mr-4">
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            className="text-3xl focus:outline-none"
          >
            {isMobileMenuOpen ? <IoMdClose /> : <IoMdMenu />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-[#f7f7f7] w-full shadow-lg"
        >
          <ul className="flex flex-col items-center gap-3 py-4">
            {navItems.map((item) => (
              <li key={item.id} className="relative w-full text-center">
                {/* Handle section links differently than page links */}
                {item.path.startsWith("#") ? (
                  <button
                    onClick={() => handleDirectNavigation(item.path)}
                    className="inline-block py-2 px-3 hover:text-[#F58634] w-full"
                  >
                    {item.title}
                    {item.showBadge && jobCount > 0 && (
                      <span className="absolute top-0 right-10 bg-red-600 text-white text-xs font-bold rounded-full py-1 px-2 animate-pulse">
                        {jobCount}
                      </span>
                    )}
                  </button>
                ) : (
                  <a
                    href={`/SRA${item.path}`}
                    className="inline-block py-2 px-3 hover:text-[#F58634] w-full"
                  >
                    {item.title}
                    {item.showBadge && jobCount > 0 && (
                      <span className="absolute top-0 right-10 bg-red-600 text-white text-xs font-bold rounded-full py-1 px-2 animate-pulse">
                        {jobCount}
                      </span>
                    )}
                  </a>
                )}
              </li>
            ))}
            <li className="w-full text-center mt-2">
              {/* Direct link for mobile Sign In button */}
              <a
                href="/SRA/signin"
                className="primary-btn inline-block"
                style={{ backgroundColor: "#F58634", color: "white" }}
              >
                Sign In
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
