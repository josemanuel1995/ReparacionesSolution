import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Container, Paper, Typography, TextField, Button, Box,
  Snackbar, Alert, LinearProgress, List, ListItem, ListItemText,
  IconButton, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

export default function NewPasswordPage() {
  const [params] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [alerta, setAlerta] = useState({ mensaje: '', tipo: 'success', visible: false });

  const email = params.get('email');
  const token = params.get('token');
  const navigate = useNavigate();

  const mostrarAlerta = (mensaje, tipo = 'success') => {
    setAlerta({ mensaje, tipo, visible: true });
  };

  const validarRequisitos = (pwd) => ({
    minLength: pwd.length >= 8,
    mayuscula: /[A-Z]/.test(pwd),
    minuscula: /[a-z]/.test(pwd),
    numero: /[0-9]/.test(pwd),
    simbolo: /[^A-Za-z0-9]/.test(pwd),
  });

  const fuerza = Object.values(validarRequisitos(newPassword)).filter(Boolean).length;

  const handleSubmit = async () => {
    const requisitos = validarRequisitos(newPassword);

    if (!Object.values(requisitos).every(Boolean)) {
      mostrarAlerta('La contraseña no cumple con todos los requisitos', 'warning');
      return;
    }

    if (newPassword !== confirmPassword) {
      mostrarAlerta('Las contraseñas no coinciden', 'error');
      return;
    }

    try {
      await axios.post('http://localhost:5050/api/auth/reset-password', {
        email,
        token,
        newPassword
      });
      mostrarAlerta('Contraseña actualizada. Redirigiendo...', 'success');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      mostrarAlerta('Error al restablecer la contraseña', 'error');
    }
  };

  const requisitos = validarRequisitos(newPassword);

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
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

        <Typography variant="h5" color="#003366" align="center" gutterBottom>
          Establecer nueva contraseña
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nueva contraseña"
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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

          <TextField
            label="Confirmar contraseña"
            type={showConfirm ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Typography variant="subtitle2" color="textSecondary">
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
            sx={{ backgroundColor: '#003366', '&:hover': { backgroundColor: '#002244' } }}
          >
            Guardar nueva contraseña
          </Button>
        </Box>

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
      </Paper>
    </Container>
  );
}
