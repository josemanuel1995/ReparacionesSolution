import { useEffect, useState } from 'react';
import {
  getClientes, createCliente, updateCliente, deleteCliente
} from '../api/clientes';
import {
  TextField, Button, List, ListItem, ListItemText, Grid,
  Typography, IconButton, Snackbar, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BreadcrumbsNav from '../components/BreadcrumbsNav';


function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [direccion, setDireccion] = useState('');
  const [clienteEditando, setClienteEditando] = useState(null);
  const [errores, setErrores] = useState({});
  const [alerta, setAlerta] = useState({ mensaje: '', tipo: 'success', visible: false });

  const navigate = useNavigate();

  const apiBaseUrl = 'http://localhost:5050/api';

  const cargarClientes = async () => {
    const data = await getClientes();
    setClientes(data);
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const mostrarAlerta = (mensaje, tipo = 'success') => {
    setAlerta({ mensaje, tipo, visible: true });
  };

  const limpiarFormulario = () => {
    setNombre('');
    setCorreo('');
    setCelular('');
    setDireccion('');
    setClienteEditando(null);
    setErrores({});
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!nombre.trim()) nuevosErrores.nombre = 'Nombre requerido';
    if (!correo.trim()) nuevosErrores.correo = 'Correo requerido';
    else if (!/\S+@\S+\.\S+/.test(correo)) nuevosErrores.correo = 'Correo inválido';
    if (!celular.trim()) nuevosErrores.celular = 'Celular requerido';
    if (!direccion.trim()) nuevosErrores.direccion = 'Dirección requerida';

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleGuardar = async () => {
    if (!validar()) {
      mostrarAlerta('Corrige los errores en el formulario', 'warning');
      return;
    }

    const datos = { nombre, correo, celular, direccion };

    try {
      if (clienteEditando) {
        await updateCliente(clienteEditando.id, datos);
        mostrarAlerta('Cliente actualizado con éxito');
      } else {
        await createCliente(datos);
        mostrarAlerta('Cliente creado con éxito');
      }

      limpiarFormulario();
      cargarClientes();
    } catch (error) {
      mostrarAlerta('Error al guardar el cliente', 'error');
    }
  };

  const handleEditar = (cliente) => {
    setNombre(cliente.nombre);
    setCorreo(cliente.correo);
    setCelular(cliente.celular);
    setDireccion(cliente.direccion);
    setClienteEditando(cliente);
    setErrores({});
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este cliente?')) {
      try {
        await deleteCliente(id);
        mostrarAlerta('Cliente eliminado');
        cargarClientes();
      } catch (error) {
        mostrarAlerta('Error al eliminar el cliente', 'error');
      }
    }
  };

  return (
    <div style={{ padding: 20 }}>
        <BreadcrumbsNav />
      <Typography variant="h4" gutterBottom>Clientes</Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            error={!!errores.nombre}
            helperText={errores.nombre}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            error={!!errores.correo}
            helperText={errores.correo}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            error={!!errores.celular}
            helperText={errores.celular}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            error={!!errores.direccion}
            helperText={errores.direccion}
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleGuardar} variant="contained" color="primary">
            {clienteEditando ? 'Actualizar Cliente' : 'Agregar Cliente'}
          </Button>
          {clienteEditando && (
            <Button onClick={limpiarFormulario} color="secondary" style={{ marginLeft: 10 }}>
              Cancelar
            </Button>
          )}
        </Grid>
      </Grid>

      <List style={{ marginTop: 20 }}>
        {clientes.map((c) => (
          <ListItem key={c.id} divider>
            <ListItemText
              primary={c.nombre}
              secondary={
                <>
                  <div>📧 {c.correo}</div>
                  <div>📞 {c.celular}</div>
                  <div>🏠 {c.direccion}</div>
                </>
              }
              onClick={() => navigate(`/clientes/${c.id}`)}
              style={{ cursor: 'pointer' }}
            />
            <IconButton onClick={() => handleEditar(c)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleEliminar(c.id)} color="error">
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

export default ClientesPage;
