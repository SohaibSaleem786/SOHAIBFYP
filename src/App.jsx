import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <Router basename="/SRA">
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/new-jobs" element={<NewJobs />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/applications" element={<ApplicationsScreen />} />
        <Route path="/interview-schedule" element={<InterviewSchedule />} />
        <Route
          path="/admin-interview-schedule"
          element={<AdminInterviewScheduleScreen />}
        />
        <Route
          path="/admin-attendance"
          element={<AdminAttendanceManagement />}
        />
        <Route
          path="/resume-categorization"
          element={<ResumeCategorization />}
        />
        <Route path="/jobs" element={<JobScreen />} />
      </Routes>
    </Router>
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
