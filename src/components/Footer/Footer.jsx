import React from "react";
import { FaLinkedin, FaWhatsapp, FaTwitter, FaEnvelope } from "react-icons/fa";
import { HiOfficeBuilding } from "react-icons/hi";
import { MdOutlineWorkOutline, MdEmail, MdPhone } from "react-icons/md";
import { motion } from "framer-motion";
import Chatbot from "./Chatbot";

const Footer = () => {
  return (
    <section id="contact" className="bg-white">
      <footer className="py-28 bg-[#f7f7f7]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 md:gap-8">
            {/* First Section - About Recruitment */}
            <div className="space-y-4 max-w-[300px]">
              <h1 className="text-2xl font-bold text-[#f58634]">
                SMART RECRUITER ASSISTANT
              </h1>
              <p className="text-dark2">
                Our AI-powered recruitment platform streamlines hiring
                processes, connects top talent with employers, and provides
                real-time application tracking for candidates and recruiters
                alike.
              </p>

              {/* Trust Indicators */}
              <div className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <MdOutlineWorkOutline className="text-[#f58634] text-xl" />
                  <span className="font-medium">500+ Jobs Posted Monthly</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOfficeBuilding className="text-[#f58634] text-xl" />
                  <span className="font-medium">200+ Partner Companies</span>
                </div>
              </div>
            </div>

            {/* Second Section - For Candidates */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-[#f58634]">
                For Candidates
              </h1>
              <div className="text-dark2">
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center gap-2 cursor-pointer hover:text-[#f58634] duration-200">
                    <span className="w-2 h-2 bg-[#f58634] rounded-full"></span>
                    <span>Browse Jobs</span>
                  </li>
                  <li className="flex items-center gap-2 cursor-pointer hover:text-[#f58634] duration-200">
                    <span className="w-2 h-2 bg-[#f58634] rounded-full"></span>
                    <span>Application Dashboard</span>
                  </li>
                  <li className="flex items-center gap-2 cursor-pointer hover:text-[#f58634] duration-200">
                    <span className="w-2 h-2 bg-[#f58634] rounded-full"></span>
                    <span>Resume Builder</span>
                  </li>
                  <li className="flex items-center gap-2 cursor-pointer hover:text-[#f58634] duration-200">
                    <span className="w-2 h-2 bg-[#f58634] rounded-full"></span>
                    <span>Interview Preparation</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Third Section - For Employers */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-[#f58634]">
                For Employers
              </h1>
              <div className="text-dark2">
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center gap-2 cursor-pointer hover:text-[#f58634] duration-200">
                    <span className="w-2 h-2 bg-[#f58634] rounded-full"></span>
                    <span>Post Jobs</span>
                  </li>
                  <li className="flex items-center gap-2 cursor-pointer hover:text-[#f58634] duration-200">
                    <span className="w-2 h-2 bg-[#f58634] rounded-full"></span>
                    <span>Browse Candidates</span>
                  </li>
                  <li className="flex items-center gap-2 cursor-pointer hover:text-[#f58634] duration-200">
                    <span className="w-2 h-2 bg-[#f58634] rounded-full"></span>
                    <span>AI Resume Screening</span>
                  </li>
                  <li className="flex items-center gap-2 cursor-pointer hover:text-[#f58634] duration-200">
                    <span className="w-2 h-2 bg-[#f58634] rounded-full"></span>
                    <span>Interview Scheduling</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Fourth Section - Contact */}
            <div className="space-y-4 max-w-[300px]">
              <h1 className="text-2xl font-bold text-[#f58634]">Contact Us</h1>

              {/* Newsletter Subscription */}
              <div>
                <p className="text-dark2 mb-3">
                  Subscribe to our newsletter for recruitment tips and job
                  alerts.
                </p>
                <div className="flex items-center">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="p-3 rounded-s-lg bg-white w-full py-3 focus:ring-0 focus:outline-none border border-gray-300 placeholder:text-dark2"
                  />
                  <button className="bg-[#f58634] text-white font-semibold py-3 px-4 rounded-e-lg hover:bg-[#e07a2f] transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-3 pt-4 text-dark2">
                <div className="flex items-center gap-3">
                  <MdEmail className="text-[#f58634] text-xl" />
                  <span>contact@smartrecruiter.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MdPhone className="text-[#f58634] text-xl" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <HiOfficeBuilding className="text-[#f58634] text-xl" />
                  <span>123 Recruitment Ave, Tech City, TC 10001</span>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex space-x-4 pt-4">
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#f58634] transition-colors"
                >
                  <FaLinkedin className="text-xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#f58634] transition-colors"
                >
                  <FaTwitter className="text-xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#f58634] transition-colors"
                >
                  <FaWhatsapp className="text-xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#f58634] transition-colors"
                >
                  <FaEnvelope className="text-xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 mt-16 pt-8 text-center text-dark2">
            <p>
              © {new Date().getFullYear()} Smart Recruiter Assistant. All rights
              reserved.
            </p>
            <div className="flex justify-center gap-4 mt-2 text-sm">
              <a href="#" className="hover:text-[#f58634]">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#f58634]">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#f58634]">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </footer>
      <Chatbot />
    </section>
  );
};

export default Footer;
