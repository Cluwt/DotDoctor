import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 


const LoginPage = () => {
    const [nome_usuario, setNomeUsuario] = useState('');  // Nome de usuário
    const [senha, setSenha] = useState('');  // Senha
    const [error, setError] = useState('');  // Estado para mensagens de erro
    const navigate = useNavigate();  // Inicializa o hook useNavigate


    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');  
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                nome_usuario: nome_usuario,  // Nome de usuário conforme esperado pelo backend
                senha: senha,  // Senha conforme esperado pelo backend
            });

            if (response.data.message) {
                // Login bem-sucedido
                alert(response.data.message);
                setError('');  
                navigate('/dashboard')
            } else {
                // Fallback, se a resposta não incluir `message`
                alert('Login realizado com sucesso');
                setError('');  
            }
        } catch (err) {
            // Define a mensagem de erro apenas se houver falha real
            setError('Credenciais inválidas');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Usuário"
                    value={nome_usuario}
                    onChange={(e) => setNomeUsuario(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {/* Mostra a mensagem de erro, se houver */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default LoginPage;
