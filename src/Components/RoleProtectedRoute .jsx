import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole } from "../Utils/authUtils";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const userRoles = getUserRole();

  // Check if user has required role
  const hasPermission = userRoles?.some((role) => allowedRoles.includes(role));

  return hasPermission ? children : <Navigate to="/unauthorized" />;
};

export default RoleProtectedRoute;
