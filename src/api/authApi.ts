import api from "./api";

export const authApi = {
    login: (email: string, password: string) => api.post("/auth/login", { email, password }),
    refresh: (refreshToken: string) => api.post("/auth/refresh", { refreshToken }),
    register: (nombre: string, email: string, password: string, rol: string) => api.post("/auth/register", { nombre, email, password, rol }),
    logout: () => api.post("/auth/logout"),
};
