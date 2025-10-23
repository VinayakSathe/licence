import React from "react";
// import { motion } from "framer-motion";
import LicenseGrid from "../Components/User/LicenseGrid";
import Home from "../Components/User/Home";




const UserSection = () => {
  return (
    <div>
    

      {/* <motion.div
        whileInView={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8, delay: 1 }} // Added delay for staggered effect
      >
        <ServicesCard />
      </motion.div> */}
      
        {/* <LicenseGrid /> */}
        <Home/>


     
    </div>
  );
};

export default UserSection;
