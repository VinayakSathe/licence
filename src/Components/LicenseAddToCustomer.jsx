import React, { useState, useEffect } from "react";
import api from "../Utils/api1";
import { showToast } from "../Utils/toastUtils";

const LicenseAddToCustomer = ({ customerId, showModal, onClose }) => {
  const [licenses, setLicenses] = useState([]);
  const [selectedLicense, setSelectedLicense] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // Preview modal state
  const [loading, setLoading] = useState(false);

  // Image categories
  const [images, setImages] = useState({
    aadhar: null,
    pan: null,
    voter: null,
  });

  useEffect(() => {
    if (showModal) {
      setError("");
      setSuccessMessage("");
      setSelectedLicense("");
      setImages({ aadhar: null, pan: null, voter: null });
      fetchLicenses();
    }
  }, [showModal]);

  const fetchLicenses = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/licenseList/getLicenseList");
      if (response.data.code === "SUCCESS") {
        setLicenses(response.data.data);
      } else {
        setError("Failed to fetch licenses");
      }
    } catch (err) {
      setError("Error fetching licenses");
    } finally {
      setLoading(false);
    }
  };

  const handleLicenseChange = (e) => {
    setSelectedLicense(e.target.value);
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => ({ ...prev, [type]: file }));
    }
  };

  const removeImage = (type) => {
    setImages((prev) => ({ ...prev, [type]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedLicense) {
      setError("Please select a license");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("customerId", customerId);
      formData.append("licenceId", selectedLicense);
      Object.entries(images).forEach(([key, file]) => {
        if (file) formData.append("images", file);
      });

      const response = await api.patch("api/customer/assignLicence", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.code === "SUCCESS") {
        setSuccessMessage("License and images added successfully!");
        showToast("License and images uploaded!", "success");
        onClose();
      } else {
        setError("Customer already applied for this license.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl mx-auto">
<h2 className="text-xl font-bold mb-4">Add License & Upload Documents</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

          <form onSubmit={handleSubmit}>
            {/* License Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Select License</label>
              <select
                value={selectedLicense}
                onChange={handleLicenseChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a license</option>
                {licenses.map((license) => (
                  <option key={license.licenseID} value={license.licenseID}>
                    {license.licenseName}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload Boxes */}
            <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto p-4">
            {["aadhar", "pan", "voter"].map((doc) => (
              <div key={doc} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {doc.replace(/^\w/, (c) => c.toUpperCase())} Card
                </label>
                <div className="relative w-32 h-32 border-2 border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                  {images[doc] ? (
                    <>
                      <img
                        src={URL.createObjectURL(images[doc])}
                        alt={`${doc} preview`}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => setPreviewImage(URL.createObjectURL(images[doc]))}
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                        onClick={() => removeImage(doc)}
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-gray-500">
                      <img src="/placeholder.png" alt="Upload" className="w-10 h-10 opacity-50" />
                      <span className="text-xs">Click to Upload</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, doc)} />
                    </label>
                  )}
                </div>
              </div>
            ))}
             </div>

            <div className="flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-md">
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Image Preview Modal */}
        {previewImage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="relative">
              <img src={previewImage} alt="Preview" className="max-w-full max-h-[80vh] rounded-lg" />
              <button
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-sm"
                onClick={() => setPreviewImage(null)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default LicenseAddToCustomer;
