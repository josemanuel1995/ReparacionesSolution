import axios from 'axios';

const API_URL = 'http://localhost:5050/api/clientes'; // Ajusta el puerto si es distinto

export const getClientes = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getCliente = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createCliente = async (cliente) => {
  const res = await axios.post('http://localhost:5050/api/clientes', cliente);
  return res.data;
};

export const updateCliente = async (id, cliente) => {
  const res = await axios.put(`http://localhost:5050/api/clientes/${id}`, cliente);
  return res.data;
};

export const deleteCliente = async (id) => {
  await axios.delete(`http://localhost:5050/api/clientes/${id}`);
};

