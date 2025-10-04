import api from "@/features/infraestructure/api";

export const authApi = {
    login: (email: string, password: string) =>
        api.post("/api/auth/login", { email, password }),

    refresh: (refreshToken: string) =>
        api.post("/api/auth/refresh", { refreshToken }),

    register: (nombre: string, email: string, password: string, rol: string) =>
        api.post("/api/auth/register", { nombre, email, password, rol }),

    logout: (refreshToken: string) =>
        api.post("/api/auth/logout", { refreshToken }),
}