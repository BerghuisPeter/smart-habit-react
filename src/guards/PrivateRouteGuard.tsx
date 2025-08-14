import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "../shared/hooks/useAuth.ts";
import { ROUTE_PATHS } from "../routes/paths.ts";

export const PrivateRouteGuard = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to={ROUTE_PATHS.LOGIN} replace/>;
    }

    return children;
};
