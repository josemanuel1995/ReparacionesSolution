import { createContext, useContext, useState, useEffect } from 'react';
import { parseJwt } from '../utils/jwt'; // asegúrate de tener esto

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [nombre, setNombre] = useState(localStorage.getItem('nombres'));

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = parseJwt(token);

    if (decoded?.nombres) {
      localStorage.setItem('nombres', decoded.nombres);
      setNombre(decoded.nombres);
    }

    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nombres');
    setToken(null);
    setNombre(null);
  };

  return (
    <AuthContext.Provider value={{ token, nombre, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
