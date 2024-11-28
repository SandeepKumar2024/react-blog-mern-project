// PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const Privateroutes = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role; // Get the role of the logged-in user (admin, editor, etc.)

  if (!user) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // If user doesn't have the correct role (not admin for dashboard), redirect to home
    return <Navigate to="/" />;
  }

  return children;
};

export default Privateroutes;
