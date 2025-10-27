import React, { useState, useEffect, useContext } from "react";
import LicenseAddToCustomer from "./LicenseAddToCustomer";
import EditCustomerPopup from "./EditCustomerPopup";
import { showConfirm, showToast } from "../Utils/toastUtils";
import { 
  FaRegEdit, 
  FaRegTrashAlt, 
  FaPlusCircle, 
  FaRegEye
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Utils/AuthContext";
import api from "../Utils/api1";

const CutomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
  const usersPerPage = 6;

  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

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
        // Update local licenses state immediately
        setCurrentCustomerLicenses((prev) =>
          prev.filter((lic) => lic.licenseOfCustomerId !== licenseOfCustomerId)
        );
        // If the license list becomes empty, close the modal, and refresh main list.
        if (currentCustomerLicenses.length === 1) {
             setLicenseModalVisible(false);
             fetchCustomers(); // Refresh the main table after the last license is deleted
        }
      } else {
        showToast("Failed to delete license", "error");
      }
    } catch (error) {
      console.error("Error deleting license:", error);
      alert("Error deleting license");
    }
  };

  const handleCustomerStatusChange = async (customer) => {
    try {
      const present = customer.present === "AVAILABLE" ? "UNAVAILABLE" : "AVAILABLE";

      const response = await api.patch(
        `/api/customer/updateCustomerStatus`,
        null,
        {
          params: {
            customerId: customer.customerId,
            present: present,
          },
        }
      );

      fetchCustomers();

      if (response.data.code === "SUCCESS") {
        showToast("Customer status updated successfully...!", "success");
      } else {
        alert(`Failed to update status: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error updating customer status:", error);
      alert("An error occurred while updating the status.");
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
    fetchCustomers(); // Refresh customer list after edit
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
      (customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

  // Main customer management content
  const customerManagementContent = (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="mb-8 p-4 bg-white rounded-xl shadow-lg border-b-4 border-cyan-500">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center font-sans tracking-wide">
            🏢 Customer Management Dashboard
          </h1>
        </div>
        {/* --- */}

        {/* Filters and Add Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 p-4 bg-white rounded-xl shadow-md">
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 ease-in-out w-full sm:w-52 bg-white text-gray-700"
            >
              <option value="">Filter By Status</option>
              <option value="PENDING">Pending Licenses</option>
              <option value="ACTIVE">Active Licenses</option>
              <option value="EXPIRED">Expired Licenses</option>
            </select>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search change
              }}
              placeholder="Search by hotel name or email..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 ease-in-out w-full sm:w-64"
            />
          </div>
          {/* Add Customer Button */}
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-cyan-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-cyan-700 transition duration-300 ease-in-out transform hover:scale-[1.02]"
          >
            <FaPlusCircle className="text-lg" /> Add New Customer
          </button>
        </div>
        {/* --- */}

        {/* Customer Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-cyan-600 text-white sticky top-0">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                >
                  Hotel Name
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                >
                  Contact Person
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                >
                  Mobile Number
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider"
                >
                  Licenses
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {currentCustomers.length > 0 ? (
                currentCustomers.map((customer, index) => (
                  <tr
                    key={customer.customerId}
                    className="hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-cyan-600">
                      {customer.firstName}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold leading-5 rounded-full ${
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
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {customer.mobileNumber}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      {customer.licenseOfCustomerDTOS &&
                      customer.licenseOfCustomerDTOS.length > 0 ? (
                        <button
                          onClick={() =>
                            openLicenseModal(customer.licenseOfCustomerDTOS)
                          }
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold shadow-sm hover:bg-cyan-200 transition duration-150 transform hover:scale-110"
                          title="View Licenses"
                        >
                          {customer.licenseOfCustomerDTOS.length}
                        </button>
                      ) : (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 text-sm font-bold">
                          0
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {customer.email}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEditClick(customer)}
                          className="p-2 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition duration-150 transform hover:scale-110 shadow-sm"
                          title="Edit Customer"
                        >
                          <FaRegEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteCustomerById(customer.customerId)
                          }
                          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition duration-150 transform hover:scale-110 shadow-sm"
                          title="Delete Customer"
                        >
                          <FaRegTrashAlt className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleAddLicenseClick(customer.customerId)}
                          className="p-2 rounded-full bg-cyan-100 text-cyan-600 hover:bg-cyan-200 transition duration-150 transform hover:scale-110 shadow-sm"
                          title="Add License"
                        >
                          <FaPlusCircle className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500 text-lg">
                    No customers found matching your criteria. 😔
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* --- */}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 p-4 bg-white rounded-xl shadow-md">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:bg-gray-300 disabled:text-gray-500 transition duration-150 ease-in-out transform hover:scale-105"
          >
            &larr; Previous
          </button>
          <span className="text-md font-semibold text-gray-700">
            Page <span className="text-cyan-600">{currentPage}</span> of{" "}
            <span className="text-cyan-600">{totalPages}</span>
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:bg-gray-300 disabled:text-gray-500 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Next &rarr;
          </button>
        </div>
        {/* --- */}

        {/* Add New Customer Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 p-4 transition-opacity duration-300 animate-fadeIn">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition-transform duration-300 animate-scaleUp">
              <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-cyan-600">
                📝 Add New Customer
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Hotel Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={newUser.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition duration-150"
                      placeholder="Hotel Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Contact Fullname
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={newUser.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition duration-150"
                      placeholder="Fullname"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition duration-150"
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    pattern="\d{10}"
                    title="Mobile number should be 10 digits"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition duration-150"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={newUser.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition duration-150"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Area
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={newUser.area}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition duration-150"
                      placeholder="Area"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition duration-150"
                      placeholder="Pincode (6 digits)"
                      maxLength={6}
                      pattern="\d{6}"
                      title="Pincode should be 6 digits"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <select
                      name="state"
                      value={newUser.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-cyan-500 focus:border-cyan-500 transition duration-150"
                    >
                      <option value="" disabled>
                        Select a state
                      </option>
                      {/* States list */}
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      {/* ... other states ... */}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition duration-150 transform hover:scale-105"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition duration-150 transform hover:scale-105 shadow-md"
                  >
                    Add Customer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* --- */}

        {/* License Details Modal */}
        {licenseModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 p-4 transition-opacity duration-300 animate-fadeIn">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-transform duration-300 animate-scaleUp">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-cyan-600 flex items-center gap-2">
                <FaRegEye /> License Details
              </h2>
              {currentCustomerLicenses && currentCustomerLicenses.length > 0 ? (
                <div className="max-h-80 overflow-y-auto space-y-3 pr-2">
                  {currentCustomerLicenses.map((license, index) => (
                    <div
                      key={license.licenseOfCustomerId || index}
                      className="border border-gray-200 p-4 rounded-lg bg-gray-50 relative hover:bg-gray-100 transition duration-150"
                    >
                      <button
                        onClick={() =>
                          handleDeleteLicense(license.licenseOfCustomerId)
                        }
                        className="absolute top-2 right-2 text-red-500 p-1 rounded-full hover:bg-red-100 transition"
                        title="Delete License"
                      >
                        <FaRegTrashAlt className="text-xl" />
                      </button>
                      <p className="text-sm">
                        <strong className="font-semibold text-gray-700">Name:</strong>{" "}
                        {license.licenseName}
                      </p>
                      <p className="text-sm">
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
                      <p className="text-sm">
                        <strong className="font-semibold text-gray-700">Issued:</strong>{" "}
                        {license.issueDate || "N/A"}
                      </p>
                      <p className="text-sm">
                        <strong className="font-semibold text-gray-700">Expiry:</strong>{" "}
                        {license.expiryDate || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No licenses found for this customer. 😟</p>
              )}
              <div className="flex justify-end mt-6 border-t pt-4">
                <button
                  onClick={closeLicenseModal}
                  className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition duration-150 transform hover:scale-105 shadow-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {/* --- */}

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
            <a href="/customermanagement" className="hover:bg-cyan-700 px-4 py-2 rounded transition bg-cyan-700">Customer Management</a>
            <a href="/licensemanagement" className="hover:bg-cyan-700 px-4 py-2 rounded transition">License Management</a>
            <a href="/licensemanager" className="hover:bg-cyan-700 px-4 py-2 rounded transition">Add License</a>
          </nav>
        </aside>

        {/* Main Content */}
        {customerManagementContent}
      </div>
    );
  }

  // For non-admin users, return just the content without sidebar
  return customerManagementContent;
};

export default CutomerManagement;