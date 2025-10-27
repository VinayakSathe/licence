import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../Utils/api1";
 
export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
    roles: "USER",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
 
  //  Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  //  Handle submit logic (same as before)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await api.post("/account/register", formData);
      alert("Registration successful!");
      setFormData({
        name: "",
        email: "",
        mobileNo: "",
        password: "",
        roles: "USER",
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-200 to-white relative overflow-hidden">
      {/* Background Clouds */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=1200&q=80')] bg-cover bg-center opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent"></div>
 
      {/* Registration Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-[380px]"
      >
        {/* Header */}
        <div className="flex justify-center mb-6">
          <div className="bg-black text-white px-3 py-1 rounded-lg text-lg font-semibold">
           Welcome back!
          </div>
        </div>
 
        <h2 className="text-center text-2xl font-semibold mb-2">Create your account</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Join Ebolt and bring your words, data, and teams together.
        </p>
 
        {/* Error message */}
        {error && (
          <div className="text-red-600 bg-red-100 border border-red-300 p-3 rounded-md text-sm text-center mb-4">
            {error}
          </div>
        )}
 
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />
          <input
            type="text"
            name="mobileNo"
            placeholder="Mobile Number"
            value={formData.mobileNo}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />
 
          {/* Register Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-gray-800 to-black text-white font-semibold shadow-md"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>
 
        {/* Footer */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-sky-500 hover:underline font-medium">
            Sign In
          </a>
        </div>
      </motion.div>
    </div>
  );
}
 
 