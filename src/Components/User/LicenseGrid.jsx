import React, { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Utils/api1";
import { AuthContext } from "../../Utils/AuthContext";
import UserRegisterPopup from "../../Components/UserRegisterPopup"; // Import Popup Component

const LicenseGrid = () => {
  const [licenses, setLicenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const [showRegisterPopup, setShowRegisterPopup] = useState(false); // Control popup
  const [selectedLicense, setSelectedLicense] = useState(null); // Store selected license

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        // Make the API request
        const response = await api.get("http://localhost:8080/api/licenseList/getLicenseList");

        // Log response for debugging
        console.log("Response: ", response.data);

        if (response.status === 200) {
          setLicenses(response.data.data || []);
        } else {
          setError("Failed to fetch licenses.");
        }
      } catch (error) {
        console.error("API Error: ", error);
       navigate("/login")
      } finally {
        setIsLoading(false);
      }
    };

    fetchLicenses(); // Call the function to fetch data
  }, []);

  // Loading state
  if (isLoading) {
    return   <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
  </div>;
  }

  // Error state
  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  // Navigate to InterestedUserApplyForm and pass the selected license
  const   handleApply = (licenseName,validTill,images,description) => {
    console.log("Selected License: ", licenseName);
    // navigate("/interesteduserapplyform", { state: { interestedToApply: licenseName } });



    if (user) {
      // If user is logged in, navigate to InterestedUserApplyForm
      navigate("/licensedetail", { state: { licenseName:licenseName,validTill:validTill,images:images,description:description } });
    } else {
      // If user is not logged in, navigate to UserRegistration
      setSelectedLicense(licenseName);
      setShowRegisterPopup(true);    }
  };

  // Displaying available licenses
  return (
    <div className="p-6 bg-slate-100">
      <div className="max-w-3xl mx-auto text-center mt-16">
    
        <p className="text-lg text-gray-800 mb-8">Choose a license below to apply.</p>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {licenses.length > 0 ? (
          licenses.map((license, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-cyan-100 to-teal-500 text-white rounded-lg shadow-lg p-6 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-lg font-semibold text-center text-black">
                {license.licenseName || "Unknown License"}
              </h3>
              <button
                onClick={() => handleApply(license.licenseName)}
                className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-md text-sm focus:outline-none"
              >
                Apply
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">No licenses available.</div>
        )}
      </div> */}





   {/* Services Grid */}

   {licenses.length > 0 ? (
   <div className="px-4  md:px-8 lg:px-16 py-8 font-serif">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {licenses.map((item, index) => (
              <div key={index} className="w-full max-w-sm bg-white border border-cyan-700 rounded-lg shadow-lg">
                <img
                  className="p-4 rounded-t-lg object-cover w-full h-52 md:h-56"
                  src={`data:image/jpeg;base64,${item.images}`}
                  alt="service image"
                />

                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 truncate">
                      {item.licenseName}
                    </h5>
                  </a>
                  <h3 className="text-black mb-1 italic line-clamp-2 text-sm ">
                    {item.subTitle}
                  </h3>

               

                  {/* Pricing Section */}
                  <div className="flex items-center justify-between">
                    
                    <span className="text-xs text-slate-900">(Validity: {item.validTill} year)</span>
                  </div>
                  <div className="flex items-center justify-between">

                  <span className="text-sm  text-gray-900 tracking-tight  line-clamp-2">
                      {item.description}
                    </span>
                    </div>

                  {/* Button Section */}
                  <button
                onClick={() => handleApply(item.licenseName,item.validTill,item.images,item.description)}
                className=" bg-cyan-600 hover:bg-cyan-700flex items-center justify-center w-full rounded-lg  focus:ring-4 focus:outline-none  font-medium text-sm px-5 py-2.5 text-center text-white mt-5"
              >
                Apply
              </button>


                </div>
              </div>
            
          ))}
        </div>
      </div>):(
          <div className="text-center py-6 text-gray-500">No licenses available.</div>
        )}

         {/* User Registration Popup */}
         {showRegisterPopup && (
        <UserRegisterPopup isOpen={showRegisterPopup} onClose={() => setShowRegisterPopup(false)} />
      )}
    </div>
  );
};

export default LicenseGrid;

























// // Updated code

// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../Utils/api1";
// import { AuthContext } from "../../Utils/AuthContext";
// import UserRegisterPopup from "../../Components/UserRegisterPopup";
// import { FaArrowRight, FaClock, FaStar } from "react-icons/fa";

// const LicenseGrid = () => {
//   const [licenses, setLicenses] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { user } = useContext(AuthContext);
//   const [showRegisterPopup, setShowRegisterPopup] = useState(false);
//   const [selectedLicense, setSelectedLicense] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLicenses = async () => {
//       try {
//         const response = await api.get("http://localhost:8080/api/licenseList/getLicenseList");
//         console.log("Response: ", response.data);

//         if (response.status === 200) {
//           setLicenses(response.data.data || []);
//         } else {
//           setError("Failed to fetch licenses.");
//         }
//       } catch (error) {
//         console.error("API Error: ", error);
//         navigate("/login")
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchLicenses();
//   }, []);

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500"></div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="text-center py-6 text-red-500 animate-fade-in">
//         {error}
//       </div>
//     );
//   }

