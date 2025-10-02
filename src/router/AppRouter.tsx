import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/features/auth/pages/Login';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Medicos from '@/pages/Medicos';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas públicas (redirige al dashboard si ya está logueado) */}
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                {/* Rutas privadas */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                {/* rutas de medicos */}
                <Route path="/dashboard/medicos" element={
                    <PrivateRoute>
                        <Medicos />
                    </PrivateRoute>
                } />


                {/* Redirección por defecto */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}