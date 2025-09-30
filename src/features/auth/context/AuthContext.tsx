import { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService";

interface AuthContextType {
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean; // 👈 Agregado
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true); // 👈 Estado de carga

    const login = async (email: string, password: string) => {
        const { accessToken } = await authService.login(email, password);
        setAccessToken(accessToken);
    };

    const logout = async () => {
        await authService.logout();
        setAccessToken(null);
    };

    // Refresh inicial SOLO si NO hay accessToken pero SÍ hay refreshToken
    useEffect(() => {
        const initialize = async () => {
            const storedAccessToken = authService.getAccessToken();
            const storedRefreshToken = authService.getRefreshToken();

            // Si ya hay accessToken válido, úsalo directamente
            if (storedAccessToken) {
                console.log("✅ AccessToken encontrado");
                setAccessToken(storedAccessToken);
                setIsLoading(false);
                return;
            }

            // Si NO hay accessToken pero SÍ refreshToken, intenta refresh
            if (!storedAccessToken && storedRefreshToken) {
                console.log("🔄 Intentando refresh inicial...");
                try {
                    const { accessToken: newToken } = await authService.refresh();
                    setAccessToken(newToken);
                } catch (error) {
                    console.error("Error al intentar refresh:", error);
                    await logout();
                }
            }

            setIsLoading(false);
        };

        initialize();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                isAuthenticated: !!accessToken,
                isLoading, // 👈 Exponer isLoading
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}