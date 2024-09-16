// src/PaginasReact/VisualizarMarcarConsultas/VisualizarMarcarConsultas.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VisualizarMarcarConsultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [novaConsulta, setNovaConsulta] = useState({
    paciente: '',
    medico: '',
    data: '',
    observacoes: '',
    tipo: '',
    acompanhamento: false,
  });

  useEffect(() => {
    async function fetchData() {
      const [pacientesResponse, medicosResponse, consultasResponse] = await Promise.all([
        axios.get('http://localhost:8000/api/pacientes/'),
        axios.get('http://localhost:8000/api/medicos/'),
        axios.get('http://localhost:8000/api/consultas/'),
      ]);
      setPacientes(pacientesResponse.data);
      setMedicos(medicosResponse.data);
      setConsultas(consultasResponse.data);
    }
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/consultas/', novaConsulta);
      alert('Consulta marcada com sucesso');
    } catch (error) {
      alert('Erro ao marcar consulta');
    }
  };

  return (
    <div>
      <h2>Visualizar e Marcar Consultas</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Paciente:
          <select onChange={(e) => setNovaConsulta({ ...novaConsulta, paciente: e.target.value })}>
            {pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.id}>{paciente.nome}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Médico:
          <select onChange={(e) => setNovaConsulta({ ...novaConsulta, medico: e.target.value })}>
            {medicos.map((medico) => (
              <option key={medico.id} value={medico.id}>{medico.nome}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Data da Consulta:
          <input type="date" onChange={(e) => setNovaConsulta({ ...novaConsulta, data: e.target.value })} />
        </label>
        <br />
        <label>
          Observações:
          <textarea onChange={(e) => setNovaConsulta({ ...novaConsulta, observacoes: e.target.value })} />
        </label>
        <br />
        <label>
          Tipo de Consulta:
          <select onChange={(e) => setNovaConsulta({ ...novaConsulta, tipo: e.target.value })}>
            <option value="particular">Particular</option>
            <option value="convenio">Convênio</option>
            <option value="sus">SUS</option>
          </select>
        </label>
        <br />
        <label>
          Acompanhamento:
          <input type="checkbox" onChange={(e) => setNovaConsulta({ ...novaConsulta, acompanhamento: e.target.checked })} />
        </label>
        <br />
        <button type="submit">Marcar Consulta</button>
      </form>
      <h3>Consultas Agendadas</h3>
      <ul>
        {consultas.map((consulta) => (
          <li key={consulta.id}>
            Paciente: {consulta.paciente.nome} | Médico: {consulta.medico.nome} | Data: {consulta.data}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VisualizarMarcarConsultas;
