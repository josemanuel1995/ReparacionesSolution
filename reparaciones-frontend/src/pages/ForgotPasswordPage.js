import { useState } from 'react';
import {
  Container, TextField, Button, Typography, Paper, Box,
  Snackbar, Alert
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({ mensaje: '', tipo: 'success', visible: false });

  const navigate = useNavigate();

  const mostrarAlerta = (mensaje, tipo = 'success') => {
    setAlerta({ mensaje, tipo, visible: true });
  };

  const handleEnviarCorreo = async () => {
    if (!email.trim()) {
      mostrarAlerta('Ingresa un correo válido', 'warning');
      return;
    }

    try {
      await axios.post('http://localhost:5050/api/auth/forgot-password', {
        email,
        frontendUrl: 'http://localhost:3000'
      });
      mostrarAlerta('Correo enviado. Revisa tu bandeja.', 'success');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Error al enviar el correo';
      mostrarAlerta(msg, 'error');
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
          Recuperar Contraseña
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleEnviarCorreo}
            sx={{ backgroundColor: '#003366', color: 'white', '&:hover': { backgroundColor: '#002244' } }}
            fullWidth
          >
            Enviar enlace de recuperación
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
