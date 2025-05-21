import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  List, ListItem, ListItemText, Typography, Button,
  IconButton, Snackbar, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BreadcrumbsNav from '../components/BreadcrumbsNav';


function ClienteDetallePage() {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [ordenes, setOrdenes] = useState([]);
  const [ordenEditando, setOrdenEditando] = useState(null);
  const [alerta, setAlerta] = useState({ mensaje: '', tipo: 'success', visible: false });

  const navigate = useNavigate();
  const apiBaseUrl = 'http://localhost:5050/api';

  const cargarDatos = async () => {
    try {
      const clienteRes = await axios.get(`${apiBaseUrl}/clientes/${id}`);
      const ordenesRes = await axios.get(`${apiBaseUrl}/ordenes`);
      setCliente(clienteRes.data);
      setOrdenes(ordenesRes.data.filter((o) => o.clienteId === parseInt(id)));
    } catch (error) {
      mostrarAlerta('Error al cargar los datos', 'error');
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [id]);

  const mostrarAlerta = (mensaje, tipo = 'success') => {
    setAlerta({ mensaje, tipo, visible: true });
  };

  const crearOrden = async () => {
    try {
      await axios.post(`${apiBaseUrl}/ordenes`, { clienteId: parseInt(id) });
      mostrarAlerta('Orden creada con éxito');
      cargarDatos();
    } catch (error) {
      mostrarAlerta('Error al crear la orden', 'error');
    }
  };

  const guardarOrden = async () => {
    if (!ordenEditando) return;

    try {
      await axios.put(`${apiBaseUrl}/ordenes/${ordenEditando.id}`, {
        clienteId: parseInt(id),
      });
      mostrarAlerta(`Orden #${ordenEditando.id} actualizada`);
      setOrdenEditando(null);
      cargarDatos();
    } catch (error) {
      mostrarAlerta('Error al actualizar la orden', 'error');
    }
  };

  const eliminarOrden = async (ordenId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta orden?')) return;

    try {
      await axios.delete(`${apiBaseUrl}/ordenes/${ordenId}`);
      mostrarAlerta('Orden eliminada');
      cargarDatos();
    } catch (error) {
      mostrarAlerta('Error al eliminar la orden', 'error');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <BreadcrumbsNav />
      <Button variant="outlined" onClick={() => navigate(-1)} style={{ marginBottom: 10 }}>
      ⬅ Atrás
      </Button>
      <Typography variant="h4" gutterBottom>
        Cliente: {cliente?.nombre}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Celular: {cliente?.celular}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Dirección: {cliente?.direccion}
      </Typography>
      <Typography variant="subtitle3" gutterBottom>
        Correo: {cliente?.correo}
      </Typography>
      <br/>
      <br/>
      <Button onClick={crearOrden} variant="contained" style={{ marginBottom: 10 }}>
        Crear nueva orden
      </Button>

      {ordenEditando && (
        <>
          <Typography variant="subtitle2" style={{ marginTop: 10 }}>
            Editando orden #{ordenEditando.id}
          </Typography>
          <Button
            onClick={guardarOrden}
            variant="outlined"
            color="primary"
            style={{ marginRight: 10 }}
          >
            Guardar cambios
          </Button>
        </>
      )}

      <List style={{ marginTop: 20 }}>
        {ordenes.map((orden) => (
          <ListItem key={orden.id} divider>
            <ListItemText
              primary={`Orden #${orden.id}`}
              secondary={`Fecha: ${orden.fechaCreacion}`}
              onClick={() => navigate(`/ordenes/${orden.id}`)}
              style={{ cursor: 'pointer' }}
            />
            <IconButton onClick={() => eliminarOrden(orden.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Snackbar
        open={alerta.visible}
        autoHideDuration={3000}
        onClose={() => setAlerta({ ...alerta, visible: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setAlerta({ ...alerta, visible: false })}
          severity={alerta.tipo}
          variant="filled"
        >
          {alerta.mensaje}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ClienteDetallePage;
