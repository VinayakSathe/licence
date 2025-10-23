import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Utils/api1";
import { AuthContext } from "../../Utils/AuthContext";
import UserRegisterPopup from "../../Components/UserRegisterPopup";
import { Link } from "react-router-dom";

import {
    FaArrowRight,
    FaCheckCircle,
    FaClock,
    FaFileAlt,
    FaShieldAlt,
    FaCar,
    FaUtensils,
    FaBriefcase,
    FaStore,
    FaReceipt,
    FaUserTie,
    FaCertificate,
    FaSearch,
    FaPhoneAlt,
    FaQuestionCircle,
    FaStar,
    FaPlayCircle
} from "react-icons/fa";

const UserSection = () => {
    const [licenses, setLicenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const [showRegisterPopup, setShowRegisterPopup] = useState(false);
    const [selectedLicense, setSelectedLicense] = useState(null);
    const [activeFAQ, setActiveFAQ] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLicenses = async () => {
            try {
                const response = await api.get("/api/licenseList/getLicenseList");
                console.log("Response: ", response.data);

                if (response.status === 200) {
                    setLicenses(response.data.data || []);
                } else {
                    setError("Failed to fetch licenses.");
                }
            } catch (error) {
                console.error("API Error: ", error);
                if (error.code === 'ERR_NETWORK') {
                    setError("Unable to connect to server. Please check if the backend is running.");
                } else if (error.response?.status === 401) {
                    navigate("/login");
                } else {
                    setError("Failed to load licenses. Please try again later.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchLicenses();
    }, [navigate]);

    const handleApply = (licenseName, validTill, images, description) => {
        console.log("Selected License: ", licenseName);

        if (user) {
            navigate("/licensedetail", {
                state: {
                    licenseName: licenseName,
                    validTill: validTill,
                    images: images,
                    description: description,
                },
            });
        } else {
            setSelectedLicense(licenseName);
            setShowRegisterPopup(true);
        }
    };

    const toggleFAQ = (index) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    };

    // Scroll to section function
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const licenseTypes = [
        {
            icon: <FaCar className="text-3xl text-cyan-600" />,
            title: "Driving License",
            description: "Learner, Permanent, Renewal - Get your driving license hassle-free"
        },
        {
            icon: <FaUtensils className="text-3xl text-cyan-600" />,
            title: "Food License",
            description: "FSSAI Registration, State & Central licenses for food businesses"
        },
        {
            icon: <FaBriefcase className="text-3xl text-cyan-600" />,
            title: "Trade License",
            description: "Business registration and trade licenses for all enterprises"
        },
        {
            icon: <FaStore className="text-3xl text-cyan-600" />,
            title: "Shop License",
            description: "Shops & Establishment registration and compliance"
        },
        {
            icon: <FaReceipt className="text-3xl text-cyan-600" />,
            title: "GST Registration",
            description: "GST registration and tax compliance for businesses"
        },
        {
            icon: <FaUserTie className="text-3xl text-cyan-600" />,
            title: "Professional License",
            description: "Occupational licenses for professionals and service providers"
        },
        {
            icon: <FaCertificate className="text-3xl text-cyan-600" />,
            title: "Special Permits",
            description: "Event permits, environmental clearances, sector-specific licenses"
        }
    ];

    const benefits = [
        {
            icon: <FaSearch className="text-2xl text-cyan-500" />,
            title: "All Licenses, One Place",
            description: "Food, Driving, Trade, Permits — manage everything in one portal"
        },
        {
            icon: <FaFileAlt className="text-2xl text-cyan-500" />,
            title: "Step-by-step Guidance",
            description: "We guide you at every step: forms, documents, submission"
        },
        {
            icon: <FaClock className="text-2xl text-cyan-500" />,
            title: "Real-time Tracking",
            description: "See the status of your application live with updates"
        },
        {
            icon: <FaShieldAlt className="text-2xl text-cyan-500" />,
            title: "Avoid Rejections & Delays",
            description: "Our experts check your documents before submission"
        },
        {
            icon: <FaCheckCircle className="text-2xl text-cyan-500" />,
            title: "Legal Compliance Support",
            description: "Stay on the right side of regulations and avoid fines"
        }
    ];


const processSteps = [
    {
        icon: <FaCar />,  // Step 1: Driving license type
        step: "01",
        title: "Choose License Type",
        description: "Select the license you need (food, driving, trade, etc.)"
    },
    {
        icon: <FaUtensils />, // Step 2: Food license / document submission
        step: "02",
        title: "Submit Documents",
        description: "Upload or fill required documents; we check for completeness"
    },
    {
        icon: <FaBriefcase />, // Step 3: Professional / Trade license tracking
        step: "03",
        title: "Track & Approve",
        description: "Monitor status updates; we follow up with authorities"
    },
    {
        icon: <FaStore />, // Step 4: Shop / license received
        step: "04",
        title: "Receive Your License",
        description: "Download digital copy or get physical license delivered"
    }
];

    const testimonials = [
        {
            name: "A. Kumar",
            location: "Pune",
            text: "I got my food business license within 7 days thanks to their help. The process was incredibly smooth!",
            rating: 5
        },
        {
            name: "S. Mehta",
            location: "Mumbai",
            text: "Renewing my driving license was quick and smooth — no hassle. Highly recommended service!",
            rating: 5
        },
        {
            name: "R. Sharma",
            location: "Delhi",
            text: "Their step-by-step guidance made the trade license application process so simple. Great support team!",
            rating: 5
        }
    ];

    const faqs = [
        {
            question: "What documents are required for a food license?",
            answer: "Typically you need identity proof, address proof, photos, and business details. We provide a complete checklist based on your specific requirements."
        },
        {
            question: "How long does a driving license renewal take?",
            answer: "Usually 3-7 working days for online renewal. We expedite the process and keep you updated at every stage."
        },
        {
            question: "Can I apply for multiple licenses together?",
            answer: "Yes! We offer bundled services for multiple license applications with special discounts for combined applications."
        },
        {
            question: "What if my application is rejected?",
            answer: "We provide free re-application support and help you understand the reasons for rejection to correct them."
        },
        {
            question: "Do you assist with renewals too?",
            answer: "Absolutely! We handle all types of renewals and send timely reminders so you never miss a deadline."
        }
    ];

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-cyan-50">
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md mx-4">
                    <div className="text-6xl mb-4 text-red-400">⚠️</div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Connection Error</h3>
                    <p className="text-slate-600 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-cyan-50 via-white to-slate-100 py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-6">
                        Smart Licensing Made Simple
                        <span className="block text-cyan-600 mt-2">Food, Driving, Business & More</span>
                    </h1>
                    <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        We simplify the process of applying, tracking, and receiving essential licenses. 
                        No more confusion, delays or paperwork headaches.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => scrollToSection('services')}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md flex items-center gap-3"
                        >
                            Apply Now <FaArrowRight className="text-sm" />
                        </button>
                        <button
                            onClick={() => scrollToSection('how-it-works')}
                            className="border border-cyan-600 text-cyan-600 hover:bg-cyan-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-3"
                        >
                            <FaPlayCircle className="text-sm" />
                            How It Works
                        </button>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                            Why Choose Our Platform
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Experience the simplest way to manage all your license needs in one place
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-gradient-to-br from-slate-50 to-cyan-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-slate-200">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white rounded-xl shadow-sm">
                                        {benefit.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-800 mb-2">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

           {/* How It Works Section */}
<section id="how-it-works" className="py-16 bg-gradient-to-br from-cyan-50 via-white to-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Simple 4-step process to get your license approved quickly and efficiently
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
                <div key={index} className="text-center group">
                    <div className="bg-white rounded-2xl p-6 border border-cyan-200 hover:border-cyan-400 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                        
                        {/* Center icon like License Cards */}
                        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center 
                                        rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 
                                        shadow-lg group-hover:from-cyan-500 group-hover:to-cyan-700 transition-all duration-300">
                            {React.cloneElement(step.icon, { className: "text-2xl text-white" })}
                        </div>

                        {/* Step Number */}
                        <div className="w-8 h-8 mx-auto -mt-8 mb-2 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {step.step}
                        </div>

                        <h3 className="text-lg font-semibold text-slate-800 mb-2">{step.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
</section>


            {/* License Types Section */}
            <section id="services" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                            License Types We Support
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Comprehensive license services for all your personal and business needs
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {licenseTypes.map((license, index) => (
                            <div key={index} className="bg-gradient-to-br from-slate-50 to-cyan-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-slate-200 group hover:-translate-y-1">
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                        {license.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                                        {license.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {license.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-gradient-to-br from-slate-50 to-cyan-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                            What Our Clients Say
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Don't just take our word for it - hear from our satisfied customers
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                                        <p className="text-slate-600 text-sm">{testimonial.location}</p>
                                    </div>
                                </div>
                                <p className="text-slate-700 mb-4 leading-relaxed">"{testimonial.text}"</p>
                                <div className="flex text-amber-400">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FaStar key={i} className="text-sm" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs Section */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Get answers to common questions about our license services
                        </p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-100 transition-colors duration-200"
                                >
                                    <span className="text-lg font-semibold text-slate-800">{faq.question}</span>
                                    <FaQuestionCircle className={`text-cyan-600 transition-transform duration-200 ${activeFAQ === index ? 'rotate-180' : ''}`} />
                                </button>
                                {activeFAQ === index && (
                                    <div className="px-6 pb-4">
                                        <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
           {/* Final CTA Section */}
<section className="py-16 bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            Ready to Get Your License?
        </h2>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have streamlined their license application process with us.
            <span className="block font-semibold text-slate-800 mt-2">Free consultation for first-time users!</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
                onClick={() => scrollToSection('services')}
                className="bg-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3"
            >
                Get Started Today <FaArrowRight className="text-sm" />
            </button>
            <Link
                to="/contact"
                className="border-2 border-cyan-600 text-cyan-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-cyan-600 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
            >
                <FaPhoneAlt className="text-sm" />
                Free Consultation
            </Link>
        </div>
    </div>
</section>


            {showRegisterPopup && (
                <UserRegisterPopup
                    isOpen={showRegisterPopup}
                    onClose={() => setShowRegisterPopup(false)}
                />
            )}
        </div>
    );
};

export default UserSection;