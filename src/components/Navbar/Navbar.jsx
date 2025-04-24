import React, { useState, useEffect } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import axios from "axios"; // Add axios for API call

const NavbarMenu = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  {
    id: 2,
    title: "Services",
    link: "#services",
  },
  {
    id: 3,
    title: "Our Team",
    link: "#team",
  },
  {
    id: 4,
    title: "Contact Us",
    link: "#contact",
  },
  {
    id: 5,
    title: "Join Us",
    link: "/sohaibfyp/careers",
  },
  {
    id: 6,
    title: "New Jobs",
    link: "/sohaibfyp/NewJobs",
  },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [jobCount, setJobCount] = useState(0); // New state for job count

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const API_BASE_URL = "https://crystalsolutions.com.pk/sohaibfyp";
  const fetchJobs = () => {
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
  return (
    <nav
      className="fixed top-0 left-0 w-full z-50"
      style={{ backgroundColor: "#f7f7f7", opacity: "0.9" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container py-1 flex justify-between items-center"
      >
        {/* Logo section */}
        <div className="flex items-center">
          <img src={Logo} className="w-16 ml-4" alt="Logo" />
          <h1
            className="font-bold text-xl"
            style={{ marginLeft: "10px", color: "#F58634" }}
          >
            SMART RECRUITER ASSISTANT{" "}
          </h1>
        </div>

        {/* Desktop Menu section */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-3">
            {NavbarMenu.map((menu) => (
              <li key={menu.id} className="relative">
                <a
                  href={menu.link || menu.path}
                  className="inline-block py-2 px-3 hover:text-[#F58634] relative group"
                  onClick={() => {
                    if (menu.link) {
                      handleScroll(menu.link.replace("#", ""));
                    }
                  }}
                >
                  <div className="w-2 h-2 bg-[#F58634] absolute mt-4 rounded-full left-1/2 -translate-x-1/2 top-1/2 bottom-0 group-hover:block hidden"></div>
                  {menu.title}
                  {menu.title === "New Jobs" && jobCount > 0 && (
                    <span className="absolute bottom-6 right-0 bg-orange-600 text-white text-xs font-bold rounded-full py-1 px-3 animate-pulse">
                      {jobCount}
                    </span>
                  )}
                </a>
              </li>
            ))}
            <Link to="/signin">
              <button
                className="primary-btn"
                style={{ backgroundColor: "#F58634", color: "white" }}
              >
                Sign In
              </button>
            </Link>
          </ul>
        </div>

        {/* Mobile Hamburger menu section */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <IoMdClose className="text-3xl" />
            ) : (
              <IoMdMenu className="text-3xl" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-[#f7f7f7] w-full"
        >
          <ul className="flex flex-col items-center gap-3 py-4">
            {NavbarMenu.map((menu) => (
              <li key={menu.id} className="relative">
                <a
                  href={menu.link || menu.path}
                  className="inline-block py-2 px-3 hover:text-secondary"
                  onClick={() => {
                    if (menu.link) {
                      handleScroll(menu.link.replace("#", ""));
                    }
                  }}
                >
                  {menu.title}
                  {menu.title === "New Jobs" && jobCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full py-1 px-3 animate-pulse">
                      {jobCount}
                    </span>
                  )}
                </a>
              </li>
            ))}
            <Link to="/signin">
              <button
                className="primary-btn mt-2"
                style={{ backgroundColor: "#F58634", color: "#2A2E53" }}
              >
                Sign In
              </button>
            </Link>
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
