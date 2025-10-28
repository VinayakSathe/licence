import React from "react";
import { motion } from "framer-motion";
import drive from "../../assets/drive.png";
import food from "../../assets/food.jpg";
import pic4 from "../../assets/pic4.jpg";
import pic5 from "../../assets/pic5.jpg";
import pic6 from "../../assets/pic6.jpg";
import pic7 from "../../assets/pic7.jpg";
import pic8 from "../../assets/pic8.jpg";
import {
  FaCar,
  FaUtensils,
  FaBriefcase,
  FaStore,
  FaFileInvoice,
  FaUserTie,
  FaCertificate,
} from "react-icons/fa";
 
const licenses = [
  {
    icon: <FaCar className="text-cyan-600 text-4xl" />,
    title: "Driving License",
    description: `We assist individuals in obtaining learner's licenses, permanent driving licenses, and renewals.
Our services include form submission, document verification, RTO appointment scheduling, and complete guidance through the driving test and verification process.
We also provide assistance for international driving permits, duplicate licenses, and updating personal details such as address and blood group.
Our goal is to make the process smooth and error-free so you can get your license without unnecessary delays.`,
    image: drive,
  },
  {
    icon: <FaUtensils className="text-cyan-600 text-4xl" />,
    title: "Food License",
    description: `We help restaurants, food manufacturers, and cloud kitchens obtain FSSAI registration and State/Central food licenses quickly.
Our team ensures your business complies with hygiene and safety standards, documentation, and periodic renewals.
We also provide guidance for labeling, packaging, and compliance audits to ensure uninterrupted operations.
Whether you are starting a new food business or expanding, our services guarantee that your licenses are approved efficiently.`,
    image: food,
  },
  {
    icon: <FaBriefcase className="text-cyan-600 text-4xl" />,
    title: "Trade License",
    description: `Obtain a valid trade license for your business to operate legally.
We handle document preparation, local authority submission, and follow-ups to ensure compliance with municipal regulations.
Our experts also provide guidance on renewals, license amendments, and multiple location registrations.
We help businesses avoid fines and legal issues by making sure all trade permissions are up to date.`,
    image: pic4,
  },
  {
    icon: <FaStore className="text-cyan-600 text-4xl" />,
    title: "Shop License",
    description: `Register your retail store, office, or commercial outlet under the Shops & Establishment Act.
We take care of registration, compliance with labor laws, employee documentation, and timely renewals.
Our service includes filing returns with local authorities, maintaining statutory registers, and providing legal advice for smooth operations.
We help ensure your business operates legally and avoids penalties.`,
    image: pic5,
  },
  {
    icon: <FaFileInvoice className="text-cyan-600 text-4xl" />,
    title: "GST Registration",
    description: `We simplify GST registration for new businesses and existing firms.
Our services include PAN verification, GSTIN application, filing necessary forms, and compliance guidance.
We also advise on input tax credits, invoicing rules, and monthly/quarterly returns to ensure full compliance.
With our help, your business is ready for smooth taxation and regulatory adherence.`,
    image: pic6,
  },
  {
    icon: <FaUserTie className="text-cyan-600 text-4xl" />,
    title: "Professional License",
    description: `Obtain licenses for professionals like architects, doctors, engineers, and service providers.
We assist with application submissions, document verification, and approvals from relevant authorities.
Our team ensures you comply with industry-specific regulations, renewals, and certifications.
Whether for solo practice or firm operations, our service streamlines licensing processes for all professionals.`,
    image: pic7,
  },
  {
    icon: <FaCertificate className="text-cyan-600 text-4xl" />,
    title: "Special Permits",
    description: `Acquire permits for events, environmental clearances, or sector-specific activities.
Our experts guide you through government approvals, document preparation, and compliance checks.
We assist with temporary permits, event management licenses, pollution control certifications, and other regulatory approvals.
Our goal is to help you obtain all required permissions efficiently, avoiding delays or legal complications.`,
    image: pic8,
  },
 
];
 
const fadeSlideVariants = {
  hiddenLeft: { opacity: 0, x: -60 },
  hiddenRight: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "", stiffness: 80, damping: 1, duration: 0.9 },
  },
};
 
export default function OurServices() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-8 md:py-16 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-8 md:mb-14 px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-3 md:mb-4"
        >
          License Types We Support
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2"
        >
          Comprehensive license services for all your personal and business needs
        </motion.p>
      </div>
 
      {/* License Sections */}
      <div className="space-y-12 md:space-y-24 px-4 sm:px-6">
        {licenses.map((license, index) => (
          <motion.div
            key={index}
            initial={index % 2 === 0 ? "hiddenRight" : "hiddenLeft"}
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeSlideVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(17, 21, 22, 0.38)",
            }}
            className={`w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-10 bg-white/80 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-md transition-all duration-300 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
            style={{
              background: "linear-gradient(to right, #cffafe, #e0f2fe, #e0e7ff)",
            }}
          >
            {/* Image */}
            <motion.div
              className="w-full md:w-1/2"
              animate={{ y: [0, -5, 0] }}
            >
              <img
                src={license.image}
                alt={license.title}
                className="rounded-xl sm:rounded-2xl shadow-lg w-full h-auto object-cover max-h-[300px] sm:max-h-[400px]"
              />
            </motion.div>
 
            {/* Text */}
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                {license.icon}
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-slate-800">
                  {license.title}
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre-line">
                {license.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}