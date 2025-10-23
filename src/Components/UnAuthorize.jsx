import React from "react";
import { MdLock } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }} 
        className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 sm:p-8 bg-gray-800 rounded-2xl shadow-xl border border-purple-500 text-center"
      >
        <div className="flex flex-col items-center">
          <MdLock size={60} className="text-red-500 mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Access Denied</h1>
          <p className="text-sm sm:text-base text-gray-300 mt-2">You don't have permission to view this page.</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          className="mt-6 px-5 py-2 sm:px-6 sm:py-3 bg-purple-600 hover:bg-purple-800 text-white font-semibold rounded-xl shadow-lg transition-all w-full sm:w-auto"
          onClick={() => navigate("/")}
        >
          Go to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AccessDenied;
