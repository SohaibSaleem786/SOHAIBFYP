import React from "react";
import { RiComputerLine } from "react-icons/ri";
import { CiMobile3 } from "react-icons/ci";
import { TbWorldWww } from "react-icons/tb";
import { IoMdHappy } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { IoPulseOutline } from "react-icons/io5";
import { motion, useAnimation } from "framer-motion";

const ServicesData = [
  {
    id: 1,
    title: "Web Development",
    link: "#",
    icon: <TbWorldWww />,
    description:
      "We create stunning and responsive websites tailored to your business needs.",
  },
  {
    id: 2,
    title: "Mobile Development",
    link: "#",
    icon: <CiMobile3 />,
    description:
      "We build high-performance mobile apps for iOS and Android platforms.",
  },
  {
    id: 3,
    title: "Software Development",
    link: "#",
    icon: <RiComputerLine />,
    description:
      "We develop custom software solutions to streamline your business operations.",
  },
  {
    id: 4,
    title: "Satisfied Clients",
    link: "#",
    icon: <IoMdHappy />,
    description:
      "Our clients trust us for delivering exceptional results and outstanding service.",
  },
  {
    id: 5,
    title: "SEO Optimization",
    link: "#",
    icon: <IoPulseOutline />,
    description:
      "We optimize your website to rank higher on search engines and drive more traffic.",
  },
  {
    id: 6,
    title: "24/7 Support",
    link: "#",
    icon: <BiSupport />,
    description:
      "We provide round-the-clock support to ensure your systems run smoothly.",
  },
  {
    id: 7,
    title: "Installment Software",
    link: "#",
    icon: <RiComputerLine />, // You can use a different icon if available
    description:
      "We offer flexible installment software solutions to help you manage payments efficiently.",
  },
  {
    id: 8,
    title: "Web Development",
    link: "#",
    icon: <TbWorldWww />,
    description:
      "We create stunning and responsive websites tailored to your business needs.",
  },
  {
    id: 9,
    title: "Mobile Development",
    link: "#",
    icon: <CiMobile3 />,
    description:
      "We build high-performance mobile apps for iOS and Android platforms.",
  },
  {
    id: 10,
    title: "Software Development",
    link: "#",
    icon: <RiComputerLine />,
    description:
      "We develop custom software solutions to streamline your business operations.",
  },
  {
    id: 11,
    title: "Satisfied Clients",
    link: "#",
    icon: <IoMdHappy />,
    description:
      "Our clients trust us for delivering exceptional results and outstanding service.",
  },
];

const Services = () => {
  const controls = useAnimation();

  // Function to create a continuous left-to-right animation
  const startAnimation = async () => {
    while (true) {
      await controls.start({
        x: [0, -1000], // Move from left to right
        transition: {
          duration: 20, // Adjust speed here
          ease: "linear",
          repeat: Infinity, // Loop infinitely
          repeatType: "loop",
        },
      });
    }
  };

  // Start the animation when the component mounts
  React.useEffect(() => {
    startAnimation();
  }, []);

  return (
    <section id="services" className="bg-white">
      <div className="container pb-14 pt-16">
        <h1
          className="text-4xl font-bold text-left pb-10"
          style={{ color: "#f58634" }}
        >
          Services we provide
        </h1>

        {/* Service Cards Row */}
        <div className="overflow-hidden">
          {" "}
          {/* Added overflow-hidden to prevent hover overflow */}
          <motion.div animate={controls} className="flex gap-8 w-min">
            {ServicesData.map((service) => (
              <div
                key={service.id}
                className="bg-[#f4f4f4] rounded-2xl flex flex-col gap-4 items-center justify-center p-4 py-7 hover:bg-white hover:scale-110 duration-300 hover:shadow-2xl min-w-[200px] border-2 border-[#F58634] overflow-hidden" // Added overflow-hidden
              >
                {/* Service Icon */}
                <div className="text-4xl mb-4">{service.icon}</div>

                {/* Service Title */}
                <h1 className="text-lg font-semibold text-center px-3">
                  {service.title}
                </h1>

                {/* Service Description */}
                <p className="text-sm text-gray-600 text-center px-2">
                  {service.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
