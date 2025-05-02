import React, { useState, useEffect } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.jpg";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [jobCount, setJobCount] = useState(0);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    if (path.startsWith("#")) {
      // Handle scroll to section
      const element = document.getElementById(path.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setIsMobileMenuOpen(false);
    } else {
      // Handle router navigation
      navigate(path);
      setIsMobileMenuOpen(false);
    }
  };

  const fetchJobs = () => {
    const API_BASE_URL = "https://crystalsolutions.com.pk/sohaibfyp";
    fetch(`${API_BASE_URL}/getjobs.php`)
      .then((response) => response.json())
      .then((data) => {
        if (data.jobs && Array.isArray(data.jobs)) {
          setJobCount(data.jobs.length);
        } else {
          console.error("Expected an array of jobs, but got:", data);
        }
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  };

  useEffect(() => {
    fetchJobs();
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
          <Link to="/" className="flex items-center">
            <img src={Logo} className="w-16 ml-4" alt="Logo" />
            <h1 className="font-bold text-xl ml-2.5 text-[#F58634]">
              SMART RECRUITER ASSISTANT
            </h1>
          </Link>
        </div>

        {/* Desktop Menu section */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-3">
            {navItems.map((item) => (
              <li key={item.id} className="relative">
                <button
                  onClick={() => handleNavigation(item.path)}
                  className="inline-block py-2 px-3 hover:text-[#F58634] transition-colors duration-200"
                >
                  {item.title}
                  {item.showBadge && jobCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full py-1 px-2 animate-pulse">
                      {jobCount}
                    </span>
                  )}
                </button>
              </li>
            ))}
            <li>
              <Link to="/signin">
                <button
                  className="primary-btn ml-2"
                  style={{ backgroundColor: "#F58634", color: "white" }}
                >
                  Sign In
                </button>
              </Link>
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
                <button
                  onClick={() => handleNavigation(item.path)}
                  className="inline-block py-2 px-3 hover:text-[#F58634] w-full"
                >
                  {item.title}
                  {item.showBadge && jobCount > 0 && (
                    <span className="absolute top-0 right-10 bg-red-600 text-white text-xs font-bold rounded-full py-1 px-2 animate-pulse">
                      {jobCount}
                    </span>
                  )}
                </button>
              </li>
            ))}
            <li className="w-full text-center mt-2">
              <Link to="/signin" className="block">
                <button
                  className="primary-btn"
                  style={{ backgroundColor: "#F58634", color: "white" }}
                >
                  Sign In
                </button>
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
