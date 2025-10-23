import React, { useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaDownload } from "react-icons/fa"; // Import Download Icon

const CustomerImgPreviewPopup = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
console.log(images)
  if (!images || images.length === 0) return null; // Prevent errors if no images

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  const downloadImage = () => {
    const base64Image = images; // Get current image
    const link = document.createElement("a");
    link.href = `data:image/jpeg;base64,${base64Image}`;
    link.download = `Document_${currentIndex + 1}.jpg`; // Image name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md z-50"
      onClick={onClose} // Close modal when clicking outside
    >  
      <div 
        className="relative bg-white bg-opacity-10 backdrop-blur-xl p-6 rounded-3xl shadow-lg w-full max-w-4xl flex flex-col items-center border border-gray-200 transition-all duration-300"
        onClick={(e) => e.stopPropagation()} // ✅ Prevents closing when clicking inside
      >
        {/* Download Button (Top-Right) */}
        <button 
          onClick={downloadImage} 
          className="absolute bottom-5 right-5 text-white bg-blue-500 p-2 rounded-full z-50"
        >
          <FaDownload size={20}           onClick={downloadImage} 
          /> 
        </button>

        {/* Image Viewer */}
        <div className="relative flex items-center justify-center w-full">
          {images.length > 1 && (
            <button 
              onClick={handlePrev} 
              className="absolute left-4 text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-80 transition"
            >
              <FaChevronLeft size={32} />
            </button>
          )}

          <img
            src={`data:image/jpeg;base64,${images[currentIndex]}`}
            alt="Customer"
            className="max-w-full max-h-[85vh] rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
          />

          {images.length > 1 && (
            <button 
              onClick={handleNext} 
              className="absolute right-4 text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-80 transition"
            >
              <FaChevronRight size={32} />
            </button>
          )}
        </div>
       
    

        {/* Image Counter */}
        <div className="mt-3 text-white text-sm font-semibold tracking-wide">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default CustomerImgPreviewPopup;
























// // Updated code


// import React, { useState } from "react";
// import { FaTimes, FaChevronLeft, FaChevronRight, FaDownload } from "react-icons/fa";

// const CustomerImgPreviewPopup = ({ images, onClose }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   console.log(images)

//   if (!images || images.length === 0) return null;

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
//   };

//   const downloadImage = () => {
//     const base64Image = images[currentIndex];
//     const link = document.createElement("a");
//     link.href = `data:image/jpeg;base64,${base64Image}`;
//     link.download = `Document_${currentIndex + 1}.jpg`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div 
//       className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-lg z-50 animate-fade-in"
//       onClick={onClose}
//     >  
//       <div 
//         className="relative bg-gradient-to-br from-white/10 to-gray-100/10 backdrop-blur-xl p-6 rounded-3xl shadow-2xl w-full max-w-4xl h-[90vh] max-h-[800px] flex flex-col items-center border border-white/20 transition-all duration-500 transform animate-scale-in hover:shadow-3xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Close Button */}
//         <button 
//           onClick={onClose}
//           className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white p-3 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-50 group"
//         >
//           <FaTimes className="w-5 h-5 transform group-hover:rotate-90 transition-transform duration-300" />
//         </button>

//         {/* Download Button */}
//         <button 
//           onClick={downloadImage} 
//           className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 z-50 group/download flex items-center space-x-2"
//         >
//           <FaDownload className="w-5 h-5 transform group-hover/download:scale-110 transition-transform duration-300" />
//           <span className="text-sm font-semibold">Download</span>
//         </button>

//         {/* Image Viewer Container */}
//         <div className="relative flex items-center justify-center w-full h-full p-4">
//           {/* Navigation Arrows */}
//           {images.length > 1 && (
//             <>
//               <button 
//                 onClick={handlePrev} 
//                 className="absolute left-6 text-white bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-sm rounded-2xl p-4 hover:from-black/80 hover:to-black/60 transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-3xl z-40 group/prev"
//               >
//                 <FaChevronLeft className="w-6 h-6 transform group-hover/prev:-translate-x-1 transition-transform duration-300" />
//               </button>

//               <button 
//                 onClick={handleNext} 
//                 className="absolute right-6 text-white bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-sm rounded-2xl p-4 hover:from-black/80 hover:to-black/60 transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-3xl z-40 group/next"
//               >
//                 <FaChevronRight className="w-6 h-6 transform group-hover/next:translate-x-1 transition-transform duration-300" />
//               </button>
//             </>
//           )}

//           {/* Main Image */}
//           <div className="relative w-full h-full flex items-center justify-center group/image">
//             <img
//               src={`data:image/jpeg;base64,${images[currentIndex]}`}
//               alt="Customer Document"
//               className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl transform group-hover/image:scale-105 transition-transform duration-500 border-4 border-white/20"
//             />
            
//             {/* Image Overlay Effect */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
//           </div>
//         </div>

//         {/* Image Counter & Controls */}
//         <div className="mt-4 flex items-center justify-center space-x-6 w-full">
//           {/* Image Counter */}
//           <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
//             <span className="text-sm font-bold tracking-wide">
//               {currentIndex + 1} / {images.length}
//             </span>
//           </div>

//           {/* Thumbnail Navigation (if multiple images) */}
//           {images.length > 1 && (
//             <div className="flex space-x-2 overflow-x-auto max-w-xs">
//               {images.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentIndex(index)}
//                   className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 transform hover:scale-110 ${
//                     index === currentIndex 
//                       ? 'border-cyan-400 shadow-lg scale-110' 
//                       : 'border-gray-400/50 hover:border-cyan-300'
//                   }`}
//                 >
//                   <img
//                     src={`data:image/jpeg;base64,${image}`}
//                     alt={`Thumbnail ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Additional Controls */}
//         <div className="mt-6 flex space-x-4">
//           {/* Zoom Controls (Placeholder) */}
//           <button className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded-xl hover:from-gray-700 hover:to-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg">
//             Zoom +
//           </button>
//           <button className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded-xl hover:from-gray-700 hover:to-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg">
//             Zoom -
//           </button>
//         </div>

//         {/* Progress Bar (for multiple images) */}
//         {images.length > 1 && (
//           <div className="w-full max-w-md mt-4 bg-gray-600/30 rounded-full h-2">
//             <div 
//               className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
//               style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
//             ></div>
//           </div>
//         )}
//       </div>

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
//         @keyframes scale-in {
//           from {
//             opacity: 0;
//             transform: scale(0.8);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.4s ease-out;
//         }
//         .animate-scale-in {
//           animation: scale-in 0.4s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CustomerImgPreviewPopup;