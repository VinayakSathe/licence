import React from "react";
import { motion } from "framer-motion";
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
    image: "/src/assets/pic2.png",
  },
  {
    icon: <FaUtensils className="text-cyan-600 text-4xl" />,
    title: "Food License",
    description: `We help restaurants, food manufacturers, and cloud kitchens obtain FSSAI registration and State/Central food licenses quickly.
Our team ensures your business complies with hygiene and safety standards, documentation, and periodic renewals.
We also provide guidance for labeling, packaging, and compliance audits to ensure uninterrupted operations.
Whether you are starting a new food business or expanding, our services guarantee that your licenses are approved efficiently.`,
    image: "/src/assets/pic3.jpg",
  },
  {
    icon: <FaBriefcase className="text-cyan-600 text-4xl" />,
    title: "Trade License",
    description: `Obtain a valid trade license for your business to operate legally.
We handle document preparation, local authority submission, and follow-ups to ensure compliance with municipal regulations.
Our experts also provide guidance on renewals, license amendments, and multiple location registrations.
We help businesses avoid fines and legal issues by making sure all trade permissions are up to date.`,
    image: "/src/assets/pic4.jpg",
  },
  {
    icon: <FaStore className="text-cyan-600 text-4xl" />,
    title: "Shop License",
    description: `Register your retail store, office, or commercial outlet under the Shops & Establishment Act.
We take care of registration, compliance with labor laws, employee documentation, and timely renewals.
Our service includes filing returns with local authorities, maintaining statutory registers, and providing legal advice for smooth operations.
We help ensure your business operates legally and avoids penalties.`,
    image: "/src/assets/pic5.jpg",
  },
  {
    icon: <FaFileInvoice className="text-cyan-600 text-4xl" />,
    title: "GST Registration",
    description: `We simplify GST registration for new businesses and existing firms.
Our services include PAN verification, GSTIN application, filing necessary forms, and compliance guidance.
We also advise on input tax credits, invoicing rules, and monthly/quarterly returns to ensure full compliance.
With our help, your business is ready for smooth taxation and regulatory adherence.`,
    image: "/src/assets/pic6.jpg",
  },
  {
    icon: <FaUserTie className="text-cyan-600 text-4xl" />,
    title: "Professional License",
    description: `Obtain licenses for professionals like architects, doctors, engineers, and service providers.
We assist with application submissions, document verification, and approvals from relevant authorities.
Our team ensures you comply with industry-specific regulations, renewals, and certifications.
Whether for solo practice or firm operations, our service streamlines licensing processes for all professionals.`,
    image: "/src/assets/pic7.jpg",
  },
  {
    icon: <FaCertificate className="text-cyan-600 text-4xl" />,
    title: "Special Permits",
    description: `Acquire permits for events, environmental clearances, or sector-specific activities.
Our experts guide you through government approvals, document preparation, and compliance checks.
We assist with temporary permits, event management licenses, pollution control certifications, and other regulatory approvals.
Our goal is to help you obtain all required permissions efficiently, avoiding delays or legal complications.`,
    image: "/src/assets/pic8.jpg",
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
    <section className="bg-gradient-to-b from-white to-slate-50 py-16">
      {/* Header */}
      <div className="text-center mb-14 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-slate-800 mb-4"
        >
          License Types We Support
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-500 text-lg max-w-2xl mx-auto"
        >
          Comprehensive license services for all your personal and business needs
        </motion.p>
      </div>
 
      {/* License Sections */}
      <div className="space-y-24">
        {licenses.map((license, index) => (
          <motion.div
            key={index}
            initial={index % 2 === 0 ? "hiddenRight" : "hiddenLeft"} // Alternate slide
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeSlideVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(17, 21, 22, 0.38)",
            }}
            className={`max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10 bg-white/80 p-8 rounded-2xl shadow-md transition-all duration-300 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
            style={{
              background: "linear-gradient(to right, #cffafe, #e0f2fe, #e0e7ff)",
            }}
          >
            {/* Image with subtle hover effect */}
            <motion.div
              className="w-full md:w-1/2"
              whileHover={{
                // scale: 1.03,
                // y: -5,
                // transition: { type: "spring", stiffness: 120, damping: 15 },
              }}
              animate={{ y: [0, -5, 0] }}
            //   transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            >
              <img
                src={license.image}
                alt={license.title}
                className="rounded-2xl shadow-lg w-full object-cover"
              />
            </motion.div>
 
            {/* Text */}
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-4 mb-4">
                {license.icon}
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-800">
                  {license.title}
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                {license.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}