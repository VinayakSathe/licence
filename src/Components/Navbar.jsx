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

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  const dropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  const authDropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useContext(AuthContext);
  const userRoles = user?.roles || [];

  // Reset all UI states when user changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    setIsServicesDropdownOpen(false);
    setIsAuthDropdownOpen(false);
  }, [user]);

  // Track window width for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      
      // Close mobile menu when resizing to desktop
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Check device type for responsive behavior
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth <= 1024;
  const isDesktop = windowWidth > 1024;

  // Check if current route is auth page (login/register)
  const isAuthPage = () => {
    return location.pathname === "/login" || location.pathname === "/register";
  };

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
    // Close other dropdowns when mobile menu opens
    if (!isMobileMenuOpen) {
      setIsDropdownOpen(false);
      setIsServicesDropdownOpen(false);
      setIsAuthDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsServicesDropdownOpen(false);
    setIsAuthDropdownOpen(false);
  };

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
    setIsDropdownOpen(false);
    setIsAuthDropdownOpen(false);
  };

  const toggleAuthDropdown = () => {
    setIsAuthDropdownOpen(!isAuthDropdownOpen);
    setIsDropdownOpen(false);
    setIsServicesDropdownOpen(false);
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
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesDropdownOpen(false);
      }
      if (authDropdownRef.current && !authDropdownRef.current.contains(event.target)) {
        setIsAuthDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Check if current route is active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleRedirect = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
    setIsServicesDropdownOpen(false);
    setIsAuthDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    // Close all UI elements first
    setIsDropdownOpen(false);
    setIsServicesDropdownOpen(false);
    setIsAuthDropdownOpen(false);
    setIsMobileMenuOpen(false);
    
    // Then perform logout
    await logout();
    
    // Redirect to home page after logout
    navigate("/");
  };

  // Navigation items based on user role and page context
  const getNavigationItems = () => {
    // If on auth pages (login/register), show user navigation regardless of actual role
    if (isAuthPage()) {
      return [
        { path: "/", label: "Home", icon: FaHome },
        { path: "/ourservices", label: "Services", icon: FaCogs },
        { path: "/about", label: "About", icon: FaInfoCircle },
        { path: "/contact", label: "Contact", icon: FaEnvelope },
      ];
    }
    
    // Regular role-based navigation for other pages
    if (user && userRoles.includes("ADMIN")) {
      return [
        { path: "/", label: "Home", icon: FaHome },
        { path: "/dashboard", label: "Dashboard", icon: FaChartLine },
        { path: "#", label: "Services", icon: FaGem, isDropdown: true }
      ];
    } else if (user && userRoles.includes("USER")) {
      return [
        { path: "/", label: "Home", icon: FaHome },
        { path: "/ourservices", label: "Services", icon: FaCogs },
        { path: "/about", label: "About", icon: FaInfoCircle },
        { path: "/contact", label: "Contact", icon: FaEnvelope },
      ];
    } else {
      // When not logged in - Home, Our Services, About, Contact
      return [
        { path: "/", label: "Home", icon: FaHome },
        { path: "/ourservices", label: "Services", icon: FaCogs },
        { path: "/about", label: "About", icon: FaInfoCircle },
        { path: "/contact", label: "Contact", icon: FaEnvelope },
      ];
    }
  };

  const navigationItems = getNavigationItems();

  // Services dropdown items for admin
  const servicesItems = [
    { path: "/customermanagement", label: "Customers", icon: FaUserCog, color: "text-blue-500" },
    { path: "/licensemanagement", label: "Licenses", icon: FaIdCard, color: "text-violet-500" },
    { path: "/licensemanager", label: "Add License", icon: FaCrown, color: "text-emerald-500" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200/60 relative z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16 md:h-20 w-full">
          {/* Logo - Full company name */}
          <motion.div className="flex-shrink-0 flex items-center min-w-0">
            <button 
              onClick={() => handleRedirect("/")}
              className="flex items-center gap-2 md:gap-3 focus:outline-none max-w-full"
            >
              {Logo && !imgError ? (
                <motion.div
                  className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 rounded-xl bg-black flex items-center justify-center shadow-sm flex-shrink-0"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={Logo}
                    alt="DOST ENTERPRISES Logo"
                    className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 object-contain"
                    onError={() => setImgError(true)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm md:text-base lg:text-lg shadow-sm flex-shrink-0"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  DE
                </motion.div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-lg md:text-xl lg:text-2xl font-bold text-slate-800 font-sans leading-tight whitespace-nowrap">
                  DOST ENTERPRISES
                </span>
                <div className="w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-0.5 md:mt-1"></div>
              </div>
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1 flex-shrink-0">
            {navigationItems.map((item) => (
              item.isDropdown ? (
                // Admin Services Dropdown (only show for actual admins, not on auth pages)
                user && userRoles.includes("ADMIN") && !isAuthPage() && (
                  <div key={item.path} className="relative group" ref={servicesDropdownRef}>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -1 }}
                      onClick={toggleServicesDropdown}
                      className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 group ${
                        isServicesDropdownOpen
                          ? "text-cyan-600 bg-cyan-50 border border-cyan-100"
                          : "text-slate-600 hover:text-cyan-600 hover:bg-slate-50"
                      }`}
                    >
                      <FaGem className="text-sm" />
                      Services
                      <FaChevronDown className={`text-xs transition-transform duration-200 ${
                        isServicesDropdownOpen ? "rotate-180" : ""
                      }`} />
                    </motion.button>
                    
                    <AnimatePresence>
                      {isServicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/60 z-50 overflow-hidden"
                        >
                          <div className="p-3">
                            <div className="px-3 py-2 mb-2">
                              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Management</p>
                            </div>
                            {servicesItems.map((serviceItem) => (
                              <button
                                key={serviceItem.path}
                                onClick={() => handleRedirect(serviceItem.path)}
                                className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200 group/item text-left"
                              >
                                <div className={`p-2 rounded-lg bg-slate-100 group-hover/item:scale-110 transition-transform duration-200 ${serviceItem.color}`}>
                                  <serviceItem.icon className="text-sm" />
                                </div>
                                <span className="font-medium group-hover/item:text-slate-900">{serviceItem.label}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              ) : (
                // Regular navigation items
                <motion.button
                  key={item.path}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleRedirect(item.path)}
                  className={`relative rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 group flex items-center gap-2 ${
                    isActiveRoute(item.path)
                      ? "text-cyan-600 bg-cyan-50 border border-cyan-100"
                      : "text-slate-600 hover:text-cyan-600 hover:bg-slate-50"
                  }`}
                >
                  <item.icon className="text-sm flex-shrink-0" />
                  <span className="whitespace-nowrap">{item.label}</span>
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

          {/* Tablet Navigation - All items in single line with compact design */}
          <div className="hidden md:flex lg:hidden items-center space-x-1 flex-shrink-0">
            {navigationItems.map((item) => (
              item.isDropdown ? (
                // Admin Services Dropdown for tablet
                user && userRoles.includes("ADMIN") && !isAuthPage() && (
                  <div key={item.path} className="relative" ref={servicesDropdownRef}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={toggleServicesDropdown}
                      className={`flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-300 ${
                        isServicesDropdownOpen
                          ? "text-cyan-600 bg-cyan-50 border border-cyan-100"
                          : "text-slate-600 hover:text-cyan-600 hover:bg-slate-50"
                      }`}
                    >
                      <FaGem className="text-xs" />
                      <span className="whitespace-nowrap">Services</span>
                      <FaChevronDown className={`text-xs transition-transform duration-200 ${
                        isServicesDropdownOpen ? "rotate-180" : ""
                      }`} />
                    </motion.button>
                    
                    <AnimatePresence>
                      {isServicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          className="absolute left-0 mt-2 w-56 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/60 z-50 overflow-hidden"
                        >
                          <div className="p-2">
                            <div className="px-2 py-1 mb-1">
                              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Management</p>
                            </div>
                            {servicesItems.map((serviceItem) => (
                              <button
                                key={serviceItem.path}
                                onClick={() => handleRedirect(serviceItem.path)}
                                className="flex items-center gap-2 w-full px-2 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200 group/item text-left"
                              >
                                <div className={`p-1.5 rounded-lg bg-slate-100 group-hover/item:scale-110 transition-transform duration-200 ${serviceItem.color}`}>
                                  <serviceItem.icon className="text-xs" />
                                </div>
                                <span className="font-medium group-hover/item:text-slate-900">{serviceItem.label}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              ) : (
                // Regular navigation items for tablet
                <motion.button
                  key={item.path}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleRedirect(item.path)}
                  className={`relative rounded-xl px-3 py-2 text-xs font-medium transition-all duration-300 flex items-center gap-1 ${
                    isActiveRoute(item.path)
                      ? "text-cyan-600 bg-cyan-50 border border-cyan-100"
                      : "text-slate-600 hover:text-cyan-600 hover:bg-slate-50"
                  }`}
                >
                  <item.icon className="text-xs flex-shrink-0" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </motion.button>
              )
            ))}
          </div>

          {/* Right Side - User Profile & Auth */}
          <div className="flex items-center gap-2 md:gap-2 flex-shrink-0">
            {/* User Profile - Hide on auth pages */}
            {user && !isAuthPage() ? (
              <div className="hidden sm:block relative" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm focus:outline-none transition-all duration-200 hover:shadow-lg border border-slate-200/60 group"
                >
                  <motion.div
                    className={`h-7 w-7 md:h-8 md:w-8 rounded-xl bg-gradient-to-r ${getProfileColor()} flex items-center justify-center text-white font-bold text-xs shadow-sm flex-shrink-0`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {getUserInitial()}
                  </motion.div>
                  <div className="text-left hidden lg:block min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate max-w-20">
                      {user.sub || "User"}
                    </p>
                    <p className="text-xs text-slate-500 capitalize truncate">
                      {userRoles[0]?.toLowerCase() || "user"}
                    </p>
                  </div>
                  <FaChevronDown className={`text-slate-400 text-xs transition-transform duration-200 flex-shrink-0 ${isDropdownOpen ? "rotate-180" : ""}`} />
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/60 z-50 overflow-hidden"
                    >
                      {/* Profile Header */}
                      <div className="p-3 bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/60">
                        <div className="flex items-center gap-2">
                          <motion.div
                            className={`h-8 w-8 rounded-xl bg-gradient-to-r ${getProfileColor()} flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {getUserInitial()}
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-slate-800 truncate">
                              {user.sub || "User"}
                            </h3>
                            <p className="text-xs text-slate-600">Welcome back!</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-1">
                        {userRoles.includes("USER") && (
                          <motion.button
                            whileHover={{ x: 4 }}
                            onClick={() => handleRedirect("/customerlicenselist")}
                            className="flex items-center gap-2 w-full px-2 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200 group"
                          >
                            <div className="p-1 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors flex-shrink-0">
                              <FaHistory className="text-blue-600 text-xs" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-xs truncate">License History</p>
                              <p className="text-xs text-slate-500 truncate">View applications</p>
                            </div>
                          </motion.button>
                        )}

                        <motion.button
                          whileHover={{ x: 4 }}
                          onClick={() => handleRedirect("/profile")}
                          className="flex items-center gap-2 w-full px-2 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200 group"
                        >
                          <div className="p-1 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors flex-shrink-0">
                            <FaUserCircle className="text-slate-600 text-xs" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-xs truncate">Profile Settings</p>
                            <p className="text-xs text-slate-500 truncate">Manage account</p>
                          </div>
                        </motion.button>

                        <motion.button
                          whileHover={{ x: 4 }}
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full px-2 py-1.5 text-left text-xs text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200 group mt-1"
                        >
                          <div className="p-1 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition-colors flex-shrink-0">
                            <FaSignOutAlt className="text-rose-600 text-xs" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-xs truncate">Sign Out</p>
                            <p className="text-xs text-rose-500 truncate">Logout account</p>
                          </div>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Login/Signup Buttons - Hide on auth pages
              !isAuthPage() && (
                <>
                  {/* Desktop Auth Buttons */}
                  <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRedirect("/login")}
                      className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-cyan-600 hover:bg-slate-50 transition-all duration-200 border border-slate-200/60"
                    >
                      <FaSignInAlt className="text-sm flex-shrink-0" />
                      <span className="whitespace-nowrap">Login</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRedirect("/register")}
                      className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-sm"
                    >
                      <FaUserPlus className="text-sm flex-shrink-0" />
                      <span className="whitespace-nowrap">Sign Up</span>
                    </motion.button>
                  </div>

                  {/* Tablet Auth Dropdown */}
                  <div className="hidden md:flex lg:hidden relative" ref={authDropdownRef}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={toggleAuthDropdown}
                      className="flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:text-cyan-600 hover:bg-slate-50 transition-all duration-200 border border-slate-200/60"
                    >
                      <FaUserCircle className="text-xs" />
                      <span className="whitespace-nowrap">Account</span>
                      <FaChevronDown className={`text-xs transition-transform duration-200 ${
                        isAuthDropdownOpen ? "rotate-180" : ""
                      }`} />
                    </motion.button>

                    <AnimatePresence>
                      {isAuthDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/60 z-50 overflow-hidden"
                        >
                          <div className="p-2">
                            <button
                              onClick={() => handleRedirect("/login")}
                              className="flex items-center gap-2 w-full px-3 py-2.5 text-xs text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200 group text-left"
                            >
                              <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                                <FaSignInAlt className="text-slate-600 text-xs" />
                              </div>
                              <div>
                                <p className="font-semibold text-xs">Login</p>
                                <p className="text-xs text-slate-500">Access your account</p>
                              </div>
                            </button>
                            
                            <button
                              onClick={() => handleRedirect("/register")}
                              className="flex items-center gap-2 w-full px-3 py-2.5 text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl transition-all duration-200 group text-left mt-1"
                            >
                              <div className="p-1.5 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                                <FaUserPlus className="text-white text-xs" />
                              </div>
                              <div>
                                <p className="font-semibold text-xs">Sign Up</p>
                                <p className="text-xs text-white/80">Create new account</p>
                              </div>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )
            )}

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleMobileMenu}
                className="p-2 rounded-xl text-slate-600 hover:text-cyan-600 hover:bg-slate-50 transition-all duration-200 border border-slate-200/60"
              >
                {isMobileMenuOpen ? <FaTimes className="h-4 w-4" /> : <FaBars className="h-4 w-4" />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={toggleMobileMenu}
            />
            
            {/* Mobile Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-slate-200/60 z-50 md:hidden overflow-y-auto max-h-screen"
            >
              <div className="px-4 pb-6 pt-4 space-y-1">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={() => handleRedirect("/")}
                    className="flex items-center gap-2"
                  >
                    {Logo && !imgError ? (
                      <div className="h-8 w-8 rounded-xl bg-black flex items-center justify-center shadow-sm">
                        <img
                          src={Logo}
                          alt="DOST ENTERPRISES Logo"
                          className="h-6 w-6 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        DE
                      </div>
                    )}
                    <span className="text-lg font-bold text-slate-800">DOST ENTERPRISES</span>
                  </button>
                  <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Navigation */}
                {navigationItems.map((item) => (
                  item.isDropdown ? (
                    // Admin Services in mobile (only show for actual admins, not on auth pages)
                    user && userRoles.includes("ADMIN") && !isAuthPage() && (
                      <div key={item.path} className="pt-3 border-t border-slate-200/60">
                        <p className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase">Services</p>
                        {servicesItems.map((serviceItem) => (
                          <button
                            key={serviceItem.path}
                            onClick={() => handleRedirect(serviceItem.path)}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200 w-full text-left"
                          >
                            <serviceItem.icon className="text-sm flex-shrink-0" />
                            {serviceItem.label}
                          </button>
                        ))}
                      </div>
                    )
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
                      <item.icon className="text-sm flex-shrink-0" />
                      {item.label}
                    </button>
                  )
                ))}

                {/* Mobile Authentication - Hide on auth pages */}
                {!user && !isAuthPage() ? (
                  <div className="pt-4 border-t border-slate-200/60 space-y-2">
                    <button
                      onClick={() => handleRedirect("/login")}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200 border border-slate-200 w-full text-left"
                    >
                      <FaSignInAlt className="text-sm flex-shrink-0" />
                      Login
                    </button>
                    <button
                      onClick={() => handleRedirect("/register")}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 w-full text-left"
                    >
                      <FaUserPlus className="text-sm flex-shrink-0" />
                      Sign Up
                    </button>
                  </div>
                ) : user && !isAuthPage() ? (
                  <div className="pt-4 border-t border-slate-200/60">
                    {/* Mobile User Info */}
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                      <div className={`h-10 w-10 rounded-xl bg-gradient-to-r ${getProfileColor()} flex items-center justify-center text-white font-bold text-base flex-shrink-0`}>
                        {getUserInitial()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 truncate">{user.sub || "User"}</p>
                        <p className="text-sm text-slate-500 capitalize">{userRoles[0]?.toLowerCase() || "user"}</p>
                      </div>
                    </div>

                    {/* Mobile User Actions */}
                    {userRoles.includes("USER") && (
                      <button
                        onClick={() => handleRedirect("/customerlicenselist")}
                        className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200 mb-2 text-left"
                      >
                        <FaHistory className="text-sm flex-shrink-0" />
                        My Licenses
                      </button>
                    )}
                    <button
                      onClick={() => handleRedirect("/profile")}
                      className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200 mb-2 text-left"
                    >
                      <FaUserCircle className="text-sm flex-shrink-0" />
                      Profile Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-base font-medium text-rose-600 hover:bg-rose-50 transition-all duration-200 text-left"
                    >
                      <FaSignOutAlt className="text-sm flex-shrink-0" />
                      Sign Out
                    </button>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;