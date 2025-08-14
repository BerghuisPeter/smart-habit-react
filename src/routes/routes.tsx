import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { PrivateRouteGuard } from "../guards/PrivateRouteGuard.tsx";
import { PublicOnlyRouteGuard } from "../guards/PublicOnlyRouteGuard.tsx";
import { Home } from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import RootLayout from "../shared/layouts/RootLayout.tsx";
import { ROUTE_PATHS } from "./paths.ts";
import { NotFound } from "../pages/NotFound.tsx";
import Loading from "../shared/components/Loading.tsx";


const routes: RouteObject[] = [
    {
        element: <RootLayout/>,
        HydrateFallback: () => <Loading label="Preparing your page…" variant="page" />,
        children: [
            {
                path: ROUTE_PATHS.HOME,
                handle: { title: "Home" },
                element: <Home/>
            },
            {
                path: ROUTE_PATHS.DASHBOARD,
                async lazy() {
                    const mod = await import("../pages/Dashboard");
                    return {
                        Component: () => (
                            <PrivateRouteGuard>{<mod.default/>}</PrivateRouteGuard>
                        ),
                    };
                },
                children: [
                    {
                        index: true,
                        handle: { title: "Dashboard" },
                        async lazy() {
                            const mod = await import("../pages/DashboardHome/DashboardHome");
                            return { Component: mod.DashboardHome };
                        },
                    },
                    {
                        path: ROUTE_PATHS.DASHBOARD_INSIGHTS,
                        handle: { title: "Insights" },
                        async lazy() {
                            const mod = await import("../pages/DashboardInsights");
                            return { Component: mod.DashboardInsights };
                        },
                    },
                    {
                        path: ROUTE_PATHS.DASHBOARD_HABIT,
                        handle: { title: "Habit Detail" },
                        async lazy() {
                            const mod = await import("../pages/HabitDetail");
                            return { Component: mod.HabitDetail };
                        },
                    },
                ],
            },
            {
                path: ROUTE_PATHS.LOGIN,
                handle: { title: "Login" },
                element: <PublicOnlyRouteGuard><Login/></PublicOnlyRouteGuard>
            },
            {
                path: ROUTE_PATHS.NOT_FOUND,
                handle: { title: "Not Found" },
                element: <NotFound/>
            }
        ]
    }
];

export const ROUTES = createBrowserRouter(routes);
