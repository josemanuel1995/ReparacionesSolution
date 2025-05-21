import axios from 'axios';

const API_URL = 'http://localhost:5050/api/reparaciones'; // Ajusta el puerto si es distinto

export const getReparaciones = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getReparacion = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createReparacion = async (reparacion) => {
  const res = await axios.post(API_URL, reparacion);
  return res.data;
};
