import React from "react";
import { RiUserSearchLine } from "react-icons/ri";
import { MdOutlineWorkOutline, MdOutlineEmail } from "react-icons/md";
import { TbDashboard } from "react-icons/tb";
import { AiOutlineSchedule } from "react-icons/ai";
import { BsFileText, BsChatLeftText } from "react-icons/bs";
import { FiMail, FiUserCheck, FiUserX } from "react-icons/fi";
import { motion, useAnimation } from "framer-motion";

const ServicesData = [
  {
    id: 1,
    title: "Job Search & Application",
    icon: <MdOutlineWorkOutline />,
    description:
      "Users can search and apply for jobs through our platform with ease.",
  },
  {
    id: 2,
    title: "Automated Account Creation",
    icon: <MdOutlineEmail />,
    description:
      "Instant email with login credentials sent upon successful application.",
  },
  {
    id: 3,
    title: "Application Dashboard",
    icon: <TbDashboard />,
    description:
      "Real-time tracking of application status (pending, under review, interview).",
  },
  {
    id: 4,
    title: "Status Notifications",
    icon: <FiMail />,
    description:
      "Email notifications for every status update (rejected, pending, accepted).",
  },
  {
    id: 5,
    title: "Admin Management",
    icon: <RiUserSearchLine />,
    description:
      "Admin portal to view, accept or reject candidate applications.",
  },
  {
    id: 6,
    title: "Resume Analysis",
    icon: <BsFileText />,
    description:
      "Admin can review and analyze candidate resumes with summary generation.",
  },
  {
    id: 7,
    title: "Interview Scheduling",
    icon: <AiOutlineSchedule />,
    description:
      "Easily schedule interviews with qualified candidates through the platform.",
  },
  {
    id: 8,
    title: "Application Approval",
    icon: <FiUserCheck />,
    description: "Admin can approve applications and move candidates forward.",
  },
  {
    id: 9,
    title: "Application Rejection",
    icon: <FiUserX />,
    description: "Admin can reject applications with optional feedback.",
  },
  {
    id: 10,
    title: "Chatbot Support",
    icon: <BsChatLeftText />,
    description:
      "AI chatbot to answer candidate queries and forward to recruitment team.",
  },
];

const Services = () => {
  const controls = useAnimation();

  const startAnimation = async () => {
    while (true) {
      await controls.start({
        x: [0, -1000],
        transition: {
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    }
  };

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
          Our Recruitment Services
        </h1>

        <div className="overflow-hidden">
          <motion.div animate={controls} className="flex gap-8 w-min">
            {ServicesData.map((service) => (
              <div
                key={service.id}
                className="bg-[#f4f4f4] rounded-2xl flex flex-col gap-4 items-center justify-center p-4 py-7 hover:bg-white hover:scale-110 duration-300 hover:shadow-2xl min-w-[200px] border-2 border-[#F58634] overflow-hidden"
              >
                <div className="text-4xl mb-4" style={{ color: "#f58634" }}>
                  {service.icon}
                </div>
                <h1 className="text-lg font-semibold text-center px-3">
                  {service.title}
                </h1>
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
