import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';
import Navbar from './components/Navbar';
import './index.css';
import ClientesPage from './pages/ClientesPage';
import ClienteDetallePage from './pages/ClienteDetallePage';
import OrdenDetallePage from './pages/OrdenDetallePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NewPasswordPage from './pages/NewPasswordPage';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>

          {/* Públicas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<NewPasswordPage />} />
          <Route path="/new-password" element={<NewPasswordPage />} />


          {/* Protegidas */}
          <Route path="/clientes" element={
            <PrivateRoute>
              <ClientesPage />
            </PrivateRoute>
          } />

          <Route path="/clientes/:id" element={
            <PrivateRoute>
              <ClienteDetallePage />
            </PrivateRoute>
          } />

          <Route path="/ordenes/:id" element={
            <PrivateRoute>
              <OrdenDetallePage />
            </PrivateRoute>
          } />

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/clientes" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