//   const handleApply = (licenseName, validTill, images, description) => {
//     console.log("Selected License: ", licenseName);

//     if (user) {
//       navigate("/licensedetail", { 
//         state: { 
//           licenseName: licenseName, 
//           validTill: validTill, 
//           images: images, 
//           description: description 
//         } 
//       });
//     } else {
//       setSelectedLicense(licenseName);
//       setShowRegisterPopup(true);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 relative overflow-hidden animate-fade-in">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-200 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
//         <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-200 rounded-full blur-3xl opacity-20 animate-pulse-slow delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-teal-200 rounded-full blur-3xl opacity-15 animate-pulse-slow delay-500"></div>
//       </div>

//       {/* Header Section */}
//       <div className="text-center mb-12 animate-fade-in-down">
//         <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-700 to-blue-700 bg-clip-text text-transparent mb-4">
//           Available Licenses
//         </h1>
//         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//           Choose from our comprehensive range of licenses to meet your business needs
//         </p>
//         <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mt-6 animate-fade-in-left"></div>
//       </div>

//       {/* Services Grid */}
//       {licenses.length > 0 ? (
//         <div className="px-4 md:px-8 lg:px-16 py-8 font-serif">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {licenses.map((item, index) => (
//               <div 
//                 key={index} 
//                 className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 overflow-hidden animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 {/* Popular Badge */}
//                 <div className="absolute top-4 right-4 z-10">
//                   <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
//                     Popular
//                   </span>
//                 </div>

//                 {/* Image Section */}
//                 <div className="relative overflow-hidden">
//                   <img
//                     className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
//                     src={`data:image/jpeg;base64,${item.images}`}
//                     alt="service image"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>

//                 {/* Content Section */}
//                 <div className="p-6">
//                   {/* Title and Subtitle */}
//                   <div className="mb-4">
//                     <h5 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 truncate mb-2">
//                       {item.licenseName}
//                     </h5>
//                     <h3 className="text-gray-600 italic line-clamp-2 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
//                       {item.subTitle}
//                     </h3>
//                   </div>

//                   {/* Validity Badge */}
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center space-x-2 bg-gradient-to-r from-cyan-50 to-blue-50 px-3 py-1 rounded-full border border-cyan-200 group-hover:border-cyan-300 transition-colors duration-300">
//                       <FaClock className="text-cyan-500 text-sm" />
//                       <span className="text-xs font-semibold text-cyan-700">
//                         Validity: {item.validTill} year{item.validTill > 1 ? 's' : ''}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <div className="mb-6">
//                     <span className="text-sm text-gray-600 leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
//                       {item.description}
//                     </span>
//                   </div>

//                   {/* Features List */}
//                   <div className="grid grid-cols-2 gap-2 mb-6">
//                     {[
//                       { icon: "✅", text: "Easy Process" },
//                       { icon: "⚡", text: "Quick Approval" },
//                       { icon: "🛡️", text: "Secure" },
//                       { icon: "📞", text: "Support" }
//                     ].map((feature, idx) => (
//                       <div key={idx} className="flex items-center space-x-1">
//                         <span className="text-xs text-green-500">{feature.icon}</span>
//                         <span className="text-xs text-gray-500">{feature.text}</span>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Apply Button */}
//                   <button
//                     onClick={() => handleApply(item.licenseName, item.validTill, item.images, item.description)}
//                     className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group/btn border border-cyan-500/30"
//                   >
//                     <span className="transform group-hover/btn:translate-x-1 transition-transform duration-300">
//                       Apply Now
//                     </span>
//                     <FaArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
//                   </button>
//                 </div>

//                 {/* Hover Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none rounded-2xl"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="text-center py-16 animate-fade-in-up">
//           <div className="w-32 h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
//             <span className="text-6xl">📄</span>
//           </div>
//           <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Licenses Available</h3>
//           <p className="text-gray-500 max-w-md mx-auto">
//             We're currently updating our license offerings. Please check back later for new opportunities.
//           </p>
//         </div>
//       )}

//       {/* User Registration Popup */}
//       {showRegisterPopup && (
//         <UserRegisterPopup isOpen={showRegisterPopup} onClose={() => setShowRegisterPopup(false)} />
//       )}

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
//         @keyframes fade-in-down {
//           from {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes fade-in-left {
//           from {
//             opacity: 0;
//             transform: translateX(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
//         @keyframes pulse-slow {
//           0%, 100% {
//             opacity: 0.2;
//           }
//           50% {
//             opacity: 0.3;
//           }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.6s ease-out;
//         }
//         .animate-fade-in-down {
//           animation: fade-in-down 0.6s ease-out;
//         }
//         .animate-fade-in-up {
//           animation: fade-in-up 0.6s ease-out;
//         }
//         .animate-fade-in-left {
//           animation: fade-in-left 0.6s ease-out;
//         }
//         .animate-pulse-slow {
//           animation: pulse-slow 3s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LicenseGrid;