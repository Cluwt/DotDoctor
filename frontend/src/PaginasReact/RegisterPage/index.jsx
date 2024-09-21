import React, { useState } from 'react';

const RegisterPage = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
  const [mensagem, setMensagem] = useState('');
  const ipAddress = "http://localhost:8000/"

  const handleSubmit = (event) => {
    event.preventDefault();

    // Dados a serem enviados para o backend
    const data = {
      nome_usuario: usuario, // Nome de usuário conforme esperado no backend
      senha: senha,          // Senha conforme esperado no backend
      senha_confirmacao: senhaConfirmacao // Confirmação da senha
    };

    // Enviando a solicitação POST para o backend
    fetch(ipAddress + 'api/registro/', {
      // Método aplicado: POST
      method: 'POST',
      // Do tipo headers:
      headers: {
        'Content-Type': 'application/json',
      },
    // Convertendo o objeto para JSON
      body: JSON.stringify(data), 
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        // Exibe a mensagem de erro se houver algum problema
        setMensagem('Erro ao registrar usuário: ' + data.error);
      } else {
        // Exibe a mensagem de sucesso
        setMensagem('Usuário registrado com sucesso!');
      }
    })
    .catch(error => {
      // Tratar erros não relacionados à resposta do servidor
      console.error('Erro:', error);
      setMensagem('Ocorreu um erro ao registrar o usuário.');
    });
  };

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Usuário:
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Senha:
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Confirmar Senha:
          <input
            type="password"
            value={senhaConfirmacao}
            onChange={(e) => setSenhaConfirmacao(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Registrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default RegisterPage;
