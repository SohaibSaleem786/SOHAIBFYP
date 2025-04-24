import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Banner from "./components/Banner/Banner";
import Team from "./components/Team/Team";
import Banner2 from "./components/Banner/Banner2";
import Footer from "./components/Footer/Footer";
import SignIn from "./components/SignIn/SignIn"; // Import SignIn component
import Careers from "./components/Careers/Careers";
import Dashboard from "./components/Dashboard/Dashboard";
import UserDashboard from "./components/UserDashboard/UserDashboard";

import ApplicationsScreen from "./components/Applications/Applications";
import ResumeCategorization from "./components/ResumeCategorization/ResumeCategorization";
import JobScreen from "./components/JobsScreen/JobsScreen";
import NewJobs from "./components/NewJobs/NewJobs";
import Employees from "./components/Employees/Employees";
import AdminAttendanceManagement from "./components/AdminAttendanceManagement/AdminAttendanceManagement";

const App = () => {
  return (
    <Router basename="/sohaibfyp">
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="careers" element={<Careers />} />
        <Route path="NewJobs" element={<NewJobs />} />
        <Route path="Employees" element={<Employees />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="UserDashboard" element={<UserDashboard />} />
        <Route path="applications" element={<ApplicationsScreen />} />
        <Route
          path="AdminAttendanceManagement"
          element={<AdminAttendanceManagement />}
        />

        <Route path="ResumeCategorization" element={<ResumeCategorization />} />
        <Route path="JobScreen" element={<JobScreen />} />
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
