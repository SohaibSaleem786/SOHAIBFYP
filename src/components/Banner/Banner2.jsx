import React from "react";
import BannerPng from "../../assets/banner.png"; // Ensure this image is relevant to your software house
import { motion } from "framer-motion";

// Import client logos (replace with your actual logo paths)
import Client1 from "../../assets/client1.png";
import Client2 from "../../assets/client2.png";
import Client3 from "../../assets/client3.png";
import Client4 from "../../assets/client4.png";
import Client5 from "../../assets/client5.png";
import Client6 from "../../assets/client6.png";
import Client7 from "../../assets/client7.png";
import Client8 from "../../assets/client8.png";
import Client9 from "../../assets/client9.png";
import Client10 from "../../assets/client10.png";

const clientLogos = [
  Client1,
  Client2,
  Client3,
  Client4,
  Client5,
  Client6,
  Client7,
  Client8,
  Client9,
  Client10,
];

const Banner2 = () => {
  return (
    <section>
      <div className="container py-14 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 space-y-6 md:space-y-0">
        {/* Banner Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="text-center md:text-left space-y-4 lg:max-w-[450px]">
            <h1 className="text-4xl font-bold !leading-snug">
              Innovate, Build, and Grow with Us
            </h1>
            <p className="text-dark2">
              At CRYSTAL SOLUTION, we turn ideas into reality. From custom
              software solutions to cutting-edge mobile and web applications, we
              empower businesses to thrive in the digital age.
            </p>
            <a
              style={{ backgroundColor: "#f58634" }}
              href="https://chat.whatsapp.com/FQSKgJ5f1eIAhlyF5sVym0"
              className="primary-btn !mt-8"
            >
              Let's Build Together
            </a>
          </div>
        </motion.div>

        {/* Banner Image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            src={BannerPng}
            alt="Software House Banner"
            className="w-[350px] md:max-w-[450px] object-cover drop-shadow"
          />
        </div>
      </div>

      {/* Clients Section */}
      <div className="bg-[#f7f7f7] py-10 overflow-hidden">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">
            Trusted by 15+ Clients
          </h2>

          {/* Client Logos Marquee */}
          <motion.div
            className="flex gap-8"
            animate={{
              x: ["-100%", "0%"], // Move from left to right
            }}
            transition={{
              duration: 20, // Adjust speed here
              repeat: Infinity, // Loop infinitely
              ease: "linear",
            }}
          >
            {/* First Set of Logos */}
            {clientLogos.map((logo, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, filter: "brightness(1.2)" }} // Add hover effect
                className="w-300 h-300 flex items-center justify-center" // Increased size
              >
                <img
                  src={logo}
                  alt={`Client ${index + 1}`}
                  className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}

            {/* Second Set of Logos (Duplicates for seamless looping) */}
            {clientLogos.map((logo, index) => (
              <motion.div
                key={index + clientLogos.length}
                whileHover={{ scale: 1.1, filter: "brightness(1.2)" }} // Add hover effect
                className="w-300 h-300 flex items-center justify-center" // Increased size
              >
                <img
                  src={logo}
                  alt={`Client ${index + 1}`}
                  className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner2;
