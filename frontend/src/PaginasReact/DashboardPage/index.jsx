// src/PaginasReact/Dashboard/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/registro">Registro de Paciente</Link>
          </li>
          <li>
            <Link to="/consultas">Visualizar e Marcar Consultas</Link>
          </li>
          <li>
            <Link to="/registros">Visualizar e Adicionar Registros Médicos</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
