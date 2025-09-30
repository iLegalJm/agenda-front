// src/services/authService.ts
import { authApi } from "../api/authApi";

const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

export const authService = {
    login: async (email: string, password: string) => {
        const { data } = await authApi.login(email, password);
        localStorage.setItem(ACCESS_KEY, data.data.accessToken);
        localStorage.setItem(REFRESH_KEY, data.data.refreshToken);
        return data;
    },
    refresh: async () => {
        const refreshToken = localStorage.getItem(REFRESH_KEY);
        if (!refreshToken) throw new Error("No refresh token");
        const { data } = await authApi.refresh(refreshToken);
        localStorage.setItem(ACCESS_KEY, data.data.accessToken);
        localStorage.setItem(REFRESH_KEY, data.data.refreshToken);
        return data.data.accessToken;
    },
    register: async (nombre: string, email: string, password: string, rol: string) => {
        const { data } = await authApi.register(nombre, email, password, rol);
        return data;
    },
    logout: () => {
        localStorage.removeItem(ACCESS_KEY);
        localStorage.removeItem(REFRESH_KEY);
    },
    getAccessToken: () => localStorage.getItem(ACCESS_KEY),
    getRefreshToken: () => localStorage.getItem(REFRESH_KEY),
};
