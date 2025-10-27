import React, { useState } from 'react';

const UpdateStatusPopup = ({ isOpen, onClose, onStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = useState(''); // State to hold the selected status

  const handleChange = (e) => {
    setSelectedStatus(e.target.value); // Update selected status
  };

  const handleSubmit = () => {
    if (selectedStatus) {
      onStatusChange(selectedStatus); // Pass the selected status back to the parent
      onClose(); // Close the modal after submitting
    } else {
      alert("Please select a status");
      showToast("Please select a status.","info ")

    }
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-xl font-bold mb-4">Select Status</h2>
        <select
          value={selectedStatus}
          onChange={handleChange}
          className="mb-4 px-4 py-2 border rounded-md"
        >
          <option value="">Select Status</option>
          <option value="NO_STATUS">NO_STATUS</option>
          <option value="PENDING">PENDING</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="REJECTED">REJECTED</option>
          <option value="RENEW">RENEW</option>
        </select>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatusPopup;
