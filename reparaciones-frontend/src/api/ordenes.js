import axios from 'axios';

const API_URL = 'http://localhost:5050/api/ordenes'; // Ajusta el puerto si es distinto

export const getOrdenes = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getOrden = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createOrden = async (orden) => {
  const res = await axios.post(API_URL, orden);
  return res.data;
};

