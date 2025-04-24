import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import axios from "axios";
import {
  FaBars,
  FaPlus,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdBadge,
  FaTrash,
  FaEdit,
  FaSearch,
  FaCalendarAlt,
  FaCheck,
  FaTimes,
  FaClock,
  FaChartBar,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "https://crystalsolutions.com.pk/sohaibfyp";

const AdminAttendanceManagement = () => {
  const [theme, setTheme] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    salary: "",
  });
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedEmployeeForAttendance, setSelectedEmployeeForAttendance] =
    useState(null);
  const [attendanceForm, setAttendanceForm] = useState({
    date: new Date().toISOString().split("T")[0],
    status: "present",
    check_in: "",
    check_out: "",
    notes: "",
  });
  const [showAttendanceReport, setShowAttendanceReport] = useState(false);
  const [reportFilters, setReportFilters] = useState({
    employee_id: "",
    start_date: new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .split("T")[0],
    end_date: new Date().toISOString().split("T")[0],
  });

  // Fetch employees and attendance records
  useEffect(() => {
    fetchEmployees();
    fetchAttendanceRecords();
  }, []);

  const fetchEmployees = () => {
    fetch(`${API_BASE_URL}/getemployee.php`)
      .then((response) => response.json())
      .then((data) => {
        if (data.employees && Array.isArray(data.employees)) {
          setEmployees(data.employees);
        } else {
          console.error("Expected an array of employees, but got:", data);
        }
      })
      .catch((error) => console.error("Error fetching employees:", error));
  };

  const fetchAttendanceRecords = () => {
    fetch(`${API_BASE_URL}/getattendance.php`)
      .then((response) => response.json())
      .then((data) => {
        if (data.records && Array.isArray(data.records)) {
          setAttendanceRecords(data.records);
        } else {
          console.error(
            "Expected an array of attendance records, but got:",
            data
          );
        }
      })
      .catch((error) =>
        console.error("Error fetching attendance records:", error)
      );
  };

  const fetchAttendanceReport = () => {
    const { employee_id, start_date, end_date } = reportFilters;
    let url = `${API_BASE_URL}/getattendance.php`;

    if (employee_id || start_date || end_date) {
      url += `?employee_id=${employee_id}&start_date=${start_date}&end_date=${end_date}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.records && Array.isArray(data.records)) {
          setAttendanceRecords(data.records);
        } else {
          console.error(
            "Expected an array of attendance records, but got:",
            data
          );
        }
      })
      .catch((error) =>
        console.error("Error fetching attendance report:", error)
      );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditMode) {
      setCurrentEmployee({ ...currentEmployee, [name]: value });
    } else {
      setNewEmployee({ ...newEmployee, [name]: value });
    }
  };

  const handleAttendanceInputChange = (e) => {
    const { name, value } = e.target;
    setAttendanceForm({ ...attendanceForm, [name]: value });
  };

  const handleReportFilterChange = (e) => {
    const { name, value } = e.target;
    setReportFilters({ ...reportFilters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = isEditMode
      ? `${API_BASE_URL}/updateemployee.php`
      : `${API_BASE_URL}/saveemployee.php`;
    const data = isEditMode ? currentEmployee : newEmployee;

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error("Error: " + data.error);
        } else {
          toast.success(
            isEditMode
              ? "Employee updated successfully!"
              : "Employee added successfully!"
          );
          resetForm();
          fetchEmployees();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Operation failed. Please try again.");
      });
  };

  const handleMarkAttendance = (employee) => {
    setSelectedEmployeeForAttendance(employee);
    setAttendanceForm({
      date: new Date().toISOString().split("T")[0],
      status: "present",
      check_in: "",
      check_out: "",
      notes: "",
    });
    setShowAttendanceModal(true);
  };

  const handleSubmitAttendance = (e) => {
    e.preventDefault();
    const data = {
      employee_id: selectedEmployeeForAttendance.id,
      ...attendanceForm,
    };

    fetch(`${API_BASE_URL}/markattendance.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data); // Add this line
        if (data.message) {
          toast.success("Attendance marked successfully!");
          setShowAttendanceModal(false);
          fetchAttendanceRecords();
        } else {
          toast.error(
            "Error marking attendance: " + (data.error || "Unknown error")
          );
        }
      })

      .catch((error) => {
        console.error("Error:", error);
        toast.error("Operation failed. Please try again.");
      });
  };

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const data = { id };
      const formData = new URLSearchParams(data).toString();

      axios
        .post(`${API_BASE_URL}/deleteemployee.php`, formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          const { error, message } = response.data;
          if (error === 200) {
            toast.success(message);
            fetchEmployees();
          } else {
            toast.error(message);
          }
        })
        .catch((error) => {
          toast.error("An error occurred during deletion. Please try again.");
        });
    }
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentEmployee(null);
    setNewEmployee({
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      salary: "",
    });
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <FaCheck className="text-green-500" />;
      case "absent":
        return <FaTimes className="text-red-500" />;
      case "late":
        return <FaClock className="text-yellow-500" />;
      case "half_day":
        return <FaClock className="text-orange-500" />;
      default:
        return null;
    }
  };

  const calculateAttendanceStats = () => {
    const stats = {};

    attendanceRecords.forEach((record) => {
      if (!stats[record.employee_id]) {
        stats[record.employee_id] = {
          name: record.employee_name,
          present: 0,
          absent: 0,
          late: 0,
          half_day: 0,
          total: 0,
        };
      }

      stats[record.employee_id][record.status]++;
      stats[record.employee_id].total++;
    });

    return Object.values(stats);
  };

  const attendanceStats = calculateAttendanceStats();

  return (
    <div
      className={`min-h-screen flex ${
        theme === "light"
          ? "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800"
          : "bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100"
      }`}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "light" ? "light" : "dark"}
      />

      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 p-2 rounded-full ${
          theme === "light" ? "bg-white" : "bg-gray-700"
        } shadow-lg sm:hidden`}
      >
        <FaBars
          className={`${theme === "light" ? "text-gray-800" : "text-gray-100"}`}
        />
      </button>

      <Sidebar
        theme={theme}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } sm:ml-64 p-8`}
      >
        <Header theme={theme} toggleTheme={toggleTheme} />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search employees..."
              className={`w-full pl-10 pr-4 py-2 rounded-md ${
                theme === "light" ? "bg-white" : "bg-gray-700"
              } border ${
                theme === "light" ? "border-gray-300" : "border-gray-600"
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch
              className={`absolute left-3 top-3 ${
                theme === "light" ? "text-gray-500" : "text-gray-400"
              }`}
            />
          </div>
          <div className="flex space-x-2 w-full sm:w-auto">
            <button
              onClick={() => setShowAttendanceReport(!showAttendanceReport)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                theme === "light"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-blue-700 text-gray-100 hover:bg-blue-600"
              } transition-all duration-300`}
            >
              <FaChartBar /> <span>Attendance Report</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                theme === "light"
                  ? "bg-[#F58634] text-white hover:bg-[#e5732a]"
                  : "bg-gray-700 text-gray-100 hover:bg-gray-600"
              } transition-all duration-300`}
            >
              <FaPlus /> <span>Add Employee</span>
            </button>
          </div>
        </div>

        {showAttendanceReport && (
          <div
            className={`mb-8 p-4 rounded-lg ${
              theme === "light" ? "bg-white" : "bg-gray-700"
            } shadow-md`}
          >
            <h3 className="text-lg font-semibold mb-4 text-[#F58634]">
              Attendance Report
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block mb-1">Employee</label>
                <select
                  name="employee_id"
                  value={reportFilters.employee_id}
                  onChange={handleReportFilterChange}
                  className={`w-full p-2 rounded-md ${
                    theme === "light" ? "bg-white" : "bg-gray-600"
                  } border ${
                    theme === "light" ? "border-gray-300" : "border-gray-500"
                  }`}
                >
                  <option value="">All Employees</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1">Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={reportFilters.start_date}
                  onChange={handleReportFilterChange}
                  className={`w-full p-2 rounded-md ${
                    theme === "light" ? "bg-white" : "bg-gray-600"
                  } border ${
                    theme === "light" ? "border-gray-300" : "border-gray-500"
                  }`}
                />
              </div>

              <div>
                <label className="block mb-1">End Date</label>
                <input
                  type="date"
                  name="end_date"
                  value={reportFilters.end_date}
                  onChange={handleReportFilterChange}
                  className={`w-full p-2 rounded-md ${
                    theme === "light" ? "bg-white" : "bg-gray-600"
                  } border ${
                    theme === "light" ? "border-gray-300" : "border-gray-500"
                  }`}
                />
              </div>
            </div>

            <button
              onClick={fetchAttendanceReport}
              className={`px-4 py-2 rounded-md ${
                theme === "light"
                  ? "bg-[#F58634] text-white hover:bg-[#e5732a]"
                  : "bg-gray-600 text-gray-100 hover:bg-gray-500"
              }`}
            >
              Generate Report
            </button>

            <div className="mt-6">
              <h4 className="text-md font-semibold mb-2">Attendance Summary</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr
                      className={`${
                        theme === "light" ? "bg-gray-200" : "bg-gray-600"
                      }`}
                    >
                      <th className="p-2 text-left">Employee</th>
                      <th className="p-2 text-center">Present</th>
                      <th className="p-2 text-center">Absent</th>
                      <th className="p-2 text-center">Late</th>
                      <th className="p-2 text-center">Half Day</th>
                      <th className="p-2 text-center">Total Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceStats.length > 0 ? (
                      attendanceStats.map((stat, index) => (
                        <tr
                          key={index}
                          className={`border-b ${
                            theme === "light"
                              ? "border-gray-200 hover:bg-gray-50"
                              : "border-gray-600 hover:bg-gray-800"
                          }`}
                        >
                          <td className="p-2">{stat.name}</td>
                          <td className="p-2 text-center">{stat.present}</td>
                          <td className="p-2 text-center">{stat.absent}</td>
                          <td className="p-2 text-center">{stat.late}</td>
                          <td className="p-2 text-center">{stat.half_day}</td>
                          <td className="p-2 text-center">{stat.total}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="p-4 text-center">
                          No attendance data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-md font-semibold mb-2">Detailed Records</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr
                      className={`${
                        theme === "light" ? "bg-gray-200" : "bg-gray-600"
                      }`}
                    >
                      <th className="p-2 text-left">Employee</th>
                      <th className="p-2 text-left">Date</th>
                      <th className="p-2 text-left">Status</th>
                      <th className="p-2 text-left">Check In</th>
                      <th className="p-2 text-left">Check Out</th>
                      <th className="p-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords.length > 0 ? (
                      attendanceRecords.map((record) => (
                        <tr
                          key={record.id}
                          className={`border-b ${
                            theme === "light"
                              ? "border-gray-200 hover:bg-gray-50"
                              : "border-gray-600 hover:bg-gray-800"
                          }`}
                        >
                          <td className="p-2">{record.employee_name}</td>
                          <td className="p-2">{record.date}</td>
                          <td className="p-2 flex items-center">
                            {getStatusIcon(record.status)}
                            <span className="ml-1 capitalize">
                              {record.status}
                            </span>
                          </td>
                          <td className="p-2">{record.check_in || "-"}</td>
                          <td className="p-2">{record.check_out || "-"}</td>
                          <td className="p-2">{record.notes || "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="p-4 text-center">
                          No attendance records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr
                className={`${
                  theme === "light" ? "bg-gray-200" : "bg-gray-700"
                }`}
              >
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Position</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Salary</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className={`border-b ${
                      theme === "light"
                        ? "border-gray-200 hover:bg-gray-50"
                        : "border-gray-700 hover:bg-gray-800"
                    }`}
                  >
                    <td className="p-3">{employee.name}</td>
                    <td className="p-3">{employee.email}</td>
                    <td className="p-3">{employee.position}</td>
                    <td className="p-3">{employee.department}</td>
                    <td className="p-3">{employee.salary}</td>
                    <td className="p-3 flex space-x-2">
                      <button
                        onClick={() => handleMarkAttendance(employee)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Mark Attendance"
                      >
                        <FaCalendarAlt />
                      </button>
                      <button
                        onClick={() => handleEdit(employee)}
                        className="text-[#F58634] hover:text-[#e5732a]"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
              className={`p-6 rounded-lg shadow-lg w-full max-w-md ${
                theme === "light" ? "bg-white" : "bg-gray-800"
              }`}
            >
              <h2 className="text-xl font-bold mb-4 text-[#F58634]">
                {isEditMode ? "Edit Employee" : "Add New Employee"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={isEditMode ? currentEmployee.name : newEmployee.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full pl-10 p-2 border rounded"
                    required
                  />
                </div>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={
                      isEditMode ? currentEmployee.email : newEmployee.email
                    }
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full pl-10 p-2 border rounded"
                    required
                  />
                </div>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-3 text-gray-500" />
                  <input
                    type="tel"
                    name="phone"
                    value={
                      isEditMode ? currentEmployee.phone : newEmployee.phone
                    }
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className="w-full pl-10 p-2 border rounded"
                    required
                  />
                </div>
                <div className="relative">
                  <FaIdBadge className="absolute left-3 top-3 text-gray-500" />
                  <input
                    type="text"
                    name="position"
                    value={
                      isEditMode
                        ? currentEmployee.position
                        : newEmployee.position
                    }
                    onChange={handleInputChange}
                    placeholder="Position"
                    className="w-full pl-10 p-2 border rounded"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="department"
                  value={
                    isEditMode
                      ? currentEmployee.department
                      : newEmployee.department
                  }
                  onChange={handleInputChange}
                  placeholder="Department"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="salary"
                  value={
                    isEditMode ? currentEmployee.salary : newEmployee.salary
                  }
                  onChange={handleInputChange}
                  placeholder="Salary"
                  className="w-full p-2 border rounded"
                  required
                />
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-[#F58634] text-white hover:bg-[#e5732a]"
                  >
                    {isEditMode ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAttendanceModal && selectedEmployeeForAttendance && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
              className={`p-6 rounded-lg shadow-lg w-full max-w-md ${
                theme === "light" ? "bg-white" : "bg-gray-800"
              }`}
            >
              <h2 className="text-xl font-bold mb-4 text-[#F58634]">
                Mark Attendance for {selectedEmployeeForAttendance.name}
              </h2>
              <form onSubmit={handleSubmitAttendance} className="space-y-4">
                <div>
                  <label className="block mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={attendanceForm.date}
                    onChange={handleAttendanceInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1">Status</label>
                  <select
                    name="status"
                    value={attendanceForm.status}
                    onChange={handleAttendanceInputChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                    <option value="half_day">Half Day</option>
                  </select>
                </div>

                {attendanceForm.status === "present" ||
                attendanceForm.status === "late" ||
                attendanceForm.status === "half_day" ? (
                  <>
                    <div>
                      <label className="block mb-1">Check In Time</label>
                      <input
                        type="time"
                        name="check_in"
                        value={attendanceForm.check_in}
                        onChange={handleAttendanceInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div>
                      <label className="block mb-1">Check Out Time</label>
                      <input
                        type="time"
                        name="check_out"
                        value={attendanceForm.check_out}
                        onChange={handleAttendanceInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </>
                ) : null}

                <div>
                  <label className="block mb-1">Notes</label>
                  <textarea
                    name="notes"
                    value={attendanceForm.notes}
                    onChange={handleAttendanceInputChange}
                    placeholder="Any additional notes..."
                    className="w-full p-2 border rounded"
                    rows="3"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowAttendanceModal(false)}
                    className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-[#F58634] text-white hover:bg-[#e5732a]"
                  >
                    Mark Attendance
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAttendanceManagement;
