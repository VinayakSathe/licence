import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api1 from "../Utils/api1";
import { AuthContext } from "../Utils/AuthContext";
import { showToast } from "../Utils/toastUtils";
 
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
 
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
 
    try {
      const response = await api1.post("/jwt/login", { username, password });
      if (response.data) {
        await login(response.data);
        showToast("Login successful!", "success");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setError("Invalid response from the server.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
 
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
 
  const floatCloud = {
    y: [0, -20, 0],
    transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
  };
 
  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.4 },
    }),
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-200 to-white relative overflow-hidden">
      {/* Floating Background Clouds */}
      <motion.div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=1200&q=80')] bg-cover bg-center opacity-30"
        animate={floatCloud}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent"></div>
 
      {/* Floating gradient orbs for depth */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-br from-sky-300 to-sky-500 rounded-full blur-3xl opacity-30 top-10 left-10"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-gradient-to-br from-sky-400 to-sky-200 rounded-full blur-3xl opacity-30 bottom-10 right-10"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
 
      {/* Login Card */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="relative z-10 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-[360px]"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div className="bg-black text-white px-3 py-1 rounded-lg text-lg font-semibold shadow-md">
            welcome back!
          </div>
        </motion.div>
 
        <h2 className="text-center text-2xl font-semibold mb-2">
          Sign in with email
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          {/* Make a new doc to bring your words, data, and teams together. For free */}
        </p>
 
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-600 bg-red-100 border border-red-300 p-3 rounded-md text-sm text-center mb-4"
          >
            {error}
          </motion.div>
        )}
 
        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <motion.input
            type="email"
            placeholder="Email"
            custom={0}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />
 
          <motion.input
            type="password"
            placeholder="Password"
            custom={1}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />
 
          <div className="text-right">
            <a href="/forgot-password" className="text-sm text-sky-500 hover:underline">
              Forgot password?
            </a>
          </div>
 
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-gray-800 to-black text-white font-semibold shadow-md transition-all duration-300"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
              ></motion.div>
            ) : (
              "Get Started"
            )}
          </motion.button>
        </form>
 
        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-center text-gray-500"
        >
          Or sign in with
        </motion.div>
 
        {/* Social Buttons */}
        <div className="flex justify-center mt-3 space-x-3">
          {[
            {
              src: "https://www.svgrepo.com/show/475656/google-color.svg",
              alt: "Google",
            },
            {
              src: "https://www.svgrepo.com/show/512120/facebook-176.svg",
              alt: "Facebook",
            },
            {
              src: "https://www.svgrepo.com/show/452210/apple.svg",
              alt: "Apple",
            },
          ].map((item, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 border rounded-full bg-white/70 shadow-md"
              type="button"
            >
              <img src={item.src} alt={item.alt} className="w-6 h-6" />
            </motion.button>
          ))}
        </div>
 
        {/* Register */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center text-sm text-gray-500 mt-6"
        >
          Don’t have an account?{" "}
          <a href="/register" className="text-sky-600 hover:underline font-medium">
            Create account
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}