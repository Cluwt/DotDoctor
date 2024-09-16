// src/PaginasReact/LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpar dados de autenticação (e.g., localStorage)
    localStorage.removeItem('authToken');
    // Redirecionar para a página de login
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
