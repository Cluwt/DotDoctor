import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h2>Homepage</h2>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/registro">Registro</Link></li>
          
          
        
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
