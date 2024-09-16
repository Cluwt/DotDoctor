// src/Essentials/PrivateRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  // Substitua a lógica abaixo pela verificação real de autenticação
  const isAuthenticated = localStorage.getItem('authToken'); // Exemplo de verificação de autenticação

  return (
    <Route
      {...rest}
      element={isAuthenticated ? Component : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
