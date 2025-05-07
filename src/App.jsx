import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Banner from "./components/Banner/Banner";
import Team from "./components/Team/Team";
import Banner2 from "./components/Banner/Banner2";
import Footer from "./components/Footer/Footer";
import SignIn from "./components/SignIn/SignIn";
import Careers from "./components/Careers/Careers";
import Dashboard from "./components/Dashboard/Dashboard";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import ApplicationsScreen from "./components/Applications/Applications";
import ResumeCategorization from "./components/ResumeCategorization/ResumeCategorization";
import JobScreen from "./components/JobsScreen/JobsScreen";
import NewJobs from "./components/NewJobs/NewJobs";
import Employees from "./components/Employees/Employees";
import AdminAttendanceManagement from "./components/AdminAttendanceManagement/AdminAttendanceManagement";
import InterviewSchedule from "./components/InterviewSchedule/InterviewSchedule";
import AdminInterviewScheduleScreen from "./components/AdminInterviewScheduleScreen/AdminInterviewScheduleScreen";
import AboutUs from "./components/AboutUs/AboutUs";
import InterviewEvaluation from "./components/InterviewEvaluation/InterviewEvaluation";

// Add this script to handle direct URL navigation
// This will be executed when the app first loads
const setupDirectNavigation = () => {
  // Get the current pathname from the URL
  const pathname = window.location.pathname;
  const basePath = "/SRA";

  // If someone accesses a direct URL (e.g., /SRA/signin)
  // React Router won't handle it properly if we're using HashRouter
  // So we'll redirect to the hash version
  if (
    pathname.startsWith(basePath) &&
    pathname !== basePath &&
    pathname !== basePath + "/"
  ) {
    const route = pathname.replace(basePath, "");
    if (route && route !== "/") {
      // Store the intended route
      sessionStorage.setItem("directNavigationTarget", route);
      // Redirect to base with hash
      window.location.href = basePath + "/#" + route;
      return true; // Redirect happened
    }
  }
  return false; // No redirect needed
};

// Run the setup function immediately
const redirected = setupDirectNavigation();

const App = () => {
  // Use HashRouter for better compatibility with static hosting
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/new-jobs" element={<NewJobs />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/applications" element={<ApplicationsScreen />} />
        <Route path="/InterviewSchedule" element={<InterviewSchedule />} />
        <Route
          path="/AdminInterviewScheduleScreen"
          element={<AdminInterviewScheduleScreen />}
        />
        <Route path="/InterviewEvaluation" element={<InterviewEvaluation />} />
        <Route
          path="/AdminAttendanceManagement"
          element={<AdminAttendanceManagement />}
        />
        <Route
          path="/ResumeCategorization"
          element={<ResumeCategorization />}
        />
        <Route path="/JobScreen" element={<JobScreen />} />
      </Routes>
    </HashRouter>
  );
};

const MainApp = () => {
  return (
    <main className="overflow-x-hidden bg-white text-dark">
      <Hero />
      <Services />
      <Banner />
      <Team />
      <Banner2 />
      <Footer />
    </main>
  );
};

export default App;
