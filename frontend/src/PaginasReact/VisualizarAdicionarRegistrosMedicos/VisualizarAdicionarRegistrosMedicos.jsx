// src/PaginasReact/VisualizarAdicionarRegistrosMedicos/VisualizarAdicionarRegistrosMedicos.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VisualizarAdicionarRegistrosMedicos = () => {
  const [prontuarios, setProntuarios] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [novoProntuario, setNovoProntuario] = useState({
    paciente: '',
    medico: '',
    especialidade: '',
    resultado_exames: '',
    anamnese: '',
    evolucao_grafica: '',
  });

  useEffect(() => {
    async function fetchData() {
      const [pacientesResponse, medicosResponse, prontuariosResponse] = await Promise.all([
        axios.get('http://localhost:8000/api/pacientes/'),
        axios.get('http://localhost:8000/api/medicos/'),
        axios.get('http://localhost:8000/api/prontuarios/'),
      ]);
      setPacientes(pacientesResponse.data);
      setMedicos(medicosResponse.data);
      setProntuarios(prontuariosResponse.data);
    }
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/prontuarios/', novoProntuario);
      alert('Prontuário adicionado com sucesso');
    } catch (error) {
      alert('Erro ao adicionar prontuário');
    }
  };

  return (
    <div>
      <h2>Visualizar e Adicionar Registros Médicos</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Paciente:
          <select onChange={(e) => setNovoProntuario({ ...novoProntuario, paciente: e.target.value })}>
            {pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.id}>{paciente.nome}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Médico:
          <select onChange={(e) => setNovoProntuario({ ...novoProntuario, medico: e.target.value })}>
            {medicos.map((medico) => (
              <option key={medico.id} value={medico.id}>{medico.nome}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Especialidade:
          <input type="text" value={novoProntuario.especialidade} onChange={(e) => setNovoProntuario({ ...novoProntuario, especialidade: e.target.value })} />
        </label>
        <br />
        <label>
          Resultado dos Exames:
          <textarea value={novoProntuario.resultado_exames} onChange={(e) => setNovoProntuario({ ...novoProntuario, resultado_exames: e.target.value })} />
        </label>
        <br />
        <label>
          Anamnese:
          <textarea value={novoProntuario.anamnese} onChange={(e) => setNovoProntuario({ ...novoProntuario, anamnese: e.target.value })} />
        </label>
        <br />
        <label>
          Evolução Gráfica:
          <textarea value={novoProntuario.evolucao_grafica} onChange={(e) => setNovoProntuario({ ...novoProntuario, evolucao_grafica: e.target.value })} />
        </label>
        <br />
        <button type="submit">Adicionar Prontuário</button>
      </form>
      <h3>Prontuários Adicionados</h3>
      <ul>
        {prontuarios.map((prontuario) => (
          <li key={prontuario.id}>
            Paciente: {prontuario.paciente.nome} | Médico: {prontuario.medico.nome} | Especialidade: {prontuario.especialidade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VisualizarAdicionarRegistrosMedicos;
