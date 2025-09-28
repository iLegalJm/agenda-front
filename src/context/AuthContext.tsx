// src/context/AuthContext.tsx
import { createContext, useState, useContext } from "react";
import { loginUser, logoutUser } from "../services/authService";

interface AuthContextType {
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    login: async () => { },
    logout: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem("token")
    );

    const login = async (email: string, password: string) => {
        const newToken = await loginUser(email, password);
        setToken(newToken);
    };

    const logout = () => {
        logoutUser();
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// 👇 custom hook para consumir el contexto
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
}
