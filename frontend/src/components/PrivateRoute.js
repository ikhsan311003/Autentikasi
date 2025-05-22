import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Cek apakah token benar-benar ada dan bukan string kosong/null
  const isAuthenticated = token && token !== "undefined";

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
