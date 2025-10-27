import React, { createContext, useState, useEffect } from "react";
import { decodeToken } from "./authUtils";
import Navbar from "../Components/Navbar";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = decodeToken(token);
      setUser(decodedUser);
    }
  }, []);

  // Login function
  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedUser = decodeToken(token);
    setUser(decodedUser); // Update user state
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null); // Reset user state
    window.location.href = "/login"; // Redirect to login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;