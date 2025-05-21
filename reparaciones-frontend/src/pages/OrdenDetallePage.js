import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  TextField, Button, List, ListItem, ListItemText, Typography,
  IconButton, Snackbar, Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import BreadcrumbsNav from '../components/BreadcrumbsNav';


function OrdenDetallePage() {
  const { id } = useParams();
  const [reparaciones, setReparaciones] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [costo, setCosto] = useState('');
  const [reparacionEditando, setReparacionEditando] = useState(null);
  const [errores, setErrores] = useState({});
  const [alerta, setAlerta] = useState({ mensaje: '', tipo: 'success', visible: false });

  const apiBaseUrl = 'http://localhost:5050/api';

  const navigate = useNavigate();

  const cargarReparaciones = async () => {
    const res = await axios.get(`${apiBaseUrl}/reparaciones`);
    setReparaciones(res.data.filter((r) => r.ordenId === parseInt(id)));
  };

  useEffect(() => {
    cargarReparaciones();
  }, [id]);

  const mostrarAlerta = (mensaje, tipo = 'success') => {
    setAlerta({ mensaje, tipo, visible: true });
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!descripcion.trim()) nuevosErrores.descripcion = 'Campo requerido';
    if (!costo || parseFloat(costo) <= 0) nuevosErrores.costo = 'Debe ser un número mayor a 0';
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const guardarReparacion = async () => {
    if (!validar()) {
      mostrarAlerta('Por favor corrige los campos', 'warning');
      return;
    }

    const datos = {
      descripcion,
      costo: parseFloat(costo),
      ordenId: parseInt(id)
    };

    try {
      if (reparacionEditando) {
        await axios.put(`${apiBaseUrl}/reparaciones/${reparacionEditando.id}`, datos);
        mostrarAlerta('Reparación actualizada con éxito');
      } else {
        await axios.post(`${apiBaseUrl}/reparaciones`, datos);
        mostrarAlerta('Reparación creada con éxito');
      }
      setDescripcion('');
      setCosto('');
      setReparacionEditando(null);
      setErrores({});
      cargarReparaciones();
    } catch (error) {
      mostrarAlerta('Ocurrió un error', 'error');
    }
  };

  const editarReparacion = (r) => {
    setDescripcion(r.descripcion);
    setCosto(r.costo.toString());
    setReparacionEditando(r);
    setErrores({});
  };

  const eliminarReparacion = async (id) => {
    if (window.confirm('¿Eliminar esta reparación?')) {
      await axios.delete(`${apiBaseUrl}/reparaciones/${id}`);
      mostrarAlerta('Reparación eliminada');
      cargarReparaciones();
    }
  };

  return (
    <div style={{ padding: 20 }}>
       <BreadcrumbsNav />
      <Button variant="outlined" onClick={() => navigate(-1)} style={{ marginBottom: 10 }}>
      ⬅ Atrás
      </Button>
      <Typography variant="h5">Reparaciones de la Orden #{id}</Typography>
      <div style={{ marginTop: 10, marginBottom: 20 }}>
        <TextField
          label="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          error={!!errores.descripcion}
          helperText={errores.descripcion}
          style={{ marginRight: 10 }}
        />
        <TextField
          label="Costo"
          type="number"
          value={costo}
          onChange={(e) => setCosto(e.target.value)}
          error={!!errores.costo}
          helperText={errores.costo}
        />
        <Button
          variant="contained"
          onClick={guardarReparacion}
          style={{ marginLeft: 10 }}
        >
          {reparacionEditando ? 'Guardar Cambios' : 'Agregar'}
        </Button>
        {reparacionEditando && (
          <Button
            variant="outlined"
            onClick={() => {
              setDescripcion('');
              setCosto('');
              setReparacionEditando(null);
              setErrores({});
            }}
            style={{ marginLeft: 10 }}
          >
            Cancelar
          </Button>
        )}
      </div>

      <List>
        {reparaciones.map((r) => (
          <ListItem key={r.id} divider>
            <ListItemText
              primary={r.descripcion}
              secondary={`Costo: $${r.costo.toFixed(2)}`}
            />
            <IconButton onClick={() => editarReparacion(r)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => eliminarReparacion(r.id)} color="error">
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

export default OrdenDetallePage;
