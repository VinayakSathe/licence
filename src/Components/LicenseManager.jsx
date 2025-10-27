import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import LicenceAdd from "./LicenceAdd";
import api from "../Utils/api1";
import { showConfirm, showToast } from "../Utils/toastUtils";
import { 
  FaRegTrashAlt, 
  FaPlus, 
  FaEdit
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Utils/AuthContext";

const LicenseManager = () => {
  const [licenses, setLicenses] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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

  // Main license manager content with light bluish theme
  const licenseManagerContent = (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              License List Management
              <span className="block text-cyan-600 mt-2">Manage All License Types</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Add, edit, and manage all license types available in the system
            </p>
          </div>

          {/* Add License Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={handleOpenPopup}
              className="flex items-center gap-3 bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
            >
              <FaPlus className="text-sm" />
              Add License
            </button>
            <LicenceAdd isOpen={isPopupOpen} onClose={handleClosePopup} onLicenseAdded={fetchLicenses}/>
          </div>

          {/* License Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-cyan-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-cyan-100">
                <thead className="bg-cyan-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      License Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Validity
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-cyan-50">
                  {currentLicenses.map((license, index) => (
                    <tr 
                      key={license.licenseID}
                      className="hover:bg-cyan-50 transition-all duration-300"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-slate-800">
                          {license.licenseName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-cyan-100 text-cyan-700 border border-cyan-200">
                          {license.validTill} {license.validTill === "1" ? "Year" : "Years"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {/* Edit Button */}
                          <button className="p-3 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transform hover:scale-110 transition-all duration-300">
                            <FaEdit className="text-sm" />
                          </button>
                          <button
                            onClick={() => deleteLicense(license.licenseID)}
                            className="p-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transform hover:scale-110 transition-all duration-300"
                          >
                            <FaRegTrashAlt className="text-sm" />
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
          <div className="flex justify-between items-center mt-8 p-6 bg-white rounded-2xl shadow-lg border border-cyan-100">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-xl font-semibold hover:bg-cyan-700 transform hover:scale-105 transition-all duration-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-lg font-semibold text-slate-700">
              Page <span className="text-cyan-600">{currentPage}</span> of <span className="text-cyan-600">{totalPages}</span>
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-xl font-semibold hover:bg-cyan-700 transform hover:scale-105 transition-all duration-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>

          {/* Empty State */}
          {licenses.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4 text-cyan-400">📄</div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-2">No Licenses Available</h3>
              <p className="text-slate-600 mb-6">Get started by adding your first license.</p>
              <button
                onClick={handleOpenPopup}
                className="flex items-center gap-3 bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-cyan-700 transform hover:scale-105 transition-all duration-300 mx-auto"
              >
                <FaPlus className="text-sm" />
                Add Your First License
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Admin layout with sidebar
  if (isAdmin) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Sidebar */}
        <aside className="w-64 bg-cyan-600 text-white flex-shrink-0 min-h-screen p-6">
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
          <nav className="flex flex-col gap-4">
            <a href="/dashboard" className="hover:bg-cyan-700 px-4 py-2 rounded transition">Dashboard</a>
            <a href="/customermanagement" className="hover:bg-cyan-700 px-4 py-2 rounded transition">Customer Management</a>
            <a href="/licensemanagement" className="hover:bg-cyan-700 px-4 py-2 rounded transition">License Management</a>
            <a href="/licensemanager" className="hover:bg-cyan-700 px-4 py-2 rounded transition bg-cyan-700">Add License</a>
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