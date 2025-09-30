import { createContext, useState, useContext, useEffect } from "react";
import { authService } from "../services/authService";

interface AuthContextType {
    accessToken: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    isAuthenticated: false,
    login: async () => { },
    logout: () => { },
    loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(() => authService.getAccessToken());

    const login = async (email: string, password: string) => {
        const data = await authService.login(email, password);

        setAccessToken(data.data.accessToken);
    }

    const [loading, setLoading] = useState(true);

    const logout = () => {
        authService.logout();
        setAccessToken(null);
    };

    useEffect(() => {
        const tryRefresh = async () => {
            if (!authService.getRefreshToken()) {
                setLoading(false);
                return;
            }

            try {
                const newToken = await authService.refresh();
                setAccessToken(newToken);
            } catch {
                logout();
            } finally {
                setLoading(false);
            }
        };

        tryRefresh();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                isAuthenticated: !!accessToken,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
}
