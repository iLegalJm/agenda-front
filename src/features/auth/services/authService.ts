import api from "@/api/api";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const authService = {
    login: async (email: string, password: string) => {
        const { data } = await api.post("/auth/login", { email, password });
        const { accessToken, refreshToken } = data.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        return { accessToken, refreshToken };
    },

    // 👉 Usa axios DIRECTO para evitar los interceptores
    refresh: async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        console.log("Intentando refresh...");

        // ⚠️ AXIOS DIRECTO, no 'api'
        const { data } = await axios.post(
            `${API_URL}/auth/refresh`,
            { refreshToken },
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("🔍 Refresh response:", data);

        const { accessToken, refreshToken: newRefresh } = data.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefresh);

        return { accessToken, refreshToken: newRefresh };
    },

    logout: async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
            try {
                await api.post("/auth/logout", { refreshToken });
            } catch (error) {
                console.error("Error en logout:", error);
            }
        }
        authService.clearTokens();
    },

    getAccessToken: () => localStorage.getItem("accessToken"),
    getRefreshToken: () => localStorage.getItem("refreshToken"),

    clearTokens: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    },
};