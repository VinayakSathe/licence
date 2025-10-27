import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; 
import { useLocation } from "react-router-dom";

const LicenseDetail = () => {
  const [showServices, setShowServices] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { licenseName, validTill, images, description } = location.state || {};
  
  console.log(licenseName)
  console.log(validTill)
  console.log(images)
  console.log(description)

  const handleClose = () => {
    navigate('/');
  };

  if (showServices) {
    return <Services />;
  }

  const handleCheckout = () => {
    navigate("/interesteduserapplyform", { state: { interestedToApply: licenseName } });
  };

  return (
    <div className="flex bg-gradient-to-br from-slate-50 to-blue-50 flex-col min-h-screen overflow-hidden relative mt-2 animate-fade-in">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-40 h-40 bg-cyan-200 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-20 animate-pulse-slow delay-1000"></div>
      </div>

      {/* Close Button */}
      <button
        className="absolute top-6 left-6 text-xl text-gray-700 z-10 group animate-fade-in-left"
        onClick={handleClose}
      >
        <div className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 group-hover:bg-white group-hover:-translate-y-1 border border-gray-200">
          <IoClose className="w-6 h-6 group-hover:text-cyan-600 transition-colors duration-300" />
        </div>
      </button>

      <div className="flex flex-col md:flex-row items-start mt-8 md:mt-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 space-y-8 md:space-y-0 md:space-x-8 animate-fade-in-up">
        {/* Image Section */}
        <div className="flex-1 group bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 overflow-hidden">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={`data:image/jpeg;base64,${images}`}
              alt="License Image"
              className="w-full h-auto rounded-xl transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          </div>
          
          {/* Next Button */}
          <button
            className="flex items-center justify-center w-full rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 focus:ring-4 focus:ring-cyan-200 focus:outline-none font-semibold text-sm px-6 py-3.5 text-center text-white mt-6 transform hover:scale-105 hover:shadow-xl transition-all duration-300 group/btn shadow-lg"
            onClick={handleCheckout}
          >
            <span className="mr-2 group-hover/btn:translate-x-1 transition-transform duration-300">Proceed to Apply</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transform group-hover/btn:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200">
          {/* License Header */}
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-700 to-blue-700 bg-clip-text text-transparent animate-fade-in-right">
              {licenseName}
            </h2>
            <div className="flex items-center mt-3">
              <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300">
                Validity: {validTill} year{validTill > 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="group">
            <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed p-4 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-gray-200 group-hover:border-cyan-300 transition-all duration-300 transform group-hover:-translate-y-1">
              {description}
            </p>
          </div>

          {/* Features List */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up">
            {[
              { icon: "✅", text: "Easy Application Process", color: "from-green-500 to-emerald-500" },
              { icon: "⚡", text: "Quick Processing", color: "from-yellow-500 to-amber-500" },
              { icon: "🛡️", text: "Secure & Reliable", color: "from-blue-500 to-cyan-500" },
              { icon: "📞", text: "Dedicated Support", color: "from-purple-500 to-pink-500" }
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 group"
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mr-3 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* Additional Info Cards */}
          <div className="mt-8 space-y-4">
            <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200 hover:border-cyan-300 transition-all duration-300 transform hover:-translate-y-1 group">
              <h4 className="font-semibold text-cyan-800 mb-2 flex items-center">
                <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2 animate-pulse"></span>
                Why Choose This License?
              </h4>
              <p className="text-sm text-cyan-700">
                Get comprehensive coverage and professional support for your business needs.
              </p>
            </div>

            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:border-green-300 transition-all duration-300 transform hover:-translate-y-1 group">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse delay-300"></span>
                What's Included?
              </h4>
              <p className="text-sm text-green-700">
                Full documentation, compliance support, and renewal reminders included.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 animate-bounce-slow">
        <button
          onClick={handleCheckout}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center space-x-2 border border-cyan-400/30"
        >
          <span>Apply Now</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
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
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LicenseDetail;