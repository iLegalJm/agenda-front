// src/services/authService.ts
import * as authApi from "../api/authApi";

export async function loginUser(email: string, password: string) {
    const token = await authApi.login(email, password);
    localStorage.setItem("token", token);
    return token;
}

export function logoutUser() {
    localStorage.removeItem("token");
}

export async function registerUser(nombre: string, email: string, password: string, rol: string) {
    return await authApi.register(nombre, email, password, rol);
}
