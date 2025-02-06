import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import {
  IoIosArrowRoundForward,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";
import Blob from "../../assets/blob.svg";
import { motion, useAnimation } from "framer-motion";
import Image1 from "../../assets/karousol1.jpg";
import Image2 from "../../assets/karousol2.jpg";
import Image3 from "../../assets/karousol3.jpg";
import Image4 from "../../assets/karousol4.jpg";
import Image5 from "../../assets/karousol5.jpg";

const carouselImages = [Image1, Image2, Image3, Image4, Image5];

// Descriptions for each carousel image
const carouselDescriptions = [
  "Step into our modern workspace, where innovation meets style with vibrant orange accents.",
  "Collaboration at its finest—our team thrives in an environment fueled by creativity and orange-inspired energy.",
  "Transforming ideas into reality: Explore our cutting-edge website and app development projects.",
  "Where technology meets artistry—experience the future with our orange-themed digital innovations.",
  "Building trust and delivering excellence: Our team presents solutions that drive client success.",
];

export const FadeUp = (delay) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const controls = useAnimation();

  // Function to handle next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to handle previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  // Auto-play the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 4000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [currentImageIndex]); // Add currentImageIndex as a dependency

  // Animate the background image transition
  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    });
  }, [currentImageIndex, controls]);

  return (
    <section className="bg-light overflow-hidden relative h-screen">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        {carouselImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentImageIndex ? 1 : 0,
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
        {/* Shade with opacity 0.5 */}
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="container grid grid-cols-1 md:grid-cols-2 h-full relative z-20">
        {/* Brand Info */}
        <div className="flex flex-col justify-center py-14 md:py-0">
          <div className="text-center md:text-left space-y-10 lg:max-w-[400px]">
            {/* Hiring Notification */}
            <motion.div
              variants={FadeUp(0.5)}
              initial="initial"
              animate="animate"
              className="bg-[#F58634] text-white px-4 py-2 rounded-lg inline-block"
            >
              <p className="text-sm font-bold">
                🚀 We're Hiring! Upload Your Resume Now.
              </p>
            </motion.div>

            <motion.h1
              variants={FadeUp(0.7)}
              initial="initial"
              animate="animate"
              className="mt-4 text-lg lg:text-xl text-white"
            >
              We specialize in creating stunning websites and mobile apps
              tailored to your business needs.
            </motion.h1>
            <motion.div
              variants={FadeUp(0.8)}
              initial="initial"
              animate="animate"
              className="flex justify-center md:justify-start"
            >
              <button
                className="primary-btn flex items-center gap-2 group"
                style={{ backgroundColor: "#F58634", color: "white" }}
              >
                Get Started
                <IoIosArrowRoundForward className="text-xl group-hover:translate-x-2 group-hover:-rotate-45 duration-300" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Left and Right Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4 z-30">
        <button
          onClick={prevImage}
          className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300"
        >
          <IoIosArrowBack className="text-3xl text-white" />
        </button>
        <button
          onClick={nextImage}
          className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300"
        >
          <IoIosArrowForward className="text-3xl text-white" />
        </button>
      </div>

      {/* Carousel Description */}
      <div className="absolute inset-0 flex items-end justify-center z-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-white text-sm md:text-base lg:text-lg font-bold bg-black bg-opacity-50 px-4 py-2 rounded-lg"
        >
          {carouselDescriptions[currentImageIndex]}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
