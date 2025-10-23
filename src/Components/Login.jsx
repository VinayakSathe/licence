import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api1 from "../Utils/api1";
import { AuthContext } from "../Utils/AuthContext";
import { showToast } from "../Utils/toastUtils";
 
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
 
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
 
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(270deg, #d0f0fd, #a0d8f7, #81c7e5, #b1d6f7)", // Light cyan gradient
        backgroundSize: "800% 800%",
      }}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 animate-gradientBG -z-10"></div>
 
      {/* Floating background orbs */}
      <div className="absolute w-96 h-96 bg-gradient-to-br from-cyan-300 to-cyan-500 rounded-full blur-3xl opacity-30 animate-float top-10 left-10"></div>
      <div className="absolute w-80 h-80 bg-gradient-to-br from-cyan-400 to-cyan-200 rounded-full blur-3xl opacity-30 animate-float bottom-10 right-10"></div>
 
      {/* Login Box */}
      <div className="relative bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/40 animate-fadeInUp">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-cyan-700">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Login to continue your journey</p>
        </div>
 
        {error && (
          <div className="text-red-600 bg-red-100 border border-red-300 p-3 rounded-md text-sm text-center animate-fadeIn">
            {error}
          </div>
        )}
 
        <form onSubmit={handleLogin} className="space-y-5 mt-4">
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-400 rounded-lg
                         focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-100
                         hover:border-gray-700 transition-colors duration-300"
              required
            />
          </div>
 
          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm text-cyan-600 hover:underline"
            >
              Forgot password?
            </a>
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
              "Sign In"
            )}
          </button>
        </form>
 
        <div className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-cyan-600 hover:underline font-medium"
          >
            Create account
          </a>
        </div>
      </div>
    </div>
  );
};
 
export default Login;