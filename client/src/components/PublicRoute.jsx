// PublicRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    // If user is logged in, redirect to the home page
    return <Navigate to="/" />;
  }

  return children; 
};

export default PublicRoute;
