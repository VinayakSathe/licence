

// import React, { useState } from "react";
// import api from "../Utils/api1";
// const LicenceAdd = ({ isOpen, onClose,onLicenseAdded }) => {
//   const [licenseName, setLicenseName] = useState("");
//   const [validTill, setValidtill] = useState(""); // State for validity dropdown
//   const [isLoading, setIsLoading] = useState(false);
//   const [responseMessage, setResponseMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setResponseMessage("");

//     try {
//       const response = await api.post("/api/licenseList/saveLicense", {
//         licenseName: licenseName,
//         validTill: validTill, 
    
//       });
//       onLicenseAdded();
//       console.log("Response from license save post: ", response.data);
//       setResponseMessage(response.data.message);
//       setTimeout(() => {
//         setResponseMessage(""); // Clear the message after 2 seconds
//       }, 2000);
//       setLicenseName(""); // Clear the input field after successful submission
//       setValidtill(""); // Clear the validity dropdown
//     } catch (error) {
//       setResponseMessage(
//         error.response?.data?.message || "Failed to save license. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Save License</h2>
//           <button
//             className="text-gray-500 hover:text-gray-700"
//             onClick={onClose}
//           >
//             ✕
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="licenseName" className="block text-sm font-medium text-gray-700">
//               License Name
//             </label>
//             <input
//               id="licenseName"
//               type="text"
//               value={licenseName}
//               onChange={(e) => setLicenseName(e.target.value)}
//               placeholder="Enter license name"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               required
//             />
//           </div>
          
//           <div>
//             <label htmlFor="validTill" className="block text-sm font-medium text-gray-700">
//               Validity
//             </label>
//             <select
//               id="validity"
//               value={validTill}
//               onChange={(e) => setValidtill(parseInt(e.target.value))} // Parse selected value as an integer

//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               required
//             >
//               <option value="" disabled>
//                 Select validity period
//               </option>
//               <option value="1 Year">1 Year</option>
//               <option value="2 Years">2 Years</option>
//               <option value="3 Years">3 Years</option>
//               <option value="Lifetime">Lifetime</option>
//             </select>
//           </div>
//           {responseMessage && (
//             <p
//               className={`text-sm ${
//                 responseMessage.includes("Failed") ? "text-red-500" : "text-green-500"
//               }`}
//             >
//               {responseMessage}
//             </p>
//           )}
//           <div className="flex justify-end space-x-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className={`px-4 py-2 text-white rounded ${
//                 isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
//               }`}
//               disabled={isLoading}
//             >
//               {isLoading ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LicenceAdd;





// import React, { useState } from "react";
// import api from "../Utils/api1";
// const LicenceAdd = ({ isOpen, onClose, onLicenseAdded }) => {
//   const [licenseName, setLicenseName] = useState("");
//   const [validTill, setValidTill] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [responseMessage, setResponseMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setResponseMessage("");
    
//     const formData = new FormData();
    
//     const licenseListDTO = {
//       licenseName,
//       validTill: parseInt(validTill),
//       description,
//     };
    
//     // const formData = new FormData();
//     //   formData.append("customerId", customerId);
//     //   formData.append("licenceId", selectedLicense);
//     //   Object.entries(images).forEach(([key, file]) => {
//     //     if (file) formData.append("images", file);
//     //   });


//       // Convert JSON object to Blob
//   const jsonBlob = new Blob([JSON.stringify(licenseListDTO)], { type: "application/json" });

//   formData.append("licenseListDTO", jsonBlob); // Match your backend param name
//   if (image) {
//     formData.append("image", image); // Ensure backend expects "image"
//   }

