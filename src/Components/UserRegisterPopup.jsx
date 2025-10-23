import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Utils/api1";
 
const Register = () => {
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
 
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      @keyframes gradientBG {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
      .animate-fadeIn { animation: fadeIn 0.6s ease-in forwards; }
      .animate-float { animation: float 6s ease-in-out infinite; }
      .animate-gradientBG {
        animation: gradientBG 15s ease infinite;
        background-size: 800% 800%;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
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
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(270deg, #d0f0fd, #a0d8f7, #81c7e5, #b1d6f7)",
        backgroundSize: "800% 800%",
      }}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 animate-gradientBG -z-10"></div>
 
      {/* Floating background orbs */}
      <div className="absolute w-96 h-96 bg-gradient-to-br from-cyan-300 to-cyan-500 rounded-full blur-3xl opacity-30 animate-float top-10 left-10"></div>
      <div className="absolute w-80 h-80 bg-gradient-to-br from-cyan-400 to-cyan-200 rounded-full blur-3xl opacity-30 animate-float bottom-10 right-10"></div>
 
      {/* Registration Box */}
      <div className="relative bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/40 animate-fadeInUp">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-cyan-700">Create Account</h2>
          <p className="text-gray-500 mt-2">Sign up to get started</p>
        </div>
 
        {error && (
          <div className="text-red-600 bg-red-100 border border-red-300 p-3 rounded-md text-sm text-center animate-fadeIn">
            {error}
          </div>
        )}
 
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <label className="block text-sm text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-400 rounded-lg
                         focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-100
                         hover:border-gray-700 transition-colors duration-300"
              required
            />
          </div>
 
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-400 rounded-lg
                         focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-100
                         hover:border-gray-700 transition-colors duration-300"
              required
            />
          </div>
 
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <label className="block text-sm text-gray-700 mb-1">Mobile Number</label>
            <input
              type="tel"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="w-full px-4 py-3 border border-gray-400 rounded-lg
                         focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-100
                         hover:border-gray-700 transition-colors duration-300"
              required
            />
          </div>
 
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-400 rounded-lg
                         focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-100
                         hover:border-gray-700 transition-colors duration-300"
              required
            />
          </div>
 
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-[1.03]"
          >
            {isLoading ? (
              <div className="flex justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              "Register"
            )}
          </button>
        </form>
 
        <div className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-600 hover:underline font-medium">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};
 
export default Register;