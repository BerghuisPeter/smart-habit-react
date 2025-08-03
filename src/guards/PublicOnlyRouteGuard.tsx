import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";
import { ROUTE_PATHS } from "../constants/routes.tsx";

export const PublicOnlyRouteGuard = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to={ROUTE_PATHS.DASHBOARD} replace />;
    }

    return children;
};
