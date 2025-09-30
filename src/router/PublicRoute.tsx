import { useAuth } from "@/features/auth/hooks/useAuth";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
    children: ReactNode;
    redirectTo?: string; // Opcional, por defecto a "/dashboard"
}

export default function PublicRoute({ children, redirectTo = "/dashboard" }: PublicRouteProps) {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
}