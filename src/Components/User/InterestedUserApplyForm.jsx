import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const InterestedUserApplyForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [whatsappLink, setWhatsappLink] = useState("");

  let { productName, price } = location.state || {};

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    country: '',
    city: '',
    state: '',
    pincode: '',
  });
  
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyFields = Object.entries(formData).filter(([key, value]) => !value);

    if (emptyFields.length > 0) {
      alert(`Please fill in the following fields: ${emptyFields.map(([key]) => key.charAt(0).toUpperCase() + key.slice(1)).join(', ')}`);
      return;
    }

    if (!isConfirmed) {
      alert('Please confirm that all information is correct.');
      return;
    }

    const formattedMessage = `
*License Application Details*
------------------------------
*Applicant Information:*
- *First Name:* ${formData.firstName}
- *Last Name:* ${formData.lastName}
- *Mobile Number:* ${formData.phone}
- *Email:* ${formData.email}
- *Address:* ${formData.address}
- *City:* ${formData.city}
- *Country:* ${formData.country}
- *State:* ${formData.state}
- *Pincode:* ${formData.pincode}
------------------------------
*We have received your application and will get back to you shortly.* 
*Thank you for your interest in applying for a license!*

If you have any questions, feel free to contact us/ Chat with us.
`;

    const whatsappPhoneNumber = "7447376717"; 
    const encodedMessage = encodeURIComponent(formattedMessage);
    const generatedLink = `https://wa.me/${whatsappPhoneNumber}?text=${encodedMessage}`;
    
    setWhatsappLink(generatedLink);
    window.open(generatedLink, "_blank");

    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      country: '',
      city: '',
      state: '',
      pincode: '',
    });
    setIsConfirmed(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-10 px-4 relative overflow-hidden animate-fade-in">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-200 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-teal-200 rounded-full blur-3xl opacity-20 animate-pulse-slow delay-500"></div>
      </div>

      {/* Header */}
      <div className="text-center mb-8 animate-fade-in-down">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-700 to-blue-700 bg-clip-text text-transparent font-serif">
          License Application Form
        </h2>
        <p className="text-gray-600 mt-2 text-lg">Complete your application in simple steps</p>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mt-4 animate-fade-in-left"></div>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 transform animate-scale-in border border-white/20">
        {/* Left Side: Form */}
        <div className="w-full md:w-2/3 pr-0 md:pr-8 mb-8 md:mb-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-cyan-200 group">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3 group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-serif">Contact Information</h3>
              </div>
              
              <div className="space-y-4">
                <div className="group/input">
                  <label htmlFor="email" className="block text-sm font-medium text-cyan-700 mb-2 group-hover/input:text-cyan-600 transition-colors duration-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full p-4 bg-white/80 border border-gray-300 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 transform group-hover/input:scale-105 placeholder-gray-400"
                    placeholder="Enter your email address"
                  />
                </div>
                <p className="text-sm text-cyan-600 text-center bg-white/50 p-3 rounded-lg border border-cyan-100">
                  We'll use this email to send you details and updates about your application.
                </p>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-teal-200 group">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold mr-3 group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-serif">Personal Details</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-6 bg-white/50 p-3 rounded-lg border border-teal-100">
                Enter your complete details for the license application process.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="group/input">
                  <label htmlFor="firstName" className="block text-sm font-medium text-teal-700 mb-2 group-hover/input:text-teal-600 transition-colors duration-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className="w-full p-4 bg-white/80 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all duration-300 transform group-hover/input:scale-105 placeholder-gray-400"
                    placeholder="Enter first name"
                  />
                </div>
                <div className="group/input">
                  <label htmlFor="lastName" className="block text-sm font-medium text-teal-700 mb-2 group-hover/input:text-teal-600 transition-colors duration-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    className="w-full p-4 bg-white/80 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all duration-300 transform group-hover/input:scale-105 placeholder-gray-400"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="group/input">
                  <label htmlFor="phone" className="block text-sm font-medium text-teal-700 mb-2 group-hover/input:text-teal-600 transition-colors duration-300">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full p-4 bg-white/80 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all duration-300 transform group-hover/input:scale-105 placeholder-gray-400"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="group/input">
                  <label htmlFor="address" className="block text-sm font-medium text-teal-700 mb-2 group-hover/input:text-teal-600 transition-colors duration-300">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    className="w-full p-4 bg-white/80 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all duration-300 transform group-hover/input:scale-105 placeholder-gray-400"
                    placeholder="Enter complete address"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group/input">
                  <label htmlFor="country" className="block text-sm font-medium text-teal-700 mb-2 group-hover/input:text-teal-600 transition-colors duration-300">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    required
                    className="w-full p-4 bg-white/80 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all duration-300 transform group-hover/input:scale-105 placeholder-gray-400"
                    placeholder="Enter country"
                  />
                </div>
                <div className="group/input">
                  <label htmlFor="city" className="block text-sm font-medium text-teal-700 mb-2 group-hover/input:text-teal-600 transition-colors duration-300">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    className="w-full p-4 bg-white/80 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all duration-300 transform group-hover/input:scale-105 placeholder-gray-400"
                    placeholder="Enter city"
                  />
                </div>
                <div className="group/input">
                  <label htmlFor="state" className="block text-sm font-medium text-teal-700 mb-2 group-hover/input:text-teal-600 transition-colors duration-300">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                    className="w-full p-4 bg-white/80 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all duration-300 transform group-hover/input:scale-105 placeholder-gray-400"
                    placeholder="Enter state"
                  />
                </div>
              </div>
              
              <div className="mt-6 group/input">
                <label htmlFor="pincode" className="block text-sm font-medium text-teal-700 mb-2 group-hover/input:text-teal-600 transition-colors duration-300">
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  required
                  className="w-full p-4 bg-white/80 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all duration-300 transform group-hover/input:scale-105 placeholder-gray-400"
                  placeholder="Enter pincode"
                />
              </div>
            </div>

            {/* Confirmation Checkbox */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-purple-200 group">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="confirm"
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 transform group-hover:scale-110 transition-transform duration-300"
                  required
                />
                <label htmlFor="confirm" className="ml-3 text-sm text-purple-700 font-medium">
                  I confirm that all information provided is correct and accurate.
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Right Side: Information Panel */}
        <div className="w-full md:w-1/3 pl-0 md:pl-8">
          {/* Application Progress */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-orange-200 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif flex items-center">
              <span className="w-6 h-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white text-sm mr-2">📋</span>
              Application Progress
            </h3>
            <div className="space-y-3">
              {[
                { step: "Personal Details", status: "completed", icon: "✅" },
                { step: "Document Upload", status: "pending", icon: "⏳" },
                { step: "Payment", status: "pending", icon: "⏳" },
                { step: "Approval", status: "pending", icon: "⏳" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-white/50">
                  <span className="text-lg">{item.icon}</span>
                  <span className={`text-sm ${item.status === 'completed' ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>
                    {item.step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Support Information */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif flex items-center">
              <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm mr-2">💬</span>
              Need Help?
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center space-x-2 p-2 rounded-lg bg-white/50">
                <span>📞</span>
                <span>Call: +91 7447376717</span>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded-lg bg-white/50">
                <span>✉️</span>
                <span>Email: support@gtasterix.com</span>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded-lg bg-white/50">
                <span>🕒</span>
                <span>Mon-Sun: 9AM - 6PM</span>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
            {[
              { text: "Secure Process", color: "from-green-500 to-emerald-500" },
              { text: "Quick Response", color: "from-blue-500 to-cyan-500" },
              { text: "Expert Support", color: "from-purple-500 to-pink-500" },
              { text: "24/7 Assistance", color: "from-orange-500 to-amber-500" }
            ].map((feature, index) => (
              <div key={index} className="bg-white/80 p-2 rounded-lg text-center border border-gray-200 transform hover:scale-105 transition-all duration-300">
                <div className={`w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full mx-auto mb-1 animate-pulse`}></div>
                <span className="text-gray-600">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 animate-fade-in-up">
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <button 
            onClick={handleSubmit} 
            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 border border-cyan-400/30 group/btn"
          >
            <span className="group-hover/btn:translate-x-1 transition-transform duration-300">
              Submit Application
            </span>
            <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </a>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default InterestedUserApplyForm;