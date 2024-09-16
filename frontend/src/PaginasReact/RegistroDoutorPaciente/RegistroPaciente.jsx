// src/PaginasReact/RegistroDoutorPaciente/RegistroPaciente.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const RegistroPaciente = () => {
  const [nome, setNome] = useState('');
  const [nomeMae, setNomeMae] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cidadeNatal, setCidadeNatal] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [doencasPreExistentes, setDoencasPreExistentes] = useState('');
  const [alergias, setAlergias] = useState('');
  const [fumante, setFumante] = useState('');
  const [etilista, setEtilista] = useState('');
  const [usoDrogas, setUsoDrogas] = useState('');
  const [cirurgia, setCirurgia] = useState('');
  const [carteiraVacina, setCarteiraVacina] = useState('');
  const [medicacoes, setMedicacoes] = useState('');
  const [usoAnticoncepcional, setUsoAnticoncepcional] = useState('');
  const [qualidadeSono, setQualidadeSono] = useState('');
  const [gestante, setGestante] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/pacientes/', {
        nome,
        nome_mae: nomeMae,
        data_nascimento: dataNascimento,
        cidade_natal: cidadeNatal,
        peso,
        altura,
        doencas_pre_existentes: doencasPreExistentes,
        alergias,
        fumante,
        etilista,
        uso_drogas: usoDrogas,
        cirurgia,
        carteira_vacina: carteiraVacina,
        medicacoes,
        uso_anticoncepcional: usoAnticoncepcional,
        qualidade_sono: qualidadeSono,
        gestante,
      });
      alert('Paciente registrado com sucesso');
      setRedirect(true); // Redireciona após o sucesso
    } catch (error) {
      alert('Erro ao registrar paciente');
    }
  };

  if (redirect) {
    return <Navigate to="/visualizar-marcar-consultas" />;
  }

  return (
    <div>
      <h2>Registro de Paciente</h2>
      <form onSubmit={handleSubmit}>
        {/* Formulário de Registro com campos para todos os dados */}
        {/* Exemplo para o nome */}
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <br />
        {/* Adicione campos para todos os outros dados seguindo o mesmo padrão */}
        <button type="submit">Registrar Paciente</button>
      </form>
    </div>
  );
};

export default RegistroPaciente;
