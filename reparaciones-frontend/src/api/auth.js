import axios from 'axios';

const API = 'http://localhost:5050/api/auth';

export const loginUser = async (credentials) => {
  const res = await axios.post(`${API}/login`, credentials);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post(`${API}/register`, data);
  return res.data;
};
