// src/Essentials/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Verifica se o token está presente

  return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
