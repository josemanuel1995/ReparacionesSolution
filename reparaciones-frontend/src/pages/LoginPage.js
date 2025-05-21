import axios from 'axios';
import { useState } from 'react';
import {
  Container, TextField, Button, Typography, Paper,
  Box, Snackbar, Alert, InputAdornment, IconButton
} from '@mui/material';
import { loginUser } from '../api/auth';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Dialog from '@mui/material/Dialog';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [alerta, setAlerta] = useState({ mensaje: '', tipo: 'error', visible: false });
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const data = await loginUser(form);
      login(data.token);
      navigate('/');
    } catch (error) {
      const msg = error.response?.data?.message || 'Credenciales inválidas';
      mostrarAlerta(msg);
    }
  };

  const mostrarAlerta = (mensaje, tipo = 'error') => {
    setAlerta({ mensaje, tipo, visible: true });
  };

  const [mostrarFormularioRecuperacion, setMostrarFormularioRecuperacion] = useState(false);
  const [correoRecuperacion, setCorreoRecuperacion] = useState('');

  const recuperarPassword = async () => {
    try {
        await axios.post('http://localhost:5050/api/auth/forgot-password', {
        email: correoRecuperacion,
        frontendUrl: 'http://localhost:3000'
        });
        mostrarAlerta('Correo enviado. Revisa tu bandeja.', 'success');
        setMostrarFormularioRecuperacion(false);
        } catch (err) {
            mostrarAlerta('No se pudo enviar el correo', 'error');
        }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
      <Paper
        elevation={6}
        sx={{
            p: 4,
            width: '100%',
            backgroundColor: '#ffffffcc', // Blanco semitransparente
            backdropFilter: 'blur(6px)',
            borderRadius: 2,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
        >

        <Typography variant="h5" align="center" gutterBottom color="#003366">
          !Bienvenido al Gestor de Órdenes para la Reparación de Electrodomésticos¡
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Correo electrónico"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Contraseña"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            variant="contained"
            onClick={handleLogin}
            fullWidth
            sx={{ backgroundColor: '#003366', color: 'white', '&:hover': { backgroundColor: '#002244' } }}
          >
            Iniciar Sesión
          </Button>
          <Button
            variant="text"
            onClick={() => navigate('/register')}
            sx={{ color: '#003366' }}
          >
            Crear nuevo usuario
          </Button>
          <Button
            variant="text"
            onClick={() => navigate('/forgot-password')}
            sx={{ color: '#003366' }}
            >
            ¿Olvidaste tu contraseña?
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={alerta.visible}
        autoHideDuration={3000}
        onClose={() => setAlerta({ ...alerta, visible: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={alerta.tipo}
          variant="filled"
          onClose={() => setAlerta({ ...alerta, visible: false })}
        >
          {alerta.mensaje}
        </Alert>
      </Snackbar>
    </Container>
  );
}
