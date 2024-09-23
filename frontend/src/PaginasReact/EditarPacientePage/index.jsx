import React, { useState, useEffect } from 'react';
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
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Backdrop,
  Fade,
  TextField,
  FormControlLabel,
  Checkbox,
  Button
} from '@mui/material'; // Adicione todos os componentes do Material-UI aqui
import { Link, useParams, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import dotdoctorLogo from '../DashboardPage/Components/dotdoctor.png'; // Logo do projeto



// Restante do código permanece o mesmo

const drawerWidth = 240;

const EditarPacientePage = () => {
  const [pacientes, setPacientes] = useState([]);
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

  const [anchorEl, setAnchorEl] = useState(null); // Estado do menu suspenso
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { pacienteId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/pacientes/')
      .then(response => response.json())
      .then(data => setPacientes(data))
      .catch(error => console.error('Erro ao carregar pacientes:', error));
  }, []);

  const handleOpenModal = (paciente) => {
    setFormData(paciente);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/pacientes/${formData.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(() => {
        setOpenModal(false);
        setPacientes(prevPacientes => prevPacientes.map(p => p.id === formData.id ? formData : p));
      })
      .catch(error => setErrorMessage(error.message));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/pacientes/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setPacientes(prevPacientes => prevPacientes.filter(p => p.id !== id));
      })
      .catch(error => console.error('Erro ao deletar paciente:', error));
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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

          <ListItem button onClick={handleMenuClick}>
            <ListItemIcon><PeopleIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Pacientes" sx={{ color: '#fff' }} />
          </ListItem>

          {/* Menu suspenso para Pacientes */}
          <Menu
            id="paciente-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'paciente-button',
            }}
          >
            <MenuItem component={Link} to="/pacientes/adicionar" onClick={handleMenuClose}>
              <ListItemIcon><AddIcon fontSize="small" /></ListItemIcon>
              <Typography variant="inherit">Adicionar Paciente</Typography>
            </MenuItem>
            <MenuItem component={Link} to="/pacientes/editar" onClick={handleMenuClose}>
              <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
              <Typography variant="inherit">Editar Paciente</Typography>
            </MenuItem>
            <MenuItem component={Link} to="/pacientes/excluir" onClick={handleMenuClose}>
              <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
              <Typography variant="inherit">Excluir Paciente</Typography>
            </MenuItem>
          </Menu>

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

      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f5f5f5', p: 3, marginLeft: '20px' }}>
        <Toolbar />
        <Typography variant="h4" sx={{ mb: 3 }}>Gerenciar Pacientes</Typography>

        {/* Tabela de Pacientes */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome do Paciente</TableCell>
                <TableCell>Nome da Mãe</TableCell>
                <TableCell>Data de Nascimento</TableCell>
                <TableCell>Cidade Natal</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pacientes.map((paciente) => (
                <TableRow key={paciente.id}>
                  <TableCell>{paciente.nome}</TableCell>
                  <TableCell>{paciente.nome_mae}</TableCell>
                  <TableCell>{paciente.data_nascimento}</TableCell>
                  <TableCell>{paciente.cidade_natal}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenModal(paciente)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(paciente.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal de Edição */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={openModal}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 800, // Aumentado horizontalmente
                maxHeight: '90vh', // Máxima altura
                overflowY: 'auto', // Scroll vertical caso necessário
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                Editar Paciente
              </Typography>
              <form onSubmit={handleEditSubmit}>
                <Grid container spacing={2}>
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
                    <TextField fullWidth label="Cirurgias Realizadas" name="cirurgias_realizadas" value={formData.cirurgias_realizadas} onChange={handleChange} variant="outlined" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Carteira de Vacinação" name="carteira_vacinacao" value={formData.carteira_vacinacao} onChange={handleChange} variant="outlined" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Medicações em Uso" name="medicacoes_em_uso" value={formData.medicacoes_em_uso} onChange={handleChange} variant="outlined" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Qualidade do Sono" name="qualidade_sono" value={formData.qualidade_sono} onChange={handleChange} variant="outlined" />
                  </Grid>

                  {/* Checkboxes */}
                  <Grid item xs={6}>
                    <FormControlLabel control={<Checkbox checked={formData.fumante} onChange={handleChange} name="fumante" />} label="Fumante" />
                  </Grid>
                  {formData.fumante && (
                    <Grid item xs={6}>
                      <TextField fullWidth label="Tipo de Fumante" name="tipo_fumante" value={formData.tipo_fumante} onChange={handleChange} variant="outlined" />
                    </Grid>
                  )}
                  <Grid item xs={6}>
                    <FormControlLabel control={<Checkbox checked={formData.etilista} onChange={handleChange} name="etilista" />} label="Etilista" />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel control={<Checkbox checked={formData.uso_drogas_ilicitas} onChange={handleChange} name="uso_drogas_ilicitas" />} label="Uso de Drogas Ilícitas" />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel control={<Checkbox checked={formData.uso_anticoncepcional} onChange={handleChange} name="uso_anticoncepcional" />} label="Uso de Anticoncepcional" />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel control={<Checkbox checked={formData.ja_foi_gestante} onChange={handleChange} name="ja_foi_gestante" />} label="Já Foi Gestante" />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Editar Paciente
                  </Button>
                </Box>
              </form>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </Box>
  );
};

export default EditarPacientePage;