//     try {
//       const response = await api.post("/api/licenseList/saveLicense", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       onLicenseAdded();
//       console.log("Response from license save post: ", response.data);
//       setResponseMessage(response.data.message);
//       setTimeout(() => {
//         setResponseMessage("");
//       }, 2000);
//       setLicenseName("");
//       setValidTill("");
//       setDescription("");
//       setImage(null);
//     } catch (error) {
//       setResponseMessage(
//         error.response?.data?.message || "Failed to save license. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Save License</h2>
//           <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
//             ✕
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="licenseName" className="block text-sm font-medium text-gray-700">
//               License Name
//             </label>
//             <input
//               id="licenseName"
//               type="text"
//               value={licenseName}
//               onChange={(e) => setLicenseName(e.target.value)}
//               placeholder="Enter license name"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="validTill" className="block text-sm font-medium text-gray-700">
//               Validity
//             </label>
//             <select
//               id="validTill"
//               value={validTill}
//               onChange={(e) => setValidTill(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               required
//             >
//               <option value="" disabled>
//                 Select validity period
//               </option>
//               <option value="1">1 Year</option>
//               <option value="2">2 Years</option>
//               <option value="3">3 Years</option>
//               <option value="999">Lifetime</option>
//             </select>
//           </div>

//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//               Description
//             </label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Enter license description"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               required
//             ></textarea>
//           </div>

//           <div>
//             <label htmlFor="image" className="block text-sm font-medium text-gray-700">
//               Upload Image
//             </label>
//             <input
//               id="image"
//               type="file"
//               accept="image/*"
//               onChange={(e) => setImage(e.target.files[0])}
//               className="mt-1 block w-full"
//             />

// <img
//                         src={URL.createObjectURL(image)}
//                         alt="image"
//                         className="w-full h-full object-cover cursor-pointer"
//                       />
//           </div>

//           {responseMessage && (
//             <p className={`text-sm ${responseMessage.includes("Failed") ? "text-red-500" : "text-green-500"}`}>
//               {responseMessage}
//             </p>
//           )}
//           <div className="flex justify-end space-x-3">
//             <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className={`px-4 py-2 text-white rounded ${isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
//               disabled={isLoading}
//             >
//               {isLoading ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LicenceAdd;



import React, { useState } from "react";
import api from "../Utils/api1";

const LicenceAdd = ({ isOpen, onClose, onLicenseAdded }) => {
  const [licenseName, setLicenseName] = useState("");
  const [validTill, setValidTill] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState({ IMAGE: null });
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

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
    setIsLoading(true);
    setResponseMessage("");
    
    const formData = new FormData();
    const licenseListDTO = {
      licenseName,
      validTill: parseInt(validTill),
      description,
    };
    
    // const jsonBlob = new Blob([JSON.stringify(licenseListDTO)], { type: "application/json" });
    // formData.append("licenseListDTO", jsonBlob);
    formData.append("licenseListDTOString", JSON.stringify({ licenseName, validTill, description }));

    Object.entries(images).forEach(([key, file]) => {
      if (file) formData.append("images", file);
    });

    try {
      const response = await api.post("/api/licenseList/saveLicense", formData, {
        // headers: { "Content-Type": "multipart/form-data" },
      });
      onLicenseAdded();
      setResponseMessage(response.data.message);
      setTimeout(() => {
        setResponseMessage("");
      }, 2000);
      setLicenseName("");
      setValidTill("");
      setDescription("");
      setImages({ IMAGE: null});
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Failed to save license. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Save License</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
         
        <div className="flex gap-4">

<div className="flex-1">
        <div>
            <label className="block text-sm font-medium text-gray-700">License Name</label>
            <input
              type="text"
              value={licenseName}
              onChange={(e) => setLicenseName(e.target.value)}
              placeholder="Enter license name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Validity</label>
            <select
              value={validTill}
              onChange={(e) => setValidTill(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            >
              <option value="" disabled>Select validity period</option>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3">3 Years</option>
              <option value="999">Lifetime</option>
            </select>
          </div>
          </div>

            {["IMAGE"].map((doc) => (
              <div key={doc} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {doc.replace(/\b\w/g, (c) => c.toUpperCase())} Upload
                </label>
                <div className="relative w-32 h-32 border-2 border-gray-300 rounded-lg flex items-center justify-center">
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
         
         

        

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter license description"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            ></textarea>
          </div>

      

          {responseMessage && <p className={`text-sm ${responseMessage.includes("Failed") ? "text-red-500" : "text-green-500"}`}>{responseMessage}</p>}
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
            <button type="submit" className={`px-4 py-2 text-white rounded ${isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LicenceAdd;