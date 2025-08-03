import { useAuth } from "../hooks/useAuth.ts";
import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { ROUTE_PATHS } from "../constants/routes.tsx";

export const PrivateRouteGuard  = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
    }

    return children;
};
