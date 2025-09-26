import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Medicos from '../pages/Medicos';
import Pacientes from '../pages/Pacientes';
import Citas from '../pages/Citas';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/medicos" element={<Medicos />} />
                <Route path="/pacientes" element={<Pacientes />} />
                <Route path="/citas" element={<Citas />} />
            </Routes>
        </BrowserRouter>
    );
}
