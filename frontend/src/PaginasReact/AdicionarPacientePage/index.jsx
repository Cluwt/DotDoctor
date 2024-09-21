import React, { useState } from 'react';
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
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  FormControlLabel,
  Checkbox,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Ícone de sucesso
import ErrorIcon from '@mui/icons-material/Error'; // Ícone de erro
import dotdoctorLogo from '../DashboardPage/Components/dotdoctor.png'; // Logo do projeto

import './index.css'; // Adicione estilos CSS personalizados aqui

const drawerWidth = 240;

const AdicionarPacientePage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    nome_mae: '',
    data_nascimento: '',
    cidade_natal: '',
    peso: '',
    altura: '',
    doencas_preexistentes: '',
    alergias: '',
    fumante: false,
    tipo_fumante: '',
    etilista: false,
    uso_drogas_ilicitas: false,
    cirurgias_realizadas: '',
    carteira_vacinacao: '',
    medicacoes_em_uso: '',
    uso_anticoncepcional: false,
    qualidade_sono: '',
    ja_foi_gestante: false,
  });

  const [openSuccess, setOpenSuccess] = useState(false); // Estado do Modal de sucesso
  const [openError, setOpenError] = useState(false); // Estado do Modal de erro
  const [errorMessage, setErrorMessage] = useState(''); // Mensagem de erro

  const handleOpenSuccess = () => setOpenSuccess(true);
  const handleCloseSuccess = () => setOpenSuccess(false);

  const handleOpenError = () => setOpenError(true);
  const handleCloseError = () => setOpenError(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviando os dados para a API
    fetch('http://localhost:8000/api/pacientes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          // Se a resposta não for bem-sucedida, captura o erro
          return response.json().then((error) => {
            throw new Error(error.message || 'Erro ao adicionar paciente.');
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log('Paciente adicionado com sucesso:', data);
        handleOpenSuccess(); // Abre o modal de sucesso após o sucesso

        // Fecha o modal de sucesso após 3 segundos
        setTimeout(() => {
          handleCloseSuccess();
        }, 3000);
      })
      .catch((error) => {
        console.error('Erro ao adicionar paciente:', error);
        setErrorMessage(error.message); // Define a mensagem de erro
        handleOpenError(); // Abre o modal de erro

        // Fecha o modal de erro após 5 segundos
        setTimeout(() => {
          handleCloseError();
        }, 5000);
      });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#0398fc' }}>
        <Toolbar>
          <img src={dotdoctorLogo} alt="DotDoctor Logo" style={{ height: '40px', marginRight: '10px' }} />
          <Typography variant="h6" noWrap component="div">
            DotDoctor
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#5a97bf',
            transition: 'background-color 0.3s ease',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon><DashboardIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem button component={Link} to="/pacientes/adicionar">
            <ListItemIcon><PeopleIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Pacientes" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem button component={Link} to="/consultas">
            <ListItemIcon><EventNoteIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Consultas" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem button component={Link} to="/usuarios">
            <ListItemIcon><AccountCircleIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Usuários" sx={{ color: '#fff' }} />
          </ListItem>
          <ListItem button component={Link} to="/perfil">
            <ListItemIcon><SettingsIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Configurações de Perfil" sx={{ color: '#fff' }} />
          </ListItem>
          <Divider sx={{ backgroundColor: '#ffffff80' }} />
          <ListItem button component={Link} to="/logout">
            <ListItemIcon><ExitToAppIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Fazer Logout" sx={{ color: '#fff' }} />
          </ListItem>
        </List>
      </Drawer>

      {/* Formulário de Adicionar Paciente */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f5f5f5', p: 3, marginLeft: '20px' }}>
        <Toolbar />
        <Typography variant="h4" sx={{ mb: 3 }}>Adicionar Paciente</Typography>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Primeira Coluna */}
              <Grid item xs={6}>
                <TextField fullWidth label="Nome do Paciente" name="nome" value={formData.nome} onChange={handleChange} variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Nome da Mãe" name="nome_mae" value={formData.nome_mae} onChange={handleChange} variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth type="date" label="Data de Nascimento" name="data_nascimento" value={formData.data_nascimento} onChange={handleChange} InputLabelProps={{ shrink: true }} variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Cidade Natal" name="cidade_natal" value={formData.cidade_natal} onChange={handleChange} variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Peso (kg)" name="peso" value={formData.peso} onChange={handleChange} variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Altura (m)" name="altura" value={formData.altura} onChange={handleChange} variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Doenças Preexistentes" name="doencas_preexistentes" value={formData.doencas_preexistentes} onChange={handleChange} variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Alergias" name="alergias" value={formData.alergias} onChange={handleChange} variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Carteira de Vacinação" name="carteira_vacinacao" value={formData.carteira_vacinacao} onChange={handleChange} variant="outlined" />
              </Grid>

              {/* Segunda Coluna */}
              <Grid item xs={6}>
                <TextField fullWidth label="Cirurgias Realizadas" name="cirurgias_realizadas" value={formData.cirurgias_realizadas} onChange={handleChange} variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Medicações em Uso" name="medicacoes_em_uso" value={formData.medicacoes_em_uso} onChange={handleChange} variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Qualidade do Sono" name="qualidade_sono" value={formData.qualidade_sono} onChange={handleChange} variant="outlined" />
              </Grid>

              {/* Checkboxes */}
              <Grid item xs={6}><FormControlLabel control={<Checkbox checked={formData.fumante} onChange={handleChange} name="fumante" />} label="Fumante" /></Grid>
              {formData.fumante && (
                <Grid item xs={6}><TextField fullWidth label="Tipo de Fumante" name="tipo_fumante" value={formData.tipo_fumante} onChange={handleChange} variant="outlined" /></Grid>
              )}
              <Grid item xs={6}><FormControlLabel control={<Checkbox checked={formData.etilista} onChange={handleChange} name="etilista" />} label="Etilista" /></Grid>
              <Grid item xs={6}><FormControlLabel control={<Checkbox checked={formData.uso_drogas_ilicitas} onChange={handleChange} name="uso_drogas_ilicitas" />} label="Uso de Drogas Ilícitas" /></Grid>
              <Grid item xs={6}><FormControlLabel control={<Checkbox checked={formData.uso_anticoncepcional} onChange={handleChange} name="uso_anticoncepcional" />} label="Uso de Anticoncepcional" /></Grid>
              <Grid item xs={6}><FormControlLabel control={<Checkbox checked={formData.ja_foi_gestante} onChange={handleChange} name="ja_foi_gestante" />} label="Já Foi Gestante" /></Grid>
            </Grid>

            {/* Botões para Adicionar e Editar */}
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Button type="submit" variant="contained" color="primary" sx={{ width: '100%' }}>Adicionar Paciente</Button>
            </Box>
          </form>
        </Paper>

        {/* Modal de Sucesso */}
        <Modal
          open={openSuccess}
          onClose={handleCloseSuccess}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openSuccess}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Ícone com animação de checkmark */}
              <CheckCircleIcon className="checkmark-animation" sx={{ fontSize: 100, color: 'green' }} />
              <Typography variant="h6" component="h2">
                Paciente foi cadastrado no sistema!
              </Typography>
            </Box>
          </Fade>
        </Modal>

        {/* Modal de Erro */}
        <Modal
          open={openError}
          onClose={handleCloseError}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openError}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Ícone com animação de erro */}
              <ErrorIcon sx={{ fontSize: 100, color: 'red' }} />
              <Typography variant="h6" component="h2">
                Erro ao cadastrar paciente.
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {errorMessage}
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </Box>
  );
};

export default AdicionarPacientePage;
