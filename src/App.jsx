import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import CustomActiveShapePieChart from "./Components/Dashboard/CustomActiveShapePieChart";
import CustomerManagement from "./Components/CustomerManagement";
import LicenseManagement from "./Components/LicenseManagement";
import UserSection from "./Pages/UserSection";
import WhatsappChat from "./Components/User/WhatsappChat ";
import CustomerLicenseListPopup from "./Components/User/CustomerLicenseListPopup";
import LicenseManager from "./Components/LicenseManager";
import LicenseDetail from "./Components/User/LicenseDetail";
import InterestedUserApplyForm from "./Components/User/InterestedUserApplyForm";
import About from "./Components/User/About";
import Contact from "./Components/User/Contact";
import Login from "./Components/Login";
import UserRegisterPopup from "./Components/UserRegisterPopup";
import UnAuthorize from "./Components/UnAuthorize";
import UserProfile from "./Components/UserProfile";
import RoleProtectedRoute from "./Components/RoleProtectedRoute ";
import { AuthProvider } from "./Utils/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OurServices from "./Components/User/OurServices"; // Import the OurServices component

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

// Create a component to handle header and footer visibility
const AppContent = () => {
  const location = useLocation();

  // Define routes where header and footer should be hidden
  const hideHeaderFooterRoutes = ["/login", "/register"];
  const showHeaderFooter = !hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {/* Conditionally render header */}
      {showHeaderFooter && <Navbar />}

      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<UserRegisterPopup mode="inline" />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/unauthorized" element={<UnAuthorize />} />

        {/* Admin Routes */}
        <Route
          path="/licensemanager"
          element={
            <RoleProtectedRoute allowedRoles={["ADMIN"]}>
              <LicenseManager />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/licensemanagement"
          element={
            <RoleProtectedRoute allowedRoles={["ADMIN"]}>
              <LicenseManagement />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/customermanagement"
          element={
            <RoleProtectedRoute allowedRoles={["ADMIN"]}>
              <CustomerManagement />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <RoleProtectedRoute allowedRoles={["ADMIN"]}>
              <CustomActiveShapePieChart />
            </RoleProtectedRoute>
          }
        />

        {/* User routes */}
        <Route path="/" element={<UserSection />} />
        <Route path="/ourservices" element={<OurServices />} /> {/* Added OurServices route */}
        <Route
          path="/customerlicenselist"
          element={<CustomerLicenseListPopup />}
        />
        <Route path="/licensedetail" element={<LicenseDetail />} />
        <Route
          path="/interesteduserapplyform"
          element={<InterestedUserApplyForm />}
        />
        <Route path="/whatsapp-chat" element={<WhatsappChat />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <ToastContainer />

      {/* Conditionally render footer */}
      {showHeaderFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;