
import React, { useState, useEffect, useContext } from "react";
import api from "../../Utils/api1";
import { showToast } from "../../Utils/toastUtils";
import { AuthContext } from "../../Utils/AuthContext";
import { FaDownload } from "react-icons/fa"; // Import Download Icon

const LicenseManagement = () => {
  const [data, setData] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const userEmail = user?.sub || "";

  useEffect(() => {
    fetchCustomers(userEmail);
  }, []);

  const fetchCustomers = async (email) => {
    try {
      const response = await api.get(
        "/api/licenseOfCustomerController/getByMailID",
        { params: { mailID: decodeURIComponent(email) } }
      );
      console.log("API Response:", response.data);
   

 
        const userData = response.data.data || [];
        setData(userData);
    

      
    } catch (error) {
      console.error("Error fetching customers:", error);
      showToast("Error fetching customers", "error");
    }
  };

  // Open image popup with multiple images
  const handleImageClick = (images) => {
    if (images.length > 0) {
      setSelectedImages(images);
      setCurrentImageIndex(0);
      setIsImagePopupOpen(true);
    }
  };
  const downloadImage = () => {
    const base64Image = selectedImages[currentImageIndex]; // Get current image
    const link = document.createElement("a");
    link.href = `data:image/jpeg;base64,${base64Image}`;
    link.download = `Document_${currentImageIndex + 1}.jpg`; // Image name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Navigate to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < selectedImages.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Navigate to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : selectedImages.length - 1
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Licenses : </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4">License Name</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">Mobile Number</th>
              <th className="py-2 px-4">Images</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.licenseOfCustomerId} className="border-b">
                <td className="py-2 px-4">{item.licenseName}</td>
                <td className="py-2 px-4">{item.status}</td>
                <td className="py-2 px-4">
                  {`${item.customer.firstName} ${item.customer.lastName}`}
                </td>
                <td className="py-2 px-4">{item.customer.mobileNumber}</td>
                <td className="py-2 px-4">
                  {item.images.length > 0 && (
                    <button
                      onClick={() => handleImageClick(item.images)}
                      className="text-blue-500 underline"
                    >
                      View  ({item.images.length})
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Image Popup */}
      {isImagePopupOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  onClick={() => setIsImagePopupOpen(false)}>
    <div className="bg-gray-300 p-4 rounded-lg shadow-lg w-[800px] h-[700px] flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
    <div className="w-[650px] h-[500px] overflow-hidden flex justify-center items-center">

             <img
              src={`data:image/jpeg;base64,${selectedImages[currentImageIndex]}`}
              alt="License"
              className="max-w-lg max-h-96 mx-auto"
            />
    </div>
    <div className="flex justify-between mt-2 space-x-10">
  <button onClick={prevImage} className="bg-gray-400 text-black px-4 py-2 rounded-lg">
    Prev
  </button>
  <span className="text-sm font-bold">
    {currentImageIndex + 1} / {selectedImages.length}
  </span>
  <button onClick={nextImage} className="bg-gray-400 text-black px-4 py-2 rounded-lg">
    Next
  </button>
</div>



            <div className="flex justify-between mt-2">

            <button
  onClick={downloadImage}
  className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center"
>
  <FaDownload className="mr-2" /> Download
</button>

            {/* <button
              onClick={() => setIsImagePopupOpen(false)}
              className="ml-10 mt-2 bg-gray-800 text-white px-4 py-2 rounded-lg w-full"
            >
              Close
            </button> */}
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LicenseManagement;














// // Updated code


// import React, { useState, useEffect, useContext } from "react";
// import api from "../../Utils/api1";
// import { showToast } from "../../Utils/toastUtils";
// import { AuthContext } from "../../Utils/AuthContext";
// import { FaDownload, FaEye, FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

// const LicenseManagement = () => {
//   const [data, setData] = useState([]);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const { user } = useContext(AuthContext);
//   const userEmail = user?.sub || "";

//   useEffect(() => {
//     fetchCustomers(userEmail);
//   }, []);

//   const fetchCustomers = async (email) => {
//     try {
//       setIsLoading(true);
//       const response = await api.get(
//         "/api/licenseOfCustomerController/getByMailID",
//         { params: { mailID: decodeURIComponent(email) } }
//       );
//       console.log("API Response:", response.data);

//       const userData = response.data.data || [];
//       setData(userData);
//     } catch (error) {
//       console.error("Error fetching customers:", error);
//       showToast("Error fetching customers", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Open image popup with multiple images
//   const handleImageClick = (images) => {
//     if (images.length > 0) {
//       setSelectedImages(images);
//       setCurrentImageIndex(0);
//       setIsImagePopupOpen(true);
//     }
//   };

//   const downloadImage = () => {
//     const base64Image = selectedImages[currentImageIndex];
//     const link = document.createElement("a");
//     link.href = `data:image/jpeg;base64,${base64Image}`;
//     link.download = `Document_${currentImageIndex + 1}.jpg`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     showToast("Image downloaded successfully!", "success");
//   };

//   // Navigate to the next image
//   const nextImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex < selectedImages.length - 1 ? prevIndex + 1 : 0
//     );
//   };

//   // Navigate to the previous image
//   const prevImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex > 0 ? prevIndex - 1 : selectedImages.length - 1
//     );
//   };

//   // Get status badge color
//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'approved':
//         return 'from-green-500 to-emerald-500';
//       case 'pending':
//         return 'from-yellow-500 to-amber-500';
//       case 'rejected':
//         return 'from-red-500 to-pink-500';
//       case 'processing':
//         return 'from-blue-500 to-cyan-500';
//       default:
//         return 'from-gray-500 to-gray-600';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 animate-fade-in">
//       {/* Header */}
//       <div className="mb-8 animate-fade-in-down">
//         <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-700 to-blue-700 bg-clip-text text-transparent mb-2">
//           My Licenses
//         </h2>
//         <p className="text-gray-600">Manage and view your license applications</p>
//         <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-4 animate-fade-in-left"></div>
//       </div>

//       {/* Loading State */}
//       {isLoading ? (
//         <div className="flex justify-center items-center h-64 animate-fade-in">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500"></div>
//         </div>
//       ) : (
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-white/20 animate-fade-in-up">
//           <div className="overflow-x-auto">
//             <table className="min-w-full">
//               <thead>
//                 <tr className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
//                   <th className="py-4 px-6 text-left font-semibold">License Name</th>
//                   <th className="py-4 px-6 text-left font-semibold">Status</th>
//                   <th className="py-4 px-6 text-left font-semibold">Customer</th>
//                   <th className="py-4 px-6 text-left font-semibold">Mobile Number</th>
//                   <th className="py-4 px-6 text-left font-semibold">Documents</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((item, index) => (
//                   <tr 
//                     key={item.licenseOfCustomerId} 
//                     className="border-b border-gray-200 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-300 transform hover:-translate-y-0.5 group animate-fade-in-up"
//                     style={{ animationDelay: `${index * 100}ms` }}
//                   >
//                     <td className="py-4 px-6 font-medium text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
//                       {item.licenseName}
//                     </td>
//                     <td className="py-4 px-6">
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getStatusColor(item.status)} text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300`}>
//                         {item.status}
//                       </span>
//                     </td>
//                     <td className="py-4 px-6 text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
//                       {`${item.customer.firstName} ${item.customer.lastName}`}
//                     </td>
//                     <td className="py-4 px-6 text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
//                       {item.customer.mobileNumber}
//                     </td>
//                     <td className="py-4 px-6">
//                       {item.images.length > 0 && (
//                         <button
//                           onClick={() => handleImageClick(item.images)}
//                           className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group/btn"
//                         >
//                           <FaEye className="mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
//                           View ({item.images.length})
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Empty State */}
//           {data.length === 0 && !isLoading && (
//             <div className="text-center py-16 animate-fade-in">
//               <div className="w-24 h-24 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-4xl">📄</span>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-600 mb-2">No Licenses Found</h3>
//               <p className="text-gray-500">You haven't applied for any licenses yet.</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Image Popup */}
//       {isImagePopupOpen && (
//         <div 
//           className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in"
//           onClick={() => setIsImagePopupOpen(false)}
//         >
//           <div 
//             className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-3xl shadow-2xl w-[90vw] max-w-4xl h-[90vh] max-h-[800px] flex flex-col animate-scale-in border border-white/20"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-700 to-blue-700 bg-clip-text text-transparent">
//                 Document Viewer
//               </h3>
//               <button
//                 onClick={() => setIsImagePopupOpen(false)}
//                 className="p-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full hover:from-gray-600 hover:to-gray-700 transform hover:scale-110 transition-all duration-300 shadow-lg"
//               >
//                 <FaTimes className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Image Container */}
//             <div className="flex-1 bg-gray-800 rounded-2xl overflow-hidden flex justify-center items-center relative group">
//               <img
//                 src={`data:image/jpeg;base64,${selectedImages[currentImageIndex]}`}
//                 alt="License Document"
//                 className="max-w-full max-h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
//               />
              
//               {/* Navigation Arrows */}
//               <button
//                 onClick={prevImage}
//                 className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transform hover:scale-110 transition-all duration-300 shadow-lg backdrop-blur-sm"
//               >
//                 <FaArrowLeft className="w-5 h-5" />
//               </button>
              
//               <button
//                 onClick={nextImage}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transform hover:scale-110 transition-all duration-300 shadow-lg backdrop-blur-sm"
//               >
//                 <FaArrowRight className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Image Counter */}
//             <div className="flex justify-center items-center mt-4 space-x-4">
//               <span className="text-sm font-semibold text-gray-700 bg-white/80 px-4 py-2 rounded-full shadow-lg">
//                 {currentImageIndex + 1} / {selectedImages.length}
//               </span>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-center space-x-4 mt-6">
//               <button
//                 onClick={downloadImage}
//                 className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
//               >
//                 <FaDownload className="mr-2 transform group-hover:scale-110 transition-transform duration-300" />
//                 Download Document
//               </button>
//             </div>

//             {/* Thumbnail Navigation */}
//             {selectedImages.length > 1 && (
//               <div className="mt-6">
//                 <div className="flex justify-center space-x-2 overflow-x-auto py-2">
//                   {selectedImages.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentImageIndex(index)}
//                       className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 transform hover:scale-110 ${
//                         index === currentImageIndex 
//                           ? 'border-cyan-500 shadow-lg scale-110' 
//                           : 'border-gray-300 hover:border-cyan-300'
//                       }`}
//                     >
//                       <img
//                         src={`data:image/jpeg;base64,${image}`}
//                         alt={`Thumbnail ${index + 1}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
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
//         @keyframes scale-in {
//           from {
//             opacity: 0;
//             transform: scale(0.9);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
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
//         .animate-scale-in {
//           animation: scale-in 0.4s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LicenseManagement;