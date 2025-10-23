import React, { useState } from "react";
import api from "../Utils/api1";
import { showToast } from "../Utils/toastUtils";

const EditCustomerPopup = ({ customer, showModal, onClose, fetchCustomers }) => {
  const [updatedCustomer, setUpdatedCustomer] = useState({ ...customer });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch(
        `/api/customer/UpdateLicense`,
        updatedCustomer,
        {
          params: { customerId: customer.customerId },
        }
      );
      if (response.data.code === "SUCCESS") {
        // alert("Customer updated successfully!");
        showToast("Customer Updated...!","success")

        fetchCustomers(); // Refresh customer list
        onClose(); // Close the modal
      } else {
        alert(`Error: ${response.data.message || "Failed to update customer"}`);
      }
    } catch (error) {
      console.error("Error updating customer:", error);
      alert(`Error: ${error.response?.data?.message || "Something went wrong"}`);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Firstname</label>
              <input
                type="text"
                name="firstName"
                value={updatedCustomer.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Lastname</label>
              <input
                type="text"
                name="lastName"
                value={updatedCustomer.lastName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mobile No</label>
            <input
              type="tel"
              name="mobileNumber"
              value={updatedCustomer.mobileNumber}
              onChange={(e) =>
                handleInputChange({
                  target: {
                    name: "mobileNumber",
                    value: e.target.value.replace(/\D/g, ""),
                  },
                })
              }
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              maxLength={10}
              pattern="\d{10}"
              title="Mobile number should be 10 digits"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={updatedCustomer.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={updatedCustomer.city}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Area</label>
            <input
              type="text"
              name="area"
              value={updatedCustomer.area}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={updatedCustomer.pincode}
              onChange={(e) =>
                handleInputChange({
                  target: {
                    name: "pincode",
                    value: e.target.value.replace(/\D/g, ""),
                  },
                })
              }
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              maxLength={6}
              pattern="\d{6}"
              title="Pincode should be 6 digits"
            />
          </div>
        


          <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">State</label>
  <select
    name="state"
    value={updatedCustomer.state}
    onChange={handleInputChange}
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm md:text-sm lg:text-sm"
  >
    <option value="" disabled>Select a state</option>
    <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
    <option value="Assam">Assam</option>
    <option value="Bihar">Bihar</option>
    <option value="Chhattisgarh">Chhattisgarh</option>
    <option value="Goa">Goa</option>
    <option value="Gujarat">Gujarat</option>
    <option value="Haryana">Haryana</option>
    <option value="Himachal Pradesh">Himachal Pradesh</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Kerala">Kerala</option>
    <option value="Madhya Pradesh">Madhya Pradesh</option>
    <option value="Maharashtra">Maharashtra</option>
    <option value="Manipur">Manipur</option>
    <option value="Meghalaya">Meghalaya</option>
    <option value="Mizoram">Mizoram</option>
    <option value="Nagaland">Nagaland</option>
    <option value="Odisha">Odisha</option>
    <option value="Punjab">Punjab</option>
    <option value="Rajasthan">Rajasthan</option>
    <option value="Sikkim">Sikkim</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Telangana">Telangana</option>
    <option value="Uttar Pradesh">Uttar Pradesh</option>
    <option value="Uttarakhand">Uttarakhand</option>
    <option value="West Bengal">West Bengal</option>
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Delhi">Delhi</option>
    <option value="Puducherry">Puducherry</option>
  </select>
</div>




          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerPopup;




























// // Updated code




// import React, { useState } from "react";
// import api from "../Utils/api1";
// import { showToast } from "../Utils/toastUtils";
// import { motion } from "framer-motion";

// const EditCustomerPopup = ({ customer, showModal, onClose, fetchCustomers }) => {
//   const [updatedCustomer, setUpdatedCustomer] = useState({ ...customer });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedCustomer((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.patch(
//         `/api/customer/UpdateLicense`,
//         updatedCustomer,
//         {
//           params: { customerId: customer.customerId },
//         }
//       );
//       if (response.data.code === "SUCCESS") {
//         showToast("Customer Updated...!", "success");
//         fetchCustomers();
//         onClose();
//       } else {
//         alert(`Error: ${response.data.message || "Failed to update customer"}`);
//       }
//     } catch (error) {
//       console.error("Error updating customer:", error);
//       alert(`Error: ${error.response?.data?.message || "Something went wrong"}`);
//     }
//   };

//   if (!showModal) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/60 via-purple-900/50 to-blue-800/70 backdrop-blur-sm z-50"
//     >
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0, y: -30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//         className="bg-gradient-to-br from-white via-blue-50 to-purple-50 p-6 rounded-2xl shadow-2xl w-96 border border-blue-200"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-md">
//           Edit Customer
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Firstname
//               </label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={updatedCustomer.firstName}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
//               />
//             </div>

//             <div className="flex-1">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Lastname
//               </label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={updatedCustomer.lastName}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Mobile No
//             </label>
//             <input
//               type="tel"
//               name="mobileNumber"
//               value={updatedCustomer.mobileNumber}
//               onChange={(e) =>
//                 handleInputChange({
//                   target: {
//                     name: "mobileNumber",
//                     value: e.target.value.replace(/\D/g, ""),
//                   },
//                 })
//               }
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
//               maxLength={10}
//               pattern="\d{10}"
//               title="Mobile number should be 10 digits"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={updatedCustomer.email}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               City
//             </label>
//             <input
//               type="text"
//               name="city"
//               value={updatedCustomer.city}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Area
//             </label>
//             <input
//               type="text"
//               name="area"
//               value={updatedCustomer.area}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Pincode
//             </label>
//             <input
//               type="text"
//               name="pincode"
//               value={updatedCustomer.pincode}
//               onChange={(e) =>
//                 handleInputChange({
//                   target: {
//                     name: "pincode",
//                     value: e.target.value.replace(/\D/g, ""),
//                   },
//                 })
//               }
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
//               maxLength={6}
//               pattern="\d{6}"
//               title="Pincode should be 6 digits"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               State
//             </label>
//             <select
//               name="state"
//               value={updatedCustomer.state}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
//             >
//               <option value="" disabled>
//                 Select a state
//               </option>
//               <option value="Andhra Pradesh">Andhra Pradesh</option>
//               <option value="Arunachal Pradesh">Arunachal Pradesh</option>
//               <option value="Assam">Assam</option>
//               <option value="Bihar">Bihar</option>
//               <option value="Chhattisgarh">Chhattisgarh</option>
//               <option value="Goa">Goa</option>
//               <option value="Gujarat">Gujarat</option>
//               <option value="Haryana">Haryana</option>
//               <option value="Himachal Pradesh">Himachal Pradesh</option>
//               <option value="Jharkhand">Jharkhand</option>
//               <option value="Karnataka">Karnataka</option>
//               <option value="Kerala">Kerala</option>
//               <option value="Madhya Pradesh">Madhya Pradesh</option>
//               <option value="Maharashtra">Maharashtra</option>
//               <option value="Manipur">Manipur</option>
//               <option value="Meghalaya">Meghalaya</option>
//               <option value="Mizoram">Mizoram</option>
//               <option value="Nagaland">Nagaland</option>
//               <option value="Odisha">Odisha</option>
//               <option value="Punjab">Punjab</option>
//               <option value="Rajasthan">Rajasthan</option>
//               <option value="Sikkim">Sikkim</option>
//               <option value="Tamil Nadu">Tamil Nadu</option>
//               <option value="Telangana">Telangana</option>
//               <option value="Uttar Pradesh">Uttar Pradesh</option>
//               <option value="Uttarakhand">Uttarakhand</option>
//               <option value="West Bengal">West Bengal</option>
//               <option value="Andaman and Nicobar Islands">
//                 Andaman and Nicobar Islands
//               </option>
//               <option value="Chandigarh">Chandigarh</option>
//               <option value="Dadra and Nagar Haveli and Daman and Diu">
//                 Dadra and Nagar Haveli and Daman and Diu
//               </option>
//               <option value="Lakshadweep">Lakshadweep</option>
//               <option value="Delhi">Delhi</option>
//               <option value="Puducherry">Puducherry</option>
//             </select>
//           </div>

//           <div className="flex justify-end space-x-4 pt-2">
//             <motion.button
//               type="button"
//               onClick={onClose}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-gray-300 px-4 py-2 rounded-md text-gray-800 hover:bg-gray-400 transition-all"
//             >
//               Cancel
//             </motion.button>
//             <motion.button
//               type="submit"
//               whileHover={{
//                 scale: 1.07,
//                 background: "linear-gradient(to right, #4F46E5, #9333EA)",
//               }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all"
//             >
//               Save Changes
//             </motion.button>
//           </div>
//         </form>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default EditCustomerPopup;
