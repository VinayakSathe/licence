import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import LicenceAdd from "./LicenceAdd";
import api from "../Utils/api1";
import { showConfirm, showToast } from "../Utils/toastUtils";
import { 
  FaRegTrashAlt, 
  FaPlus, 
  FaEdit,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Utils/AuthContext";

const LicenseManager = () => {
  const [licenses, setLicenses] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const licensesPerPage = 6;
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const fetchLicenses = async () => {
    try {
      const response = await api.get("/api/licenseList/getLicenseList");
      if (response.data && Array.isArray(response.data.data)) {
        setLicenses(response.data.data);
      } else {
        console.error("Unexpected response format", response.data);
      }
    } catch (error) {
      console.error("Error fetching licenses:", error);
    }
  };

  useEffect(() => {
    fetchLicenses();
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

  const totalPages = Math.ceil(licenses.length / licensesPerPage);
  const startIndex = (currentPage - 1) * licensesPerPage;
  const currentLicenses = licenses.slice(startIndex, startIndex + licensesPerPage);

  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const deleteLicense = async (licenseListID) => {
    try {
      const confirmation = await showConfirm("Are you sure you want to Delete License?");

      if (confirmation) {
        const response = await api.delete(`/api/licenseList/deleteLicenseListByID`, {
          params: { licenseListID: licenseListID },
        });

        if (response.data.code === "SUCCESS") {
          showToast("License deleted successfully!", "success");
          setLicenses((prevLicenses) => prevLicenses.filter((license) => license.licenseID !== licenseListID));
        } else {
          showToast(`Failed to delete license: ${response.data.message}`, "error");
        }
      }
    } catch (error) {
      console.error("Error deleting license:", error);
      if (error.response && error.response.status === 409) {
        showToast("Cannot delete license as it is linked to other entities.", "warning");
      } else {
        showToast("An unexpected error occurred while deleting the license.", "error");
      }
    }
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

  // Main license manager content with light bluish theme
  const licenseManagerContent = (
    <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
      {/* Mobile Header with Menu Button */}
      {isAdmin && (
        <div className="lg:hidden mb-4 flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-cyan-100">
          <button
            onClick={toggleMobileSidebar}
            className="p-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 transform hover:scale-105 transition-all duration-300"
          >
            {isMobileSidebarOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
          <h1 className="text-xl font-bold text-cyan-700">
            License Manager
          </h1>
          <div className="w-8"></div> {/* Spacer for balance */}
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-cyan-800 mb-4">
              License List Management
              <span className="block text-blue-600 mt-2 text-lg lg:text-xl">Manage All License Types</span>
            </h1>
            <p className="text-base lg:text-lg text-cyan-700 max-w-2xl mx-auto">
              Add, edit, and manage all license types available in the system
            </p>
          </div>

          {/* Add License Button */}
          <div className="flex justify-end mb-6 lg:mb-8">
            <button
              onClick={handleOpenPopup}
              className="flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 lg:px-6 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 text-sm lg:text-base"
            >
              <FaPlus className="text-sm" />
              Add License
            </button>
            <LicenceAdd isOpen={isPopupOpen} onClose={handleClosePopup} onLicenseAdded={fetchLicenses}/>
          </div>

          {/* License Table */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-cyan-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-cyan-100">
                <thead className="bg-gradient-to-r from-cyan-500 to-blue-500">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      License Name
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Validity
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-cyan-50">
                  {currentLicenses.map((license, index) => (
                    <tr 
                      key={license.licenseID}
                      className="hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-300"
                    >
                      <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-cyan-800">
                          {license.licenseName}
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 lg:px-4 py-1 lg:py-2 rounded-full text-xs lg:text-sm font-semibold bg-cyan-100 text-cyan-700 border border-cyan-300">
                          {license.validTill} {license.validTill === "1" ? "Year" : "Years"}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 lg:gap-3">
                          {/* Edit Button */}
                          <button className="p-2 lg:p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transform hover:scale-110 transition-all duration-300">
                            <FaEdit className="text-xs lg:text-sm" />
                          </button>
                          <button
                            onClick={() => deleteLicense(license.licenseID)}
                            className="p-2 lg:p-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transform hover:scale-110 transition-all duration-300"
                          >
                            <FaRegTrashAlt className="text-xs lg:text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6 lg:mt-8 p-4 lg:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-cyan-200">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:hover:scale-100 disabled:cursor-not-allowed text-sm lg:text-base"
            >
              Previous
            </button>
            <span className="text-sm lg:text-lg font-semibold text-cyan-700">
              Page <span className="text-blue-600">{currentPage}</span> of <span className="text-blue-600">{totalPages}</span>
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:hover:scale-100 disabled:cursor-not-allowed text-sm lg:text-base"
            >
              Next
            </button>
          </div>

          {/* Empty State */}
          {licenses.length === 0 && (
            <div className="text-center py-12 lg:py-16">
              <div className="text-5xl lg:text-6xl mb-4 text-cyan-400">📄</div>
              <h3 className="text-xl lg:text-2xl font-semibold text-cyan-800 mb-2">No Licenses Available</h3>
              <p className="text-cyan-700 mb-6 text-sm lg:text-base">Get started by adding your first license.</p>
              <button
                onClick={handleOpenPopup}
                className="flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 lg:px-6 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 mx-auto text-sm lg:text-base"
              >
                <FaPlus className="text-sm" />
                Add Your First License
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      {isAdmin && (
        <div className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-cyan-600 to-blue-600 text-white z-50 transform transition-transform duration-300 lg:hidden ${
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
                className="text-left hover:bg-cyan-700 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                License Management
              </button>
              <button
                onClick={() => handleNavigation("/licensemanager")}
                className="text-left bg-cyan-700 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Add License
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );

  // Admin layout with sidebar
  if (isAdmin) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-gradient-to-b from-cyan-600 to-blue-600 text-white flex-shrink-0 min-h-screen p-6">
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
              className="text-left hover:bg-cyan-700 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              License Management
            </button>
            <button
              onClick={() => handleNavigation("/licensemanager")}
              className="text-left bg-cyan-700 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Add License
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        {licenseManagerContent}
      </div>
    );
  }

  // For non-admin users, return just the content without sidebar
  return licenseManagerContent;
};

export default LicenseManager;