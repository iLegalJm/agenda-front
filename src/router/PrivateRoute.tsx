// src/components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface PrivateRouteProps {
    children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Sin sesión, redirigir al login
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
