import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/features/auth/pages/Login';
import Dashboard from '../features/dashboard/pages/Dashboard';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { PatientListPage } from '@/features/patient/ui/pages/PatientListPage';

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
                {/* rutas de doctores */}
                <Route path="/dashboard/patients" element={
                    <PrivateRoute>
                        <PatientListPage />
                    </PrivateRoute>
                } />

                {/* Redirección por defecto */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}