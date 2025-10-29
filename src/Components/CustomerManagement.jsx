import React, { useState, useEffect, useContext } from "react";
import LicenseAddToCustomer from "./LicenseAddToCustomer";
import EditCustomerPopup from "./EditCustomerPopup";
import { showConfirm, showToast } from "../Utils/toastUtils";
import { 
  FaRegEdit, 
  FaRegTrashAlt, 
  FaPlusCircle, 
  FaRegEye,
  FaSearch,
  FaFilter,
  FaBars,
  FaTimes,
  FaHome,
  FaUsers,
  FaIdCard,
  FaPlus,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Utils/AuthContext";
import api from "../Utils/api1";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    city: "",
    area: "",
    pincode: "",
    state: "",
  });
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddLicenseModal, setShowAddLicenseModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [licenseModalVisible, setLicenseModalVisible] = useState(false);
  const [currentCustomerLicenses, setCurrentCustomerLicenses] = useState([]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Track window width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth <= 1024;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/api/customer/getAllCustomer");
      if (response.data.code === "SUCCESS") {
        setCustomers(response.data.data);
      } else {
        console.error("Failed to fetch customers");
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/customer/saveCustomer", newUser);
      if (response.data.code === "Success") {
        showToast("Customer Added...!", "success");
        fetchCustomers();
        setShowModal(false);
        setNewUser({
          firstName: "",
          lastName: "",
          mobileNumber: "",
          email: "",
          city: "",
          area: "",
          pincode: "",
          state: "",
        });
      } else {
        alert(`Error: ${response.data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error adding customer:", error);
      alert(`Error: ${error.response?.data?.message || "Something went wrong"}`);
    }
  };

  const handleDeleteCustomerById = async (customerId) => {
    try {
      const confirmation = await showConfirm("Are you sure to delete?");
      if (confirmation) {
        const response = await api.delete("/api/customer/DeleteCustomerById", {
          params: { CustomerId: customerId },
        });

        if (response.data.code === "success") {
          fetchCustomers();
          showToast("Customer Deleted...!", "success");
        } else {
          showToast("Failed to delete the customer.", "error");
        }
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Error deleting the customer.");
    }
  };

  const handleDeleteLicense = async (licenseOfCustomerId) => {
    try {
      const confirmation = await showConfirm("Are you sure to delete this license?");
      if (!confirmation) return;

      const response = await api.delete(
        `/api/licenseOfCustomerController/deleteLicenseOfCustomer`,
        {
          params: { licenseOfCustomerId: licenseOfCustomerId },
        }
      );
      if (response.data.code === "ALL OK") {
        showToast("License deleted successfully", "success");
        setCurrentCustomerLicenses((prev) =>
          prev.filter((lic) => lic.licenseOfCustomerId !== licenseOfCustomerId)
        );
        if (currentCustomerLicenses.length === 1) {
          setLicenseModalVisible(false);
          fetchCustomers();
        }
      } else {
        showToast("Failed to delete license", "error");
      }
    } catch (error) {
      console.error("Error deleting license:", error);
      alert("Error deleting license");
    }
  };

  const handleAddLicenseClick = (customerId) => {
    setSelectedCustomerId(customerId);
    setShowAddLicenseModal(true);
  };

  const handleCloseModal = () => {
    setShowAddLicenseModal(false);
    fetchCustomers();
  };

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedCustomer(null);
    fetchCustomers();
  };

  const openLicenseModal = (licenses) => {
    setCurrentCustomerLicenses(licenses);
    setLicenseModalVisible(true);
  };

  const closeLicenseModal = () => {
    setLicenseModalVisible(false);
    setCurrentCustomerLicenses([]);
  };

  // Filter customers based on status and search term
  const filteredCustomers = customers.filter(
    (customer) =>
      (statusFilter
        ? customer.licenseOfCustomerDTOS &&
          customer.licenseOfCustomerDTOS.some((lic) => lic.status === statusFilter)
        : true) &&
      (customer.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const usersPerPage = isMobile ? 4 : (isTablet ? 5 : 6);
  const totalPages = Math.ceil(filteredCustomers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, startIndex + usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Check if user is admin
  const userRoles = user?.roles || [];
  const isAdmin = Array.isArray(userRoles) && userRoles.includes("ADMIN");

  // Mobile sidebar toggle
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileSidebarOpen(false);
  };

  // Mobile Sidebar Component - Icons removed
  const MobileSidebar = () => (
    <>
      {/* Mobile Menu Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-cyan-600 text-white z-50 transform transition-transform duration-300 lg:hidden
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 flex items-center justify-between border-b border-cyan-500">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="p-2 hover:bg-cyan-700 rounded-lg transition-colors"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>
        
        <nav className="flex flex-col gap-1 p-4">
          {[
            { path: "/dashboard", label: "Dashboard" },
            { path: "/customermanagement", label: "Customer Management", active: true },
            { path: "/licensemanagement", label: "License Management" },
            { path: "/licensemanager", label: "Add License" },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                item.active 
                  ? 'bg-cyan-700 text-white shadow-lg' 
                  : 'text-cyan-100 hover:bg-cyan-700 hover:text-white'
              }`}
            >
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );

  // Desktop Sidebar Component - Icons removed
  const DesktopSidebar = () => (
    <aside className="hidden lg:block w-64 bg-cyan-600 text-white flex-shrink-0 min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        {[
          { path: "/dashboard", label: "Dashboard" },
          { path: "/customermanagement", label: "Customer Management", active: true },
          { path: "/licensemanagement", label: "License Management" },
          { path: "/licensemanager", label: "Add License" },
        ].map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
              item.active 
                ? 'bg-cyan-700 text-white shadow-lg' 
                : 'text-cyan-100 hover:bg-cyan-700 hover:text-white'
            }`}
          >
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );

  // Main customer management content
  const customerManagementContent = (
    <div className="flex-1 p-4 lg:p-6 overflow-y-auto min-h-screen">
      {/* Mobile Header with Menu Button - Same as LicenseManagement */}
      {isAdmin && (
        <div className="lg:hidden mb-4 flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200/50">
          <button
            onClick={toggleMobileSidebar}
            className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300"
          >
            {isMobileSidebarOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent font-serif text-center">
            Customer Management
          </h1>
          <div className="w-8"></div> {/* Spacer for balance */}
        </div>
      )}

      <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-full p-4 lg:p-6 rounded-2xl shadow-xl">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-center h-24 mb-8">
          <div className="relative">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent font-serif">
              Customer Management
            </h1>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6 mb-6 lg:mb-8 p-4 lg:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Filter */}
            <div className="relative group w-full sm:w-56 lg:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400 group-hover:text-cyan-500 transition-colors duration-300" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 lg:py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 bg-white/90 backdrop-blur-sm text-sm lg:text-base"
              >
                <option value="">Filter By Status</option>
                <option value="PENDING">Pending Licenses</option>
                <option value="ACTIVE">Active Licenses</option>
                <option value="EXPIRED">Expired Licenses</option>
              </select>
            </div>

            {/* Search */}
            <div className="relative group w-full sm:w-64 lg:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 group-hover:text-cyan-500 transition-colors duration-300" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by hotel name or email..."
                className="pl-10 pr-4 py-2 lg:py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 bg-white/90 backdrop-blur-sm text-sm lg:text-base"
              />
            </div>
          </div>
          
          {/* Add Customer Button */}
          <button
            onClick={() => setShowModal(true)}
            className="w-full lg:w-auto flex items-center justify-center gap-2 bg-cyan-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold hover:bg-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 text-sm lg:text-base mt-4 lg:mt-0"
          >
            <FaPlusCircle className="text-sm lg:text-base" /> 
            Add New Customer
          </button>
        </div>

        {/* Customer Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200/70">
              <thead className="bg-gradient-to-r from-cyan-500 to-blue-500">
                <tr>
                  <th className="px-3 lg:px-4 xl:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-3 lg:px-4 xl:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Hotel Name
                  </th>
                  {!isMobile && (
                    <>
                      <th className="px-3 lg:px-4 xl:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Contact Person
                      </th>
                      <th className="px-3 lg:px-4 xl:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Mobile
                      </th>
                    </>
                  )}
                  <th className="px-3 lg:px-4 xl:px-6 py-3 lg:py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Licenses
                  </th>
                  {!isMobile && (
                    <th className="px-3 lg:px-4 xl:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Email
                    </th>
                  )}
                  <th className="px-3 lg:px-4 xl:px-6 py-3 lg:py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200/50">
                {currentCustomers.length > 0 ? (
                  currentCustomers.map((customer, index) => (
                    <tr 
                      key={customer.customerId}
                      className="hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-300"
                    >
                      <td className="px-3 lg:px-4 xl:px-6 py-3 lg:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-3 lg:px-4 xl:px-6 py-3 lg:py-4 text-sm text-gray-800 font-semibold">
                        {isMobile && customer.firstName?.length > 15 
                          ? customer.firstName.substring(0, 15) + '...' 
                          : customer.firstName}
                      </td>
                      {!isMobile && (
                        <>
                          <td className="px-3 lg:px-4 xl:px-6 py-3 lg:py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 lg:px-3 py-1 text-xs font-semibold leading-5 rounded-full ${
                                customer.present === "AVAILABLE"
                                  ? "bg-green-100 text-green-800"
                                  : customer.present === "UNAVAILABLE"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {customer.lastName}
                            </span>
                          </td>
                          <td className="px-3 lg:px-4 xl:px-6 py-3 lg:py-4 whitespace-nowrap text-sm text-gray-700">
                            {customer.mobileNumber}
                          </td>
                        </>
                      )}
                      <td className="px-3 lg:px-4 xl:px-6 py-3 lg:py-4 whitespace-nowrap text-center">
                        {customer.licenseOfCustomerDTOS &&
                        customer.licenseOfCustomerDTOS.length > 0 ? (
                          <button
                            onClick={() =>
                              openLicenseModal(customer.licenseOfCustomerDTOS)
                            }
                            className="inline-flex items-center justify-center w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-cyan-100 text-cyan-700 text-xs lg:text-sm font-bold shadow-sm hover:bg-cyan-200 transition duration-150 transform hover:scale-110"
                            title="View Licenses"
                          >
                            {customer.licenseOfCustomerDTOS.length}
                          </button>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gray-100 text-gray-500 text-xs lg:text-sm font-bold">
                            0
                          </span>
                        )}
                      </td>
                      {!isMobile && (
                        <td className="px-3 lg:px-4 xl:px-6 py-3 lg:py-4 whitespace-nowrap text-sm text-gray-700">
                          {isTablet && customer.email?.length > 20 
                            ? customer.email.substring(0, 20) + '...' 
                            : customer.email}
                        </td>
                      )}
                      <td className="px-3 lg:px-4 xl:px-6 py-3 lg:py-4 whitespace-nowrap text-sm font-medium text-center">
                        <div className="flex justify-center gap-1 lg:gap-2">
                          <button
                            onClick={() => handleEditClick(customer)}
                            className="p-1 lg:p-2 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition duration-150 transform hover:scale-110 shadow-sm"
                            title="Edit Customer"
                          >
                            <FaRegEdit className="text-sm lg:text-base" />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteCustomerById(customer.customerId)
                            }
                            className="p-1 lg:p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition duration-150 transform hover:scale-110 shadow-sm"
                            title="Delete Customer"
                          >
                            <FaRegTrashAlt className="text-sm lg:text-base" />
                          </button>
                          <button
                            onClick={() => handleAddLicenseClick(customer.customerId)}
                            className="p-1 lg:p-2 rounded-full bg-cyan-100 text-cyan-600 hover:bg-cyan-200 transition duration-150 transform hover:scale-110 shadow-sm"
                            title="Add License"
                          >
                            <FaPlusCircle className="text-sm lg:text-base" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={isMobile ? "4" : "7"} className="px-4 lg:px-6 py-6 lg:py-8 text-center text-gray-500 text-sm lg:text-lg">
                      No customers found matching your criteria. 😔
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination - Same as LicenseManagement */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 lg:mt-8 p-4 lg:p-6 bg-white/80 rounded-2xl shadow-lg border border-gray-200/50">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:hover:scale-100 disabled:cursor-not-allowed text-sm lg:text-base w-full sm:w-auto justify-center"
          >
            <FaChevronLeft className="text-sm" />
            Previous
          </button>
          <span className="text-sm lg:text-lg font-semibold text-gray-700 text-center">
            Page <span className="text-cyan-600">{currentPage}</span> of <span className="text-blue-600">{totalPages}</span>
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:hover:scale-100 disabled:cursor-not-allowed text-sm lg:text-base w-full sm:w-auto justify-center"
          >
            Next
            <FaChevronRight className="text-sm" />
          </button>
        </div>

        {/* Add New Customer Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 p-4 transition-opacity duration-300">
            <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-2xl w-full max-w-md lg:max-w-lg transform transition-transform duration-300 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 border-b pb-2 text-cyan-600">
                📝 Add New Customer
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 mb-3 lg:mb-4">
                  <div>
                    <label className="block text-sm lg:text-base font-medium text-gray-700">
                      Hotel Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={newUser.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 text-sm lg:text-base"
                      placeholder="Hotel Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm lg:text-base font-medium text-gray-700">
                      Contact Fullname
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={newUser.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 text-sm lg:text-base"
                      placeholder="Fullname"
                    />
                  </div>
                </div>
                <div className="mb-3 lg:mb-4">
                  <label className="block text-sm lg:text-base font-medium text-gray-700">
                    Mobile No
                  </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={newUser.mobileNumber}
                      onChange={(e) =>
                        handleInputChange({
                          target: {
                            name: "mobileNumber",
                            value: e.target.value.replace(/\D/g, ""),
                          },
                        })
                      }
                      required
                      className="w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 text-sm lg:text-base"
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                      pattern="\d{10}"
                      title="Mobile number should be 10 digits"
                    />
                </div>
                <div className="mb-3 lg:mb-4">
                  <label className="block text-sm lg:text-base font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 text-sm lg:text-base"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 mb-3 lg:mb-4">
                  <div>
                    <label className="block text-sm lg:text-base font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={newUser.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 text-sm lg:text-base"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm lg:text-base font-medium text-gray-700">
                      Area
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={newUser.area}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 text-sm lg:text-base"
                      placeholder="Area"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6">
                  <div>
                    <label className="block text-sm lg:text-base font-medium text-gray-700">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={newUser.pincode}
                      onChange={(e) =>
                        handleInputChange({
                          target: {
                            name: "pincode",
                            value: e.target.value.replace(/\D/g, ""),
                          },
                        })
                      }
                      required
                      className="w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 text-sm lg:text-base"
                      placeholder="Pincode (6 digits)"
                      maxLength={6}
                      pattern="\d{6}"
                      title="Pincode should be 6 digits"
                    />
                  </div>
                  <div>
                    <label className="block text-sm lg:text-base font-medium text-gray-700">
                      State
                    </label>
                    <select
                      name="state"
                      value={newUser.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 text-sm lg:text-base"
                    >
                      <option value="" disabled>
                        Select a state
                      </option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 lg:space-x-4 pt-3 lg:pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-200 text-gray-700 px-4 lg:px-6 py-2 rounded-lg hover:bg-gray-300 transition duration-150 text-sm lg:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-cyan-600 text-white px-4 lg:px-6 py-2 rounded-lg hover:bg-cyan-700 transition duration-150 shadow-md text-sm lg:text-base"
                  >
                    Add Customer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* License Details Modal */}
        {licenseModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 p-4 transition-opacity duration-300">
            <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-2xl w-full max-w-xs lg:max-w-md transform transition-transform duration-300 max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4 border-b pb-2 text-cyan-600 flex items-center gap-2">
                <FaRegEye /> License Details
              </h2>
              {currentCustomerLicenses && currentCustomerLicenses.length > 0 ? (
                <div className="max-h-60 lg:max-h-80 overflow-y-auto space-y-2 lg:space-y-3 pr-2">
                  {currentCustomerLicenses.map((license, index) => (
                    <div
                      key={license.licenseOfCustomerId || index}
                      className="border border-gray-200 p-3 lg:p-4 rounded-lg bg-gray-50 relative hover:bg-gray-100 transition duration-150"
                    >
                      <button
                        onClick={() =>
                          handleDeleteLicense(license.licenseOfCustomerId)
                        }
                        className="absolute top-2 right-2 text-red-500 p-1 rounded-full hover:bg-red-100 transition"
                        title="Delete License"
                      >
                        <FaRegTrashAlt className="text-base lg:text-lg" />
                      </button>
                      <p className="text-sm lg:text-base">
                        <strong className="font-semibold text-gray-700">Name:</strong>{" "}
                        {license.licenseName}
                      </p>
                      <p className="text-sm lg:text-base">
                        <strong className="font-semibold text-gray-700">Status:</strong>{" "}
                        <span
                          className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                            license.status === "ACTIVE"
                              ? "bg-green-200 text-green-800"
                              : license.status === "EXPIRED"
                              ? "bg-red-200 text-red-800"
                              : "bg-yellow-200 text-yellow-800"
                          }`}
                        >
                          {license.status}
                        </span>
                      </p>
                      <p className="text-sm lg:text-base">
                        <strong className="font-semibold text-gray-700">Issued:</strong>{" "}
                        {license.issueDate || "N/A"}
                      </p>
                      <p className="text-sm lg:text-base">
                        <strong className="font-semibold text-gray-700">Expiry:</strong>{" "}
                        {license.expiryDate || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm lg:text-base">No licenses found for this customer. 😟</p>
              )}
              <div className="flex justify-end mt-4 lg:mt-6 border-t pt-3 lg:pt-4">
                <button
                  onClick={closeLicenseModal}
                  className="bg-cyan-600 text-white px-4 lg:px-6 py-2 rounded-lg hover:bg-cyan-700 transition duration-150 shadow-md text-sm lg:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Customer Popup */}
        {showEditModal && (
          <EditCustomerPopup
            customer={selectedCustomer}
            showModal={showEditModal}
            onClose={handleCloseEditModal}
            fetchCustomers={fetchCustomers}
          />
        )}

        {/* Add License Modal */}
        <LicenseAddToCustomer
          customerId={selectedCustomerId}
          showModal={showAddLicenseModal}
          onClose={handleCloseModal}
        />
      </div>

      {/* Mobile Sidebar */}
      {isAdmin && <MobileSidebar />}
    </div>
  );

  // Admin layout with sidebar - Same as LicenseManagement
  if (isAdmin) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <DesktopSidebar />
        {customerManagementContent}
      </div>
    );
  }

  // For non-admin users, return just the content without sidebar
  return customerManagementContent;
};

export default CustomerManagement;