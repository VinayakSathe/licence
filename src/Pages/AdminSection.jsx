
// import React, { useState } from "react";
// // import AdminChart from "../Components/AdminChart";
// import LicenseManagement from "../Components/LicenseManagement";

// import CutomerManagement from "../Components/CustomerManagement";

// const AdminSection = () => {
//   const [activeTab, setActiveTab] = useState("customer");

//   return (
//     <div className="p-1">
//       {/* Toggle Buttons */}
//       <div className="flex justify-center space-x-4 mb-4">
//         <button
//           onClick={() => setActiveTab("customer")}
//           className={`w-88 px-6  text-lg font-medium rounded-md transition-all duration-300 ${
//             activeTab === "customer"
//               ? "bg-purple-800 text-white shadow-lg"
//               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           Customer Management
//         </button>
//         <button
//           onClick={() => setActiveTab("license")}
//           className={`w-88 px-6 text-lg font-medium rounded-md transition-all duration-300 ${
//             activeTab === "license"
//               ? "bg-purple-800 text-white shadow-lg"
//               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           License Management
//         </button>
//       </div>

//       {/* Tab Content */}
//       <div className="border rounded-md bg-gray-50 shadow-md">
//         {/* {activeTab === "license" && <AdminChart />} */}
//         {activeTab === "license" && <LicenseManagement />}

//         {activeTab === "customer" && <CutomerManagement />}
//       </div>
//     </div>
//   );
// };

// export default AdminSection;


