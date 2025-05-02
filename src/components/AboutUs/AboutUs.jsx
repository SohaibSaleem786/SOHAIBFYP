import React from "react";
import {
  FaRobot,
  FaUserTie,
  FaChartLine,
  FaEnvelope,
  FaClock,
  FaShieldAlt,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import teamPhoto3 from "../../assets/teamm3.jpg";
import teamPhoto8 from "../../assets/team8.jpg";
import teamPhoto9 from "../../assets/team9.jpg";
import systemScreenshot from "../../assets/dashboard.jpg";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sohaib Saleem",
      role: "React Developer",
      image: teamPhoto3,
      color: "orange",
      bio: "Senior React Developer with 3+ years of experience crafting high-performance web applications. Specializes in React ecosystem including Next.js, Redux, and TypeScript. Expert in building scalable frontend architectures with a strong focus on component reusability and state management.",
      social: {
        linkedin: "www.linkedin.com/in/sohaibsaleemdeveloper",
        github: "https://github.com/SohaibSaleem786",
      },
    },
    {
      id: 2,
      name: "Muhammad Abdullah",
      role: "Chief Marketing Officer (CMO)",
      image: teamPhoto9,
      color: "indigo",
      bio: "Strategic marketing leader with 3 years of experience in digital transformation and brand growth. Oversees all marketing operations including digital campaigns, content strategy, and market research. Specializes in data-driven marketing with expertise in SEO, social media marketing.",
      social: {
        linkedin: "#",
        github: "#",
      },
    },
    {
      id: 3,
      name: "Raza Ali",
      role: "Project Manager",
      image: teamPhoto8,
      color: "green",
      bio: "Certified PMP with 3 years of experience managing complex web development projects. Expert in Agile methodologies (Scrum, Kanban) and project management tools like Jira and Trello. Coordinates between cross-functional teams of developers, designers, and stakeholders to deliver projects on time .",
      social: {
        linkedin: "#",
        github: "#",
      },
    },
  ];

  const techStack = [
    {
      name: "React.js",
      icon: "R",
      color: "blue-600",
      description: "Frontend Development",
    },
    { name: "PHP", icon: "P", color: "orange-500", description: "Backend API" },
    {
      name: "Python",
      icon: "Py",
      color: "green-500",
      description: "AI Processing",
    },
    {
      name: "JWT Auth",
      icon: <FaShieldAlt />,
      color: "purple-500",
      description: "Secure Authentication",
    },
    { name: "MySQL", icon: "SQL", color: "blue-400", description: "Database" },
    {
      name: "Tailwind CSS",
      icon: "T",
      color: "teal-400",
      description: "Styling",
    },
    {
      name: "spaCy",
      icon: "S",
      color: "green-600",
      description: "NLP Processing",
    },
    {
      name: "NLTK",
      icon: "N",
      color: "yellow-500",
      description: "Text Analysis",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 to-indigo-700 py-24 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            About Smart Recruiter
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto animate-fade-in delay-100">
            Revolutionizing recruitment with AI-powered automation and
            intelligent candidate matching
          </p>
          <div className="animate-bounce mt-8">
            <svg
              className="w-8 h-8 mx-auto text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <div className="relative group">
              <img
                src={systemScreenshot}
                alt="Smart Recruiter System Dashboard"
                className="rounded-xl shadow-2xl border-4 border-white transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-orange-600 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500"></div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Our <span className="text-orange-600">Innovative</span> Project
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              The{" "}
              <span className="font-semibold text-orange-600">
                Smart Recruiter System
              </span>{" "}
              transforms traditional hiring processes through cutting-edge AI
              technology. Our platform automates resume screening, intelligently
              matches candidates to positions, and streamlines interview
              scheduling—reducing hiring time by 60% while improving candidate
              quality.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="bg-orange-100 text-orange-600 p-3 rounded-full mr-4">
                    <FaRobot className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-lg">
                      AI-Powered Analysis
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Advanced NLP techniques extract skills, experience, and
                      education from resumes with 95% accuracy.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full mr-4">
                    <FaUserTie className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-lg">Smart Matching</h3>
                    <p className="text-gray-600 text-sm">
                      Proprietary algorithm matches candidates to jobs based on
                      skills, experience, and cultural fit.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="bg-green-100 text-green-600 p-3 rounded-full mr-4">
                    <FaChartLine className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-lg">
                      Performance Tracking
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Real-time analytics dashboard provides insights into
                      recruitment metrics and pipeline health.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
                    <FaClock className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-lg">
                      Automated Scheduling
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Calendar integration and AI scheduling assistant eliminate
                      back-and-forth emails for interviews.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Process */}
      <div className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-gray-800">
            How Our <span className="text-orange-600">System</span> Works
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 h-full w-1 bg-gradient-to-b from-orange-500 to-blue-500 transform -translate-x-1/2"></div>

            {/* Timeline items */}
            <div className="space-y-16">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-right">
                  <div className="inline-block bg-white p-2 rounded-full shadow-md mb-4">
                    <div className="bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                      1
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-orange-600 mb-3">
                    Job Application
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Candidates apply through our intuitive portal by submitting
                    their resume and basic information. Our system validates
                    file types (PDF/DOC/DOCX) and stores them securely in our
                    encrypted database.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="flex items-center mb-4">
                      <div className="bg-orange-100 text-orange-600 p-3 rounded-full mr-4">
                        <FaUserTie className="text-xl" />
                      </div>
                      <h4 className="font-bold text-lg">Database Storage</h4>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                      <div className="text-gray-500 mb-1">
                        // applications table schema
                      </div>
                      <div className="text-orange-600">id</div>
                      <div className="text-blue-600">name VARCHAR(255)</div>
                      <div className="text-blue-600">email VARCHAR(255)</div>
                      <div className="text-blue-600">resume_path TEXT</div>
                      <div className="text-blue-600">
                        status ENUM('Pending','Reviewed','Accepted','Rejected')
                      </div>
                      <div className="text-blue-600">category VARCHAR(100)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 order-2 md:order-1 mt-8 md:mt-0">
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="flex items-center mb-4">
                      <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full mr-4">
                        <FaRobot className="text-xl" />
                      </div>
                      <h4 className="font-bold text-lg">AI Analysis Process</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="bg-green-100 text-green-600 p-1 rounded-full mr-3 mt-1">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <p className="text-gray-600 text-sm flex-1">
                          Text extraction using OCR for scanned documents
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-green-100 text-green-600 p-1 rounded-full mr-3 mt-1">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <p className="text-gray-600 text-sm flex-1">
                          Named Entity Recognition for skills and experience
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-green-100 text-green-600 p-1 rounded-full mr-3 mt-1">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <p className="text-gray-600 text-sm flex-1">
                          Semantic analysis for contextual understanding
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 order-1 md:order-2 mb-8 md:mb-0">
                  <div className="inline-block bg-white p-2 rounded-full shadow-md mb-4">
                    <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                      2
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-indigo-600 mb-3">
                    AI Resume Processing
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our Python-based AI engine analyzes resumes using spaCy and
                    NLTK to determine the best job category match. The system
                    evaluates skills, experience duration, education level, and
                    keywords to score each candidate.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-right">
                  <div className="inline-block bg-white p-2 rounded-full shadow-md mb-4">
                    <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                      3
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-3">
                    Admin Review
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    HR managers access our comprehensive dashboard to review
                    pre-screened applications. The interface allows quick status
                    updates, candidate comparisons, and one-click interview
                    scheduling with integrated calendar views.
                  </p>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 text-green-600 p-3 rounded-full mr-4">
                        <FaChartLine className="text-xl" />
                      </div>
                      <h4 className="font-bold text-lg">Dashboard Features</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-blue-600 font-medium text-sm mb-1">
                          Application Status
                        </div>
                        <div className="text-xs text-gray-600">
                          Manage candidate pipeline
                        </div>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <div className="text-orange-600 font-medium text-sm mb-1">
                          Interview Scheduling
                        </div>
                        <div className="text-xs text-gray-600">
                          Calendar integration
                        </div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="text-purple-600 font-medium text-sm mb-1">
                          Candidate Comparison
                        </div>
                        <div className="text-xs text-gray-600">
                          Side-by-side evaluation
                        </div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-green-600 font-medium text-sm mb-1">
                          Analytics
                        </div>
                        <div className="text-xs text-gray-600">
                          Hiring metrics
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 order-2 md:order-1 mt-8 md:mt-0">
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
                        <FaEnvelope className="text-xl" />
                      </div>
                      <h4 className="font-bold text-lg">
                        Automated Notifications
                      </h4>
                    </div>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-200 pl-4">
                        <div className="text-sm font-medium text-gray-700">
                          Application Received
                        </div>
                        <div className="text-xs text-gray-500">
                          Sent immediately after submission
                        </div>
                      </div>
                      <div className="border-l-4 border-green-200 pl-4">
                        <div className="text-sm font-medium text-gray-700">
                          Interview Scheduled
                        </div>
                        <div className="text-xs text-gray-500">
                          With calendar invite attachment
                        </div>
                      </div>
                      <div className="border-l-4 border-orange-200 pl-4">
                        <div className="text-sm font-medium text-gray-700">
                          Status Update
                        </div>
                        <div className="text-xs text-gray-500">
                          Personalized rejection/acceptance
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 order-1 md:order-2 mb-8 md:mb-0">
                  <div className="inline-block bg-white p-2 rounded-full shadow-md mb-4">
                    <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                      4
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-600 mb-3">
                    Candidate Communication
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our system automatically sends personalized,
                    brand-consistent emails at each stage. Candidates receive
                    application confirmations, interview details with calendar
                    integration, and considerate rejection or offer
                    communications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-800">
          Meet Our <span className="text-orange-600">Team</span>
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
          The brilliant minds behind Smart Recruiter's innovative technology
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group relative flex flex-col items-center"
            >
              {/* Image container without zoom effects */}
              <div className="relative overflow-hidden rounded-xl shadow-lg h-80 w-full">
                <div className="w-full h-full flex items-center justify-center overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="min-w-full min-h-full object-cover"
                    style={{
                      objectPosition: "center center",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>

                {/* Gradient overlay - appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Social links - appears on hover */}
                <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-3">
                    <a
                      href={member.social.linkedin}
                      className="bg-white/80 hover:bg-white text-gray-800 hover:text-blue-600 rounded-full p-2 transition-all duration-300"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href={member.social.github}
                      className="bg-white/80 hover:bg-white text-gray-800 hover:text-gray-900 rounded-full p-2 transition-all duration-300"
                    >
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </div>

              {/* Text content below image */}
              <div className="mt-6 w-full text-center px-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {member.name}
                </h3>
                <p className={`text-${member.color}-500 mb-3 font-medium`}>
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-orange-500 to-indigo-600 rounded-2xl p-0.5">
          <div className="bg-white rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Our <span className="text-orange-600">Collaboration</span>{" "}
                  Story
                </h3>
                <p className="text-gray-600 mb-6">
                  We came together as final year computer science students with
                  a shared vision to revolutionize recruitment. Combining our
                  diverse skills in full-stack development, AI, and UX design,
                  we created Smart Recruiter as our Final Year Project.
                </p>
                <p className="text-gray-600">
                  What started as an academic requirement has grown into a
                  passion project we're excited to bring to the professional
                  world.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-100 rounded-full opacity-50"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-100 rounded-full opacity-50"></div>
                  <div className="relative grid grid-cols-3 gap-2 bg-white p-2 rounded-lg shadow-inner">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                      <div
                        key={item}
                        className="aspect-square bg-gray-100 rounded-md"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-gray-800 text-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Our <span className="text-orange-400">Technology</span> Stack
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
            The powerful technologies that make Smart Recruiter possible
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="bg-gray-700 hover:bg-gray-600 p-6 rounded-xl text-center transition-colors duration-300 group"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {typeof tech.icon === "string" ? (
                    <span className={`text-2xl font-bold text-${tech.color}`}>
                      {tech.icon}
                    </span>
                  ) : (
                    <div className={`text-2xl text-${tech.color}`}>
                      {tech.icon}
                    </div>
                  )}
                </div>
                <h3 className="font-bold mb-1">{tech.name}</h3>
                <p className="text-gray-400 text-xs">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative bg-gradient-to-r from-orange-600 to-indigo-700 py-24 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Experience the power of AI-driven recruitment with our Smart
            Recruiter System
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-orange-600 hover:bg-gray-100 py-4 px-10 rounded-lg font-semibold text-lg transition duration-300 shadow-lg hover:shadow-xl">
              Request Demo
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-orange-600 py-4 px-10 rounded-lg font-semibold text-lg transition duration-300 shadow-lg hover:shadow-xl">
              Contact Our Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
