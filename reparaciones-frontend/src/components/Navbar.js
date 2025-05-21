import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { token, logout, nombre } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="static" style={{ backgroundColor: '#003366' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          Gestor de órdenes para la reparación de electrodomésticos
        </Typography>

        {token && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1">
              👋 Hola, {nombre}
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              Cerrar sesión
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
