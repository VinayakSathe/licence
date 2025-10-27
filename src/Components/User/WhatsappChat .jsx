import React from "react";
import { useLocation } from "react-router-dom";

const WhatsappChat = () => {
  const location = useLocation();
  console.log("Location State:", location.state); // Debugging
  const message = location.state?.message; // Retrieve the message from state

  const whatsappPhoneNumber = "7447376717"; 
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${whatsappPhoneNumber}?text=${encodedMessage}`;
  console.log("WhatsApp message:", message); 
  console.log("WhatsApp Link:", whatsappLink); 

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden animate-fade-in">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-emerald-200 rounded-full blur-3xl opacity-30 animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-teal-200 rounded-full blur-3xl opacity-20 animate-pulse-slow delay-500"></div>
      </div>

      <div className="relative bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-2xl p-8 max-w-md w-full border border-green-200 backdrop-blur-sm transform animate-scale-in hover:shadow-3xl transition-all duration-500">
        {/* Decorative Header */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
            <span>💬</span>
            <span>WhatsApp Support</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center pt-4 animate-fade-in-up">
          {/* WhatsApp Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.189-1.248-6.189-3.515-8.444"/>
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-4">
            Chat with Us to Apply for License
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed p-4 bg-green-50 rounded-xl border border-green-100 transform hover:-translate-y-1 transition-all duration-300">
            Click the button below to start a chat with us on WhatsApp. We'll guide you through the license application process and answer any questions you may have.
          </p>

          {/* WhatsApp Button */}
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full"
          >
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 group/btn border border-green-400/30">
              <svg className="w-6 h-6 text-white transform group-hover/btn:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.189-1.248-6.189-3.515-8.444"/>
              </svg>
              <span className="transform group-hover/btn:translate-x-1 transition-transform duration-300">
                Start WhatsApp Chat
              </span>
            </button>
          </a>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-center space-x-2 text-sm text-blue-700">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span>We typically respond within minutes</span>
            </div>
          </div>

          {/* Features List */}
          <div className="mt-8 grid grid-cols-2 gap-3 text-xs">
            {[
              { text: "Instant Support", color: "from-green-500 to-emerald-500" },
              { text: "Secure Chat", color: "from-blue-500 to-cyan-500" },
              { text: "File Sharing", color: "from-purple-500 to-pink-500" },
              { text: "24/7 Available", color: "from-orange-500 to-amber-500" }
            ].map((feature, index) => (
              <div key={index} className="bg-white/80 p-3 rounded-lg text-center border border-gray-200 transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className={`w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full mx-auto mb-2 animate-pulse`}></div>
                <span className="text-gray-600 text-xs font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
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
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
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

export default WhatsappChat;