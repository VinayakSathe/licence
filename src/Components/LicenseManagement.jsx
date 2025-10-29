import React, { useState, useEffect, useContext } from "react";
import api from "../Utils/api1";
import UpdateStatusPopup from "./UpdateStatusPopup";
import CustomerImgPreviewPopup from "./CustomerDocsPreviewPopup";
import { showConfirm, showToast } from "../Utils/toastUtils";
import { FaRegTrashAlt, FaRegEye, FaFilter, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Utils/AuthContext";

const LicenseManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCustomerImages, setSelectedCustomerImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const usersPerPage = 5;

  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch all customers and licenses
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Close mobile sidebar when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get(
        "api/licenseOfCustomerController/getAllLicenseOfCustomer"
      );
      if (response.data.code === "ALL OK") {
        const licenses = response.data.data;

        const customersMap = new Map();
        licenses.forEach((license) => {
          const customer = license.customer;
          if (!customersMap.has(customer.customerId)) {
            customersMap.set(customer.customerId, {
              ...customer,
              licenceDTOS: [],
            });
          }
          customersMap.get(customer.customerId).licenceDTOS.push(license);
        });

        setCustomers(Array.from(customersMap.values()));
      } else {
        console.error("Failed to fetch customers");
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // Delete license
  const deleteLicense = async (licenseOfCustomerId) => {
    try {
      const confirmation = await showConfirm("Are you sure to delete?");
      if (confirmation) {
        const response = await api.delete(
          `/api/licenseOfCustomerController/deleteLicenseOfCustomer`,
          {
            params: { licenseOfCustomerId: licenseOfCustomerId },
          }
        );
        if (response.data.code === "ALL OK") {
          showToast("License deleted successfully", "success");
          fetchCustomers();
        } else {
          showToast("Failed to delete license", "error");
        }
      }
    } catch (error) {
      console.error("Error deleting license:", error);
      alert("Error deleting license");
    }
  };

  // Handle status update
  const handleStatusChange = (license) => {
    setSelectedLicense(license);
    setIsPopupOpen(true);
  };

  const updateLicenseStatus = async (newStatus) => {
    try {
      const response = await api.patch(
        `api/licenseOfCustomerController/updateStatus`,
        null,
        {
          params: {
            licenseOfCustomerId: selectedLicense.licenseOfCustomerId,
            status: newStatus,
          },
        }
      );
      if (response.data.code === "Success") {
        showToast("License status updated successfully!", "success");
        fetchCustomers();
      } else {
        showToast("Failed to update license status", "error");
      }
    } catch (error) {
      console.error("Error changing license status:", error);
      alert("Error updating license status");
    } finally {
      setIsPopupOpen(false);
      setSelectedLicense(null);
    }
  };

  // Image preview
  const openImagePopup = (images) => {
    if (images.length > 0) {
      setSelectedCustomerImages(images);
      setCurrentImageIndex(0);
      setIsImagePopupOpen(true);
    } else {
      showToast("No images available for this customer", "warning");
    }
  };

  // Filtering and pagination
  const filteredCustomers = customers.filter((customer) =>
    customer.licenceDTOS?.some(
      (lic) =>
        (statusFilter ? lic.status === statusFilter : true) &&
        (customer.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email?.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  const totalPages = Math.ceil(filteredCustomers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Combine customer + license for display
  const customerRows = [];
  currentCustomers.forEach((customer) => {
    customer.licenceDTOS.forEach((license) => {
      if (!statusFilter || license.status === statusFilter) {
        customerRows.push({
          ...customer,
          license,
        });
      }
    });
  });

  // Check user role
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

  // Main license management UI
  const licenseManagementContent = (
    <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
      {/* Mobile Header with Menu Button */}
      {isAdmin && (
        <div className="lg:hidden mb-4 flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200/50">
          <button
            onClick={toggleMobileSidebar}
            className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300"
          >
            {isMobileSidebarOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent font-serif">
            License Management
          </h1>
          <div className="w-8"></div> {/* Spacer for balance */}
        </div>
      )}

      <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen p-4 lg:p-6 rounded-2xl shadow-xl">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-center h-24 mb-8">
          <div className="relative">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent font-serif animate-fade-in-down">
              License Management
            </h1>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-scale-in"></div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6 mb-6 lg:mb-8 p-4 lg:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Filter */}
            <div className="relative group w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400 group-hover:text-cyan-500 transition-colors duration-300" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 bg-white/90 backdrop-blur-sm group-hover:shadow-lg group-hover:border-cyan-300"
              >
                <option value="">Filter By Status</option>
                <option value="ACTIVE">Active</option>
                <option value="RENEW">Renew</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>

            {/* Search */}
            <div className="relative group w-full sm:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 group-hover:text-cyan-500 transition-colors duration-300" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or email..."
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 bg-white/90 backdrop-blur-sm group-hover:shadow-lg group-hover:border-cyan-300"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50 animate-fade-in-up delay-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200/70">
              <thead className="bg-gradient-to-r from-cyan-500 to-blue-500">
                <tr>
                  {[
                    "Sr.No",
                    "Hotel Name",
                    "Fullname",
                    "Mobile Number",
                    "License Name",
                    "Issue Date",
                    "Expiry Date",
                    "License Status",
                    "Actions",
                  ].map((head, i) => (
                    <th
                      key={i}
                      className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-white uppercase tracking-wider animate-fade-in-left"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200/50">
                {customerRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center py-6 text-gray-500 italic"
                    >
                      No records found.
                    </td>
                  </tr>
                ) : (
                  customerRows.map((row, index) => (
                    <tr
                      key={row.customerId + index}
                      className="hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-300 transform hover:scale-[1.01]"
                    >
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm font-semibold text-gray-800">
                        {row.firstName}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-gray-700">
                        {row.lastName}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-gray-700">
                        {row.mobileNumber}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm font-semibold text-cyan-700">
                        {row.license?.licenseName || "No License"}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-gray-600">
                        {row.license?.issueDate
                          ? new Date(row.license.issueDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-gray-600">
                        {row.license?.expiryDate
                          ? new Date(
                              row.license.expiryDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4">
                        <span
                          className={`inline-flex items-center px-2 lg:px-3 py-1 lg:py-1.5 rounded-full text-xs font-semibold ${
                            row.license?.status === "ACTIVE"
                              ? "text-green-700 bg-green-100"
                              : row.license?.status === "RENEW"
                              ? "text-pink-700 bg-pink-100"
                              : row.license?.status === "PENDING"
                              ? "text-amber-700 bg-amber-100"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {row.license?.status || "N/A"}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <button
                          onClick={() => handleStatusChange(row.license)}
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 text-sm lg:text-base w-full sm:w-auto text-center"
                        >
                          Change Status
                        </button>
                        <button
                          onClick={() =>
                            openImagePopup(row.license?.images || [])
                          }
                          className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 lg:px-4 py-2 lg:py-2.5 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 text-sm lg:text-base w-full sm:w-auto"
                        >
                          <FaRegEye className="text-sm" /> View
                        </button>
                        <button
                          onClick={() =>
                            deleteLicense(row.license.licenseOfCustomerId)
                          }
                          className="p-2 lg:p-2.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transform hover:scale-110 transition-all duration-300 w-full sm:w-auto flex items-center justify-center"
                        >
                          <FaRegTrashAlt className="text-sm" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 lg:mt-8 p-4 bg-white/80 rounded-2xl shadow-lg border border-gray-200/50">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-sm lg:text-base"
          >
            Previous
          </button>
          <span className="text-sm lg:text-lg font-semibold text-gray-700">
            Page <span className="text-cyan-600">{currentPage}</span> of{" "}
            <span className="text-blue-600">{totalPages}</span>
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-sm lg:text-base"
          >
            Next
          </button>
        </div>
      </div>

      {/* Popups */}
      {isImagePopupOpen && (
        <CustomerImgPreviewPopup
          images={selectedCustomerImages}
          onClose={() => setIsImagePopupOpen(false)}
        />
      )}
      <UpdateStatusPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onStatusChange={updateLicenseStatus}
      />

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      {isAdmin && (
        <div className={`fixed top-0 left-0 h-full w-64 bg-cyan-600 text-white z-50 transform transition-transform duration-300 lg:hidden ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Admin Panel</h2>
              <button
                onClick={toggleMobileSidebar}
                className="p-2 rounded-lg bg-cyan-700 hover:bg-cyan-800 transition-colors"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => handleNavigation("/dashboard")}
                className="text-left hover:bg-cyan-700 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Dashboard
              </button>
              <button
                onClick={() => handleNavigation("/customermanagement")}
                className="text-left hover:bg-cyan-700 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Customer Management
              </button>
              <button
                onClick={() => handleNavigation("/licensemanagement")}
                className="text-left bg-cyan-700 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                License Management
              </button>
              <button
                onClick={() => handleNavigation("/licensemanager")}
                className="text-left hover:bg-cyan-700 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Add License
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );

  // Admin layout
  if (isAdmin) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-cyan-600 text-white flex-shrink-0 min-h-screen p-6">
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
          <nav className="flex flex-col gap-4">
            <button
              onClick={() => handleNavigation("/dashboard")}
              className="text-left hover:bg-cyan-700 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavigation("/customermanagement")}
              className="text-left hover:bg-cyan-700 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Customer Management
            </button>
            <button
              onClick={() => handleNavigation("/licensemanagement")}
              className="text-left bg-cyan-700 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              License Management
            </button>
            <button
              onClick={() => handleNavigation("/licensemanager")}
              className="text-left hover:bg-cyan-700 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Add License
            </button>
          </nav>
        </aside>
        {licenseManagementContent}
      </div>
    );
  }

  return licenseManagementContent;
};

export default LicenseManagement;