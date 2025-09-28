import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Medicos from '../pages/Medicos';
import Pacientes from '../pages/Pacientes';
import Citas from '../pages/Citas';
import PrivateRoute from '../components/PrivateRoute';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Pública */}
                <Route path="/login" element={<Login />} />

                {/* Protegidas */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/medicos" element={<PrivateRoute><Medicos /></PrivateRoute>} />
                <Route path="/pacientes" element={<PrivateRoute><Pacientes /></PrivateRoute>} />
                <Route path="/citas" element={<PrivateRoute><Citas /></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    );
}
