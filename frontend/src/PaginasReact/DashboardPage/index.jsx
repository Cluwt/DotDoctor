import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import { MdDashboard, MdPeople, MdEventNote } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

// Importando Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'; // Ícones de Font Awesome

// Ícones do Material-UI
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// Importando a imagem do logo
import dotdoctorLogo from './Components/dotdoctor.png';  // Certifique-se de que o caminho está correto

import './index.css';

const drawerWidth = 240;

const data = [
  { name: 'Consultas Feitas', value: 10 },
  { name: 'Consultas Pendentes', value: 5 },
  { name: 'Consultas Canceladas', value: 2 },
];

const COLORS = ['#4CAF50', '#FF9800', '#F44336'];

const consultasAgendadas = [
  { paciente: 'João Silva', medico: 'Dr. Carlos', horario: '10:00', status: 'Confirmada' },
  { paciente: 'Maria Souza', medico: 'Dra. Ana', horario: '11:00', status: 'Aguardando' },
  { paciente: 'Pedro Alves', medico: 'Dr. João', horario: '12:00', status: 'Confirmada' }
];

const atividadesRecentes = [
  { atividade: 'Consulta com João Silva confirmada', data: 'Hoje, 10:00' },
  { atividade: 'Consulta com Maria Souza marcada', data: 'Hoje, 09:30' },
  { atividade: 'Paciente Pedro Alves registrado', data: 'Ontem, 15:00' },
];

const dataConsultasMensal = [
  { name: 'Semana 1', consultas: 20 },
  { name: 'Semana 2', consultas: 25 },
  { name: 'Semana 3', consultas: 30 },
  { name: 'Semana 4', consultas: 28 },
];

const DashboardPage = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Navbar com azul mais claro */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#0398fc' }}>
        <Toolbar>
          {/* Adicionando a imagem do logo antes do texto DotDoctor */}
          <img src={dotdoctorLogo} alt="DotDoctor Logo" style={{ height: '40px', marginRight: '10px' }} />
          <Typography variant="h6" noWrap component="div">
            DotDoctor
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar com azul mais claro e animações */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#5a97bf',  // Azul mais claro para a sidebar
            transition: 'background-color 0.3s ease', // Animação de mudança de cor
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {/* Cada item do menu com efeito hover */}
          <ListItem
            button
            component={Link}
            to="/dashboard"
            sx={{
              '&:hover': {
                backgroundColor: '#90CAF9',  // Azul mais claro ao passar o mouse
                transform: 'scale(1.05)',  // Leve aumento
                transition: 'transform 0.2s ease, background-color 0.3s ease', // Transição suave
              },
            }}
          >
            <ListItemIcon><DashboardIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ color: '#fff' }} />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/registroPaciente"
            sx={{
              '&:hover': {
                backgroundColor: '#90CAF9',
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease, background-color 0.3s ease',
              },
            }}
          >
            <ListItemIcon><PeopleIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Pacientes" sx={{ color: '#fff' }} />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/consultas"
            sx={{
              '&:hover': {
                backgroundColor: '#90CAF9',
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease, background-color 0.3s ease',
              },
            }}
          >
            <ListItemIcon><EventNoteIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Consultas" sx={{ color: '#fff' }} />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/usuarios"
            sx={{
              '&:hover': {
                backgroundColor: '#90CAF9',
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease, background-color 0.3s ease',
              },
            }}
          >
            <ListItemIcon><AccountCircleIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Usuários" sx={{ color: '#fff' }} />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/perfil"
            sx={{
              '&:hover': {
                backgroundColor: '#90CAF9',
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease, background-color 0.3s ease',
              },
            }}
          >
            <ListItemIcon><SettingsIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Configurações de Perfil" sx={{ color: '#fff' }} />
          </ListItem>

          <Divider sx={{ backgroundColor: '#ffffff80' }} />

          <ListItem
            button
            component={Link}
            to="/logout"
            sx={{
              '&:hover': {
                backgroundColor: '#90CAF9',
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease, background-color 0.3s ease',
              },
            }}
          >
            <ListItemIcon><ExitToAppIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Fazer Logout" sx={{ color: '#fff' }} />
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: '#f5f5f5', p: 3 }}
      >
        <Toolbar />

        {/* Seção Principal com Gráfico e Cards */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Coluna dos Cards (à esquerda) */}
          <Grid container spacing={2} sx={{ maxWidth: '300px' }}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', background: 'linear-gradient(135deg, #4CAF50, #388E3C)', color: '#fff' }}>
                <Typography variant="h6">Consultas Feitas Hoje</Typography>
                <Typography variant="h4">10</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', background: 'linear-gradient(135deg, #2196F3, #1976D2)', color: '#fff' }}>
                <Typography variant="h6">Pacientes Agendados</Typography>
                <Typography variant="h4">5</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', background: 'linear-gradient(135deg, #7B1FA2, #9C27B0)', color: '#fff' }}>
                <Typography variant="h6">Pacientes Confirmados</Typography>
                <Typography variant="h4">8</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', background: 'linear-gradient(135deg, #F44336, #D32F2F)', color: '#fff' }}>
                <Typography variant="h6">Pacientes Que Faltaram</Typography>
                <Typography variant="h4">2</Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Divisor vertical com 10px de margem */}
          <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />

          {/* Gráfico de Pizza (à direita) */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ mb: 1, textDecoration: 'underline'}}>
              Consultas
            </Typography>
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Box>

          {/* Adiciona um Divider entre os gráficos */}
          <Divider orientation="vertical" flexItem sx={{ marginX: 4 }} />

          {/* Gráfico de Linhas - Consultas por Semana (aumentado) */}
          <Box sx={{ marginLeft: 5 }}>
          <Typography variant="h5" sx={{ mb: 0, marginBottom: 7, paddingLeft: 25, textDecoration: 'underline' }}>
          Consultas por Semana
            </Typography>
            <LineChart
              width={600}
              height={350}
              data={dataConsultasMensal}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="consultas" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </Box>
        </Box>

        {/* Tabela de Consultas Agendadas */}
        <br></br>
        <hr></hr>
        <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
          Consultas Agendadas
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Paciente</TableCell>
                <TableCell>Médico</TableCell>
                <TableCell>Horário</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ações</TableCell> {/* Nova coluna para as ações */}
              </TableRow>
            </TableHead>
            <TableBody>
              {consultasAgendadas.map((consulta, index) => (
                <TableRow key={index}>
                  <TableCell>{consulta.paciente}</TableCell>
                  <TableCell>{consulta.medico}</TableCell>
                  <TableCell>{consulta.horario}</TableCell>
                  <TableCell>{consulta.status}</TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <FontAwesomeIcon icon={faEdit} />
                    </IconButton>
                    <IconButton color="secondary">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {/* Linha sem dados */}
              <TableRow>
                <TableCell colSpan={4}></TableCell> {/* Células vazias */}
                <TableCell>
                  <IconButton color="primary">
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                  <IconButton color="secondary">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Atividades Recentes */}
        <Typography variant="h6" sx={{ mt: 5, mb: 2 }}>
          Atividades Recentes
        </Typography>
        <ul>
          {atividadesRecentes.map((item, index) => (
            <li key={index}>
              <Typography variant="body1">{item.atividade}</Typography>
              <Typography variant="body2" color="textSecondary">
                {item.data}
              </Typography>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default DashboardPage;
