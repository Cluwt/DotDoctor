import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Atualizado

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmacao, setPasswordConfirmacao] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8000/registro/', { 
        nome_usuario: username, 
        senha: password, 
        senha_confirmacao: passwordConfirmacao 
      });
      alert('Usuário registrado com sucesso');
      navigate('/login');
    } catch (error) {
      alert('Erro ao registrar usuário');
    }
    
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome de usuário:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Senha:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Confirmar Senha:
          <input type="password" value={passwordConfirmacao} onChange={(e) => setPasswordConfirmacao(e.target.value)} />
        </label>
        <br />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterPage;
