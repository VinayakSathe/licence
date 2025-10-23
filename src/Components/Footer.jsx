import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/Logo.png";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribed with email:", email);
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/ourservices", label: "Our Services" },
    { path: "/contact", label: "Contact" },
  ];

  const resources = [
    { path: "#", label: "Blog" },
    { path: "#", label: "FAQs" },
    { path: "#", label: "Privacy Policy" },
    { path: "#", label: "Terms & Conditions" },
  ];

  const services = [
    { path: "/ourservices", label: "License Solutions" },
    { path: "/ourservices", label: "Customer Portal" },
    { path: "/ourservices", label: "Business Analytics" },
    { path: "/ourservices", label: "Enterprise Support" },
  ];

  const socialLinks = [
    {
      name: "YouTube",
      url: "https://www.youtube.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 576 512" className="w-5 h-5">
          <path d="M549.655 124.083c-6.281-23.65-24.798-42.167-48.448-48.448C458.517 64 288 64 288 64s-170.517 0-213.207 11.635c-23.65 6.281-42.167 24.798-48.448 48.448C16.71 166.773 16.71 256 16.71 256s0 89.227 10.635 131.917c6.281 23.65 24.798 42.167 48.448 48.448C117.483 448 288 448 288 448s170.517 0 213.207-11.635c23.65-6.281 42.167-24.798 48.448-48.448C560.29 345.227 560.29 256 560.29 256s0-89.227-10.635-131.917zM232 336V176l142 80-142 80z"/>
        </svg>
      ),
      color: "hover:text-red-600"
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512" className="w-5 h-5">
          <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558A296.76 296.76 0 010 408.07a219.54 219.54 0 00162.292-45.33A105.038 105.038 0 0184.69 313.3a132.04 132.04 0 0019.91 1.63 111.205 111.205 0 0027.5-3.584A105.02 105.02 0 0120.8 208.334v-1.326a105.68 105.68 0 0047.517 13.292 105.02 105.02 0 01-32.505-140.263 298.493 298.493 0 00216.65 109.897 118.35 118.35 0 01-2.63-24.016 105.02 105.02 0 01181.574-71.948A208.158 208.158 0 00462.93 97.2a104.63 104.63 0 01-46.135 57.568A208.567 208.567 0 00496 131.41a224.273 224.273 0 01-36.63 37.3z"/>
        </svg>
      ),
      color: "hover:text-blue-500"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512" className="w-5 h-5">
          <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1A53.79 53.79 0 1153.8.1a53.79 53.79 0 010 108zm394.2 339.9h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448H159V148.9h89v40.8h1.3c12.4-23.5 42.5-48.3 87.5-48.3 93.5 0 110.6 61.5 110.6 141.3V448z"/>
        </svg>
      ),
      color: "hover:text-blue-700"
    },
    {
      name: "Facebook",
      url: "https://facebook.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 320 512" className="w-5 h-5">
          <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S259.31 0 225.36 0C141.09 0 89.09 54.42 89.09 153.51v68.83H0v92.66h89.09V512h107.81V288z"/>
        </svg>
      ),
      color: "hover:text-blue-600"
    },
  ];

  const contactInfo = [
    {
      icon: "📧",
      text: "info@dostenterprises.com",
      link: "mailto:info@dostenterprises.com"
    },
    {
      icon: "📞",
      text: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: "📍",
      text: "123 Business Ave, Suite 100 City, State 12345",
      link: "#"
    }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.6 }}
      className="bg-white text-gray-800 border-t border-gray-200 relative overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 mb-6"
            >
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
                <img
                  src={Logo}
                  alt="DOST ENTERPRISES Logo"
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/40x40?text=DE";
                    e.target.className = "w-8 h-8 object-contain";
                  }}
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  DOST ENTERPRISES
                </h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-1"></div>
              </div>
            </motion.div>
            
            <p className="text-sm leading-relaxed text-gray-600 mb-6">
              We deliver high-quality digital solutions to help your business grow 
              and connect with your audience more effectively. Innovation and excellence 
              drive everything we do.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  whileHover={{ x: 4 }}
                  className="flex items-start space-x-3 text-sm text-gray-600 hover:text-blue-600 transition-colors group"
                >
                  <span className="text-lg mt-0.5 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="leading-tight">{item.text}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 4 }}>
                  <Link
                    to={link.path}
                    className={`text-sm transition-all duration-300 ${
                      location.pathname === link.path
                        ? "text-blue-600 font-medium"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li key={index} whileHover={{ x: 4 }}>
                  <Link
                    to={service.path}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {service.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Stay Updated</h3>
            
            {/* Newsletter Subscription */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">
                Subscribe to our newsletter for the latest updates.
              </p>
              {isSubscribed ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-green-600 text-sm text-center py-2 bg-green-50 rounded-lg"
                >
                  ✅ Thank you for subscribing!
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-sm"
                  >
                    Subscribe
                  </motion.button>
                </form>
              )}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-700">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 shadow-sm hover:shadow-md transition-all ${social.color}`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
        >
          <div className="text-sm text-gray-500">
            © {currentYear} DOST ENTERPRISES. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Cookie Policy</a>
          </div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <span>Back to Top</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-white border border-gray-300 text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-50 hover:bg-gray-50"
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>
    </motion.footer>
  );
};

export default Footer;