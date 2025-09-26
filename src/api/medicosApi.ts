import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5173';

export async function listarMedicos() {
    const res = await axios.get(`${baseURL}/medicos`);
    return res.data;
}