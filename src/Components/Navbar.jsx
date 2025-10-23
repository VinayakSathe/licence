import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../Utils/AuthContext.jsx";
import Logo from "../Images/Logo.png";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaIdCard,
  FaCrown,
  FaGem,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaUserPlus,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaBell,
  FaCog,
  FaUserCog,
  FaHistory,
  FaShieldAlt,
  FaChartLine,
  FaCogs
} from "react-icons/fa";

console.log(Logo);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your license application was approved", time: "5 min ago", read: false, type: "success" },
    { id: 2, message: "New feature available: License tracking", time: "1 hour ago", read: true, type: "info" },
    { id: 3, message: "Profile update required", time: "2 days ago", read: true, type: "warning" }
  ]);
  
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useContext(AuthContext);
  const userRoles = user?.roles || [];

  // Redirect admin users to dashboard after login (only once)
  useEffect(() => {
    if (user && userRoles.includes("ADMIN") && location.pathname === "/" && !hasRedirected) {
      setHasRedirected(true);
      navigate("/dashboard");
    }
  }, [user, userRoles, location.pathname, navigate, hasRedirected]);

  // Reset redirect flag when user logs out
  useEffect(() => {
    if (!user) {
      setHasRedirected(false);
    }
  }, [user]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsDropdownOpen(false);
    
    // Mark all as read when opening notifications
    if (!isNotificationsOpen) {
      setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    }
  };

  // Get user initial
  const getUserInitial = () => {
    if (!user?.sub) return "G";
    return user.sub.charAt(0).toUpperCase();
  };

  // Get profile color based on user initial
  const getProfileColor = () => {
    const colors = [
      "from-purple-500 to-pink-500",
      "from-blue-500 to-cyan-500",
      "from-emerald-500 to-teal-500",
      "from-orange-500 to-amber-500",
      "from-violet-500 to-purple-500",
      "from-rose-500 to-pink-500",
    ];
    const initial = getUserInitial();
    const index = initial.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Check if current route is active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleRedirect = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "ADMIN":
        return "bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 border-rose-200";
      case "USER":
        return "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-200";
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border-gray-200";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "ADMIN":
        return <FaShieldAlt className="text-rose-600" />;
      case "USER":
        return <FaUserCog className="text-blue-600" />;
      default:
        return <FaUserCircle className="text-gray-600" />;
    }
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Navigation items based on user role
  const getNavigationItems = () => {
    if (user && userRoles.includes("ADMIN")) {
      // Admin navigation - Home, Dashboard, Services
      return [
        { path: "/", label: "Home", icon: FaHome },
        { path: "/dashboard", label: "Dashboard", icon: FaChartLine },
        { path: "#", label: "Services", icon: FaGem }
      ];
    } else if (user && userRoles.includes("USER")) {
      // User navigation when logged in - Home, Our Services, About, Contact
      return [
        { path: "/", label: "Home", icon: FaHome },
        { path: "/ourservices", label: "OurServices", icon: FaCogs },
        { path: "/about", label: "About", icon: FaInfoCircle },
        { path: "/contact", label: "Contact", icon: FaEnvelope },
      ];
    } else {
      // When not logged in - Home, About, Contact
      return [
        { path: "/", label: "Home", icon: FaHome },
        { path: "/about", label: "About", icon: FaInfoCircle },
        { path: "/contact", label: "Contact", icon: FaEnvelope },
      ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200/60 relative z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with DOST ENTERPRISES */}
          <motion.div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex items-center gap-4">
              {Logo && !imgError ? (
                <motion.div
                  className="h-12 w-12 rounded-xl bg-black flex items-center justify-center shadow-sm"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={Logo}
                    alt="DOST ENTERPRISES Logo"
                    className="h-10 w-10 object-contain"
                    onError={() => setImgError(true)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  className="h-12 w-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-sm"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  DE
                </motion.div>
              )}
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-800 font-sans">
                  DOST ENTERPRISES
                </span>
                <div className="w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-1"></div>
              </div>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-1">
            {navigationItems.map((item) => (
              item.label === "Services" && user && userRoles.includes("ADMIN") ? (
                // Admin Services Dropdown
                <div key={item.path} className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-slate-600 hover:text-cyan-600 hover:bg-slate-50 transition-all duration-300 group"
                  >
                    <FaGem className="text-sm" />
                    Services
                    <FaChevronDown className="text-xs transition-transform duration-200 group-hover:rotate-180" />
                  </motion.button>
                  
                  <div className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                    <div className="p-3">
                      <div className="px-3 py-2 mb-2">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Management</p>
                      </div>
                      {[
                        { path: "/customermanagement", label: "Customers", icon: FaUserCog, color: "text-blue-500" },
                        { path: "/licensemanagement", label: "Licenses", icon: FaIdCard, color: "text-violet-500" },
                        { path: "/licensemanager", label: "Add License", icon: FaCrown, color: "text-emerald-500" },
                      ].map((serviceItem) => (
                        <a
                          key={serviceItem.path}
                          href={serviceItem.path}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200 group/item"
                        >
                          <div className={`p-2 rounded-lg bg-slate-100 group-hover/item:scale-110 transition-transform duration-200 ${serviceItem.color}`}>
                            <serviceItem.icon className="text-sm" />
                          </div>
                          <span className="font-medium group-hover/item:text-slate-900">{serviceItem.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Regular navigation items
                <motion.button
                  key={item.path}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleRedirect(item.path)}
                  className={`relative rounded-xl px-5 py-3 text-sm font-medium transition-all duration-300 group flex items-center gap-2 ${
                    isActiveRoute(item.path)
                      ? "text-cyan-600 bg-cyan-50 border border-cyan-100"
                      : "text-slate-600 hover:text-cyan-600 hover:bg-slate-50"
                  }`}
                >
                  <item.icon className="text-sm" />
                  {item.label}
                  {isActiveRoute(item.path) && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-1 h-1 bg-cyan-500 rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            ))}
          </div>

          {/* Right Side - Notifications & User Profile */}
          <div className="flex items-center gap-3">
            {/* User Profile */}
            {user ? (
              <div className="hidden sm:block relative" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleDropdown}
                  className="flex items-center gap-3 rounded-xl bg-white px-4 py-2.5 text-sm focus:outline-none transition-all duration-200 hover:shadow-lg border border-slate-200/60 group"
                >
                  <motion.div
                    className={`h-9 w-9 rounded-xl bg-gradient-to-r ${getProfileColor()} flex items-center justify-center text-white font-bold text-sm shadow-sm`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {getUserInitial()}
                  </motion.div>
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-medium text-slate-800 truncate max-w-24">
                      {user.sub || "User"}
                    </p>
                    <p className="text-xs text-slate-500 capitalize">
                      {userRoles[0]?.toLowerCase() || "user"}
                    </p>
                  </div>
                  <FaChevronDown className={`text-slate-400 text-xs transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 origin-top-right bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/60 z-50 overflow-hidden"
                    >
                      {/* Profile Header */}
                      <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/60">
                        <div className="flex items-center gap-4">
                          <motion.div
                            className={`h-16 w-16 rounded-2xl bg-gradient-to-r ${getProfileColor()} flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {getUserInitial()}
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-slate-800 truncate">
                              {user.sub || "User"}
                            </h3>
                            <p className="text-sm text-slate-600 mb-2">Welcome back!</p>
                            <div className="flex flex-wrap gap-1.5">
                              {userRoles.map((role, index) => (
                                <span
                                  key={index}
                                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${getRoleBadgeColor(role)}`}
                                >
                                  {getRoleIcon(role)}
                                  {role}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        {userRoles.includes("USER") && (
                          <motion.button
                            whileHover={{ x: 4 }}
                            onClick={() => handleRedirect("/customerlicenselist")}
                            className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200 group"
                          >
                            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                              <FaHistory className="text-blue-600 text-sm" />
                            </div>
                            <div>
                              <p className="font-semibold">License History</p>
                              <p className="text-xs text-slate-500">View your applications</p>
                            </div>
                          </motion.button>
                        )}

                        <motion.button
                          whileHover={{ x: 4 }}
                          onClick={() => handleRedirect("/profile")}
                          className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200 group"
                        >
                          <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                            <FaUserCircle className="text-slate-600 text-sm" />
                          </div>
                          <div>
                            <p className="font-semibold">Profile Settings</p>
                            <p className="text-xs text-slate-500">Manage your account</p>
                          </div>
                        </motion.button>

                        <motion.button
                          whileHover={{ x: 4 }}
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200 group mt-2"
                        >
                          <div className="p-2 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition-colors">
                            <FaSignOutAlt className="text-rose-600 text-sm" />
                          </div>
                          <div>
                            <p className="font-semibold">Sign Out</p>
                            <p className="text-xs text-rose-500">Logout from your account</p>
                          </div>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Login/Signup Buttons
              <div className="hidden sm:flex items-center gap-2">
                <motion.a
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  href="/login"
                  className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-slate-700 hover:text-cyan-600 hover:bg-slate-50 transition-all duration-200 border border-slate-200/60"
                >
                  <FaSignInAlt className="text-sm" />
                  Login
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  href="/register"
                  className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-sm"
                >
                  <FaUserPlus className="text-sm" />
                  Sign Up
                </motion.a>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleMobileMenu}
                className="p-2.5 rounded-xl text-slate-600 hover:text-cyan-600 hover:bg-slate-50 transition-all duration-200 border border-slate-200/60"
              >
                {isMobileMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200/60"
          >
            <div className="px-4 pb-4 pt-3 space-y-1">
              {/* Mobile Navigation */}
              {navigationItems.map((item) => (
                item.label === "Services" && user && userRoles.includes("ADMIN") ? (
                  // Admin Services in mobile
                  <div key={item.path} className="pt-2 border-t border-slate-200/60">
                    <p className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase">Services</p>
                    {[
                      { path: "/customermanagement", label: "Customer Management", icon: FaUserCog },
                      { path: "/licensemanagement", label: "License Management", icon: FaIdCard },
                      { path: "/licensemanager", label: "Add License", icon: FaCrown },
                    ].map((serviceItem) => (
                      <a
                        key={serviceItem.path}
                        href={serviceItem.path}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <serviceItem.icon className="text-sm" />
                        {serviceItem.label}
                      </a>
                    ))}
                  </div>
                ) : (
                  // Regular mobile navigation items
                  <button
                    key={item.path}
                    onClick={() => handleRedirect(item.path)}
                    className={`flex items-center gap-3 w-full rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                      isActiveRoute(item.path)
                        ? "text-cyan-600 bg-cyan-50 border border-cyan-100"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <item.icon className="text-sm" />
                    {item.label}
                  </button>
                )
              ))}

              {/* Mobile Authentication */}
              {!user ? (
                <div className="pt-4 border-t border-slate-200/60 space-y-2">
                  <a
                    href="/login"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200 border border-slate-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaSignInAlt className="text-sm" />
                    Login
                  </a>
                  <a
                    href="/register"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaUserPlus className="text-sm" />
                    Sign Up
                  </a>
                </div>
              ) : (
                <div className="pt-4 border-t border-slate-200/60">
                  {/* Mobile User Info */}
                  <div className="flex items-center gap-3 px-4 py-3 mb-2">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${getProfileColor()} flex items-center justify-center text-white font-bold text-lg`}>
                      {getUserInitial()}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{user.sub || "User"}</p>
                      <p className="text-sm text-slate-500">{userRoles.join(", ")}</p>
                    </div>
                  </div>

                  {/* Mobile User Actions */}
                  {userRoles.includes("USER") && (
                    <button
                      onClick={() => handleRedirect("/customerlicenselist")}
                      className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200 mb-2"
                    >
                      <FaHistory className="text-sm" />
                      My Licenses
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-base font-medium text-rose-600 hover:bg-rose-50 transition-all duration-200"
                  >
                    <FaSignOutAlt className="text-sm" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;