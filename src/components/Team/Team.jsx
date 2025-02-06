import React from "react";
import { motion } from "framer-motion";
import Team1 from "../../assets/team1.png";
import Team2 from "../../assets/team2.png";
import Team3 from "../../assets/team3.png";
import Team4 from "../../assets/team4.jpg";
import Team5 from "../../assets/team5.png";
import Team6 from "../../assets/team6.png";
import BlankProfile from "../../assets/blanksimage.jpeg";
import BlankProfileGirl from "../../assets/blanksimagegirl.jpeg";

const TeamsData = [
  {
    id: 1,
    name: "...",
    role: "CEO",
    description:
      "Visionary leader driving innovation and excellence across the organization.",
    image: BlankProfile,
  },
  {
    id: 2,
    name: "Muhammad Numan",
    role: "React Developer",
    description:
      "Crafting dynamic and responsive web experiences with precision and creativity.",
    image: Team1,
  },
  {
    id: 3,
    name: "Saif Khan",
    role: "Flutter Developer",
    description:
      "Building seamless cross-platform mobile apps that users love.",
    image: Team2,
  },
  {
    id: 4,
    name: "Sohaib Saleem",
    role: "React Developer",
    description:
      "Transforming ideas into elegant and functional web solutions.",
    image: Team3,
  },
  {
    id: 5,
    name: "Subtain Khan",
    role: "Flutter Developer",
    description:
      "Delivering high-performance mobile apps with clean and efficient code.",
    image: Team4,
  },
  {
    id: 6,
    name: "Muhammad Hamza",
    role: "React Developer",
    description:
      "Solving complex problems with innovative and scalable web solutions.",
    image: Team6,
  },
  {
    id: 7,
    name: "Muhammad Umair",
    role: "Flutter Developer",
    description:
      "Passionate about creating intuitive and engaging mobile experiences.",
    image: Team5,
  },
  {
    id: 8,
    name: "Miss Saba",
    role: "HR",
    description:
      "Fostering a positive workplace, recruiting top talent, and ensuring employee growth and satisfaction.",
    image: BlankProfileGirl,
  },
];

const Teams = () => {
  return (
    <section id="team" className="bg-white py-14 md:py-24">
      <div className="container">
        {/* Section Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="text-3xl font-bold text-center mb-8"
        >
          Meet Our Team
        </motion.h1>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {TeamsData.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="bg-[#f4f4f4] rounded-lg overflow-hidden hover:shadow-lg duration-300 flex flex-col items-center p-4"
            >
              {/* Team Member Image */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#F58634]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Team Member Details */}
              <div className="p-1 text-center">
                <h2 className="text-lg font-bold mt-2">{member.name}</h2>
                <p className="text-[#F58634] text-sm font-semibold">
                  {member.role}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;
