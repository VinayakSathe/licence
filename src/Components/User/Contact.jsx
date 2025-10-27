import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your full name.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }
    if (!formData.message.trim()) {
      toast.error("Please enter your message.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/contact/send`,
        formData
      );
      if (response.status === 200) {
        toast.success("Message sent successfully! 🎉");
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-100 to-cyan-50 font-sans flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
      {/* Background floating shapes */}
      <motion.div
        className="absolute top-20 left-10 w-60 h-60 bg-cyan-300/30 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />

      <ToastContainer position="top-right" autoClose={3000} />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-10 z-10"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700 mb-4 drop-shadow-lg">
          Get in Touch 💬
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
          We’d love to hear from you! Whether you have a question, feedback, or
          a project in mind — reach out and let’s make something great together.
        </p>
      </motion.div>

      {/* Main container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl z-10">
        {/* Left Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-100 p-8 hover:shadow-cyan-200/70 transition-shadow duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/30 to-transparent rounded-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-cyan-700 mb-6">
              Contact Information 📍
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Don’t hesitate to reach out. Our team will respond within 24 hours!
            </p>

            <div className="space-y-6 text-gray-700">
              {[
                {
                  icon: <FaMapMarkerAlt className="text-cyan-600 text-2xl" />,
                  // text: "123 Dream Street, Pune, Maharashtra, India",
                },
                {
                  icon: <FaEnvelope className="text-cyan-600 text-2xl" />,
                  text: (
                    <a
                      href="info@dostenterprises.com"
                      className="hover:text-cyan-500 transition"
                    >
                      info@dostenterprises.com
                    </a>
                  ),
                },
                {
                  icon: <FaPhoneAlt className="text-cyan-600 text-2xl" />,
                  text: (
                    <a href="tel:+91000000000" className="hover:text-cyan-500">
                      +91 0000000000
                    </a>
                  ),
                },
              ].map((item, i) => (
                <motion.div
                  whileHover={{ scale: 1.05, x: 10 }}
                  key={i}
                  className="flex items-center gap-4 bg-white/50 rounded-xl p-3 hover:bg-cyan-50 transition-all"
                >
                  {item.icon}
                  <p>{item.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Connect with us:
              </h3>
              <div className="flex gap-6 text-2xl text-gray-600">
                {[
                  {
                    icon: <FaFacebookF />,
                    link: "https://facebook.com",
                    color: "hover:text-blue-600",
                  },
                  {
                    icon: <FaInstagram />,
                    link: "https://instagram.com",
                    color: "hover:text-pink-500",
                  },
                  {
                    icon: <FaTwitter />,
                    link: "https://twitter.com",
                    color: "hover:text-sky-500",
                  },
                  {
                    icon: <FaLinkedinIn />,
                    link: "https://linkedin.com",
                    color: "hover:text-blue-700",
                  },
                ].map((social, i) => (
                  <motion.a
                    whileHover={{ scale: 1.3, rotate: 12 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    key={i}
                    className={`${social.color} transition-all duration-300 transform`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-cyan-100 p-8 hover:shadow-indigo-200/70 transition-shadow duration-500"
        >
          <h2 className="text-3xl font-semibold text-cyan-700 mb-6">
            Send a Message ✉️
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {["name", "email", "phone"].map((field, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="transition-all"
              >
                <label className="block mb-2 text-gray-700 font-medium capitalize">
                  {field === "email"
                    ? "Email Address"
                    : field === "phone"
                    ? "Phone Number"
                    : "Full Name"}
                </label>
                <input
                  type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={
                    field === "email"
                      ? "you@example.com"
                      : field === "phone"
                      ? "+91 XXXXX XXXXX"
                      : "Your Name"
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all hover:shadow-md"
                  required
                />
              </motion.div>
            ))}

            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Message
              </label>
              <motion.textarea
                whileHover={{ scale: 1.01 }}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none resize-none hover:shadow-md transition-all"
                required
              />
            </div>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "#0891b2",
                boxShadow: "0px 6px 20px rgba(8,145,178,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500"
              } text-white font-semibold py-3 px-5 rounded-lg shadow-md transition-all duration-300`}
            >
              {loading ? "Sending..." : "Send Message 🚀"}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="w-full max-w-6xl mt-16 rounded-3xl overflow-hidden shadow-2xl border border-cyan-100"
      >
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.274950192074!2d73.85674321489106!3d18.520430987403597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c077f1e9d3ad%3A0x3b7f8d5d4f1f0d61!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1697269828171!5m2!1sen!2sin"
          width="100%"
          height="350"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default Contact;