import { useState } from 'react';
import {
  Container, TextField, Button, Typography, Paper, Box, Snackbar,
  Alert, InputAdornment, IconButton, List, ListItem, ListItemText, MenuItem
} from '@mui/material';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LinearProgress } from '@mui/material';

const tiposDocumento = ['CC', 'NIT', 'CE'];

export default function RegisterPage() {
  const [form, setForm] = useState({
    numeroIdentificacion: '',
    nombres: '', apellido: '', tipoDocumento: 'CC',
    fechaNacimiento: '', phoneNumber: '', email: '', password: ''
  });
  const [alerta, setAlerta] = useState({ mensaje: '', tipo: 'success', visible: false });
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const mostrarAlerta = (mensaje, tipo = 'success') => {
  setAlerta({ mensaje, tipo, visible: true });
};

  const validarRequisitos = (pwd) => ({
    minLength: pwd.length >= 8,
    mayuscula: /[A-Z]/.test(pwd),
    minuscula: /[a-z]/.test(pwd),
    numero: /[0-9]/.test(pwd),
    simbolo: /[^A-Za-z0-9]/.test(pwd)
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async () => {
    const requisitos = validarRequisitos(password);
    const requisitosCumplidos = Object.values(requisitos).every(Boolean);

    if (!form.email || !password || !requisitosCumplidos) {
      mostrarAlerta('La contraseña no cumple con los requisitos.', 'warning');
      return;
    }

    try {
      await registerUser({ ...form, password });
      mostrarAlerta('Usuario registrado con éxito');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      const errores = err.response?.data?.errors;
      if (errores) {
        const mensajes = Object.values(errores).flat();
        mostrarAlerta(mensajes.join(', '), 'error');
      } else {
        mostrarAlerta('Error inesperado: ' + (err.response?.data || 'Sin mensaje'), 'error');
      }
    }
  };

  const requisitos = validarRequisitos(password);
  const fuerza = Object.values(requisitos).filter(Boolean).length;
  
  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={6} sx={{ p: 4, width: '100%', backgroundColor: '#ffffffcc', backdropFilter: 'blur(6px)', borderRadius: 2, boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h5" align="center" gutterBottom color="#003366">
          Registro de Usuario
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Nombres" name="nombres" value={form.nombres} onChange={handleChange} fullWidth />
          <TextField label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} fullWidth />
          <TextField select label="Tipo de documento" name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange} fullWidth>
            {tiposDocumento.map((tipo) => (
              <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
            ))}
          </TextField>
          <TextField label="Número de identificación" name="numeroIdentificacion" value={form.numeroIdentificacion} onChange={handleChange} fullWidth />
          <TextField label="Fecha de nacimiento" name="fechaNacimiento" type="date" value={form.fechaNacimiento} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
          <TextField label="Celular" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} fullWidth />
          <TextField label="Correo electrónico" name="email" type="email" value={form.email} onChange={handleChange} fullWidth />
          <TextField
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setForm(prev => ({ ...prev, password: e.target.value }));
            }}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <LinearProgress
            variant="determinate"
            value={(fuerza / 5) * 100}
            sx={{ height: 8, borderRadius: 5 }}
            color={fuerza < 3 ? 'error' : fuerza < 4 ? 'warning' : 'success'}
           />

          <Typography variant="subtitle2" sx={{ mt: 1 }}>
            La contraseña debe contener:
          </Typography>
          <List dense>
            <ListItem><ListItemText primary="• Mínimo 8 caracteres" style={{ color: requisitos.minLength ? 'green' : 'gray' }} /></ListItem>
            <ListItem><ListItemText primary="• Una letra mayúscula" style={{ color: requisitos.mayuscula ? 'green' : 'gray' }} /></ListItem>
            <ListItem><ListItemText primary="• Una letra minúscula" style={{ color: requisitos.minuscula ? 'green' : 'gray' }} /></ListItem>
            <ListItem><ListItemText primary="• Un número" style={{ color: requisitos.numero ? 'green' : 'gray' }} /></ListItem>
            <ListItem><ListItemText primary="• Un símbolo" style={{ color: requisitos.simbolo ? 'green' : 'gray' }} /></ListItem>
          </List>

          <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!Object.values(requisitos).every(Boolean)} // ❗️ Deshabilita si no cumple
                sx={{
                    backgroundColor: '#003366',
                    color: 'white',
                    '&:hover': { backgroundColor: '#002244' },
                    opacity: Object.values(requisitos).every(Boolean) ? 1 : 0.6,
                    cursor: Object.values(requisitos).every(Boolean) ? 'pointer' : 'not-allowed'
                }}
                fullWidth
                >
                Registrarse
            </Button>

          <Button variant="text" onClick={() => navigate('/login')} sx={{ color: '#003366' }}>
            Volver al login
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={alerta.visible}
        autoHideDuration={3000}
        onClose={() => setAlerta({ ...alerta, visible: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={alerta.tipo} variant="filled" onClose={() => setAlerta({ ...alerta, visible: false })}>
          {alerta.mensaje}
        </Alert>
      </Snackbar>
    </Container>
  );
}
