import React from "react";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { motion } from "framer-motion";
import Chatbot from "./Chatbot";

const Footer = () => {
  return (
    <section id="contact" className="bg-white">
      <footer className="py-28 bg-[#f7f7f7]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="container"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 md:gap-4">
            {/* First Section - About Us */}
            <div className="space-y-4 max-w-[300px]">
              <h1 className="text-2xl font-bold">CRYSTAL SOLUTIONS</h1>
              <p className="text-dark2">
                We are a leading software house specializing in custom software
                development, mobile apps, and web solutions. Our mission is to
                deliver innovative, scalable, and user-friendly solutions that
                drive business growth and success.
              </p>
            </div>

            {/* Second Section - Quick Links */}
            <div className="grid grid-cols-2 gap-10">
              {/* Services */}
              <div className="space-y-4">
                <h1 className="text-2xl font-bold">Services</h1>
                <div className="text-dark2">
                  <ul className="space-y-2 text-lg">
                    <li className="cursor-pointer hover:text-secondary duration-200">
                      Custom Software
                    </li>
                    <li className="cursor-pointer hover:text-secondary duration-200">
                      Mobile App Development
                    </li>
                    <li className="cursor-pointer hover:text-secondary duration-200">
                      Web Development
                    </li>
                    <li className="cursor-pointer hover:text-secondary duration-200">
                      UI/UX Design
                    </li>
                  </ul>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h1 className="text-2xl font-bold">Quick Links</h1>
                <div className="text-dark2">
                  <ul className="space-y-2 text-lg">
                    <li className="cursor-pointer hover:text-secondary duration-200">
                      Home
                    </li>
                    <li className="cursor-pointer hover:text-secondary duration-200">
                      About Us
                    </li>
                    <li className="cursor-pointer hover:text-secondary duration-200">
                      Portfolio
                    </li>
                    <li className="cursor-pointer hover:text-secondary duration-200">
                      Contact Us
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Third Section - Get In Touch */}
            <div className="space-y-4 max-w-[300px]">
              <h1 className="text-2xl font-bold">Get In Touch</h1>
              <p className="text-dark2">
                Fill in the form to start a conversation.
              </p>

              {/* Email Subscription */}
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="p-3 rounded-s-xl bg-white w-full py-4 focus:ring-0 focus:outline-none placeholder:text-dark2"
                />
                <button
                  className="bg-primary text-white font-semibold py-4 px-6 rounded-e-xl"
                  style={{ backgroundColor: "#f58634" }}
                >
                  Subscribe
                </button>
              </div>

              {/* Contact Details */}
              <div className="space-y-2 text-dark2">
                <p>House No 15 D Al-Makkah Colony,</p>
                <p>College Road Near Butt Chowk,</p>
                <p>Lahore</p>
                <p>0304-4770075</p>
                <p>crystalsolutions.com</p>
              </div>

              {/* Social Icons */}
              <div className="flex space-x-6 py-3">
                <a href="https://wa.me/03044770075">
                  <FaWhatsapp className="cursor-pointer hover:text-primary hover:scale-105 duration-200" />
                </a>
                <a href="https://www.instagram.com/crystalsolutions">
                  <FaInstagram className="cursor-pointer hover:text-primary hover:scale-105 duration-200" />
                </a>
                <a href="https://crystalsolutions.com">
                  <TbWorldWww className="cursor-pointer hover:text-primary hover:scale-105 duration-200" />
                </a>
                <a href="https://www.youtube.com/crystalsolutions">
                  <FaYoutube className="cursor-pointer hover:text-primary hover:scale-105 duration-200" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </footer>
      {/* <Chatbot /> */}
    </section>
  );
};

export default Footer;
