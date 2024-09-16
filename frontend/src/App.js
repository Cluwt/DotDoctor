import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './PaginasReact/HomePage';
import LoginPage from './PaginasReact/LoginPage';
import RegisterPage from './PaginasReact/RegisterPage';
import DashboardPage from './PaginasReact/DashboardPage';
import UserProfilePage from './PaginasReact/UserProfilePage';
import SettingsPage from './PaginasReact/SettingsPage';
import VisualizarMarcarConsultas from './PaginasReact/VisualizarMarcarConsultas/VisualizarMarcarConsultas';
import VisualizarAdicionarRegistrosMedicos from './PaginasReact/VisualizarAdicionarRegistrosMedicos/VisualizarAdicionarRegistrosMedicos';
import RegistroPaciente from './PaginasReact/RegistroDoutorPaciente/RegistroPaciente';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/registroPaciente" element={<RegistroPaciente />} />
        <Route path="/consultas" element={<VisualizarMarcarConsultas />} />
        <Route path="/registros" element={<VisualizarAdicionarRegistrosMedicos />} />
      </Routes>
    </Router>
  );
};

export default App;
